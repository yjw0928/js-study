# Promise

## promise 的三种状态

1. **Pending（待定）** ：初始状态，既不是 fulfilled（已成功）也不是 rejected（已失败）。
2. **Fulfilled（已成功）** ：操作成功完成，此时 Promise 有一个不可变的值。
3. **Rejected（已失败）** ：操作失败，此时 Promise 有一个不可变的原因。

## 静态方法

### Promise.resolve()

返回一个 fulfilled 状态的对象，以给定的值兑现，如果给定的值是一个 promise 对象则采用给定的 promise 的状态

### Promise.reject()

以给定的原因拒绝

### Promise.all()

接收一个 Promise 对象的数组，所有的 Promise 被兑现时兑现，兑现值是所有 Promise 兑现值的一个数组，如果有一个被拒绝，返回的 promise 也拒绝，返回第一个拒绝的原因

### Promise.allSettled()

当所有给定的的 promise 被敲定时兑现，返回单个 promise，兑现值是所有 promise 的结果的数组

```typescript
Promise.allSettled([Promise.resolve(1),Promise.reject(2)]).then(v => console.log(v))
v =========> [
    {
        "status": "fulfilled",
        "value": 1
    },
    {
        "status": "rejected",
        "reason": 2
    }
]

```

### Promise.any()

当给定的 promise 数组有一个被兑现时兑现,值为第一个兑现的值，如果所有输入的 Promise 都被拒绝（包括传入的可迭代对象为空时），返回的 Promise 将以带有一个包含拒绝原因的数组的 AggregateError 拒绝

```typescript
Promise.any([])
Promise {<rejected>: AggregateError: All promises were rejected}
[[Prototype]]: Promise
[[PromiseState]]: "rejected"
[[PromiseResult]]: AggregateError: All promises were rejected
errors: []
message: "All promises were rejected"
stack: "AggregateError: All promises were rejected"
[[Prototype]]: Error


Promise.any([Promise.reject(1),Promise.reject(2)])
Promise {<rejected>: AggregateError: All promises were rejected}
[[Prototype]]: Promise
[[PromiseState]]: "rejected"
[[PromiseResult]]: AggregateError: All promises were rejected
errors: [1,2] //拒绝的原因
message: "All promises were rejected"
stack: "AggregateError: All promises were rejected"
[[Prototype]]: Error
```

### Promise.race()

接受一个 Promise 可迭代对象作为输入，并返回单个 `Promise`。返回的 Promise 与第一个敲定的 Promise 的最终状态保持一致。

## Demo

### 你知道他的执行顺序吗？

```typescript
Promise.resolve()
    .then(() => {
        // 微任务队列1
        console.log(1);
        return Promise.resolve();
        // 微任务队列3 微任务1执行完之后then函数返回的是Promise会合并成 Promise.resolve().then(() => {} //点then的执行函数)
        // 微任务队列5 微任务3执行完之后会把() => {} 推入微任务队列
    })
    .then(() => {
        // 微任务队列7
        console.log(5);
    });

Promise.resolve()
    .then(() => {
        // 微任务队列2
        console.log(2);
    })
    .then(() => {
        // 微任务队列4
        console.log(3);
    })
    .then(() => {
        // 微任务队列6
        console.log(4);
    })
    .then(() => {
        // 微任务队列8
        console.log(6);
    });
```

### 消除异步的传染性

1. 执行 run 函数，这个时候异步的 request 会被修改为同步函数,触发 exec 函数的执行
2. 执行传入的 func3， 执行 func2 ， func2 执行 request 的时候，这个时候 request 已经被替换成了一个同步函数
3. request 执行的时候，会先到缓存里面看看有没有结果，就直接返回，没有的话就会抛出一个错误，错误的类型是原始的 request 的调用，同时函数的执行被终止
4. exec 捕获到 request 抛出的错误，判断错误是一个 Promise 实例的话，就将 exec 设置为 Promise.then 的回调 这个时候 Promise 就是真实的请求
5. 真实的请求 Promise 执行完之后，这个时候 exec 会被推入到微任务队列
6. 再次执行 exec， 执行 func3， 执行 func2， 执行修改后的 request， 这个时候缓存中已经有值，直接返回
7. 主要利用了 throw 抛出错误来终止函数的执行

```javascript
function request() {
    console.log('func1');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('模拟请求');
        }, 3000);
    });
}

function func2() {
    console.log('func2');
    return request();
}

function func3() {
    console.log('func3');
    const res = func2();
    console.log('res==========>', res);
}

function run(func) {
    let i = 0;
    const cacheDatas = [];
    const originRequest = request;

    request = () => {
        if (cacheDatas[i]) {
            const cacheData = cacheDatas[i];
            i++;
            if (cacheData.status === 'fulfilled') {
                request = originRequest;
                return cacheData.data;
            }

            if (cacheData.status === 'rejected') {
                request = originRequest;
                return cacheData.err;
            }
        } else {
            const result = {
                status: 'pending',
                err: null,
                data: null,
            };
            cacheDatas[i] = result;
            throw originRequest()
                .then((res) => {
                    result.status = 'fulfilled';
                    result.data = res;
                })
                .catch((err) => {
                    result.status = 'rejected';
                    result.err = err;
                });
        }
    };

    const exec = () => {
        try {
            i = 0;
            func();
        } catch (error) {
            if (error instanceof Promise) {
                error.then(exec, exec);
            } else {
                throw error;
            }
        }
    };
    exec();
}

run(func3);
```
