import { Selector } from "./types"
import { CssSelector } from "./css-selector"
import { XPathSelector } from "./xpath-selector"
import { CssConfig, JobDetailItem } from "../load-job-details"

export class SelectorAdapter implements Selector {

    private readonly cssSelector: CssSelector
    private readonly xpathSelector: XPathSelector

    constructor(private readonly config: CssConfig, item: JobDetailItem) {
        this.cssSelector = new CssSelector(item, config)
        this.xpathSelector = new XPathSelector(item, config)

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
        else if (this.config.location && Array.isArray(this.config.location)) {
            for(const location of this.config.location)
                if (location)
                    return this.isXpath(location) ?
                        this.xpathSelector.location() :
                        this.cssSelector.location()
            return ''
        } else
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