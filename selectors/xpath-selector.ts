import { Selector } from "./types"
import { JobDetailItem, CssConfig } from "../load-job-details"
import { DOMParser } from 'xmldom'
import * as xpath from 'xpath'

export class XPathSelector implements Selector {

    private readonly document: any

    constructor(item: JobDetailItem, private readonly css: CssConfig) {
        this.document = new DOMParser().parseFromString(item.content)
    }

    private selectValue(expression: string | undefined) {
        if (expression)
            return xpath.select(expression, this.document).toString()
        return ''
    }

    title(): string {
        return this.selectValue(this.css.title)
    }

    description(): string {
        return this.selectValue(this.css.description)
    }

    company(): string {
        return this.css.company ?
            xpath.select(this.css.company, this.document).toString() :
            ''
    }

    location(): string {
        return typeof(this.css.location) === 'string' && this.css.location ?
                xpath.select(this.css.location, this.document).toString() :
                ''
    }

    contact(): string {
        return this.selectValue(this.css.contact)
    }

    salary(): string {
        return this.selectValue(this.css.salary)
    }
}
