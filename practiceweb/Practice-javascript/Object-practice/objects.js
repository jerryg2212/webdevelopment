

var skateboard = {
    deck: 'Almost',
    trucks: 'Thunder',
    wheels: 'Spitfire',
    deckcost: 60,
    truckscost: 30,
    wheelscost: 20,
    totalcost: 110,
    getCost: function() {
        return this.deckcost + this.truckscost + this.wheelscost;
    }

};
elshipping = document.getElementById('shipping');
elshipping.textContent = skateboard.wheels;
// Creating a Object to represent A Tree
    // Creating the Object

function Tree (kind, height, region, price) {
    this.kind = kind;
    this.height = height;
    this.region = region;
    this.price = price;
    this.getPrice = function() {
        return this.price;
    };
}
    // Using a function to create the Tree objects
var sycamore = new Tree ('Sycamore', 75, 'North America', 100);
var apple = new Tree('Apple', 12, 'North America', 200);
var spruce = new Tree('Spruce', 150, 'Tundra', 500);
var wheeping = new Tree('Wheeping Willow', 60, 'World Wide', 1000);
var birch = new Tree('Birch', 40, 'World Wide', 50);
var oak = new Tree( 'Oak', 150, 'World Wide', 20);
var acacia = new Tree('Acacia', 30, 'Africa', 2000);

var ryan = document.getElementById('object');
ryan.textContent = apple.kind;

    // Created arrays with objects inside to represent each of the objects properties
  var typeOfTree = [sycamore, apple, sruce, wheeping, birch, oak, acacia];
var eltypeOfTree = document.getElementById('alltrees');
eltypeOfTree.textContent = typeOfTree[2].height;

kj
var to = 3;
jnkl








// Arrays in Object practice

var hotel = {
    room1: items[250, 200, 220, 300, 250, 200],
    room2: charges[300, 300, 400, 375, 350, 375],
    room3: charges[500, 400, 550, 450, 500],
    penthouse1: charges[1000, 1200, 1100, 1400, 1250],
};