define(function(require, exports, module) {

var Diagram = function(ctx, canvas, type) {
	this.ctx = ctx;
	this.canvas = canvas;
	this.type = type;
    this.blocks = [];
    this.connections = [];
};

(function() {

    this.addBlock = function(block) {
    	this.blocks.push(block);
    };

    this.addConnection = function(connection) {
    	this.connections.push(connection);
    	connection.b1.addConnection(connection);
    	connection.b2.addConnection(connection);
    };

    this.render = function() {
    	var ctx = this.ctx;
        // Clear the canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // border thickness = 1 pixel
    	ctx.lineWidth = 1;
		// The border is drawn on the outside of the rectangle, so we'll
		// need to move it a bit to the right and up. Also, we'll need
		// to leave a 20 pixels space on the top to draw the interface.
		ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);

        this.connections.forEach(function(connection){
        	connection.render(ctx);
        });
        this.blocks.forEach(function(block){
            block.render(ctx);
        });
    };

}).call(Diagram.prototype);

module.exports = Diagram;

});