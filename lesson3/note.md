# 迭代器和生成器

## 生成器

是 JavaScript 中的一个特殊类型函数，它允许你定义一个包含内部状态的迭代算法，并通过 `yield` 关键字暂停和恢复执行。生成器函数通过 `function*`关键字声明，每次调用其 `.next()`方法时，它会从上次 `yield`表达式处恢复执行，直到遇到下一个 `yield`表达式或函数结束

```typescript
function* generatorFn() {
    yield 1;
    yield 2;
}
const iterator1 = generatorFn();
for (const v of iterator) {
    console.log(`生成器==========>${v}`);
}
```

## 迭代器

一个对象，它提供了访问集合中每个元素的方法。在 JavaScript 中，一个迭代器必须实现 `next()`方法，该方法每次调用时返回一个结果对象，其格式为 `{ value: any, done: boolean }`

```typescript
const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator]();
console.log(`迭代器=========> next()${JSON.stringify(iterator.next())}`);

for (const v of iterator) {
    console.log(`迭代器=======>${v}`);
}
```
