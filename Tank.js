function Tank() {
  this.x = 100;
  this.y = 100;
  this.w = 32;
  this.h = 32;
  this.vx = 0;
  this.vy = 0;
  this.acel = 0;
  this.cor = "grey";
  this.vidas = 3;
  this.energia = 100;
  this.imunidade = 0;
  this.tiros = [];                          //tiros presentes na cena
  this.tiro = 0;                            //tempo entre os tiros
  this.sentido = 0;                        //0-> cima, 1-> direita, 2->baixo 3->esquerda
  this.posInicialX = 0;                   //Posição inicial do tanque
  this.posInicialY = 0;
  this.ang = 0;                           //angulo da imagem
}

Tank.prototype.desenhar = function (ctx) {
  if(this.imunidade > 0){
    ctx.fillStyle = 'rgba(255, 255, 0, '+Math.cos(20*Math.PI*this.imunidade)+')';   ///Cores rgb, hsl, #hexadecimal
    ctx.strokeStyle = 'hsla(150, 50%, 100%, 0.3)';
  }
  else{
    ctx.fillStyle = this.cor;
    ctx.strokeStyle = "white";
  }
  ctx.lineWidth = "2";
  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.x + this.w/2, this.y - this.h);
  ctx.lineTo(this.x + this.w, this.y);
  ctx.lineTo(this.x, this.y);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

Tank.prototype.desenharImagem = function (ctx) {
  this.w = 32;
  this.h = 32;
  if(this.imunidade > 0){
    ctx.save();
    ctx.globalAlpha = 0.5;            //Muda a transparência da imagem, mostrando que o personagem está imune temporareamente
    switch (this.sentido) {
      case 0:
        this.ang = 0;
        break;
      case 1:
        this.ang = 90;
        break;
      case 2:
        this.ang = 180;
        break;
      case 3:
        this.ang = -90;
        break;
      default:

    }

    imageLibrary.drawAngle(ctx, "tank", this.x+this.w/2, this.y+this.h/2, this.ang);         //Como a rotação é no meio da imagem então tenho que passar o centro dela

    ctx.restore();
  }
  else{
    switch (this.sentido) {
      case 0:
        this.ang = 0;
        break;
      case 1:
        this.ang = 90;
        break;
      case 2:
        this.ang = 180;
        break;
      case 3:
        this.ang = -90;
        break;
      default:

    }
    /*ctx.fillStyle = "red";
    ctx.fillRect(this.x,this.y,this.w,this.h);*/
    imageLibrary.drawAngle(ctx, "tank", this.x+this.w/2, this.y+this.h/2, this.ang);         //Como a rotação é no meio da imagem então tenho que passar o centro dela
  }
}

Tank.prototype.mover = function (dt) {
    this.x = this.x + this.vx*dt;
    this.y = this.y + this.vy*dt;
}

Tank.prototype.moverPlayer = function (dt) {
    this.y = this.y + this.vy*dt;
    this.x = this.x + this.vx*dt;
    this.imunidade = this.imunidade - 1*dt;
}

Tank.prototype.impoeLimites = function(x, y, w, h){
  if(this.x < x){
    this.x = x;
    this.vx = 0;
  }
  if(this.x + this.w > x + w){
    this.x = x + w - this.w;
    this.vx = 0;
  }
  if(this.y < y){
    this.y = y;
    this.vy = 0;
  }
  if(this.y+this.h > y + h){
    this.y = y + h - this.h;
    this.vy = 0;
  }
};

Tank.prototype.colidiuCom = function (alvo) {
  if(alvo.x + alvo.w < this.x)  return false;
  if(alvo.x > this.x + this.w)  return false;
  if(alvo.y + alvo.h < this.y)  return false;
  if(alvo.y > this.y + this.h)  return false;
  return true;
};
