require("../bind/bind.js");

const m = {
    x: 42,
    getX: function(a, b) {
        console.log(a, b, this.x); // 1, 2, 42
        return this.x; 
    }
}

let G = m.getX._bind_(m); 
let g = G(1, 2); //  1 2 42
console.log(g); // 42
console.log(g instanceof m.getX); // false
console.log(g instanceof G); // false
console.log(g === m); // false
console.log("instance"); 
let gIntance = new G(1, 2); // 1 2 undefined
console.log(gIntance === m);  // false
console.log(gIntance instanceof m.getX); // true
console.log(gIntance instanceof G); // true

// this => chThis 传进来的this

// this => Object.create(G.prototype)