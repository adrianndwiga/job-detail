import * as cheerio from "cheerio"

export interface CssConfig {
    title: string
    company?: string
    contact?: string
    description: string
    location?: string | string[]
    salary?: string
}

interface JobDetailItem {
    url: string
    content: string
}

interface Job {
    title: string
    company: string
    contact: string
    description: string
    location: string
    salary: string
}

function text(key: string | undefined, value: string): string {
    if (key)
        return value ? value
                .replace(/\n/g, '')
                .replace(/\t/g, '')
                .trim() : ""
    return ''
}

export interface Selector {
    title(): string
    description(): string
    company(): string
    location(): string
    contact(): string
    salary(): string
}

export class CssSelector implements Selector {
    private readonly $: CheerioStatic

    constructor(item: JobDetailItem, private readonly css: CssConfig) {
        this.$ = cheerio.load(item.content)
    }

    private text(key: string | undefined, value: string): string {
        if (key)
            return value ? value
                    .replace(/\n/g, '')
                    .replace(/\t/g, '')
                    .trim() : ""
        return ''
    }

    title(): string {
        return this.$(this.css.title).text().replace(/\n/g, '').replace(/\t/g, '').trim()
    }
    description(): string {
        return this.$(this.css.description).html() as string
    }
    company(): string {
        return this.text(this.css.company, this.$(this.css.company).text())
    }
    location(): string {
        let location = ''
        if (typeof(this.css.location) === 'string') {
            location = this.css.location ? this.$(this.css.location).text()
            .replace(/\n/g, '')
            .replace(/\t/g, '')
            .trim() : ""
        } else if(typeof(this.css.location) === 'object') {
            for(const l of this.css.location) {
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
        return this.text(this.css.contact, this.$(this.css.contact).text()).replace(/contact: /gi, '')
    }
    salary(): string {
        return this.text(this.css.salary, this.$(this.css.salary).text())
    }
}

export function loadJob(css: CssConfig, item: JobDetailItem): Job {

    const selector = new CssSelector(item, css)

    return {
        title: selector.title(),
        description: selector.description(),
        company: selector.company(),
        contact: selector.contact(),
        location: selector.location(),
        salary: selector.salary()
    }

}

