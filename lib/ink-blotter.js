'use strict';

    // Only add setZeroTimeout to the window object, and hide everything
    // else in a closure.
    (function() {
        var timeouts = [];
        var messageName = "zero-timeout-message";

        // Like setTimeout, but only takes a function argument.  There's
        // no time argument (always zero) and no arguments (you have to
        // use a closure).
        function setZeroTimeout(fn) {
            timeouts.push(fn);
            window.postMessage(messageName, "*");
        }

        function handleMessage(event) {
            if (event.source == window && event.data == messageName) {
                event.stopPropagation();
                if (timeouts.length > 0) {
                    var fn = timeouts.shift();
                    fn();
                }
            }
        }

        window.addEventListener("message", handleMessage, true);

        // Add the one thing we want added to the window object.
        window.setZeroTimeout = setZeroTimeout;
    })();

function InkBlot(options) {
	var ctx = options.context,
		h = options.height,
		w = options.width,
		amount = options.amount,
		ratio = options.ratio || .5005,
		callback = options.onComplete || function(){};
	ctx.fillStyle = 'black';

	var x = Math.floor(w*Math.random()),
	    y = Math.floor(h*Math.random()),
	    xdir = 1,
	    ydir = 1,
	    width = 2*w;

	var matrix = new Array(width);
	for (var i = 0; i <= w; i++) {
	    matrix[i] = new Array(h);
	}

	function dropInk(x,y) {
	  // out of ink? if so then stop
	  if (amount <= 0)
	  	return;

	  // out of bounds? if so then bounce
	  if (x > w) {
	  	return dropInk(x - 1, y);
	  }
	  if (x < 0) {
	  	return dropInk(x + 1, y);
	  }
	  if (y > h) {
	  	return dropInk(x, y - 1);
	  }
	  if (y < 0) {
	  	return dropInk(x, y + 1);
	  }

	  // wait a moment
	  setZeroTimeout(function() {
	  	// if ink is not already here, then drop it
	    if (matrix[x][y] !== true) {
	      ctx.fillRect(x, y, 2, 2);
	      ctx.fillRect(width - x, y, 2, 2);
	      matrix[x][y] = true;
	      amount--;
	    }
	    if (amount <= 0)
	  	  return callback();

	    var xDir = Math.random() > ratio ? -1 : 1;
	    var yDir = Math.random() > ratio ? -1 : 1;
	    var newX = x + xDir;
	    var newY = y + yDir;

		dropInk(newX, newY);
	  });
	}

  // start
  dropInk(x,y);
}
