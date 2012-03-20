
define(function(require, exports, module) {

var Block = function(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
	this.isSelected = false ;
  this.connections = [];
};

var l = 3; // the length of the side of corners when the block is selected

(function() {

	function fillPolygon(ctx, poly) {
		if (ctx != null && poly != null && poly.length > 0){
			ctx.fillStyle = "black";
			ctx.beginPath();
			ctx.moveTo(poly[0].x ,poly[0].y);
			for(var i = 1; i < poly.length; i++){
				ctx.lineTo(poly[i].x ,poly[i].y);
			}
			ctx.lineTo(poly[0].x ,poly[0].y);
			ctx.closePath();
			ctx.fill();
		}
	}

  this.addConnection = function(block) {
  	this.connections.push(block);
  };

	this.render = function(ctx) {
    // rectangle border
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = 'yellow';
    ctx.fillRect(this.x, this.y, this.width, this.height);

		if (this.isSelected) {
			fillPolygon( ctx, [{x: this.x ,y: this.y}, {x: this.x + l ,y: this.y}, {x: this.x + l ,y: this.y + l}, {x: this.x ,y: this.y + l}]);
			fillPolygon( ctx, [{x: this.x + this.width - l ,y: this.y}, {x: this.x + this.width ,y: this.y},
												{x: this.x + this.width ,y: this.y + l}, {x: this.x + this.width - l ,y: this.y + l}]);
			fillPolygon( ctx, [{x: this.x + this.width - l ,y: this.y + this.height - l}, {x: this.x + this.width ,y: this.y + this.height - l},
												{x: this.x + this.width ,y: this.y + this.height}, {x: this.x + this.width - l ,y: this.y + this.height}]);
			fillPolygon( ctx, [{x: this.x ,y: this.y + this.height - l}, {x: this.x + l ,y: this.y + this.height - l},
												{x: this.x + l ,y: this.y + this.height}, {x: this.x ,y: this.y + this.height}]);
		}
  };

}).call(Block.prototype);

module.exports = Block;

});