var Game = Game || {};
Game.width = 1040;
Game.height = 680;

var Materials = {};
var level = [];

function Trunk(environment, over = undefined){
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
    //Create the `tileset` sprite from the texture
    Materials[key] = new PIXI.Texture(PIXI.BaseTexture.fromImage(cacheKey));
    //Create a rectangle object that defines the position and tell the texture to use that rectangular section
    Materials[key].frame = new PIXI.Rectangle(tileSize.x * index.x, tileSize.y * index.y, tileSize.x, tileSize.y);
    console.log(Materials);
}

function levelEdit (start, end, trunk)
{
    for (var i = start; i < end; i++) 
    {
        level[i] = trunk;
    }
}

Game.init = function(){

	Game.stage = new PIXI.Container();
        Game.stage.scale.x = Game.stage.scale.y = 2;
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

        level = new Array(300);
        
        let start = 0, end = level.length, random = Math.random() * 2;
        if(Math.floor(random)) // 2 pontons
        {
            levelEdit(4, 12, new Trunk ("pontoon"));
            start += 12;
            levelEdit(end-12, end-4, new Trunk ("pontoon"));
            end -= 12;
        }
        else if(random > 0.5)// 1 ponton à droite
        {
            levelEdit(end-12, end-4, new Trunk ("pontoon"));
            end -= 12;
        }
        else // 1 ponton à gauche
        {
            levelEdit(4, 12, new Trunk ("pontoon"));
            start += 12;
        }
        
        levelEdit(start, end, new Trunk("meadow"));
        
        
        
        console.log(level);
        
       
        
        
        
	 //Create the sprite from the texture
	var grass = new PIXI.Sprite(Materials["grass"]);
	
	 //Position the rocket sprite on the canvas
	 grass.x = 64;
	 grass.y = 200;
         var stone = new PIXI.Sprite(Materials["stone"]);

	 stone.x = 96;
	 stone.y = 200;

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




