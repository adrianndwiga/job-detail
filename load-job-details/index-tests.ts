import { loadJob } from "."
import * as assert from 'assert'

describe('load job', () => {

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
                    <div class="company">some company</div>
                    <div class="contact">some contact</div>
                    <div class="description">some description</div>
                    <div class="location">some location</div>
                    <div class="salary">some salary</div>
                </root>`
            })

            assert.equal(job.location, 'some location')
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
                title: '//h1',
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

            assert.equal(job.location, 'some location')
        })
    })
})
