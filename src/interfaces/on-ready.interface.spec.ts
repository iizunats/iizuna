import {expect} from 'chai';
import 'mocha';
import {OnReady} from "./on-ready.interface";


describe('OnReady Interface', () => {
	it('should be declared and be accessible from anywhere', () => {
		const objt = new class implements OnReady {
			onReady() {
			}
		};
		expect(typeof objt).to.equal('object');
	});
});