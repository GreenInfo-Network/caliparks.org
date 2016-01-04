import React, {PropTypes} from 'react';
import PureComponent from 'react-pure-render/component';
import Autosuggest from 'react-autosuggest';
import { Link } from 'react-router';

import request from 'superagent';

export default class ParkSearch extends PureComponent {
  constructor() {
    super();

    this.state = {
      value: '',
      parks: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
  }

  static propTypes = {};

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
          context.setState({parks: JSON.parse(res.text)});
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

  getMatchingParks(value) {
    const {parks} = this.state;
    if (!parks || !parks.length) return [];

    const escapedValue = this.escapeRegexCharacters(value.trim());
    const regex = new RegExp('^' + escapedValue, 'i');

    return parks.filter(park => regex.test(park.name));
  }

  renderSuggestion(suggestion) {
    return (
      <Link className='link' to={`/park/${suggestion.id}`}>
        <span>{suggestion.name}</span>
      </Link>
    );
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Search',
      value,
      onChange: this.onChange
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
