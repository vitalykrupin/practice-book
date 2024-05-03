export const promiseRace = <T = any>(promises: Array<Promise<T>>): Promise<T> => {
    return new Promise((res, rej) => {
        promises.forEach((promise: Promise<T>) =>
            promise
                .then(res)
                .catch(rej)
        );
    });
};
