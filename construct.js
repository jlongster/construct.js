
function construct() {
    // Use Object as the parent class, inject it as the second
    // parameter
    var args = [arguments[0]];
    args.push(Object);
    args = args.concat(Array.prototype.slice.call(arguments, 1));

    return _construct.apply(null, args);
}

function _construct() {
    var ctor = arguments[0];
    var parent = arguments[1];
    var methods = Array.prototype.slice.call(arguments, 2);

    function Class() {
        // see "examples" in here:
        // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/create
        //
        // this is equivalent to `new ctor()`, but lets
        // us apply arguments
        var o = Object.create(ctor.prototype);

        // Init the object and use the returned value, if
        // there is one
        return ctor.apply(o, arguments) || o;
    };

    Class.extend = function() {
        // Use this class as the parent
        var args = [arguments[0]];
        args.push(ctor);
        args = args.concat(Array.prototype.slice.call(arguments, 1));

        return _construct.apply(null, args);
    };

    Class.init = function(obj) {
        var args = Array.prototype.slice.call(arguments, 1);
        return ctor.apply(obj, args);
    };

    var typename = ctor.prototype.constructor.name;

    ctor.prototype = Object.create(parent.prototype);
    ctor.prototype.constructor = ctor;
    ctor.prototype.isinstance = function(type) {
        if(type.self) {
            // If checking against a class, we can check the type
            // of a class-wide instance var
            return type.self.isPrototypeOf(this);
        }
        else {
            // If checking against the constructor function, we
            // need to compare this instance with the constructor
            return (this instanceof type);
        }
    };
    ctor.prototype.typename = typename;

    // Keep the prototypes around so methods can be accessed without
    // an instance
    Class.creator = ctor;
    Class.self = ctor.prototype;
    Class.parent = parent.prototype;

    for(var i in methods) {
        var name = methods[i].prototype.constructor.name;
        ctor.prototype[name] = methods[i];
    }
    
    return Class;
}

if(typeof module == "object") {
    module.exports = construct;
}
else if(typeof define == "function") {
    define({ construct: construct });
}