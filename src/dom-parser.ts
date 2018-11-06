import {Event} from "./helpers/Event";

export class DomParser {
    private templateStorage:any = {};

    constructor() {
        Event.ready(() => {
            this.getAllComponentElements();
        });
    }

    private getAllComponentElements() {
        const componentElements = document.querySelectorAll('[data-component],[component]');
        this.getContentOfTemplates(componentElements);
        console.log(this.templateStorage);
    }

    private getContentOfTemplates(templates: NodeList) {
        for (let i = 0; i < templates.length; i++) {
            let templateElement = templates[i] as HTMLTemplateElement;
            let dataComponent = templateElement.getAttribute('data-component') || templateElement.getAttribute('component')
            this.templateStorage[dataComponent] = templateElement.content;
        }
    }
}