
var construct = require("../construct");

// Look at shape.js for defining a class in a separate module (the
// preferred way of doing it
var Shape = require("./shape");

// You can also just define classes by passing the named functions
// inline as arguments 

var Rect = Shape.extend(
    // Named functions are great for debugging
    function Rect(x, y, width, height) {
        // Calling a parent's constructor
        Shape.init(this, x, y);
        this.w = width;
        this.h = height;
    },

    function render() {
        // Calling a parent's method
        Rect.parent.render.call(this);
        console.log("rect rendered " + this.w + " wide " +
                    "and " + this.h + " tall");
    }
);

var ShortRect = Rect.extend(
    function ShortRect(x, y, width) {
        Rect.init(this, x, y, 1, width);
    },

    function move() {
        ShortRect.parent.move.call(this, 20);
    }
);


var Circle = Shape.extend(
    function Circle(x, y, radius) {
        Shape.init(this, y, x);
        this.radius = radius;
    },

    function render() {
        console.log("circle rendered with a radius of " + this.radius);
    }
);

var shape = Shape(10, 10);
var rect = ShortRect(5, 5, 50, 50);
var circle = Circle(15, 15, 30);

shape.render();
circle.render();
rect.render();

console.log("\nMoving rect...");
rect.move();
rect.render();

rect.likesObject(circle);

rect = Rect(5, 5, 10, 10);

console.log("\nShape?", rect.isinstance(Shape)); // -> true
console.log("Rect?", rect.isinstance(Rect)); // -> true
console.log("ShortRect?", rect.isinstance(ShortRect)); // -> false

// `isinstance` is just better syntax for the following:
console.log("Rect?", rect instanceof Rect.creator); // -> true

// Note how the constructor is kept properly in tact, this is
// extremely helpful for debugging (you get back an object literally
// made with your constructor function)
console.log("\nType:", circle.constructor.name); // -> "Circle"
