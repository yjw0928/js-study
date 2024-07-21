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

// Reflect

const person = { name: '小明', age: 16 };

console.log(Reflect.has(person, 'name')); // true
console.log(Reflect.get(person, 'age')); // 16
