// 迭代器
const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator]();
console.log(`迭代器=========> next()${JSON.stringify(iterator.next())}`);

for (const v of iterator) {
    console.log(`迭代器=======>${v}`);
}

// 生成器
function* generatorFn() {
    yield 1;
    yield 2;
}
const iterator1 = generatorFn();
for (const v of iterator) {
    console.log(`生成器==========>${v}`);
}

// 自定义对象的异步生成器
class A {
    constructor() {}
    async *[Symbol.asyncIterator]() {
        let num = 0;
        while (num < 6) {
            yield Promise.resolve(num);
            num++;
        }
    }
}

const aIns = new A();

const asyncIterator = async () => {
    const f = new A();
    for await (const v of f) {
        console.log(`异步生成器==========>${v}`);
    }
};
