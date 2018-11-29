import {expect} from 'chai';
import 'mocha';
import {Debounce} from "./debounce.decorator";


describe('Debounce Decorator', () => {
	it('should be declared and be accessible from anywhere', () => {
		expect(typeof Debounce).to.equal('function');
	});
});