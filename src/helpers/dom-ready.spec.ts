import {expect} from 'chai';
import 'mocha';
import {DomReady} from "./dom-ready";


describe('DomReady Object', () => {
	it('should be declared and be accessible from anywhere', () => {
		expect(typeof DomReady).to.equal('object');
	});
});