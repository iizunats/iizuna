import {expect} from 'chai';
import 'mocha';
import {ComponentFactory} from "../../../src/helpers/component.factory";
import {AbstractComponent} from "../../../src/classes/abstract.component";
//import * as httpm from 'typed-rest-client/HttpClient';


describe('ComponentFactory Class', () => {
	it('should be declared and be accessible from anywhere', () => {
		expect(typeof ComponentFactory).to.equal('function');
	});
	it('should automatically find a template element based by the id of a component', () => {
		const testElement = document.createElement('div');
		const template = document.createElement('template');
		template.innerHTML = '<span>test!!!</span>';
		template.id = 'test-template';
		document.body.appendChild(template);
		document.body.appendChild(testElement);

		const component = ComponentFactory.createComponentWithElement(testElement, class extends AbstractComponent {
			__options = {
				template: 'test-template'
			}
		} as any);

		expect(component.template.html).to.equal('<span>test!!!</span>');
	});
	it('should automatically find a template element inside of a components element', () => {
		const testElement = document.createElement('div');
		const template = document.createElement('template');
		template.innerHTML = '<span>test!!!</span>';
		testElement.appendChild(template);
		document.body.appendChild(testElement);

		const component = ComponentFactory.createComponentWithElement(testElement, class extends AbstractComponent {
			__options = {}
		} as any);

		expect(component.template.html).to.equal('<span>test!!!</span>');
	});

	/*
	describe('Ajax', () => {
		let _http: httpm.HttpClient;
		let _httpbin: httpm.HttpClient;

		before(() => {
			_http = new httpm.HttpClient('iizuna-template-request');
		});

		after(() => {
		});

		it('should be able to request a remote template file and wait until it is fetched', () => {
			const testElement = document.createElement('div');
			document.body.appendChild(testElement);
			const component = ComponentFactory.createComponentWithElement(testElement, class extends AbstractComponent {
				__options = {
					templateUrl: 'TEST URL'
				};

				onReady() {
					expect(this.template.html).to.equal('asdffsdsdf');
				}
			} as any);
		});
	});
	 */
});