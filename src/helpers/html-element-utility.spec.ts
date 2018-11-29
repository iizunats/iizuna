import {HtmlElementUtility} from "./html-element-utility";
import {expect} from 'chai';
import 'mocha';


describe('HtmlElementUtility Class', () => {
	describe('querySelectByAttribute function', () => {

		it('should find an element by the attribute name', () => {
			const testParent = document.createElement('div');
			const testElement = document.createElement('div');
			testElement.setAttribute('test-selector', '');
			testParent.appendChild(testElement);
			const selected = HtmlElementUtility.querySelectByAttribute('test-selector', testParent);
			expect(selected).to.equal(testElement);
		});

		it('should find an element by the attribute name and value of the attribute', () => {
			const testParent = document.createElement('div');
			const testElement = document.createElement('div');
			const testElement2 = document.createElement('div');
			testElement.setAttribute('test-selector', 'myval1');
			testElement2.setAttribute('test-selector', 'myval2');
			testParent.appendChild(testElement);
			testParent.appendChild(testElement2);
			const selected = HtmlElementUtility.querySelectByAttribute('test-selector', testParent, 'myval1');
			expect(selected).to.equal(testElement);
		});
	});
});