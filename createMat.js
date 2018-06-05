function createMat(scene){
	var mat = new BABYLON.StandardMaterial("material", scene);

	mat.diffuseTexture = new BABYLON.Texture("assets/marblewhite.jpg", scene);
	mat.specularTexture = new BABYLON.Texture("assets/shiny.jpg", scene);
	mat.specularPower = 25;
	mat.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);
	mat.alpha = 1;
	return mat;
}