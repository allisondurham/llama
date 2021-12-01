

// var tempEventListener = document.querySelector("#spitAndPower button.statBox");
// tempEventListener.addEventListener("click", spitByLeftllama);



var moveBtns = document.querySelectorAll("#move button"),
    spitBtn = document.querySelector("#spitAndPower button.statBox"),
    powerInput = document.querySelector("#power p input"),
    powerSlider = document.querySelector("#myRange"),
    angleBtns = document.querySelectorAll("#angle button"),
    angleInput = document.querySelector("#angle input");
    
//MOVE BUTTON EVENT LISTENERS AND FUNCTIONS
moveBtns[0].addEventListener("click",moveLeft);
moveBtns[1].addEventListener("click",moveRight);

var llamaleftMoveCount = 1, llamarightMoveCount = 1;

function moveLeft(){  
    if(llamaleft.turn === true && llamaleftMoveCount<=4)
    {
        if(llamaleft.pos_index >= 40)
        llamaleft.pos_index-=20;
        llamaleftMoveCount++;
    }
    else if(llamaright.turn === true && llamarightMoveCount<=4)
    {
        llamaright.pos_index-=20;
        llamarightMoveCount++;
    }
}

function moveRight(){  
    if(llamaleft.turn === true && llamaleftMoveCount<=4)
    {
        llamaleft.pos_index+=20;
        llamaleftMoveCount++;
    }
    else if(llamaright.turn === true && llamarightMoveCount<=4)
    {
        if(llamaright.pos_index <= canvas.scrollWidth-120)
        llamaright.pos_index+=20;
        llamarightMoveCount++;
    }
}

//ANGLE BUTTONS EVENT LISTENERS AND FUNCTIONS
angleBtns[0].addEventListener("click",angleAdd);
angleBtns[1].addEventListener("click",angleSub);

function angleAdd(){
    if(angleInput.value<90)
        angleInput.value++;
    
    if(llamaleft.turn === true)
        llamaleft.nozzle.alpha = angleInput.value*Math.PI/180;
    else
        llamaright.nozzle.alpha = angleInput.value*Math.PI/180;
}

function angleSub(){
    if(angleInput.value>0)
        angleInput.value--;
    
    if(llamaleft.turn === true)
        llamaleft.nozzle.alpha = angleInput.value*Math.PI/180;
    else
        llamaright.nozzle.alpha = angleInput.value*Math.PI/180;
}

//spit BUTTON EVENT LISTENER
spitBtn.addEventListener("click",spit);

//POWER SLIDER EVENT LISTENERS AND FUNCTIONS
powerInput.addEventListener("input",powerInput_in);
powerSlider.addEventListener("input",powerSlider_in);

function powerSlider_in(){
    powerInput.value = powerSlider.value;
    if(llamaleft.turn === true)
        llamaleft.power = powerInput.value;
    else
        llamaright.power = powerInput.value;
}

function powerInput_in(){
    powerSlider.value = powerInput.value;
    if(llamaleft.turn === true)
        llamaleft.power = powerInput.value;
    else
        llamaright.power = powerInput.value;
}

//THE FUNCTION TO UPDATE POWER AND ANGLE OF llamaS (called in switchTurn function)
function updateAnglePower(whichllama){
    if(whichllama === "left"){
        powerInput.value = llamaleft.power;
        powerSlider.value = llamaleft.power;
        angleInput.value = llamaleft.nozzle.alpha * 180/Math.PI;
    }
    else if(whichllama === "right"){
        powerInput.value = llamaright.power;
        powerSlider.value = llamaright.power;
        angleInput.value = llamaright.nozzle.alpha * 180/Math.PI;
    }
}



//PLAY AGAIN BUTTON EVENT LISTENER
var playAgain = document.querySelector("#winnerBox button");

playAgain.addEventListener("click", function(){
    canvas.style.display = "block";
    stats.style.display = "block";
    winnerBox.style.display = "none";
    body.style.background = "none";
    
    powerInput.value = 50;
    powerSlider.value = 50;
    angleInput.value = 50;
    
    startGame();
});


