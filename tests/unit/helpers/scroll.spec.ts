import {expect} from 'chai';
import 'mocha';
import {smoothScroll} from "../../../src/helpers/scroll";


describe('smoothScroll function', () => {
	it('should be declared and be accessible from anywhere', () => {
		expect(typeof smoothScroll).to.equal('function');
	});
});