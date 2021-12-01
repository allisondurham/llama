var llamaleft = new llamainfo();
var llamaright = new llamainfo();

var llamaHeight = 65, llamaWidth = 50;

var loadedImages = 0;
loadllamas();

function loadllamas(){
    llamaleft.image.src = 'css/images/p1_llama.png';
    llamaright.image.src = 'css/images/p2_llama.png';

    llamaleft.image.onload = function(){ loadedImages++; goAhead(); }
    llamaright.image.onload = function(){ loadedImages++; goAhead(); }
}

function llamainfo(){
    this.image = new Image();
    this.pos_index = 0;
    this.theta = 0;
    this.score = 0;
    this.numOfTurns = 0;
    this.power = 50;
    this.turn = false;
    this.nozzle = {x: 0, y: 0, alpha: 50*Math.PI/180};
}

function generatellamaPoints(){
    llamaleft.pos_index = Math.floor(Math.random()*canvas.scrollWidth/3)+10;
    llamaright.pos_index = Math.floor((Math.random()*canvas.scrollWidth/3) + 2*canvas.scrollWidth/3)-85;
}

function draw_llama(){
    var index, x1, y1, x2, y2, slope;
    
    //draw the left llama
    index = llamaleft.pos_index;

    x1 = points[index].x;
    y1 = canvas.scrollHeight - points[index].y;

    x2 = points[index+llamaWidth].x;
    y2 = canvas.scrollHeight - points[index+llamaWidth].y;

    slope = (y2-y1)/(x2-x1);

    ctx.save();

    llamaleft.theta=Math.atan(slope);
    
    ctx.translate(x1, canvas.scrollHeight - y1);
    ctx.rotate(-llamaleft.theta);
    ctx.drawImage(llamaleft.image, 0, 0-53, llamaWidth, llamaHeight);

    ctx.restore();

    //draw the right llama
    index = llamaright.pos_index;

    x1 = points[index].x;
    y1 = canvas.scrollHeight - points[index].y;

    x2 = points[index+llamaWidth].x;
    y2 = canvas.scrollHeight - points[index+llamaWidth].y;

    slope = (y2-y1)/(x2-x1);

    ctx.save();

    llamaright.theta=Math.atan(slope);
    
    ctx.translate(x1, canvas.scrollHeight - y1);
    ctx.rotate(-llamaright.theta);
    ctx.drawImage(llamaright.image, 0, 0-53, llamaWidth, llamaHeight);
    
    ctx.restore();
}
    
function draw_nozzle(){
    var nozzleX, nozzleY;
    var theta, alpha, index;

    //draw nozzle for the left llama
    ctx.save();

    index = llamaleft.pos_index;
    theta = llamaleft.theta;
    alpha = llamaleft.nozzle.alpha;

    nozzleX = llamaWidth+2;
    nozzleY = llamaHeight-22;

    ctx.translate(points[index].x,points[index].y);
    ctx.rotate(-theta);
    ctx.translate(nozzleX, -nozzleY);
    ctx.rotate(-alpha);
    ctx.fillStyle = "#556B2F";
    ctx.fillRect(0,0,20,4);

    llamaleft.nozzle.x = points[index].x + ((nozzleX + 40*Math.cos(alpha))*Math.cos(theta) - (nozzleY + 40*Math.sin(alpha))*Math.sin(theta));
    llamaleft.nozzle.y = points[index].y - ((nozzleX + 40*Math.cos(alpha))*Math.sin(theta) + (nozzleY + 40*Math.sin(alpha))*Math.cos(theta));
    
    ctx.restore();

    //draw nozzle for the right llama
    ctx.save();

    index = llamaright.pos_index;
    theta = llamaright.theta;
    alpha = llamaright.nozzle.alpha;

    nozzleX = -4;
    nozzleY = (llamaHeight-22);

    ctx.translate(points[index].x,points[index].y);
    ctx.rotate(-theta);
    ctx.translate(nozzleX, -nozzleY);
    ctx.rotate(alpha);
    ctx.fillStyle = "#556B2F";
    ctx.fillRect(0,0,-20,-4);

    nozzleY += 4;

    llamaright.nozzle.x = points[index].x + ((nozzleX - 40*Math.cos(alpha))*Math.cos(-theta) + (nozzleY + 40*Math.sin(alpha))*Math.sin(-theta));
    llamaright.nozzle.y = points[index].y - (-(nozzleX - 40*Math.cos(alpha))*Math.sin(-theta) + (nozzleY + 40*Math.sin(alpha))*Math.cos(-theta));

    ctx.restore();
}