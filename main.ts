import * as https from 'https'
import { readFileSync } from 'fs'

interface JobSearchSetting {
    url: string,
    title: string,
    baseUrl: string,
    cookie: string,
    result: string,
    detail: {
        title: string,
        company: string,
        salary: string,
        location: string,
        link: string
    }
}

interface Job {
    title: string
    company: string
    salary: string
    location: string
    link: string
}

interface Jobs {
    jobSearch: JobSearchSetting
    jobs: Job[]
}

interface JobDetail {
    jobSearch: JobSearchSetting,
    job: Job
    jobDetail: string
}

function request(url: string, cookie: string = ''): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        https.get(url, { headers: {'cookie': cookie}}, response => {
            let data = ''
        
            response.on('data', chunk => {
                data += chunk
            })
        
            response.on('end', () => {
                resolve(data)
            })
        }).on('error', err => {
            console.log('error retrieving request')
            reject(`Error: ${err.message}`)
        })
    })
}

const files = JSON.parse(readFileSync('../_queues/jobs-queue.json', 'utf8'))

async function loadJob(job: Job, cookie: string, baseUrl: string): Promise<void> {
    const response = await request(job.link.startsWith('https://') ? job.link : `${baseUrl}${job.link}`)
    console.log(response)
}

async function loadJobs(file: string): Promise<void> {
    const jobSearch: Jobs = JSON.parse(readFileSync(file, 'utf8'))

    for(const job of jobSearch.jobs)
        loadJob(job, jobSearch.jobSearch.cookie, jobSearch.jobSearch.baseUrl)
}

for(const file of files)
    loadJobs(file)