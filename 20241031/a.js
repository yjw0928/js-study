function shortestDistanceAfterQueries(n: number, queries: number[][]): number[] {
    let res = [];
    const routeMap = new Map();
    queries.forEach((item) => {
        const [l, r] = item;
        if (routeMap.has(l)) {
            routeMap.set(l, Math.max(routeMap.get(l), r))
        } else {
            let curentRouteSum = 0;
            let step = 0;
            let keys = [];
            routeMap.forEach((itemr, iteml) => {
                if ((itemr >= l && itemr <= r) || (iteml >= l && iteml <= r) || (iteml >= l && itemr <= r)) {
                    curentRouteSum += itemr - iteml;
                    step += 1;
                    keys.push(iteml)


                }

                if (curentRouteSum <= r - l + step - 1) {
                    keys.forEach(l => {
                        routeMap.delete(l);
                    })
                    routeMap.set(l, r);

                }
            })
            routeMap.set(l, r)
        }

        let count = 0;
        let index = 0;
        while (index < n - 1) {
            if (routeMap.has(index)) {
                index = routeMap.get(index);
            } else {
                index += 1
            }
            count += 1;

        }
        res.push(count);
    })

    return res;
};