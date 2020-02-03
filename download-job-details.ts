// import { readFileSync, existsSync, writeFileSync } from "fs"
import { request } from "./http-request"

export class DownladJobDetails {

    // private readonly urls: string[]
    // private readonly jobDetailsContent: {url: string, content: string}[]

    constructor(private readonly urls: string[], private readonly jobDetailsContent: {url: string, content: string}[]) {
        // this.urls = existsSync(jobUrlsFile) ? JSON.parse(readFileSync(jobUrlsFile, 'utf8')) : []
        // this.jobDetailsContent = existsSync(jobDetailContentFile) ? JSON.parse(readFileSync(jobDetailContentFile, 'utf8')) : []
    }

    async load():  Promise<{url: string, content: string}[]> {
        return new Promise<{url: string, content: string}[]>(async (resolve, reject) => {
            // let saveChanges = false
            for(const url of this.urls) {
                const jobDownloaded = this.jobDetailsContent.filter(x => x.url === url).length > 0
                if (!jobDownloaded) {
                    const content = await request(url)
                    if(typeof(content) === 'string')
                        this.jobDetailsContent.push({url, content})
                    else if (typeof(content) === 'object') {
                        const v = content as {url: string, data: string, location: string}
                        if (!(this.jobDetailsContent.filter(x => x.url === v.location).length > 0)) {
                            const c = await request(v.location) as string
                            this.jobDetailsContent.push({url: v.location, content: c})
                        }
                    }
                    // saveChanges = true
                }
            }
            // if (saveChanges) {
                resolve(this.jobDetailsContent)
            // }
            // resolve()
        })
    }
}