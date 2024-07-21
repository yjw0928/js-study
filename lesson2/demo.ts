// 执行顺序 1 2 3 4 5 6 7 2 8 9 10

console.log(1);

const asyncFunc = () => {
    return new Promise((resolve, reject) => {
        console.log(2);
        resolve(true);
    });
};

asyncFunc()
    .then(() => {
        console.log(5);
        setTimeout(() => {
            console.log(10);
        }, 0);
    })
    .then(() => {
        console.log(6);
    });

const asyncFunc2 = () => {
    return new Promise((resolve, reject) => {
        console.log(3);
        setTimeout(() => {
            console.log(7);
            asyncFunc().then(() => {
                console.log(8);
            });
        }, 0);
    });
};

asyncFunc2();

setTimeout(() => {
    console.log(9);
}, 0);

console.log(4);
