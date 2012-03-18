define(function(require, exports, module) {

var Diagram = function(ctx, canvas, type) {
	this.ctx = ctx;
	this.canvas = canvas;
	this.type = type;
    this.blocks = [];
    this.connections = [];
    this.initListeners();
};

(function() {

    this.initListeners = function() {
        var _self = this;
        var canvas = this.canvas;
        canvas.onmouseup = function(e){
            x2 = e.clientX;
            y2 = e.clientY;
            /*
            var w = Math.abs(x2 - x1);
            var h = Math.abs(y2 - y1);
            if (shapeType == 'clazz') {
              if( w > 20 && h> 20) {
                var c = new Clazz ({
                    name: n,
                    attributes:[],
                    methods:[],
                    x: Math.min(x1,x2),
                    y: Math.min(y1,y2),
                    width: w,
                    height: h
                  });
                  diag.addBlock(c);
                    
                    var n=prompt("Class name","NewClass");
                  if (n == null) {
                   n = "" ;
                  }
                    c.setName(n);
                }
            }
            x1 = -1 ;
            */
        };

        canvas.onmousemove = function(e) {
            /*
            if (x1 != -1) {
                x2 = e.clientX;
                y2 = e.clientY;
                var w = Math.abs(x2 - x1);
                var h = Math.abs(y2 - y1);
                if( w > 20 && h> 20) {
                    diag.shape.x = Math.min(x1,x2);
                    diag.shape.y = Math.min(y1,y2);
                    diag.shape.setWidth(w);
                    diag.shape.setHeight(h);
                } else {
                  diag.shape.setWidth(0);
                }
            }
            diag.render();
            */
        };

        canvas.oncontextmenu = function(e) {
            var c = diag.getBlock(e.clientX , e.clientY) ;
            if (c != null) {
               e.preventDefault();
               alert("right click");
            }
        };
    }

    this.addBlock = function(block) {
    	this.blocks.push(block);
    };

    this.getBlock = function(x, y) {
        for (var i = 0, n = this.blocks.length; i < n; i++) {
            var block = this.blocks[i];
            if (x >= block.x && x <= block.x + block.width &&
                y >= block.y && y <= block.y + block.height) {
                return block;
            }
        }
        return null;
    };

    this.addConnection = function(connection) {
    	this.connections.push(connection);
    	connection.b1.addConnection(connection);
    	connection.b2.addConnection(connection);
    };

    this.getObject = function(x, y) {
        var o = this.getBlock(x, y);
        if (o != null)
            return {type: "block", object: o};
        o = this.getConnection(x, y);
        if (o != null)
            return {type: "connection", object: o};
        return null;
    };

    // TODO implement
    this.getConnection = function (x, y) {
        for (var i = 0, n = this.connection.length; i < n; i++) {
            var connection = this.blocks[i];
            return null;
        }
        return null;
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