import { Selector } from "./types"
import { JobDetailItem, CssConfig } from "../load-job-details"
import * as cheerio from 'cheerio'

export class CssSelector implements Selector {
    private readonly $: CheerioStatic

    constructor(item: JobDetailItem, private readonly css: CssConfig) {
        this.$ = cheerio.load(item.content)
    }

    private text(key: string | undefined): string {
        if (key) {
            const text = this.$(key).text()
            return text ? text
                .replace(/\n/g, '')
                .replace(/\t/g, '')
                .trim() : ""
        }
        return ''
    }

    title(): string {
        return this.text(this.css.title)
    }

    description(): string {
        return this.$(this.css.description).html() as string
    }

    company(): string {
        return this.text(this.css.company)
    }

    location(): string {
        let location = ''
        if (typeof (this.css.location) === 'string') {
            location = this.text(this.css.location)
        } else if (Array.isArray(this.css.location)) {
            for (const l of this.css.location) {
                if (this.$(l).text()) {
                    location = this.$(l).text().replace(/\n/g, '')
                        .replace(/\t/g, '')
                        .trim()
                }
            }
        }
        return location
    }

    contact(): string {
        return this.text(this.css.contact).replace(/contact: /gi, '')
    }

    salary(): string {
        return this.text(this.css.salary)
    }
}


