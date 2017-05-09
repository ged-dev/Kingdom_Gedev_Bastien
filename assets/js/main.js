var Game = Game || {};
Game.width = 840;
Game.height = 480;

Game.init = function(){

	Game.stage = new PIXI.Container();
	Game.renderer = PIXI.autoDetectRenderer(Game.width, Game.height);
	// document.body.appendChild(Game.renderer.view);
	// Game.preload();
}

Game.preload = function(){

	PIXI.loader
		.load(Game.create);
}

Game.create = function(){
	

	Game.stage.addChild( Game.mapContainer);


	//Render the stage   
	Game.renderer.render(Game.stage);

	Game.update();

}


Game.update = function(){
	
	Game.renderer.render(Game.stage);
}

Game.init();




