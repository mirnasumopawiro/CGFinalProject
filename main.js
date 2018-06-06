document.addEventListener("DOMContentLoaded", function(){
	console.log("hai");
	var canvas = document.getElementById("renderCanvas");
	var engine = new BABYLON.Engine(canvas, true);
    var char;
    var isJumping = 0;
    var isFalling = 0;
    var jump = 0;
    var gravity = 0.015;
    var original_position = 11;
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
        gravity = new BABYLON.Vector3(0, -9.81, 0);
        physicsEngine = new BABYLON.CannonJSPlugin();
        scene.enablePhysics(gravity, physicsEngine);

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
            tmpGround.physicsImpostor = new BABYLON.PhysicsImpostor(tmpGround, BABYLON.PhysicsImpostor.BoxImpostor, 
            {mass: 0, restitution: 0.8, friction: 0.2}, scene);
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

    createChar();
    
    function createChar() { 
        BABYLON.SceneLoader.ImportMesh("", "", "assets/bot.babylon", scene, function (newMeshes) { 
            char = newMeshes[0]; 
            char.position = new BABYLON.Vector3(0,11,0);
            char.rotation.y = - Math.PI / 2;
            char.scaling = new BABYLON.Vector3(3, 3, 3);
            // char.physicsImpostor = new BABYLON.PhysicsImpostor(char, BABYLON.PhysicsImpostor.BoxImpostor, 
            // {mass: 1, restitution: 0, friction: 0}, scene);
        }); 

        logicforChar();

    }

    function Jump(){
        var height = 20;
        if (isJumping == 0 && isJumping < 2) {
            isJumping++;
            jump = height;
            
        }
        
    }

    function logicforChar(){
        scene.registerBeforeRender(function () {
            var jumping = 0.5;

            if (isJumping > 0) {
                // jump += gravity;
                char.position.y += jumping;
                console.log(1);
                if (char.position.y >=  jump){
                isJumping = false;
                isFalling = true;
                }
            }

            if (isFalling == true){
                char.position.y -= jumping;
                if (char.position.y <= original_position) {
                    char.position.y = original_position;
                    isFalling = false;
                }

            }

             window.onkeydown = function (event) {
            
            switch (event.keyCode) {
                //a
                case 65:
                    char.position.z +=5;
                    break;
                //d    
                case 68:
                    char.position.z -=5;
                    break;
                case 32:
                    Jump();

                    break;
            }
        };
        })
    }

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