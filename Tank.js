function Tank() {
  this.x = 100;
  this.y = 100;
  this.w = 20;
  this.h = 30;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.acel = 0;
  this.cor = "grey";
  this.vento = 50;
  this.pontos = 0;
  this.vidas = 3;
  this.energia = 100;
  this.imunidade = 0;
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
    imageLibrary.drawSize(ctx, "player-ship", this.x, this.y, this.w, this.h);
    ctx.restore();
  }
  else{
    imageLibrary.drawSize(ctx, "player-ship", this.x, this.y, this.w, this.h);
  }
}

Tank.prototype.desenharInimigo = function (ctx) {
  ctx.fillStyle = this.cor;
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
  ctx.closePath();
}

Tank.prototype.rotacionar = function (ctx, graus){
  ctx.rotate(graus*Math.PI/180);
}

Tank.prototype.mover = function (dt) {
    this.x = this.x + this.vx*dt;
    this.y = this.y + this.vy*dt;
}

Tank.prototype.moverPlayer = function (dt) {
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
  if(this.y - this.h< y){
    this.y = 0 + this.h;
    this.vy = 0;
  }
  if(this.y > y + h){
    this.y = y + h;
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
