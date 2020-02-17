import * as https from 'https'
import * as http from 'http'

export interface UrlRedirectionResponse {
    url: string
    data: string
    location: string
}

export function request(url: string, cookie: string = ''):
                                    Promise<string | UrlRedirectionResponse> {
    return new Promise<string  | UrlRedirectionResponse>((resolve, reject) => {

        (url.startsWith('https://')  ? https : http).get(url, { headers: {'cookie': cookie}}, response => {
            let data = ''

            response.on('data', chunk => {
                data += chunk
            })

            response.on('end', () => {
                if (response.statusCode === 302) {
                    const location = response.headers.location as string
                    resolve({url, location, data})
                }
                resolve(data)
            })
        }).on('error', err => {
            reject(`Error: ${err.message}`)
        })
    })
}