import { readFileSync } from "fs"
import * as cheerio from "cheerio"

interface CssConfig {
    title: string
    company: string
    contact: string
    description: string
    location: string | string[]
    salary: string
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

const jobs = JSON.parse(readFileSync('./data.json', 'utf8')) as JobDetailItem[]
const config = JSON.parse(readFileSync('./load-job-details/config.json', 'utf8'))

for(const job of jobs) {
    // console.log(loadJob(job))
}

function getCssConfig(item: JobDetailItem, ): CssConfig {
    for(const c in config)
        if (item.url.includes(c))
            return config[c]
}

function text($: any, css: CssConfig, selector: string): string {
    return css[selector] ? $(css[selector]).text()
            .replace(/\n/g, '')
            .replace(/\t/g, '')
            .trim() : ""
}

function loadJob(item: JobDetailItem): Job {
    const css: CssConfig =  getCssConfig(item)
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
        description: $(css.description).html(),
        company: text($, css, 'company'), // css.company ? $(css.company).html() : "",
        contact: text($, css, 'contact').replace(/contact: /gi, ''),
        location,
        salary: text($, css, 'salary')
    }
}

