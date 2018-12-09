import {expect} from 'chai';
import 'mocha';
import {ElementAttribute} from "../../../src/decorators/element-attribute.decorator";


describe('ElementAttribute Decorator', () => {
	it('should be declared and be accessible from anywhere', () => {
		expect(typeof ElementAttribute).to.equal('function');
	});
});