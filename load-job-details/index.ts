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
        throw new Error("Method not implemented.")
    }
    contact(): string {
        return this.text(this.css.contact, this.$(this.css.contact).text()).replace(/contact: /gi, '')
    }
    salary(): string {
        return this.text(this.css.salary, this.$(this.css.salary).text())
    }
}

export function loadJob(css: CssConfig, item: JobDetailItem): Job {
    const $ = cheerio.load(item.content)

    let location = ''
    if (typeof(css.location) === 'string') {
        location = css.location ? $(css.location).text()
        .replace(/\n/g, '')
        .replace(/\t/g, '')
        .trim() : ""
    } else if(typeof(css.location) === 'object') {
        for(const l of css.location) {
            if ($(l).text()) {
                location = $(l).text().replace(/\n/g, '')
                .replace(/\t/g, '')
                .trim()
            }
        }
    }

    return {
        title: $(css.title).text().replace(/\n/g, '').replace(/\t/g, '').trim(),
        description: $(css.description).html() as string,
        company: text(css.company, $(css.company).text()),
        contact: text(css.contact, $(css.contact).text()).replace(/contact: /gi, ''),
        location,
        salary: text(css.salary, $(css.salary).text())
    }
}

