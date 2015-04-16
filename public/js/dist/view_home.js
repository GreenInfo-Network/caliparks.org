define(["require","exports", "module", "block-search-box", "block-stories-flexy"], function(
  require,
  exports,
  module,
  BlockSearchBox,
  BlockStoriesFlexy
) {

  "use strict";

  (new BlockSearchBox(".block-search-box",{}, function(err, blockSearchBox) {}));

  (new BlockStoriesFlexy(".block-stories-flexy",{}, function(err, blockStoriesFlexy) {}));

});
