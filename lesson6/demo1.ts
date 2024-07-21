Promise.resolve()
    .then(() => {
        // 微任务队列1
        console.log(1);
        return new Promise((resolve, reject) => {
            console.log(5.1);
        }).then(() => console.log(5.2));
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
