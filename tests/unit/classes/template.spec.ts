import {Template} from "../../../src/classes/template";
import {expect} from 'chai';
import 'mocha';
import {ConfigRegistry} from "../../../src/helpers/config.registry";


describe('Template Class in compatible mode', () => {
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

describe('Template Class in new mode', () => {
	it('should render a single variable into a defined HTML string containing a variable marker', () => {
		ConfigRegistry.setConfig('template.compatibleMode', false);
		const template = new Template('<span>{{one}}</span>');
		expect(template.render({one: 1})).to.equal('<span>1</span>');
	});
	it('should render multiple variables into a defined HTML string containing variable markers', () => {
		ConfigRegistry.setConfig('template.compatibleMode', false);
		const template = new Template('<span>{{one}}</span><span>{{two}}</span>');
		expect(template.render({one: 1, two: 2})).to.equal('<span>1</span><span>2</span>');
	});
	it('should render a single variable into a defined HTML string containing a variable marker multiple times', () => {
		ConfigRegistry.setConfig('template.compatibleMode', false);
		const template = new Template('<span>{{one}}</span><span>{{one}}</span>');
		expect(template.render({one: 1})).to.equal('<span>1</span><span>1</span>');
	});
	it('should render a object property into a defined HTML string', () => {
		ConfigRegistry.setConfig('template.compatibleMode', false);
		const template = new Template('<span>{{one.title}}</span>');
		expect(template.render({one: {title: 1}})).to.equal('<span>1</span>');
	});
	it('should not render anything if the accessed single object property does not exist', () => {
		ConfigRegistry.setConfig('template.compatibleMode', false);
		const template = new Template('<span>{{one.title}}</span>');
		expect(template.render({one: {name: 1}})).to.equal('<span></span>');
	});
	it('should render a single nested variable into a defined HTML string multiple times', () => {
		ConfigRegistry.setConfig('template.compatibleMode', false);
		const template = new Template('<span>{{one.title}}</span><span>{{one.title}}</span>');
		expect(template.render({one: {title: 1}})).to.equal('<span>1</span><span>1</span>');
	});
	it('should render multiple object properties into a defined HTML string', () => {
		ConfigRegistry.setConfig('template.compatibleMode', false);
		const template = new Template('<span>{{one.title}}</span><span>{{one.text}}</span>');
		expect(template.render({one: {title: 1, text: 2}})).to.equal('<span>1</span><span>2</span>');
	});
	it('should render a object property into a defined HTML string even if it is nested deep', () => {
		ConfigRegistry.setConfig('template.compatibleMode', false);
		const template = new Template('<span>{{one.first.title}}</span>');
		expect(template.render({one: {first: {title: 1}}})).to.equal('<span>1</span>');
	});
});