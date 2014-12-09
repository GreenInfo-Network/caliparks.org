define(["require","exports","module","stamen-super-classy"], function(
  require,
  exports,
  module,
  stamenSuperClassy
) {

  "use strict";

  function View() {

    var that = this,
        iframeNode, textareaNode, showNode, controlsNode, checkboxNodes;

    stamenSuperClassy.apply(that, arguments);

    showNode   = that.utils.get("#content .show")[0];
    iframeNode = that.utils.get("iframe", showNode)[0];

    function updateTextarea() {
      textareaNode.innerHTML = showNode.innerHTML;
    }

    function getStatus() {
      var status = {
        "href" : location.host,
        "id"   : viewData.park_id
      };

      for (var i=0; checkboxNodes.length > i; i++) {
        status[checkboxNodes[i].getAttribute("data-feature")] = checkboxNodes[i].checked;
      }

      return status;
    }

    function generateIframeCode(status) {
      return that.processTemplate("<iframe width=\"100%\" height=\"100%\" src=\"//{href}/embed/park?id={id}&directions={directions}&locatorMap={locatormap}\"></iframe>", status);
    }

    function update() {
      var iframeCode = generateIframeCode(getStatus());
      showNode.innerHTML     = iframeCode;
      textareaNode.innerHTML = iframeCode;
    }

    function initTextarea() {
      textareaNode = that.utils.get("#content .change textarea")[0];

      updateTextarea();
    }

    function initCheckboxes() {
      controlsNode  = that.utils.get("#content .controls")[0];
      checkboxNodes = that.utils.get("input", controlsNode);

      controlsNode.addEventListener("click", update, false);
    }

    function init() {
      initTextarea();
      initCheckboxes();
      update();
    }

    //
    // Go go go
    //
    init();

  }

  module.exports.view = new View();

});
