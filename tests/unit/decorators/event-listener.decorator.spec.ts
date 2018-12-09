import {expect} from 'chai';
import 'mocha';
import {EventListener} from "../../../src/decorators/event-listener.decorator";


describe('EventListener Decorator', () => {
	it('should be declared and be accessible from anywhere', () => {
		expect(typeof EventListener).to.equal('function');
	});
});