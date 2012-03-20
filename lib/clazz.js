define(function(require, exports, module) {

var Block = require('diagram/block');
var oop = require('diagram/oop');
// Do inhetritance

var Clazz = function(model) {
  oop.mixin(this, model);
  this.connections = [];
};

oop.inherits(Clazz, Block);

(function() {

  this.fitSize = function(ctx) {
    var width = 0;
    var height = 18;
    this.render(ctx, function(line){
      var dim = ctx.measureText(line);
      width = Math.max(width, dim.width);
      height += 11;
    });
    this.width = width + 6;
    this.height = height;
  };

  this.render = function(ctx, lineProcessor) {
    var _self = this;
    Clazz.super_.render.call(this, ctx);
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';
    ctx.font = '10px sans-serif';

    var x = this.x + 3;
    var y = this.y + 11;
    // class title
    ctx.fillText(this.name, this.x + (this.width - ctx.measureText(this.name).width) / 2, y);
    lineProcessor && lineProcessor(this.name);
    y += 5;
    ctx.strokeRect(this.x, y, this.width, 1);

    this.attributes.forEach(function(attr){
      y += 11;
      var line = attr.access + attr.name + ' : ' + attr.type;
      lineProcessor && lineProcessor(line);
      ctx.fillText(line, x, y);
    });
    y += 5;
    ctx.strokeRect(this.x, y, this.width, 1);
    y += 2;
    this.methods.forEach(function(method){
      y += 11;
      var textArr = [method.access, method.name, '('];
      method.params.forEach(function(param) {
        this.notFirst && textArr.push(',');
        textArr.push(param);
        this.notFirst = true;
      });
      textArr.push(')');
      method.ret && textArr.push(' : ') && textArr.push(method.ret);
      var line = textArr.join('');
      lineProcessor && lineProcessor(line);
      ctx.fillText(line, x, y);
    });
  };

}).call(Clazz.prototype);

module.exports = Clazz;

});