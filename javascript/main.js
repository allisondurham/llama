


startGame();

function startGame(){
    initialize();
    llamaleft.turn = true;
    generate_terrain_pts();
    draw_terrain();
    generatellamaPoints();
    setInterval(updateFrames, 60);
}

function initialize(){
    points = [];

    llamaleft.pos_index = 0;
    llamaleft.theta = 0;
    llamaleft.score = 0;
    llamaleft.numOfTurns = 0;
    llamaleft.power = 50;
    llamaleft.turn = false;
    llamaleft.nozzle = {x: 0, y: 0, alpha: 50*Math.PI/180};

    llamaright.pos_index = 0;
    llamaright.theta = 0;
    llamaright.score = 0;
    llamaright.numOfTurns = 0;
    llamaright.power = 50;
    llamaright.turn = false;
    llamaright.nozzle = {x: 0, y: 0, alpha: 50*Math.PI/180}
}

function updateFrames(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    draw_terrain();
    goAhead();
}

function goAhead(){
    if(loadedImages == 3)
    {
        draw_llama();
        draw_nozzle();
        spitInfo.drawPath();
    }
}





function switchTurn(){
    var turns = 1;

    if(llamaleft.turn === true){
        updateAnglePower("right");
        llamaleft.numOfTurns++;
        llamaright.turn = true;
        llamaleft.turn = false;
    }
    else if(llamaright.turn === true){
        updateAnglePower("left");
        llamaright.numOfTurns++;
        llamaright.turn = false;
        llamaleft.turn = true;
    }

    updateScores();
        if(llamaleft.numOfTurns===turns && llamaright.numOfTurns===turns)
            winningState();
}