var spitInfo = {
    is_on: false,
    path: [],
    pathIterator: 0,
    explosion: {
        gridX: 0,
        gridY: 0,
        bomb: new Image()
    },

    drawPath(){
        if(this.is_on === true && this.pathIterator<this.path.length){
            ctx.beginPath();
            ctx.arc(this.path[this.pathIterator].x, this.path[this.pathIterator].y, 5, 0, 2*Math.PI);
            ctx.fillStyle = 'rgba(182, 255, 255, 255)';
            ctx.fill();
            this.pathIterator++;
        }
        else if(this.is_on === true && this.pathIterator>=this.path.length && this.explosion.gridY<=80*4){
            if(this.explosion.gridX>80*4)
            { this.explosion.gridX = 0; this.explosion.gridY += 80; }
            var xPos = this.path[this.path.length-1].x - 40;
            var yPos = this.path[this.path.length-1].y - 40;
            
            ctx.drawImage(this.explosion.bomb, this.explosion.gridX, this.explosion.gridY, 80,80,xPos,yPos,80,80);
            
            this.explosion.gridX += 80;
        }
        else if(this.is_on === true && this.pathIterator>=this.path.length){
            this.explosion.gridX = 0;
            this.explosion.gridY = 0;
            this.is_on = false;
            this.pathIterator = 0;
            this.path = [];
            switchTurn();
        }
    }
};

spitInfo.explosion.bomb.onload = function(){ loadedImages++; goAhead(); }
spitInfo.explosion.bomb.src = 'css/images/sp11_sprite.png';

function spit(){
    if(llamaleft.turn === true)
        spitByLeftllama();
    else if(llamaright.turn === true)
        spitByRightllama();
}

function spitByLeftllama(){
    var beta = llamaleft.theta + llamaleft.nozzle.alpha,
        initVel = llamaleft.power,
        acceleration = 8;
    
    for(var x=0; x<=canvas.width; x+=20)
    {
        var newx = 0,newy = 0;
        var y = x*Math.tan(beta) - (((0.5)*acceleration*x*x)/(Math.pow(initVel*Math.cos(beta),2)));
    
        var llamax_i = points[llamaright.pos_index].x,
        llamax_f = llamax_i + llamaWidth*Math.cos(llamaright.theta);
    
        newx = llamaleft.nozzle.x + x;
        newy = llamaleft.nozzle.y - y;
    
        if(newx>=canvas.width || newy>=points[Math.floor(newx)].y || collisionDetection(newx, newy, llamax_i, llamax_f)){
        spitInfo.is_on = true;
        return;
    }

    spitInfo.path.push({x: newx, y: newy});
    }
}

function spitByRightllama(){
    var beta = -llamaright.theta + llamaright.nozzle.alpha,
        initVel = llamaright.power,
        acceleration = 8;
    
    for(var x=0; x<=canvas.width; x+=20)
    {
        var newx = 0,newy = 0;
        var y = x*Math.tan(beta) - (((0.5)*acceleration*x*x)/(Math.pow(initVel*Math.cos(beta),2)));
    
        var llamax_i = points[llamaleft.pos_index].x,
        llamax_f = llamax_i + llamaWidth*Math.cos(llamaleft.theta);
    
        newx = llamaright.nozzle.x - x;
        newy = llamaright.nozzle.y - y;
    
        if(newx>=canvas.width || newy>=points[Math.floor(newx)].y || collisionDetection(newx, newy, llamax_i, llamax_f)){
        spitInfo.is_on = true;
        return;
        }

    spitInfo.path.push({x: newx, y: newy});
    }
}

function collisionDetection(newx, newy, llamax_i, llamax_f){
    if(newx>=llamax_i && newx<=llamax_f){
        if(newy>=points[Math.floor(newx)].y - 45)
        {
        if(llamax_i<canvas.width/2)
            llamaright.score += 1;
        else
            llamaleft.score += 1;
        return true;
        }
    }
}