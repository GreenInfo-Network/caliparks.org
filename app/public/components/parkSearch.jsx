import React, {PropTypes} from 'react';
import PureComponent from 'react-pure-render/component';
import Autosuggest from 'react-autosuggest';
import Bloodhound from 'bloodhound-js';
import { Link } from 'react-router';

import request from 'superagent';

export default class ParkSearch extends PureComponent {
  constructor() {
    super();

    this.state = {
      value: '',
      parks: []
    };

    this.engine = null;

    this.onChange = this.onChange.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
  }

  static propTypes = {
    suggestionsLimit: PropTypes.number
  };

  static defaultProps = {
    suggestionsLimit: 10
  };

  componentWillMount() {
    this.state.suggestions = this.getMatchingParks('');
    this.getSearchList();
  }

  componentDidMount() {}

  componentDidUpdate() {}

  getSearchList() {
    const context = this;

    request
      .get('/assets/data/parks.json')
      .end((err, res) => {
        if (err) {
          console.error('Loading park search list failed!', err);
        } else {
          const data = JSON.parse(res.text);
          context.engine = new Bloodhound({
            local: data,
            identify: (obj) => { return obj.id; },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            datumTokenizer: (obj) => { return Bloodhound.tokenizers.whitespace(obj.name); }
          });

          context.setState({parks: data});
        }
      });
  }

  onChange(event, { newValue, method }) {
    if (method === 'type') {
      this.setState({
        value: newValue,
        suggestions: this.getMatchingParks(newValue)
      });
    } else {
      this.setState({
        value: newValue
      });
    }
  }

  onSuggestionSelected(event, { suggestionValue }) {
    this.setState({
      suggestions: this.getMatchingParks(suggestionValue)
    });
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  superEscapeRegexCharacters(str) {
    return (str + '').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, '\\$1');
  }

  getMatchingParks(value) {
    const {parks} = this.state;
    const {suggestionsLimit} = this.props;

    if (!parks || !parks.length || !this.engine) return [];

    const escapedValue = this.escapeRegexCharacters(value.trim());

    let things = [];

    this.engine.search(escapedValue,
      (results) => {
        things = results;
      },
      (results) => {}
    );

    if (suggestionsLimit && suggestionsLimit > 0) return things.slice(0, suggestionsLimit);
    return things;
  }

  highlightName(name) {
    const {value} = this.state;
    const escapedValue = this.superEscapeRegexCharacters(value.trim());
    return name.replace(new RegExp('(' + escapedValue + ')', 'gi'), '<b>$1</b>');
  }

  renderSuggestion(suggestion) {
    return (
      <Link className='link' to={`/park/${suggestion.id}`}>
        <span dangerouslySetInnerHTML={{__html:this.highlightName(suggestion.name)}} />
      </Link>
    );
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Search',
      value,
      onChange: this.onChange,
    };

    return (
      <Autosuggest suggestions={suggestions}
                   getSuggestionValue={this.getSuggestionValue}
                   renderSuggestion={this.renderSuggestion}
                   inputProps={inputProps}
                   onSuggestionSelected={this.onSuggestionSelected} />
    );
  }
}
