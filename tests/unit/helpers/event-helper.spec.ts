import {expect} from 'chai';
import 'mocha';
import {EventHelper} from "../../../src/helpers/event-helper";


describe('EventHelper Class', () => {
	it('should be declared and be accessible from anywhere', () => {
		expect(typeof EventHelper).to.equal('function');
	});
});