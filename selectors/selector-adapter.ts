import { Selector } from "./types";
import { CssSelector } from "./css-selector";
import { XPathSelector } from "./xpath-selector";
import { CssConfig } from "../load-job-details";

export class SelectorAdapter implements Selector {
    constructor(
        private readonly cssSelector: CssSelector,
        private readonly xpathSelector: XPathSelector,
        private readonly config: CssConfig) {
    }

    title(): string {
        return this.isXpath(this.config.title) ?
            this.xpathSelector.title() :
            this.cssSelector.title()
    }
    description(): string {
        return this.isXpath(this.config.description) ?
            this.xpathSelector.description() :
            this.cssSelector.description()    }
    company(): string {
        if (this.config.company)
            return this.isXpath(this.config.company) ?
                this.xpathSelector.company() :
                this.cssSelector.company()
        else
            return ''
    }
    location(): string {
        if (this.config.location && typeof(this.config.location) === 'string')
            return this.isXpath(this.config.location) ?
                this.xpathSelector.location() :
                this.cssSelector.location()
        else
            return ''
    }
    contact(): string {
        if (this.config.contact)
            return this.isXpath(this.config.contact) ?
                this.xpathSelector.contact() :
                this.cssSelector.contact()
        else
            return ''
    }
    salary(): string {
        if (this.config.salary)
            return this.isXpath(this.config.salary) ?
                this.xpathSelector.salary() :
                this.cssSelector.salary()
        else
            return ''
    }

    private isXpath(selector: string): boolean {
        return selector.startsWith('//')
    }
}