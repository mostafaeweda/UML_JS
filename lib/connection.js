define(function(require, exports, module) {

var Connection = function(b1, b2) {
    this.b1 = b1;
    this.b2 = b2;
};

(function() {

    this.render = function(ctx, trackCallback) {
        var b1 = this.b1, b2 = this.b2;
        var c1 = {x: b1.x + b1.width/2, y: b1.y + b1.height/2};
        var c2 = {x: b2.x + b2.width/2, y: b2.y + b2.height/2};

        var track = [];
        var reverse = false;
        var first, last;
        var xDiff = Math.abs(c1.x - c2.x);
        var yDiff = Math.abs(c1.y - c2.y);
        if (xDiff > yDiff) {
            if (c1.x < c2.x) {
                first = c1;
                last = c2;
            } else {
                reverse = true;
                first = c2;
                last = c1;
            }
            track.push(first);
            track.push({x: first.x + xDiff/2, y: first.y});
            track.push({x: first.x + xDiff/2, y: last.y});
            track.push(last);
        }
        else {
            if (c1.y < c2.y) {
                first = c1;
                last = c2;
            } else {
                reverse = true;
                first = c2;
                last = c1;
            }
            track.push(first);
            track.push({x: first.x, y: first.y + yDiff/2});
            track.push({x: last.x, y: first.y + yDiff/2});
            track.push(last);
        }
        if (reverse)
            track.reverse();
        ctx.moveTo(track[0].x, track[0].y);
        for (var i = 1; i < 4; i++) {
            ctx.lineTo(track[i].x, track[i].y);
        }
        ctx.stroke();
        trackCallback && trackCallback(track);
    };

}).call(Connection.prototype);

module.exports = Connection;

});