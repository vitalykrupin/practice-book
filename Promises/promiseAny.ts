export const promiseAny = <T = any>(promises: Array<Promise<T>>): Promise<T> => {
    return new Promise<T>((res, rej) => {
        const result: Array<never | T> = [];
        let counter: number = 0;
        promises.forEach((promise: Promise<T>, idx: number) =>
            promise
                .then(res)
                .catch(r => {
                    result[idx] = r;
                    ++counter;
                    if(counter === promises.length) rej(result);
                })
        );
    });
};
