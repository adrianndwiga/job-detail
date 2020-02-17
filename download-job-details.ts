import { request, UrlRedirectionResponse } from "./http-request"

interface JobDetailsContent {
    url: string
    content: string
}

export class DownloadJobDetails {

    constructor(
        private readonly urls: string[],
        private readonly jobDetailsContent: JobDetailsContent[]) {
    }

    private isDownloaded(location: string): boolean {
        return this.jobDetailsContent
                        .filter(x => x.url === location).length > 0
    }

    async load(): Promise<JobDetailsContent[]> {
        return new Promise<JobDetailsContent[]>(async (resolve, reject) => {
            for (const url of this.urls) {
                const jobDownloaded = this.jobDetailsContent
                                        .filter(x => x.url === url).length > 0

                if (!jobDownloaded) {
                    const content = await request(url)

                    if (typeof (content) === 'string')
                        this.jobDetailsContent.push({ url, content })
                    else if (typeof (content) === 'object') {
                        const v = content as UrlRedirectionResponse
                        if (!(this.isDownloaded(v.location))) {
                            const c = await request(v.location) as string
                            const jobDetailsContent = {
                                url: v.location,
                                content: c
                            }
                            this.jobDetailsContent.push(jobDetailsContent)
                        }
                    }
                }
            }
            resolve(this.jobDetailsContent)
        })
    }
}
