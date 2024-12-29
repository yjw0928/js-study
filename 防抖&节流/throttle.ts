interface IThrottle {
    wait: number; // 间隔实践
    leading?: boolean; // 是否在节流开始前执行函数
}

type noop = (...args: any[]) => any;

function throttle<T extends noop>(fn: T, option: IThrottle) {
    let isRun = false;
    let count = 0;

    return function (...args: Parameters<T>) {
        if (option.leading && count === 0) {
            fn(...args);
            count++;
            return;
        }
        if (isRun) {
            return;
        } else {
            isRun = true;
            setTimeout(() => {
                fn(...args);
                count++;
                isRun = false;
            }, option.wait);
        }
    };
}

const throttleFn = throttle(
    (a: string) => {
        console.log('节流');
    },
    { wait: 1000, leading: true }
);

setInterval(() => {
    throttleFn('a');
}, 10);
