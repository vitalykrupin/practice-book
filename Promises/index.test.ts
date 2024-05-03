import { promiseAny } from "./promiseAny";
import { promiseAll } from "./promiseAll";
import { promiseRace } from "./promiseRace";

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

describe('Promises: promiseAll', () => {
	it('should return array of all resolved promises in right order', async () => {
		const res = await promiseAll([mockResolve(1, 100), mockResolve(2, 50), mockResolve(3, 300)]);
		expect(res).toEqual([1, 2, 3]);
	});
	it('should return the first rejected promise (array with only rejected promises)', async () => {
		await expect(promiseAll([mockReject(1, 100), mockReject(2, 50), mockReject(3, 300)]))
			.rejects.toBe(2);
	});
	it('should return the first rejected promise (array with one rejected promise)', async () => {
		await expect(promiseAll([mockReject(1, 100), mockResolve(2, 50), mockReject(3, 300)]))
			.rejects.toBe(1);
	});
})

describe('Promises: promiseRace', () => {
	it('should return the first resolved promise', async () => {
		const res = await promiseRace([mockResolve(1, 100), mockResolve(2, 50), mockResolve(3, 300)]);
		expect(res).toBe(2);
	});
	it('should return the first rejected promise (array with only rejected promises)', async () => {
		await expect(promiseRace([mockReject(1, 100), mockReject(2, 50), mockReject(3, 300)]))
			.rejects.toBe(2);
	});
	it('should return the first rejected promise (array with one rejected promise)', async () => {
		await expect(promiseRace([mockReject(1, 100), mockResolve(2, 200), mockResolve(3, 300)]))
			.rejects.toBe(1);
	});
	it('should return the first resolved promise (array with one resolved promise)', async () => {
		const res = await promiseRace([mockReject(1, 100), mockResolve(2, 50), mockReject(3, 300)]);
	});
})
