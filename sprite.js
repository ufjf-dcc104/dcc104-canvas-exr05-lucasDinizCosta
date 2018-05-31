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

Sprite.prototype.desenharTiro = function (ctx) {
  this.w = 16;
  this.h = 16;
  imageLibrary.draw(ctx, "tank-bullet", this.x, this.y);
}

Sprite.prototype.desenharArmadilha = function (ctx) {
  this.w = 32;
  this.h = 32;

  //imageLibrary.drawClipAngle(ctx, "asteroides", this.sx, this.sy, this.w, this.h, this.x, this.y, this.ang);
  imageLibrary.draw(ctx, "tijolo-laser", this.x, this.y);

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

Sprite.prototype.posicionarTiro = function (jogador, tiroVel) {
  this.w = 16;
  this.h = 16;
  switch (jogador.sentido) {
    case 0:     //Cima
      this.x = jogador.x + jogador.w/2 - 2;
      this.y = jogador.y - 6;
      this.vy = -tiroVel;
      break;
    case 1:   //Direita
      this.x = jogador.x + jogador.w + 6;
      this.y = jogador.y + jogador.h/2;
      this.vx = tiroVel;
      break;
    case 2:   //Baixo
      this.x = jogador.x + jogador.w/2 -2;
      this.y = jogador.y + jogador.h + 6;
      this.vy = tiroVel;
      break;
    case 3:   //Esquerda
      this.x = jogador.x - 6;
      this.y = jogador.y + jogador.h/2 - 2;
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
