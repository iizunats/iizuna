import {Template} from "../../../src/classes/template";
import {expect} from 'chai';
import 'mocha';
import {ConfigRegistry} from "../../../src/helpers/config.registry";


describe('Template Class', () => {
	it('should render a single variable into a defined HTML string containing a variable marker', () => {
		const template = new Template('<span>${one}</span>');
		expect(template.render({one: 1})).to.equal('<span>1</span>');
	});
	it('should render multiple variables into a defined HTML string containing variable markers', () => {
		const template = new Template('<span>${one}</span><span>${two}</span>');
		expect(template.render({one: 1, two: 2})).to.equal('<span>1</span><span>2</span>');
	});
	it('should render a single variable into a defined HTML string containing a variable marker multiple times', () => {
		const template = new Template('<span>${one}</span><span>${one}</span>');
		expect(template.render({one: 1})).to.equal('<span>1</span><span>1</span>');
	});
	it('should be possible to override the expression syntax', () => {
		const template = new Template('<span>${one}</span><span>${one}</span>');
		expect(template.render({one: 1})).to.equal('<span>1</span><span>1</span>');
		ConfigRegistry.setConfig('template.expressionWrapper', ['###', '###']);
		const template2 = new Template('<span>###one###</span><span>###one###</span>');
		expect(template2.render({one: 1})).to.equal('<span>1</span><span>1</span>');
	});
});