
var myModule = (function() {

			function _toConsumableArray(arr) {
				if (Array.isArray(arr)) {
					for (var i = 0, arr2 = Array(arr.length);
					 i < arr.length; i++) {arr2[i] = arr[i];}
						return arr2;} 
				else {
					return Array.from(arr);}}
				var canvas = document.getElementById('canvas');
			var ctx = canvas.getContext('2d');

			function fitToParent() {
			    canvas.width = canvas.parentElement.clientWidth;
			    canvas.height = canvas.parentElement.clientHeight;
			}

			window.onresize = function () {
			    fitToParent();
			    render();
			    setTimeout(fitToParent, 100);
			    setTimeout(render, 100);
			};
			fitToParent();

			function randomInt(min, max) {

			    min = Math.ceil(min);
			    max = Math.floor(max);
			    return Math.floor(Math.random() * (max - min + 1)) + min;

			}

			var NUM_ROLLS = 100;
			var NUM_SIDES = 10;
			var ROLLS_PER_RENDER = 100;

			var NUM_ROLLS_E = document.getElementById('num-rolls');
			var NUM_SIDES_E = document.getElementById('num-sides');
			var ROLLS_PER_RENDER_E = document.getElementById('rolls-per-render');
			var histogram = {};

			NUM_ROLLS_E.value = NUM_ROLLS;
			NUM_SIDES_E.value = NUM_SIDES;
			ROLLS_PER_RENDER_E.value = ROLLS_PER_RENDER;


			var rollCount = 0;
			function next() {

			    for (var i = 0; i < ROLLS_PER_RENDER; i++) {
			        var result = randomInt(1, NUM_SIDES);
			        if (result && !histogram[result]) histogram[result] = 0;
			        if (result) histogram[result]++;
			        rollCount++;
			    }

			    if (rollCount < NUM_ROLLS) {
			        requestAnimationFrame(function () {
			            next();
			            render();
			        });
			    } else
			    {
			        finish();
			    }

			}

			function render() {
			    ctx.clearRect(0, 0, canvas.width, canvas.height);


			    ctx.fillText('Rolls: ' + rollCount, 20, 20);

			    var nums = Object.keys(histogram);
			    var w = canvas.width / nums.length;
			    
			    var maxV = Math.max.apply(Math, _toConsumableArray(nums.map(function (k) {return histogram[k];})));
			    var maxH = .8 * canvas.height / (NUM_ROLLS * maxV / rollCount);


			    ctx.fillStyle = 'black';
			    for (var i = 0; i < nums.length; i++) {
			        var h = histogram[nums[i]] * maxH;
			        var y = canvas.height - h;
			        ctx.fillRect(w * i, y, w, h);
			    }

			    for (var _i = 0; _i < nums.length; _i++) {
			        var _h = histogram[nums[_i]] * maxH;
			        var _y = canvas.height - _h;
			        ctx.fillText(nums[_i], w * _i + 1, _y - 30);
			    }


			    ctx.fillStyle = 'red';
			    for (var _i2 = 0; _i2 < nums.length; _i2++) {
			        var _h2 = histogram[nums[_i2]] * maxH;
			        var _y2 = canvas.height - _h2;
			        ctx.fillText(histogram[nums[_i2]], w * _i2 + 1, _y2 - 20);
			    }

			    ctx.fillStyle = 'green';
			    for (var _i3 = 0; _i3 < nums.length; _i3++) {
			        var _h3 = histogram[nums[_i3]] * maxH;
			        var _y3 = canvas.height - _h3;
			        var perc = Math.round(1000 * histogram[nums[_i3]] / rollCount) / 10;
			        ctx.fillText(perc + '%', w * _i3 + 1, _y3 - 10);
			    }
			}

			function start() {

			    histogram = {};
			    rollCount = 0;

			    NUM_ROLLS = NUM_ROLLS_E.value;
			    NUM_SIDES = NUM_SIDES_E.value;
			    ROLLS_PER_RENDER = ROLLS_PER_RENDER_E.value;
			    next();

			}

			function finish() {
			    render();
			}

			



 return {
        start:start,
        
    };
}());

myModule.start();