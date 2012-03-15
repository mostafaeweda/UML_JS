define(function(require, exports, module) {

var Block = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.connections = [];
};

(function() {

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
    };

}).call(Block.prototype);

module.exports = Block;

});