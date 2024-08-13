function Person(name, age) {
  this.name = name;
  this.age = age;
}

const p1 = new Person("yang", 30);
console.log(p1.name);
console.log(p1.age);

function customNew(constructor, ...rest) {
  if (typeof constructor !== 'function') {
    throw Error('params must be function')
  }
  const obj = Object.create(constructor.prototype)
  const result = constructor.apply(obj, rest)

  return typeof result === 'object' ? result : obj
}

const p2 = customNew(Person, 'wu', 18)

console.log(p2.name)
console.log(p2.age)

