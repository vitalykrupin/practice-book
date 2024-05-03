export const promiseAny = <T = any>(promises: Array<Promise<T>>): Promise<T> => {
	return new Promise<T>((res, rej) => {
    const result: Array<never | T> = [];
  	promises.forEach((promise: Promise<T>, idx: number) => {
    	promise
            .then(res)
            .catch(r => {
                result[idx] = r;
                if(idx === promises.length - 1) rej(result);
            });
        });
    });
};
