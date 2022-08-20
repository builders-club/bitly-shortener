import * as core from '@actions/core'
import * as https from 'https'
import {BitlyLink} from './types'

const run = async (): Promise<void> => {
  const longUrl: string = core.getInput('long_url')
  const bitlyToken: string = core.getInput('bitly_token')
  const customDomain: string = core.getInput('bitly_custom_domain')

  try {
    const bitlyLink = await bitly(bitlyToken, longUrl, customDomain)
    core.setOutput('bitly_link', bitlyLink.link)
  } catch (error) {
    core.setFailed((error as Error).message)
  }
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
    method: 'POST',
    json: true,
    headers: {
      Authorization: `Bearer ${bitlyToken}`,
      'Content-Type': 'application/json'
    }
  }

  return new Promise<BitlyLink>((resolve, reject) => {
    
    core.info(`Requesting Bit.ly short URL for: ${longUrl}`)
    let body = ''
    const req = https.request(options, response => {
      response.on('data', (chunk) => {
        body += chunk
      });
    })

    req.on('end', () => {
      resolve(JSON.parse(body) as BitlyLink)
    })

    req.on('error', (e) => {
      reject(e)
    });
    req.on('timeout', () => {
      reject(new Error(`Request timed out`))
    })
    req.write(data)
    req.end();
  })
}

run()
