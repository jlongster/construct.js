
var construct = require("../construct");

// This is the preferred structure of defining classes. Just list
// normal functions and tie them together into a class at the end.

function Shape(x, y) {
    this.x = x;
    this.y = y;
}

function move(dx) {
    this.x += dx || 5;
}

function render() {
    var x = this.x;
    var y = this.y;
    console.log("shape rendered at " + x + "," + y);
}

function likesObject(obj) {
    // isinstance works with just the constructor too, so you don't
    // have to worry about referencing the real class yet
    if(obj.isinstance(Shape)) {
        console.log("\nI like it!");
    }
}

// Constructor always is the first argument
module.exports = construct(Shape, move, render, likesObject);