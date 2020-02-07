import { loadJob, Job } from "."
import * as assert from 'assert'

describe('load job', () => {
    const expectedJob = {
        title: 'some title',
        company: 'some company',
        contact: 'some contact',
        description: 'some description',
        location: 'some location',
        salary: 'some salary'
    }

    const verify = (job: Job): void => {
        assert.equal(job.title, expectedJob.title)
        assert.equal(job.company, expectedJob.company)
        assert.equal(job.contact, expectedJob.contact)
        assert.equal(job.description, expectedJob.description)
        assert.equal(job.location, expectedJob.location)
        assert.equal(job.salary, expectedJob.salary)
    }

    const jobContent = `<root>
    <h1>some title</h1>
    <div class="company">${expectedJob.company}</div>
    <div class="contact">${expectedJob.contact}</div>
    <div class="description">${expectedJob.description}</div>
    <div class="location">${expectedJob.location}</div>
    <div class="salary">${expectedJob.salary}</div>
</root>`

    describe('using css selector', () => {
        it('should load job details', () => {
            const job = loadJob({
                title: 'h1',
                company: 'div.company',
                contact: 'div.contact',
                description: 'div.description',
                location: 'div.location',
                salary: 'div.salary'
            }, {
                url: '',
                content: jobContent
            })

            verify(job)
        })

        it('should load job details 2', () => {
            const job = loadJob({
                title: 'h1',
                company: 'div.company',
                contact: 'div.contact',
                description: 'div.description',
                location: ['div.location', 'div.location-2'],
                salary: 'div.salary'
            }, {
                url: '',
                content: jobContent
            })

            verify(job)
        })
    })

    describe('using xpath selector', () => {
        it('should load job details', () => {
            const job = loadJob({
                title: '//h1/text()////',
                company: '//div[@class="company"]/text()',
                contact: '//div[@class="contact"]/text()',
                description: '//div[@class="description"]/text()',
                location: '//div[@class="location"]/text()',
                salary: '//div[@class="salary"]/text()'
            }, {
                url: '',
                content: jobContent
            })

            verify(job)
        })
    })
})
