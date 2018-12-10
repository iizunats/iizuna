import {expect} from 'chai';
import 'mocha';
import {EventListener} from "../../../src/decorators/event-listener.decorator";
import {ComponentFactory} from "../../../src/helpers/component.factory";
import {AbstractComponent} from "../../../src/classes/abstract.component";
import {Component} from "../../../src/decorators/component.decorator";


describe('EventListener Decorator', () => {
	it('should be declared and be accessible from anywhere', () => {
		expect(typeof EventListener).to.equal('function');
	});

	it('should attach an event listener to the element of a component', () => {

		@Component({
			selector: 'test'
		})
		class TextComponentClass extends AbstractComponent {

			@EventListener('click')
			click() {
				this.referenceValue = true;
			}
		}

		const element = document.createElement('div');
		const component = ComponentFactory.createComponentWithElement(element, TextComponentClass as any);
		component.referenceValue = false;
		element.click();

		expect(component.referenceValue).to.equal(true);
	});

	it('should attach an event listener to the child-element of a component', () => {

		@Component({
			selector: 'test',
			childrenSelectors: [
				'child-a'
			]
		})
		class TextComponentClass extends AbstractComponent {

			@EventListener('click', 'child-a')
			click() {
				this.referenceValue = true;
			}
		}

		const element = document.createElement('div');
		const child = document.createElement('div');
		child.setAttribute('child-a', 'true');
		element.appendChild(child);
		const component = ComponentFactory.createComponentWithElement(element, TextComponentClass as any);
		component.referenceValue = false;
		child.click();

		expect(component.referenceValue).to.equal(true);
	});

	it('should attach multiple event listeners to the element of a component', () => {

		@Component({
			selector: 'test'
		})
		class TextComponentClass extends AbstractComponent {

			@EventListener('click change hover')
			click() {
				this.referenceValue++;
			}
		}

		const element = document.createElement('div');
		const component = ComponentFactory.createComponentWithElement(element, TextComponentClass as any);
		component.referenceValue = 0;
		element.click();
		element.dispatchEvent(new CustomEvent('change'));
		element.dispatchEvent(new CustomEvent('hover'));

		expect(component.referenceValue).to.equal(3);
	});

	it('should attach multiple events listeners to the child-element of a component', () => {


		@Component({
			selector: 'test',
			childrenSelectors: [
				'child-a'
			]
		})
		class TextComponentClass extends AbstractComponent {

			@EventListener('click change hover', 'child-a')
			click() {
				this.referenceValue++;
			}
		}

		const element = document.createElement('div');
		const child = document.createElement('div');
		child.setAttribute('child-a', 'true');
		element.appendChild(child);
		const component = ComponentFactory.createComponentWithElement(element, TextComponentClass as any);
		component.referenceValue = 0;
		child.click();
		child.dispatchEvent(new CustomEvent('change'));
		child.dispatchEvent(new CustomEvent('hover'));

		expect(component.referenceValue).to.equal(3);
	});

});