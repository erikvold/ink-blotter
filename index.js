'use strict';

window.onload = function() {
	var out = document.getElementById('output');
	render_inkblot(out.getContext('2d'), out.height, out.width/2, 5000);
};
