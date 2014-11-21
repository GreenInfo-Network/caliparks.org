define(["require","exports","module","jquery","block-activity-filter","block-search-box","stamen-super-classy"], function(
  require,
  exports,
  module,
  jquery,
  BlockActivityFilter,
  BlockSearchBox,
  StamenSuperClassy
) {

  "use strict";

  function TabletViewportManager() {
    var that = this;

    StamenSuperClassy.apply(that, arguments);

    var bodyNode     = that.utils.get('body')[0],
        headerNode   = that.utils.get('header', bodyNode)[0],
        footerNode   = that.utils.get('footer', bodyNode)[0],
        contentNode  = that.utils.get('.content', bodyNode)[0],
        tabNode  = that.utils.get('.search-results', bodyNode)[0],
        heightOffset = (headerNode ? (headerNode.offsetHeight) : 0) + (footerNode ? footerNode.offsetHeight : 0);

    function resize () {
      contentNode.style.height = (window.innerHeight - heightOffset) + 'px';
      tabNode.style.height = (window.innerHeight - heightOffset) + 'px';
    }

    $(window).on('resize orientationChanged', function() {
      resize ();
    });

    return that;
  }

  var blockSearchBox        = new BlockSearchBox(".block-search-box",{}, function(err, blockSearchBox) {});
  var blockActivityFilter   = new BlockActivityFilter(".block-activity-filter",{}, function(err, blockActivityFilter) {});
  var tabletViewportManager = new TabletViewportManager();

});
