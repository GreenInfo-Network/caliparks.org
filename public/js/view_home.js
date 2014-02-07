'use static';

(function(window) {

  window.STMN = window.STMN || {};

  function initView(data) {

    var bigSmallGlopElements = document.querySelectorAll(data.bigSmallGlop.selector + ' .glop-park'),
        parkShape, parkElement;

     function makePark(el) {

      setTimeout(function() {

        parkShape = new STMN.ParkShape(
          el, 
          data.bigSmallGlop.shapes[data.bigSmallGlop.idPrefix + el.getAttribute('data-park-id')]
        );

       parkShape.init();
        
      }, 1000*i);

    }

    /*
    for(var i=0; bigSmallGlopElements.length > i; i++) {

      parkElement = bigSmallGlopElements[i];

      makePark(parkElement);

    }
    */

  }

  //Public interface
  STMN.initView = initView;

}(window));