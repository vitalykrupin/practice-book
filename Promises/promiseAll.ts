export const promiseAll = <T = any>(promises: Array<Promise<T>>): Promise<Array<T>> => {
    return new Promise((res, rej) => {
        const result: Array<never | T> = [];
        let counter: number = 0;
        promises.forEach((promise: Promise<T>, idx: number) =>
            promise
                .then(r => {
                    result[idx] = r;
                    ++counter;
                    if(counter === promises.length) res(result);
                })
                .catch(rej)
        );
    });
};
