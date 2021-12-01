


var leftPlayerScore = document.querySelector("#score1"),
    rightPlayerScore = document.querySelector("#score2");

function updateScores(){
    leftPlayerScore.innerText = llamaleft.score;
    rightPlayerScore.innerText = llamaright.score;
}


var stats = document.querySelector("#stats"),
    winnerBox = document.querySelector("#winnerBox"),
    body = document.querySelector("body");

function winningState(){
    clearInterval();
    canvas.style.display = "none";
    stats.style.display = "none";
    winnerBox.style.display = "block";
    body.style.background = "url(css/images/turf2.png";
    
    if(llamaleft.score > llamaright.score){
        winnerBox.children[0].innerText = "PLAYER 1 WON!";
    }
    else if(llamaright.score > llamaleft.score){
        winnerBox.children[0].innerText = "PLAYER 2 WON!";
    }
    else{
        winnerBox.children[0].innerText = "TIE!";
    }
}