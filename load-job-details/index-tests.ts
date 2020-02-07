import { loadJob } from "."
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
                content: `<root>
                    <h1>some title</h1>
                    <div class="company">${expectedJob.company}</div>
                    <div class="contact">${expectedJob.contact}</div>
                    <div class="description">${expectedJob.description}</div>
                    <div class="location">${expectedJob.location}</div>
                    <div class="salary">${expectedJob.salary}</div>
                </root>`
            })

            assert.equal(job.company, expectedJob.company)
            assert.equal(job.contact, expectedJob.contact)
            assert.equal(job.description, expectedJob.description)
            assert.equal(job.location, expectedJob.location)
            assert.equal(job.salary, expectedJob.salary)
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
                content: `<root>
                    <h1>some title</h1>
                    <div class="company">some company</div>
                    <div class="contact">some contact</div>
                    <div class="description">some description</div>
                    <div class="location-2">some location</div>
                    <div class="salary">some salary</div>
                </root>`
            })

            assert.equal(job.location, 'some location')
        })
    })

    describe('using xpath selector', () => {
        it('should load job details', () => {
            const job = loadJob({
                title: '//h1/text()',
                company: '//div[@class="company"]',
                contact: '//div[@class="contact"]',
                description: '//div[@class="description"]',
                location: '//div[@class="location"]/text()',
                salary: '//div[@class="salary"]'
            }, {
                url: '',
                content: `<root>
                    <h1>some title</h1>
                    <div class="company">some company</div>
                    <div class="contact">some contact</div>
                    <div class="description">some description</div>
                    <div class="location">some location</div>
                    <div class="salary">some salary</div>
                </root>`
            })

            assert.equal(job.title, 'some title')
            assert.equal(job.location, 'some location')
        })
    })
})
