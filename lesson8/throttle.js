function throttle(func, { num }) {
    let timer;
    return function (...args) {
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            func.apply(this, args)
            timer = null;
        }, num)
    }
}

const func = () => {
    console.log(this)
}

const throttleFunc = throttle(func, { num: 2000 })

setInterval(() => {
    throttleFunc()
}, 10);




