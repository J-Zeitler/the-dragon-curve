<!DOCTYPE html>
<html>
<head>
	<title>Dragon Curve</title>
	<link rel="stylesheet" href="styles.css">
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
	<script src="sylvester.js"></script>
	<script src="main.js"></script>
</head>
<body>
	<div id="info">
			<p>This is a fractal texture calculator using the folding technique to produce a 
				<a href="http://en.wikipedia.org/wiki/Dragon_curve">dragon curve</a>.
			</p>
			<label for="slider">Select scale of the seed:</label><br/>
			<input id="slider" type="range" min="1" max="3.0" step="0.1" onchange="getVal(slider)"/>
			<label id="valueBox" for="slider"></label><br/>
			<button id="go" onclick="go()">Go Dragon!</button>
		</div>
	<canvas id="canvas"></canvas>
	<script>getVal(document.getElementById('slider'));</script>
</body>
</html>