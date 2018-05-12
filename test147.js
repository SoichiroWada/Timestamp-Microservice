
var obj = { title: 'Hey', message: 'Hello there!' };
var obj2 = { index: obj };
var obj3 = { panel: obj2 };

console.log(obj2.index.title);
console.log(obj2.index.message);

console.log(obj3.panel.index.title);
console.log(obj3.panel.index.message);
