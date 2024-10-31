function debounce(func, { wait }) {
    let timer;

    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            func.apply(this, args)
        }, wait)
    }
}

const func = () => {
    console.log('111111');
}

const debounceFunc = debounce(func, { wait: 4000 });

debounceFunc();
debounceFunc();
debounceFunc();
debounceFunc();
debounceFunc();
debounceFunc();