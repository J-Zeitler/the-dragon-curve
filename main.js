var size = 0;

function getVal(slider){
	size = parseFloat(slider.value);
	valueBox = $('#valueBox');
	valueBox.html(size);
}

function go(){
	function draw(){
		ctx.beginPath();
		ctx.moveTo(nodeList.e(1,1), nodeList.e(2, 1));

		nodeLen = nodeList.cols();
		for (var col = 2; col <= nodeLen; ++col){
			ctx.lineTo(nodeList.e(1, col), nodeList.e(2, col));
		}

		ctx.stroke();
	}

	function unwrap(){
		transVec = $M([nodeList.e(1, nodeLen), nodeList.e(2, nodeLen)]);
		nodeList = nodeList.map(function(x, i, j){
			return nodeList.e(i, j) - transVec.e(i, 1);
		});

		var rotated = rot.x(nodeList.minor(1, 1, 2, nodeLen-1));
		rotated = rotated.map(function(x, i, j){
			return rotated.e(i, nodeLen-j);
		});
		nodeList = nodeList.augment(rotated);
		nodeList = nodeList.snapTo(0);
		draw();
	}

	var canvas = document.getElementById('canvas');
	var W = window.innerWidth, H = window.innerHeight;
	var xOrigin = W/2, yOrigin = H/2;
	canvas.width = W;
	canvas.height = H;
	var ctx = canvas.getContext('2d');
	ctx.translate(xOrigin, yOrigin); //set origin to match openGL
	ctx.scale(1, -1);

	// lined axes
	// ctx.moveTo(0, 0);
	// ctx.lineTo(40, 0);
	// ctx.moveTo(0, 0);
	// ctx.lineTo(0, 40);
	// ctx.strokeStyle = 'rgb(255, 0, 0)';
	// ctx.stroke();
	// ctx.strokeStyle = 'rgb(0, 0, 0)';


	var nodeList = $M([
		[0, size],
		[0, 0] 
	]);
	var nodeLen = nodeList.cols(), transVec;

	//rotation matrix
	var rot = Matrix.Rotation(Math.PI/2);
	rot = rot.snapTo(0);

	// setInterval(unwrap, 33);
	var maxIterations = 18;
	var iteration = 0;
	function render(){
		var color = Math.round(iteration * 255/(maxIterations-1));
		ctx.strokeStyle = 'rgb('+color+', '+Math.round(color*0.4)+', 0)';
		nodeLen = nodeList.cols();		
		unwrap();
		setTimeout(function() {
			++iteration; 
			if (iteration < maxIterations) { render(); }
		}, 50);
	}
	render();
}