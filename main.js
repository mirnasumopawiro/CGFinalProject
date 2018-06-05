document.addEventListener("DOMContentLoaded", function(){
	console.log("hai");
	var canvas = document.getElementById("renderCanvas");
	var engine = new BABYLON.Engine(canvas, true);

	var initScene = function (){
		var scene = new BABYLON.Scene(engine);

		var camera = new BABYLON.ArcRotateCamera("camera", 0, 0.6, 36, new BABYLON.Vector3(0, 0, 0), scene);
		camera.attachControl(canvas, true);
		camera.setTarget(BABYLON.Vector3.Zero());

		var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0). scene);
		light.diffuse = new BABYLON.Color3(0, 0, 0);
		light.specular = new BABYLON.Color3(0, 0, 0);
		light.groundColor = new BABYLON.Color3(0, 0, 0);

		var ground = new BABYLON.Mesh.CreateGround("ground", 30, 30, 30, scene);
		var groundMat = new BABYLON.StandardMaterial("ground", scene);
		groundMat.diffuseTexture = new BABYLON.Texture("texture/desertTex.jpg", this.scene);
		groundMat.specularColor = new BABYLON.Color3(0, 0, 0);
		ground.material = groundMat;

		var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("skybox/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
		skybox.material = skyboxMaterial;

		return scene;
	};

	var scene = initScene();

	engine.runRenderLoop(function (){
		scene.render();
	});
});

