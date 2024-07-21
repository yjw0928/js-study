# 代理（Proxy）

在 JavaScript 中，`Proxy`是 ES6（ECMAScript 2015）引入的一个新特性，它允许你创建一个代理对象（proxy），该对象可以“代理”或“拦截”对另一个目标对象的访问。通过使用 `Proxy`，你可以自定义操作行为，比如读取属性、设置属性、调用方法、进行迭代等，并且可以在这些操作执行前后添加额外的逻辑。

`Proxy`构造函数接收两个参数：

-   `target`: 被代理的目标对象。
-   `handler`: 一个包含陷阱（traps）的方法的对象，这些陷阱是用来定义特定操作时的自定义行为的。

```typescript
const getProxyHandler = (num: number): any => {
    return {
        get: (target: any, p: any): any => {
            if (Reflect.has(target, p)) {
                return target[p];
            }
            if (num > 5) {
                return 6;
            }
            return new Proxy({ a: 1 }, getProxyHandler(num + 1));
        },
        set: (target: any, p: any) => {
            target[p] = 6;
            return true;
        },
    };
};

class Obj {
    name: string;
    constructor() {
        return new Proxy(this, getProxyHandler(1));
    }
}

const obj1 = new Obj() as any;
console.log(obj1.c); //Proxy({a:1})
console.log(obj1.c.c); // Proxy({a:1})

console.log((obj1 as any).c.c.c.c.c.c); // 6;
obj1.d = 8;
console.log(obj1.d); // 6;
```

# 反射（Reflect）

ES6 引入了 `Reflect`对象，提供了与 `Object`对象相对应的一些静态方法，这些方法可以视为是官方对“反射”功能的增强和完善，例如 `Reflect.get()`, `Reflect.set()`, `Reflect.apply()`等，它们可以更精确地控制对象的操作并提供更好的错误处理。他不是一个构造函数不能被实例化
