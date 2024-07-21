function request() {
    console.log('func1');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`模拟请求 ${Math.round(Math.random()) * 100}`);
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
    console.log("res==========>", res)
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
                return cacheData.err
            }

        } else {
            const result = {
                status: 'pending',
                err: null,
                data: null,
            }
            cacheDatas[i] = result;
            throw originRequest().then((res) => {
                result.status = 'fulfilled';
                result.data = res;
            }).catch((err) => {
                result.status = 'rejected';
                result.err = err;
            })
        }
    }

    const exec = () => {
        try {
            i = 0
            func()
        } catch (error) {
            if (error instanceof Promise) {
                error.then(exec, exec)
            } else {
                throw error
            }
        }
    }
    exec()
}

run(func3)


