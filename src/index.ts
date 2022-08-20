import * as core from '@actions/core'
import * as https from 'https'
import {BitlyLink} from './types'

const run = (): void => {
  const longUrl: string = core.getInput('long_url')
  const bitlyToken: string = core.getInput('bitly_token')
  const customDomain: string = core.getInput('bitly_custom_domain')

  const data = JSON.stringify({
    long_url: longUrl,
    domain: customDomain || 'bit.ly'
  })
  
  const options = {
    hostname: 'api-ssl.bitly.com',
    path: '/v4/shorten',
    method: 'POST',
    json: true,
    headers: {
      Authorization: `Bearer ${bitlyToken}`,
      'Content-Type': 'application/json'
    }
  }

  core.info(`Requesting Bit.ly short URL for: ${longUrl}`)
  
  const req = https.request(options, response => {
    let body = ''
    response.setEncoding('utf8');
    response.on('data', (chunk) => {
      body += chunk
    });
    response.on('end', () => {
      const link = JSON.parse(body) as BitlyLink;
      core.info(`Bit.ly short URL: ${link.link}`)
      core.setOutput('bitly_link', link.link)
    });
  })

  req.on('error', (e) => {
    core.setFailed(e.message)
  });

  req.on('timeout', () => {
    core.setFailed(`Request timed out`)
  })

  req.write(data)
  req.end()
}

run()
