# 原型和原型链

\***\*\_**proto\_\_\_\_\*\*: 隐式原型，指针指向对像的原型对象,可以通过
prototype:显示原型对象,函数独有
custructor: 指向当前对象的构造函数，谁创造了自己

![1709651228386](image/note/1709651228386.png)

## 构造函数与原型

在 JavaScript 中，每个函数都有一个名为 `prototype` 的属性，该属性指向一个对象，这个对象就是构造函数的原型对象

## 实例与原型

当使用构造函数创建一个新的对象实例时，新创建的对象会自动获得一个内部属性 `[[Prototype]]` 或可以通过 `__proto__`（在现代 JavaScript 中更推荐使用 `Object.getPrototypeOf()` 方法）访问到的原型引用，它指向构造函数的 `prototype` 属性所指向的对象