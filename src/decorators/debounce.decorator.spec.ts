import {expect} from 'chai';
import 'mocha';
import {Debounce} from "./debounce.decorator";


describe('Debounce Decorator', () => {
	it('should be declared and be accessible from anywhere', () => {
		expect(typeof Debounce).to.equal('function');
	});

	it('should add a debounce to a function', () => {
		let debounceDecorator = Debounce(400);
		let obj = {
			val: 0,
			__componentClassInitializedListeners: [],
			test: function () {
				this.val = 1;
			}
		}as any;
		debounceDecorator(obj, 'test');
		obj.__componentClassInitializedListeners[0]();
		expect(obj.val).to.equal(0);
		obj.test();
		expect(obj.val).to.equal(0);
		setTimeout(function () {
			expect(obj.val).to.equal(1);
		}, 500);
	});
});