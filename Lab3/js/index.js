

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

			var NUM_ROLLS;//= 100;
			var NUM_SIDES;//= 10;
			var ROLLS_PER_RENDER;//= 100;

			var histogram = {};

			
			var flag = false;

			var rollCount = 0;
			function next() {
				
				 // console.log(NUM_ROLLS);
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
			
											function get(url) {
								  
											  return new Promise(function(succeed, fail) {
											    var request = new XMLHttpRequest();
											    request.open("GET", url,true);
											    request.addEventListener("load", function() {
											      if (request.status < 400)
											        succeed(request.response);
											      else
											        fail(new Error("Request failed: " + request.statusText));
											    });
											    request.addEventListener("error", function() {
											      fail(new Error("Network error"));
											    });
											    request.send();
											  });
											}

			

												function ajaxPost(url, data, callback, isJson) {
												    var req = new XMLHttpRequest();
												    req.open("POST", url);
												    req.addEventListener("load", function () {
												        if (req.status >= 200 && req.status < 400) {
												           
												            callback(req.responseText);
												        } else {
												            console.error(req.status + " " + req.statusText + " " + url);
												        }
												    });
												    req.addEventListener("error", function () {
												        console.error("Err" + url);
												    });
												    if (isJson) {
												      
												        req.setRequestHeader("Content-Type", "application/json");
												       
												        data = JSON.stringify(data);
												    }
												    req.send(data);

												}

    
  
			function render() {
			    ctx.clearRect(0, 0, canvas.width, canvas.height);
			    ctx.fillText('Rolls: ' + rollCount, 20, 20);

			    var nums = Object.keys(histogram);
			    var w = canvas.width / nums.length;
			    
			    var maxV = Math.max.apply(Math, _toConsumableArray(nums.map(function (k) {return histogram[k];})));
			    var maxH = .8 * canvas.height / (NUM_ROLLS * maxV / rollCount);

				var arr =  [];
				var $square = $(".viewport");

			    for (var i = 0; i < NUM_SIDES; i++) {
			        var h = histogram[nums[i]] * maxH;
			        console.log(nums.length);

				        var temp = [histogram[nums[i]]];
				        arr.push(temp) ;
			        
			        var y = canvas.height - h;
					 			        
			        $square.append("<div class='color-me'  style='width:" + 
				    	w + "px;height:" + h + "px;float:left;background-color:black;top:"+y+"px;'></div>");			       
			    }

					  var $squar = $(".viewport"),
					    colors = ['red','green','blue','yellow','brown','orange','white','black','purple','coral','indigo','lime'];
					    
					    $(".color-me").click(function() {

					    $(this).css({
					        'background-color' : colors[ Math.floor((Math.random() * colors.length)) ]
					    });
					});

var buttonclicked=false;

$(".some-btn").click(function(){
		if( buttonclicked!= true ) {
		    buttonclicked= true;
  			var $squar = $(".viewport"),
					colors = ['red','green','blue','yellow','brown','orange','white','black','purple','coral','indigo','lime'];
					
					$(".color-me").css({
						'background-color' : colors[ Math.floor((Math.random() * colors.length)) ]
					});
					
		}
		buttonclicked=false;
});
			   				ajaxPost("http://localhost/js/post_json.php", arr, function (reponse) {},true );


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

				get("http://localhost/js/rolls.json").then(function(response) {
				    console.log(response);
				    return JSON.parse(response);
				}).then(function(data) {
				    NUM_ROLLS = data[0].NUM_ROLLS;
				    NUM_SIDES = data[0].NUM_SIDES;
				    ROLLS_PER_RENDER = data[0].NUM_ROLLS;
				    next();
				}).catch(function(error){
				    console.log("Error!!!");
				    console.log(error);
				});
				// console.log("good job (((after)))");
				

			    histogram = {};
			    rollCount = 0;
			
			    // console.log("good job after");

			}

			function finish() {
			    render();
			}

			



 return {
        start:start,   
    };
}());

myModule.start();