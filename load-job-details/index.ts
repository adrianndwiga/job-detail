import { SelectorAdapter } from "../selectors/selector-adapter"
import { Selector } from "../selectors/types"

export interface CssConfig {
    identifier?: string
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

export interface Job {
    identifier?: string
    title: string
    company: string
    contact: string
    description: string
    location: string
    salary: string
}

// export function loadJob(css: CssConfig, item: JobDetailItem): Job {

//     const selector = new SelectorAdapter(css, item)

//     return {
//         identifier: selector.identifier(),
//         title: selector.title(),
//         description: selector.description(),
//         company: selector.company(),
//         contact: selector.contact(),
//         location: selector.location(),
//         salary: selector.salary()
//     }

// }

export function loadJob(selector: Selector): Job {
    return loadJobWithCustomSelector(selector)
}

export function loadJobWithCustomSelector(selector: Selector) {
    return {
        identifier: selector.identifier(),
        title: selector.title(),
        description: selector.description(),
        company: selector.company(),
        contact: selector.contact(),
        location: selector.location(),
        salary: selector.salary()
    }
}

