import { readFileSync, existsSync, writeFileSync } from "fs"
import { request } from "./http-request"

export class DownladJobDetails {

    private readonly urls: string[]
    private readonly jobDetailsContent: {url: string, content: string}[]

    constructor(jobUrlsFile: string, private readonly jobDetailContentFile: string) {
        
        this.urls = existsSync(jobUrlsFile) ? JSON.parse(readFileSync(jobUrlsFile, 'utf8')) : []
        this.jobDetailsContent = existsSync(jobDetailContentFile) ? JSON.parse(readFileSync(jobDetailContentFile, 'utf8')) : []
    }

    async load():  Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            let saveChanges = false
            for(const url of this.urls) {
                const jobDownloaded = this.jobDetailsContent.filter(x => x.url === url).length > 0
                if (!jobDownloaded) {
                    const content = await request(url)
                    this.jobDetailsContent.push({url, content})   
                    saveChanges = true
                } 
            }
            if (saveChanges) {
                writeFileSync(this.jobDetailContentFile, JSON.stringify(this.jobDetailsContent, null, 4), 'utf8')
            }
            resolve()
        })
    }
}