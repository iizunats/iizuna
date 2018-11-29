import {expect} from 'chai';
import 'mocha';
import {Component} from "./component.decorator";


describe('Component Decorator', () => {
	it('should be declared and be accessible from anywhere', () => {
		expect(typeof Component).to.equal('function');
	});
});