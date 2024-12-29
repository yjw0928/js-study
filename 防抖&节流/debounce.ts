// 防抖
function debounce(fn: any, option: { wait: number }) {
    let timer: any;
    return function () {
        if (timer) {
            clearTimeout(timer);
            timer = setTimeout(fn, option.wait);
        } else {
            timer = setTimeout(fn, option.wait);
        }
    };
}

const fn = debounce(
    () => {
        console.log('防抖');
    },
    { wait: 1000 }
);

fn();
fn();
fn();
