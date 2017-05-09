var Game = Game || {};
Game.width = 1040;
Game.height = 680;

var Materials = {};

function Trunk(over, environment){
    this.over = over;
    this.environment = environment;
    
    this.SpriteOver = {};
    this.SpriteEnv = {};
}

function Vector(x, y = x){
    this.x = x;
    this.y = y;
}

function presetMaterial(key, cacheKey, tileSize, index){
    Materials[key] = new PIXI.Texture(PIXI.BaseTexture.fromImage(cacheKey));
    Materials[key].frame = new PIXI.Rectangle(tileSize.x * index.x, tileSize.y * index.y, tileSize.x, tileSize.y);
    console.log(Materials);
}


Game.init = function(){

	Game.stage = new PIXI.Container();
	Game.renderer = PIXI.autoDetectRenderer(Game.width, Game.height);
	document.body.appendChild(Game.renderer.view);
	Game.preload();
};

Game.preload = function(){

	PIXI.loader
		.add("assets/graphics/tiles.png")
		.add("assets/graphics/wall.png")
		.add("assets/graphics/tree.png")
		.add("assets/graphics/king.png")
		.add("assets/graphics/hunter.png")
		.add("assets/graphics/farmer.png")
		.add("assets/graphics/coin.png")
		.add("assets/graphics/citizen.png")
		.add("assets/graphics/bunny.png")
		.add("assets/graphics/beggar.png")
		.add("assets/graphics/shop.png")
		.add("assets/graphics/troll.png")
		.add("assets/graphics/trollbig.png")
		.add("assets/graphics/farmland.png")
		.add("assets/graphics/castle.png")
		.load(Game.create);
}

Game.create = function(){
	
        presetMaterial("grass","assets/graphics/tiles.png", new Vector(32), new Vector(8, 0));
        presetMaterial("stone","assets/graphics/tiles.png", new Vector(32), new Vector(12, 0));

	//Create the `tileset` sprite from the texture
	 //var texture = PIXI.utils.TextureCache["assets/graphics/tiles.png"];

	 //Create a rectangle object that defines the position and
	 //size of the sub-image you want to extract from the texture

	 //Tell the texture to use that rectangular section
	 //texture.frame = new PIXI.Rectangle(256, 0, 32, 32);

	 //Create the sprite from the texture
	var grass = new PIXI.Sprite(Materials["grass"]);
	
	 //Position the rocket sprite on the canvas
	 grass.x = 64;
	 grass.y = 400;
         var stone = new PIXI.Sprite(Materials["stone"]);

	 stone.x = 128;
	 stone.y = 400;

	//Add the rocket to the stage
	Game.stage.addChild(grass);
	Game.stage.addChild(stone);


	//Game.stage.addChild( Game.mapContainer);




	Game.update();

}


Game.update = function(){
	
	Game.renderer.render(Game.stage);
}

Game.init();




