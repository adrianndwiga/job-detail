import { loadJob } from "."
import * as assert from 'assert'

// tslint:disable-next-line: no-console
console.log('.........')

describe('load job', () => {
    it('should load job details', () => () => {
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
})
