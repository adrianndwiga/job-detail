import { request } from "./http-request"

interface JobDetailsContent {
    url: string
    content: string
}

export class DownloadJobDetails {

    constructor(
        private readonly urls: string[],
        private readonly jobDetailsContent: JobDetailsContent[]) {
    }

    async load(): Promise<{ url: string, content: string }[]> {
        return new Promise<{ url: string, content: string }[]>(async (resolve, reject) => {
            for (const url of this.urls) {
                const jobDownloaded = this.jobDetailsContent.filter(x => x.url === url).length > 0
                if (!jobDownloaded) {
                    const content = await request(url)
                    if (typeof (content) === 'string')
                        this.jobDetailsContent.push({ url, content })
                    else if (typeof (content) === 'object') {
                        const v = content as { url: string, data: string, location: string }
                        if (!(this.jobDetailsContent.filter(x => x.url === v.location).length > 0)) {
                            const c = await request(v.location) as string
                            this.jobDetailsContent.push({ url: v.location, content: c })
                        }
                    }
                }
            }
            resolve(this.jobDetailsContent)
        })
    }
}
