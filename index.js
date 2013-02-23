'use strict';

window.onload = function() {
	var out = document.getElementById('output');
	out.setAttribute('style', 'border: red solid;');
	InkBlot({
		context: out.getContext('2d'),
		height: out.height,
		width: out.width/2,
		amount: 50000,
		onComplete: function() {
			out.setAttribute('style', 'border: green solid;');
		}
	});
};
