document.addEventListener("DOMContentLoaded", function(){
	console.log("hai");
	var canvas = document.getElementById("renderCanvas");
	var engine = new BABYLON.Engine(canvas, true);
 
    var grounds = {
        objects: [],
        WIDTH: 100,
        HEIGHT: 100,
        SUBDIVISIONS: 30,
        COUNT: 10,
        MOVE_SPEED: 2,
        farLeftDistance: 0,
        farRightDistance: 0
    };

	var initScene = function (){
		var scene = new BABYLON.Scene(engine);

		// var camera = new BABYLON.ArcRotateCamera("", -Math.PI / 2, 1.08, 20, new BABYLON.Vector3(0,0,6), scene);
		var camera = new BABYLON.ArcRotateCamera("camera", Math.PI * 1, 1.5, 100, new BABYLON.Vector3(5, 25, 1.5), scene);
		camera.attachControl(canvas, true);
		// detach control yang bikin kamera nya fixed
        // camera.detachControl(canvas);
		camera.setTarget(BABYLON.Vector3.Zero());

		var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0). scene);
		light.diffuse = new BABYLON.Color3(255, 255, 255);
		light.specular = new BABYLON.Color3(255, 255, 255);
		light.groundColor = new BABYLON.Color3(255, 255, 255);

		var groundMat = new BABYLON.StandardMaterial("ground", scene);
		groundMat.diffuseTexture = new BABYLON.Texture("texture/desertTex.jpg", this.scene);
		groundMat.specularColor = new BABYLON.Color3(0, 0, 0);


        for(var i = 0; i < grounds.COUNT; i++){
            var tmpGround = new BABYLON.Mesh.CreateGround(
                "ground", grounds.WIDTH, grounds.HEIGHT, grounds.SUBDIVISIONS, scene);
            tmpGround.material = groundMat;
            tmpGround.position.x = (i * grounds.WIDTH) - (Math.ceil(grounds.COUNT / 2) * grounds.WIDTH);
            
            grounds.objects.push(tmpGround);
        }
        grounds.farLeftDistance = grounds.objects[0].position.x;
        grounds.farRightDistance = grounds.objects[grounds.objects.length - 1].position.x;
  
        window.g = grounds;

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
		// untuk bikin dia jalan kiri terus
		// jadi kalo count nya udah mentok, yang kiri dipindah ke kanan
        for(var i = 0; i < grounds.COUNT; i++){
            var selected = grounds.objects[i];
            selected.position.x -= grounds.MOVE_SPEED;
            
            if(selected.position.x < grounds.farLeftDistance){
                selected.position.x = grounds.farRightDistance;
            }
        }
        
		scene.render();
	});
});