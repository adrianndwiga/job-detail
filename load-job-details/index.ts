import * as cheerio from "cheerio"

interface CssConfig {
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

