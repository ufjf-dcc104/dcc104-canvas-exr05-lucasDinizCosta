function Sprite() {
  this.x = 100;
  this.y = 100;
  this.w = 20;
  this.h = 15;
  this.vx = 0;
  this.vy = 0;
  this.colorBG = "grey";
  this.colorBorder = "yellow";
  this.borderSize = 1;

  //imagem status
  //console.log("TESTE");
  this.wImagem = 864;
  this.hImagem = 242;
  this.sx = 56;
  this.sy = 28;
  this.ang = 180;
}

Sprite.prototype.desenhar = function (ctx) {
  ctx.fillStyle = this.colorBG;
  ctx.strokeStyle = this.colorBorder;
  ctx.lineWidth = this.borderSize;
  ctx.fillRect(this.x, this.y, this.w, this.h);
  ctx.strokeRect(this.x, this.y, this.w, this.h);
}

Sprite.prototype.desenharInimigo = function (ctx) {
  this.w = 30;
  this.h = 30;
  //imageLibrary.drawSize(ctx, "asteroides", this.x, this.y, this.w, this.h);
  //imageLibrary.drawClipAngle(ctx, "asteroides", this.sx, this.sy, this.w, this.h, this.x, this.y, this.ang);
  imageLibrary.drawClip(ctx, "asteroides", this.sx, this.sy, this.w, this.h, this.x, this.y);

  //console.log("TESTE");
  /*ctx.fillStyle = this.cor;
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.x + this.w/2, this.y + this.h);
  ctx.lineTo(this.x + this.w, this.y);
  ctx.lineTo(this.x, this.y);
  ctx.fill();
  ctx.stroke();
  //ctx.rotate(Math.PI);

  ctx.closePath();*/
}

Sprite.prototype.posicionarTiro = function (player, tiroVel) {
  this.w = 5;
  this.h = 5;
  switch (player.sentido) {
    case 0:     //Cima
      this.x = player.x + player.w/2 - 2;
      this.y = player.y - 6;
      this.vy = -tiroVel;
      break;
    case 1:   //Direita
      this.x = player.x + player.w + 6;
      this.y = player.y + player.h/2;
      this.vx = tiroVel;
      break;
    case 2:   //Baixo
      this.x = player.x + player.w/2 -2;
      this.y = player.y + player.h + 6;
      this.vy = tiroVel;
      break;
    case 3:   //Esquerda
      this.x = player.x - 6;
      this.y = player.y + player.h/2 - 2;
      this.vx = -tiroVel;
      break;
    default:

  }
}

Sprite.prototype.mover = function (dt) {
    this.x = this.x + this.vx*dt;
    this.y = this.y + this.vy*dt;
}

Sprite.prototype.colidiuCom = function (alvo) {
  if(alvo.x+alvo.w < this.x) return false;
  if(alvo.x > this.x+this.w) return false;
  if(alvo.y+alvo.h < this.y) return false;
  if(alvo.y > this.y+this.h) return false;
  return true;
};
