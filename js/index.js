/**
* gear-toy.js
* http://brm.io/gears-d3-js/
* License: MIT
*/

var _svg,
    _allGears = [],
    _randomiseInterval,
    _canvasWidth = 1280,
    _canvasHeight = 768,
    _xOffset = _canvasWidth * 0.5,
    _yOffset = _canvasHeight * 0.4,
    _gearFactors = [64, 64, 32, 48, 48, 96, 112, 256],
    _gearStyles = ['style-0', 'style-1', 'style-2', 'style-3', 'style-4'],
    _autoShuffle = false;

var _options = {
  radius: 16,
  holeRadius: 0.3,
  transition: true,
  speed: 0.01,
  autoShuffle: false,
  number: 30,
  addendum: 8,
  dedendum: 3,
  thickness: 0.6,
  profileSlope: 0.3
};


var main = function(){
   // set up our d3 svg element
  _svg = d3.select('.gears-d3-canvas')
  .append('svg')
  .attr('viewBox', '0 0 ' + _canvasWidth + ' ' + _canvasHeight)
  .attr('preserveAspectRatio', 'xMinYMin slice');
 
  // generate and randomise scene

  _generateScene(_options);
    _randomiseScene(false);

  // start the d3 animation timer
  d3.timer(function () {
    _svg.selectAll('.gear-path')
    .attr('transform', function (d) {
      d.angle += d.speed;
      return 'rotate(' + d.angle * (180 / Math.PI) + ')';
    });
  });

};
var shuffle = function() {

  // start a timer to randomise every few secs
  _randomiseInterval = setInterval(function() {
    if (_autoShuffle)
      _randomiseScene(true);
  }, 4000);


  setTimeout(function() {
    _randomiseScene(true);
  }, 100);

  
};

var _generateScene = function(options) {
  var holeRadius,
      teeth,
      radius,
      factor,
      newGear,
      innerRadius;

  _gearStyles = Gear.Utility.arrayShuffle(_gearStyles);

  for (var i = 0; i < options.number; i++) {
    factor = _gearFactors[i % _gearFactors.length];
    radius = factor / 2;
    teeth = radius / 4;
    innerRadius = radius - options.addendum - options.dedendum;
    holeRadius = factor > 96 ? innerRadius * 0.5 + innerRadius * 0.5 * options.holeRadius : innerRadius * options.holeRadius;

    _allGears.push(newGear = Gear.create(_svg, { 
      radius: radius, 
      teeth: teeth, 
      x: 0, 
      y: 0, 
      holeRadius: holeRadius,
      addendum: options.addendum,
      dedendum: options.dedendum,
      thickness: options.thickness,
      profileSlope: options.profileSlope
    }));

    newGear.classed(_gearStyles[i % _gearStyles.length], true);
  }
};

var _randomiseScene = function(transition) {
  _allGears = Gear.Utility.arrayShuffle(_allGears);
  Gear.randomArrange(_allGears, _xOffset, _yOffset);
  Gear.setPower(_allGears[0], 0.01);
  Gear.updateGears(_allGears);

  _svg.selectAll('.gear')
  .each(function(d, i) {
    if (transition) {
      d3.select(this)
      .transition()
      .ease('elastic')
      .delay(i * 30 + Math.random() * 30)
      .duration(1000)
      .attr('transform', function(d) {
        return 'translate(' + [ d.x, d.y ] + ')';
      });
    } else {
      d3.select(this)
      .attr('transform', function(d) {
        return 'translate(' + [ d.x, d.y ] + ')';
      });
    }
  });
};
main();

(function() {
  var triggerBttn = document.getElementById( 'trigger-overlay' ),
    overlay = document.querySelector( 'div.overlay' ),
    closeBttn = overlay.querySelector( 'button.overlay-close' );
    transEndEventNames = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'msTransition': 'MSTransitionEnd',
      'transition': 'transitionend'
    },
    transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
    support = { transitions : Modernizr.csstransitions };

  function toggleOverlay() {
    if( classie.has( overlay, 'open' ) ) {
      classie.remove( overlay, 'open' );
      classie.add( overlay, 'close' );
      var onEndTransitionFn = function( ev ) {
        if( support.transitions ) {
          if( ev.propertyName !== 'visibility' ) return;
          this.removeEventListener( transEndEventName, onEndTransitionFn );
        }
        classie.remove( overlay, 'close' );
      };
      if( support.transitions ) {
        overlay.addEventListener( transEndEventName, onEndTransitionFn );
      }
      else {
        onEndTransitionFn();
      }
    }
    else if( !classie.has( overlay, 'close' ) ) {
      classie.add( overlay, 'open' );
    }
  }

  triggerBttn.addEventListener( 'click', toggleOverlay );
  closeBttn.addEventListener( 'click', toggleOverlay );
})();