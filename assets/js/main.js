function Vector(x, y = x) {
    this.x = x;
    this.y = y;
}

function Trunk(pos) {
    this.over = "";
    this.environment = "";
    this.overSprite = undefined;
    this.envSprite = undefined;
    this.position = pos;

    
}


// ---------------------------------------------------------------

var Game = Game || {};
Game.width = 1440;
Game.height = 780;

var Materials = {};
var level = [];
var groundLevel = 500;






function presetMaterial(key, cacheKey, tileSize, index) {
    //Create the `tileset` sprite from the texture
    Materials[key] = new PIXI.Texture(PIXI.BaseTexture.fromImage(cacheKey));
    //Create a rectangle object that defines the position and tell the texture to use that rectangular section
    Materials[key].frame = new PIXI.Rectangle(tileSize.x * index.x, tileSize.y * index.y, tileSize.x, tileSize.y);
}



Game.init = function () {

    Game.stage = new PIXI.Container();
    // Game.stage.scale.x = 
    Game.stage.scale.y = 1;
    Game.stage.scale.x = 1;
    Game.renderer = PIXI.autoDetectRenderer(Game.width, Game.height);
    document.body.appendChild(Game.renderer.view);
    
    Trunk.prototype.setEnv = function (environment)
    {
        this.envSprite = new PIXI.Sprite(Materials[environment]);
        this.envSprite.x = this.position*32;
        this.envSprite.y = groundLevel;
        Game.stage.addChild(this.envSprite);
        this.environment = environment;
    };

    Trunk.prototype.setOver = function (over, spriteHeight)
    {
    	this.envSprite = new PIXI.Sprite(Materials[over]);
        this.envSprite.x = this.position*32;
        this.envSprite.y = groundLevel - spriteHeight;
        Game.stage.addChild(this.envSprite);
        this.over = over;
    };
    
    Game.preload();
};

Game.preload = function () {

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

Game.create = function () {

    presetMaterial("grass", "assets/graphics/tiles.png", new Vector(32), new Vector(8, 0));
    presetMaterial("stone", "assets/graphics/tiles.png", new Vector(32), new Vector(12, 0));
    presetMaterial("pontoon", "assets/graphics/tiles.png", new Vector(32), new Vector(5, 0));
    presetMaterial("castle", "assets/graphics/castle.png", new Vector(128, 96), new Vector(14, 0));
    presetMaterial("king", "assets/graphics/king.png", new Vector(700, 64), new Vector(0, 0));

    console.log(Materials);
    // on crée le tableau et on le rempli de Trunk vides
    level = new Array(90);
    for (var i = 0; i < level.length; i++)
    {
        level[i] = new Trunk(i);
    }

    function levelEdit(start, end, env)
    {
        for (var i = start; i < end; i++)
        {
            level[i].setEnv(env);
            console.log("position", start);
        }
    }

    // création ponton
    let start = 0, end = level.length, random = Math.random() * 2, posCastle = 0;

    if (Math.floor(random)) // 2 pontons
    {
        levelEdit(0, 8, "pontoon");
        start += 8;
        levelEdit(end - 8, end, "pontoon");
        end -= 8;
    } else if (random > 0.5) // 1 ponton à droite
    {
        levelEdit(end - 8, end, "pontoon");
        end -= 8;
    } else if (random <= 0.5) // 1 ponton à gauche
    {
        levelEdit(0, 8, "pontoon");
        start += 8;
    } else
    
    
    
    console.log(end);
    // copie des index du level
    let indexes = new Array(end - start);
    for (let i = 0; i < indexes.length; i++)
    {
        indexes[i] = start + i;
    }


    //levelEdit(start, end, new Trunk("meadow"));


    console.log("level : ", level);
    console.log(indexes);
    console.log(indexes.length);

    posCastle = indexes.length/2;
    console.log("posCastle : ", posCastle);
    levelEdit(start, end, "grass");
    level[posCastle].setOver("castle", 96);
    level[10].setOver("king", 61);



    Game.update();

}


Game.update = function () {

    Game.renderer.render(Game.stage);


}

Game.init();




