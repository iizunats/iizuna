import {expect} from 'chai';
import 'mocha';
import {AjaxHelper} from "./ajax-helper";


describe('AjaxHelper Class', () => {
	it('should be declared and be accessible from anywhere', () => {
		expect(typeof AjaxHelper).to.equal('function');
	});
});