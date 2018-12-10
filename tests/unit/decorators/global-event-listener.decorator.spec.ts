import {expect} from 'chai';
import 'mocha';
import {ComponentFactory} from "../../../src/helpers/component.factory";
import {AbstractComponent} from "../../../src/classes/abstract.component";
import {Component} from "../../../src/decorators/component.decorator";
import {GlobalEventListener} from "../../../src/decorators/global-event-listener.decorator";


describe('GlobalEventListener Decorator', () => {
	it('should be declared and be accessible from anywhere', () => {
		expect(typeof GlobalEventListener).to.equal('function');
	});

	it('should attach an event listener to the document', () => {

		@Component({
			selector: 'test'
		})
		class TextComponentClass extends AbstractComponent {

			@GlobalEventListener('click')
			click() {
				this.referenceValue = true;
			}
		}

		const component = ComponentFactory.createComponentWithElement(
			document.createElement('div'),
			TextComponentClass as any
		);
		component.referenceValue = false;
		document.dispatchEvent(new CustomEvent('click'));

		expect(component.referenceValue).to.equal(true);
	});

	it('should attach multiple event listeners to the element of a component', () => {

		@Component({
			selector: 'test'
		})
		class TextComponentClass extends AbstractComponent {

			@GlobalEventListener('click change hover')
			click() {
				this.referenceValue++;
			}
		}

		const component = ComponentFactory.createComponentWithElement(
			document.createElement('div'),
			TextComponentClass as any
		);
		component.referenceValue = 0;
		document.dispatchEvent(new CustomEvent('click'));
		document.dispatchEvent(new CustomEvent('change'));
		document.dispatchEvent(new CustomEvent('hover'));

		expect(component.referenceValue).to.equal(3);
	});
});