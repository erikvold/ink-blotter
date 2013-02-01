'use strict';

function render_inkblot(ctx, h, w, amount) {
	ctx.fillStyle = 'black';

	var x = Math.floor(w),
	  y = Math.floor(.5 * h),
	  xdir = 1,
	  ydir = 1;
	var width = 2*w;

	var matrix = new Array(width);
	for (var i =0; i<=w; i++) {
	    matrix[i] = new Array(h);
	}

	function dropInk(x,y) {
	    if (amount <= 0) return;
	    if (x > w || x < 0) return;
	    if (y > h || y < 0) return;

	  if (matrix[x][y] !== true) {
	      ctx.fillRect(x, y, 2, 2);
	      ctx.fillRect(width - x, y, 2, 2);
	      matrix[x][y] = true;
	      amount--;
	    }

	    var startXDir = Math.random() > .52 ? -1 : 1;
	    var startDir = Math.random() > .52 ? -1 : 1;

		dropInk(x+startXDir, y - startDir);
		dropInk(x+startXDir, y);
		dropInk(x+startXDir, y + startDir);

	    startDir = Math.random() > .5 ? -1 : 1;
	    dropInk(x-startXDir, y - startDir);
	    dropInk(x-startXDir, y);
	    dropInk(x-startXDir, y + startDir);

	    startDir = Math.random() > .5 ? -1 : 1;
	    dropInk(x, y - startDir);
	    dropInk(x, y + startDir);
	}

  dropInk(x,y);
}
