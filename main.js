document.addEventListener("DOMContentLoaded", function(){
	var canvas = document.getElementById('renderCanvas');
	var engine = new BABYLON.Engine(canvas, true);
	var scene = new BABYLON.Scene(engine);

	var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0). scene);
	light.diffuse = new BABYLON.Color3(0, 0, 0);
	light.specular = new BABYLON.Color3(0, 0, 0);
	light.groundColor = new BABYLON.Color3(0, 0, 0);

	var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0.6, 36, new BABYLON.Vector3(0, 0, 0), scene);
	camera.attachControl(canvas, true);
	camera.setTarget(BABYLON.Vector3.Zero());

	var ground = new BABYLON.Mesh.CreateGround("ground", 550, 550, 300, scene);
	var groundMat = new BABYLON.StandardMaterial("ground", scene);
	groundMat.diffuseTexture = new BABYLON.Texture("texture/desertTex.jpg", scene);
	groundMat.specularColor = new BABYLON.Color3(0, 0, 0);
});

