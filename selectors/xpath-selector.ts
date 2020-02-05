import { Selector } from "./types"
import { JobDetailItem, CssConfig } from "../load-job-details"
import { DOMParser } from 'xmldom'
import * as xpath from 'xpath'

export class XPathSelector implements Selector {

    private readonly document: any

    constructor(item: JobDetailItem, private readonly css: CssConfig) {
        this.document = new DOMParser().parseFromString(item.content)
    }

    title(): string {
        return xpath.select(this.css.title, this.document)[0].toString()
    }

    description(): string {
        return xpath.select(this.css.description, this.document)[0].toString()
    }

    company(): string {
        return this.css.company ?
            xpath.select(this.css.company, this.document)[0].toString() :
            ''
    }

    location(): string {
        return typeof(this.css.location) === 'string' && this.css.location ?
                xpath.select(this.css.location, this.document)[0].toString() :
                ''
    }

    contact(): string {
        if (this.css.contact)
            return xpath.select(this.css.contact, this.document)[0].toString()
        return ''
    }

    salary(): string {
        if (this.css.salary)
            return xpath.select(this.css.salary, this.document)[0].toString()
        return ''
    }
}
