define(function(require, exports, module) {

var ToolBox = function(diagram) {
  var clazzButton = document.getElementById("toolbox_clazz");
  var _self = this;
  clazzButton.onclick = function() {
  	diagram.drawBlock(_self.newBlock('clazz'));
  };
};

(function() {

	this.newBlock = function(typeStr) {
  	var type = require('diagram/' + typeStr);
		return new type({
      name: "NewClass",
      x: 0,
      y: 0,
      width: 90,
      height: 70,
      attributes: [],
      methods: []
 		});
  };

}).call(ToolBox.prototype);

module.exports = ToolBox;

});