import {expect} from 'chai';
import 'mocha';
import {ComponentRegistry} from "../../../src/helpers/component.registry";


describe('ComponentRegistry Class', () => {
	it('should be declared and be accessible from anywhere', () => {
		expect(typeof ComponentRegistry).to.equal('object');
	});
});