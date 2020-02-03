import * as https from 'https'
import * as http from 'http'

export function request(url: string, cookie: string = ''): Promise<string | {url: string, location: string, data: string}> {
    return new Promise<string  | {url: string, location: string, data: string}>((resolve, reject) => {

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