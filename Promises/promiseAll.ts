export const promiseAll = <T = any>(promises: Array<Promise<T>>): Promise<Array<T>> => {
    return new Promise((res, rej) => {
        const result: Array<never | T> = [];
        promises.forEach((promise: Promise<T>, idx: number) => {
            promise.then(r => {
                result[idx] = r;
                if(idx === promises.length - 1) res(result);
            }).catch(rej);
        })
    });
}
