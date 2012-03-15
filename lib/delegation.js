define(function(require, exports, module) {

var Connection = require('diagram/connection');
var oop = require('diagram/oop');

var Delegation = function(child, parent) {
    this.b1 = child;
    this.b2 = parent;
};

oop.inherits(Delegation, Connection);

(function() {

    this.render = function(ctx) {
    	var track;
    	Delegation.super_.render.call(this, ctx, function(points){
    		track = points;
    	});
    	// The track started from the parent
    	var first, second, third, forth;

    	if(track[3].y == track[2].y) { // horizontal
    		if (track[3].x > track[2].x) {
    			first = {x: this.b2.x , y: track[3].y};
    			second= {x: first.x - 3 , y: first.y - 3} ;
    			third = {x: first.x - 3 , y: first.y + 3} ;
                forth = {x: first.x - 5 , y: first.y} ;
    		} else {
    			first = {x: this.b2.x + this.b2.width , y: track[3].y};
    			second= {x: first.x + 3 , y: first.y - 3};
    			third = {x: first.x + 3 , y: first.y + 3};
                forth = {x: first.x + 5 , y: first.y};
    		}
    	} else { // vertical
    		if (track[3].y > track[2].y) {
    			first = {x: track[3].x , y: this.b2.y};
    			second= {x: first.x - 3 , y: first.y - 3} ;
    			third = {x: first.x + 3 , y: first.y - 3} ;
                forth = {x: first.x , y: first.y - 6} ;
    		} else {
    			first = {x: track[3].x , y: this.b2.y + this.b2.height};
    			second= {x: first.x - 3 , y: first.y + 3} ;
    			third = {x: first.x + 3 , y: first.y + 3} ;
                forth = {x: first.x , y: first.y + 6} ;
    		}
    	}
    	ctx.moveTo(first.x, first.y);
        ctx.lineTo(second.x, second.y);
        ctx.lineTo(forth.x, forth.y);
        ctx.lineTo(third.x, third.y);
        ctx.lineTo(first.x, first.y);
        ctx.stroke();
    };

}).call(Delegation.prototype);

module.exports = Delegation;

});