var Game = Game || {};
Game.width = 1040;
Game.height = 680;

Game.init = function(){

	Game.stage = new PIXI.Container();
	Game.renderer = PIXI.autoDetectRenderer(Game.width, Game.height);
	document.body.appendChild(Game.renderer.view);
	Game.preload();
}

Game.preload = function(){

	PIXI.loader
		.add("assets/graphics/tiles.png")
		.load(Game.create);
}

Game.create = function(){
	
	//Create the `tileset` sprite from the texture
	 var texture = PIXI.utils.TextureCache["assets/graphics/tiles.png"];

	 //Create a rectangle object that defines the position and
	 //size of the sub-image you want to extract from the texture

	 //Tell the texture to use that rectangular section
	 texture.frame = new PIXI.Rectangle(256, 0, 32, 32);

	 //Create the sprite from the texture
	var grass = new PIXI.Sprite(texture);

	 //Position the rocket sprite on the canvas
	 grass.x = 32;
	 grass.y = 400;

	//Add the rocket to the stage
	Game.stage.addChild(grass);

	grass.x = 300;
	grass.y = 300;
	//Game.stage.addChild( Game.mapContainer);




	Game.update();

}


Game.update = function(){
	
	Game.renderer.render(Game.stage);
}

Game.init();




