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

    identifier(): string {
        return this.selectValue(this.css.identifier)
    }

    title(): string {
        return this.selectValue(this.css.title)
    }

    description(): string {
        return this.selectValue(this.css.description)
    }

    company(): string {
        return this.selectValue(this.css.company)
    }

    location(): string {
        if (typeof(this.css.location) === 'string')
            return this.selectValue(this.css.location)
        return ''
    }

    contact(): string {
        return this.selectValue(this.css.contact)
    }

    salary(): string {
        return this.selectValue(this.css.salary)
    }
}
