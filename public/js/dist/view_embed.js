define([ "require", "exports", "module", "stamen-super-classy" ], function(require, exports, module, stamenSuperClassy) {
    "use strict";
    function View() {
        function updateTextarea() {
            textareaNode.innerHTML = showNode.innerHTML;
        }
        function getStatus() {
            for (var status = {
                href: location.host,
                id: viewData.park_id
            }, i = 0; checkboxNodes.length > i; i++) status[checkboxNodes[i].getAttribute("data-feature")] = checkboxNodes[i].checked;
            return status;
        }
        function generateIframeCode(status) {
            return that.processTemplate('<iframe width="100%" height="100%" src="//{href}/embed/park?id={id}&directions={directions}&locatorMap={locatormap}&name={name}&activities={activities}&social={social}"></iframe>', status);
        }
        function update() {
            var iframeCode = generateIframeCode(getStatus());
            showNode.innerHTML = iframeCode, textareaNode.innerHTML = iframeCode;
        }
        function initTextarea() {
            textareaNode = that.utils.get("#content .change textarea")[0], updateTextarea();
        }
        function initCheckboxes() {
            controlsNode = that.utils.get("#content .controls")[0], checkboxNodes = that.utils.get("input", controlsNode), 
            controlsNode.addEventListener("click", update, !1);
        }
        function init() {
            initTextarea(), initCheckboxes(), update();
        }
        var iframeNode, textareaNode, showNode, controlsNode, checkboxNodes, that = this;
        stamenSuperClassy.apply(that, arguments), showNode = that.utils.get("#content .show")[0], 
        iframeNode = that.utils.get("iframe", showNode)[0], init();
    }
    module.exports.view = new View();
});