function Animal(type, name, color) {
    this.type = type;
    this.name = name; 
    this.color = color,
    this.skill = ["跑", "跳", "叫"]; // 操作引用类型会直接影响所有的实例
}

Animal.prototype.printType = function() {
    console.log("[Animal type]: ", this.type);
}
module.exports = Animal;
