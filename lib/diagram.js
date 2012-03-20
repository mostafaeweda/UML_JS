define(function(require, exports, module) {

var IDLE = 0;
var DRAW = 1;
var MOVE = 2;

var block = 3;
var connection = 4;

var clazz = 5;
var interfaze = 6;
var inheritance = 7;
var delegation = 8;

var action = IDLE;
var x1 = -1, y1 = -1, x2 = -1, y2 = -1;
var shiftKey = false;
var isMoving = false;

var Diagram = function(ctx, canvas, type) {
  this.ctx = ctx;
  this.canvas = canvas;
  this.type = type;
  this.blocks = [];
  this.connections = [];
  this.tempShape = null;
  this.tempConnection = null;
  this.tempShape2 = null;
  this.selectedShapes = [];
  this.$initListeners();
};

(function() {

  this.$initListeners = function() {
    var _self = this;
    this.canvas.onmousedown = function(e){
      x1 = e.clientX;
      y1 = e.clientY;
      if(action == DRAW) {
        
      } else {
        _self.tempShape2 = _self.getBlock(x1,y1);
        _self.tempShape2 && _self.tempShape2.isSelected && ( _self.tempShape2 = null);
        action = MOVE;
      }
    };

    this.canvas.onclick = function(e) {

    };

    this.canvas.onmouseup = function(e){
      if(action == DRAW) {
        _self.addBlock(_self.tempShape);
        _self.tempShape = null;
      } else if(action == MOVE && !isMoving) {
        var s = _self.getBlock(e.clientX, e.clientY);
        if ( s == null ) {
          _self.deselectAll();
        } else {
          if(shiftKey) {
            if(s.isSelected) {
              var idx = _self.selectedShapes.indexOf(s);
              idx != -1 && _self.selectedShapes.splice(idx, 1);
            } else {
              _self.selectedShapes.push(s);
            }
            s.isSelected = !s.isSelected;
          } else {
            _self.deselectAll();
            _self.selectedShapes.push(s);
            s.isSelected = true;
          }
        }
      }  
      action = IDLE;
      isMoving = false;
      _self.tempShape2 = null;
      _self.render();
    };

    this.canvas.onmousemove = function(e) {
      if( action == DRAW ) {
        _self.tempShape.x = e.clientX - 9;
        _self.tempShape.y = e.clientY - 32;  
        _self.render();
      }else if(action == MOVE){
        x2 = e.clientX;
        y2 = e.clientY;
        diffX = x1 - x2;
        diffY = y1 - y2;
        x1 = x2;
        y1 = y2;
        var l = _self.selectedShapes.length;
        for ( var i = 0; i < l; i++) {
          _self.selectedShapes[i].x -= diffX;
          _self.selectedShapes[i].y -= diffY;
          isMoving = true;
        }
        _self.tempShape2 && (_self.tempShape2.x -= diffX) ;
        _self.tempShape2 && (_self.tempShape2.y -= diffY) ;
        _self.render() ;
      }
    };

    window.onkeydown = function(e) {
      if(e.shiftKey == 1){
        shiftKey = true;
      }
      _self.checkArrowKeys(e.keyCode);
    };

    window.onkeyup = function(e) {
      if(e.shiftKey == 0){
        shiftKey = false;
      }
    };
  };

  this.addBlock = function(block) {
    this.blocks.push(block);
  };

	this.addConnection = function(connection) {
	  this  .connections.push(connection);
	  connection.b1.addConnection(connection);
	  connection.b2.addConnection(connection);
	};

  this.getBlock = function (x, y) {
    x -= 8 ;
    y -= 33;
    var l = this.blocks.length;
    for (var i = 0; i < l; i++) {
      block = this.blocks[i];
      if ( x >= block.x && x <= block.x + block.width
        && y >= block.y && y <= block.y + block.height) {
        return block;
      }
    }
    return null;
  };

  this.deselectAll = function() {
    var l = this.selectedShapes.length;
    for ( var i = 0; i < l; i++) {
      this.selectedShapes[i].isSelected = false;
    }
    this.selectedShapes = [];
  };

  this.checkArrowKeys = function (keyCode) {
    var diffX = 0, diffY = 0;
    switch(keyCode) {
      case 38:
        diffY = -5; //up
        break;
      case 40:
        diffY = 5; // Down
        break;
      case 37:
        diffX = -5; // Left
        break;
      case 39:
        diffX = 5; // Right
        break;
      default:
        return;
    }
    for (var i = 0, n = this.selectedShapes.length; i < n; i++) {
      this.selectedShapes[i].x += diffX;
      this.selectedShapes[i].y += diffY;
      isMoving = true;
    }
  };

  this.drawBlock = function (blk) {
    this.tempShape = blk;
    action = DRAW;
  };

  this.render = function() {
    var ctx = this.ctx;
    // ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(0 , 0);
    ctx.lineTo(this.canvas.width, 0);
    ctx.lineTo(this.canvas.width, this.canvas.height);
    ctx.lineTo(0, this.canvas.height);
    ctx.lineTo(0 , 0);
    ctx.closePath();
    ctx.fill();

    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);

    this.connections.forEach(function(connection){
      connection.render(ctx);
    });

    this.blocks.forEach(function(block){
        block.render(ctx);
    });

    this.tempShape && this.tempShape.render(ctx);
  };

}).call(Diagram.prototype);

module.exports = Diagram;

});

