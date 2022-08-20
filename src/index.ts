import * as core from '@actions/core'
import * as https from 'https'
import {BitlyLink} from './types'

const run = async (): Promise<void> => {
  const longUrl: string = core.getInput('long_url')
  const bitlyToken: string = core.getInput('bitly_token')
  const customDomain: string = core.getInput('bitly_custom_domain')

  const bitlyLink = await bitly(bitlyToken, longUrl, customDomain)
  core.setOutput('bitly_link', bitlyLink.link)
}

const bitly = async (
  bitlyToken: string,
  longUrl: string,
  customDomain?: string
): Promise<BitlyLink> => {
  const data = JSON.stringify({
    long_url: longUrl,
    domain: customDomain || 'bit.ly'
  })

  const options = {
    hostname: 'api-ssl.bitly.com',
    path: '/v4/shorten',
    port: 443,
    method: 'POST',
    json: data,
    headers: {
      Authorization: `Bearer ${bitlyToken}`,
      'Content-Type': 'application/json'
    }
  }

  return new Promise<BitlyLink>((resolve, reject) => {
    https.request(options, response => {
      let body = ''
      response
        .on('data', chunk => {
          body += chunk
        })
        .on('end', () => {
          const result = JSON.parse(body)
          if (result.status_code === 200) {
            resolve(result.data as BitlyLink)
          } else {
            reject(new Error(result.status_txt))
          }
        })
        .on('error', error => {
          reject(error)
        })
        .on('timeout', () => {
          reject(new Error('Timeout'))
        })
        .setTimeout(10000)
    })
  })
}

run()
