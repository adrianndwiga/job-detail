import { CssSelector } from "../selectors/css-selector"

export interface CssConfig {
    title: string
    company?: string
    contact?: string
    description: string
    location?: string | string[]
    salary?: string
}

export interface JobDetailItem {
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

