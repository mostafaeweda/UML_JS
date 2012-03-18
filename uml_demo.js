require(['diagram/diagram',
    'diagram/clazz',
    'diagram/inheritance',
    'diagram/delegation'],
    function (Diagram, Clazz, Inheritance, Delegation) {

createDiagram();

function createDiagram() {
    var canvas = document.createElement('canvas');
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;
    var ctx = canvas.getContext('2d');
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(canvas);
    var diag = new Diagram(ctx, canvas, "uml");
    var c1 = new Clazz({
        name: "ClassA",
        x: 200,
        y: 20,
        width: 90,
        height: 70,
        attributes: [{access: "+", name: "item", type: "String"}],
        methods: [{access: "+", name: "getItem", params:[], ret: "String"}]
    });
    diag.addBlock(c1);
    var c2 = new Clazz({
        name: "SubclassA",
        x: 20,
        y: 200,
        width: 90,
        height: 70,
        attributes: [{access: "-", name: "item", type: "String"}],
        methods: [{access: "-", name: "getToto", params:[], ret: "Integer"}]
    });
    diag.addBlock(c2);
    // diag.addConnection(new Inheritance(c2, c1));
    diag.addConnection(new Delegation(c2, c1));
    diag.render();
    setInterval(function(){
        diag.render();
    }, 300);
    /*setTimeout(function(){
        diag.blocks[0].fitSize(ctx);
    },5000);*/
}

});
