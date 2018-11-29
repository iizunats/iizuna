import {expect} from 'chai';
import 'mocha';
import {ComponentInterface} from "./component.interface";


describe('ComponentInterface Interface', () => {
	it('should be declared and be accessible from anywhere', () => {
		const objt = new class implements ComponentInterface {
			element: HTMLElement;
		};
		expect(typeof objt).to.equal('object');
	});
});