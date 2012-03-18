define(function(require, exports, module) {

var Clazz = require('diagram/clazz');

var idle = 0;
var draw = 1;
var move = 2;

var block = 3;
var connection = 4;

var clazz = 5;
var interfaze = 6;
var inheritance = 7;
var delegation = 8;

var tempShape;
var tempConnection;
var selectedShapes = [];
var action = idle;
var x1 = -1, y1 = -1, x2 = -1, y2 = -1;
var shiftKey = false;
var isMoving = false;

/*tempShape = new Clazz({
	        name: "NewClass",
	        x: 0,
	        y: 0,
	        width: 90,
	        height: 70,
	        attributes: [],
	        methods: []
   		});*/

remove = function (array,itm) {
	newArr = [];
	for (var i = 0; i < array.length; i++) {
		if(array[i] != itm){
			newArr.push(array[i]);
		}
	}
	return newArr;
}

newBlock = function (type) {
	if (type == clazz) {
		tempShape = new Clazz({
	        name: "NewClass",
	        x: 0,
	        y: 0,
	        width: 90,
	        height: 70,
	        attributes: [],
	        methods: []
   		});
	}
}

deselectAll = function(){
	var l = selectedShapes.length;
	for ( var i = 0; i < l; i++) {
		selectedShapes[i].isSelected = false;
	}
	selectedShapes = [];
}

checkArrowKeys = function (keyCode) {
	if(keyCode == 37 || keyCode == 38 ||
			keyCode == 39 ||keyCode == 40  ) {

		var diffX = 0 , diffY = 0 ;
		if (keyCode == 38 ) {
        	diffY = -5; //up
        } else if (keyCode === 40) {
        	diffY = 5; // Down
        } else if (keyCode === 37) {
        	diffX = -5; // Left
        } else if (keyCode === 39) {
        	diffX = 05; // Right
        }
        var l = selectedShapes.length;
		for ( var i = 0; i < l; i++) {
			selectedShapes[i].x += diffX;
			selectedShapes[i].y += diffY;
			isMoving = true;
		}
	}
}

var Diagram = function(ctx, canvas, type) {
	this.ctx = ctx;
	this.canvas = canvas;
	this.type = type;
  	this.blocks = [];
  	this.connections = [];
	
	_self = this;
	
	canvas.onmousedown = function(e){
		x1 = e.clientX;
		y1 = e.clientY;
		if(action == draw) {
			
		} else {
			action = move;
		}
	}
	
	canvas.onmouseup = function(e){
	
		if( action == draw ) {
		
		}else if( action == move && !isMoving){
			
			var s = _self.getBlock(e.clientX, e.clientY);

			if ( s == null ) {
				deselectAll();
			} else {
				if(shiftKey) {
					if(s.isSelected) {
						selectedShapes = remove(selectedShapes ,s);
					} else {
						selectedShapes.push(s);
					}
					s.isSelected = !s.isSelected;
				} else {
					deselectAll();
					selectedShapes.push(s);
					s.isSelected = true;	
				}
				
			}
		}
		action = idle;
		isMoving = false;
	}
	canvas.onmousemove = function(e) {
		if( action == draw ) {
			tempShape.x = e.clientX;
			tempShape.y = e.clientY;
		}else if(action == move){
			x2 = e.clientX;
			y2 = e.clientY;
			diffX = x1 - x2;
			diffY = y1 - y2;
			x1 = x2;
			y1 = y2;
			var l = selectedShapes.length;
			for ( var i = 0; i < l; i++) {
				selectedShapes[i].x -= diffX;
				selectedShapes[i].y -= diffY;
				isMoving = true;
			}
		}
	}
	
	window.onkeydown = function(e){
	
		if(e.shiftKey == 1){
			shiftKey = true;
		}
		checkArrowKeys(e.keyCode);
	}
	
	window.onkeyup = function(e){
		if(e.shiftKey == 0){
			shiftKey = false;
		}
		checkArrowKeys(e.keyCode);
	}
	
	
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

	this.getBlock = function (x, y) {
			var l = this.blocks.length;
			for ( var i = 0; i < l; i++) {
				block = this.blocks[i];
				if ( x >= block.x && x <= block.x + block.width &&
					     y >= block.y && y <= block.y + block.height) {
						 return block;
				}
			}
			return null;
		};

    this.render = function() {
		var ctx = this.ctx;
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		ctx.lineWidth = 1;
		ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);

		/*tempShape.render(ctx);*/

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
