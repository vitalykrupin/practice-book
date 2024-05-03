import { promiseAny } from "./promiseAny";

const mockResolve = (id: number, ms: number) =>
	new Promise(res => setTimeout(res, ms, id));
  
const mockReject = (id: number, ms: number) =>
	new Promise((_, rej) => setTimeout(rej, ms, id));

describe('Promises: promiseAny', () => {
	it('should return the first resolved promise (array with only resolved promises)', async () => {
		const res = await promiseAny([mockResolve(1, 100), mockResolve(2, 50), mockResolve(3, 300)]);
		expect(res).toBe(2);
	});
	it('should return the first resolved promise (array with rejected promises)', async () => {
		const res = await promiseAny([mockResolve(1, 100), mockReject(2, 50), mockResolve(3, 300)]);
		expect(res).toBe(1);
	});
	it('should return array of all rejected promises in right order', async () => {
		await expect(promiseAny([mockReject(1, 100), mockReject(2, 50), mockReject(3, 300)]))
			.rejects.toEqual([1, 2, 3]);
	});
});
