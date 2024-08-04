import { JSDOM } from 'jsdom'

const normalizeURL = (url) => {
    return url.replace(/.+(?:\/\/)|\/$/g, '')
}

const domainName = (url) => {
    const urlMod = url.replace(/w{3}/g, '')
    const matches = urlMod.match(/(?<=\/\/|\.)([a-zA-Z0-9-]+)(?=\.)/g)
        
    return matches ? matches[0] : urlMod.match(/[a-zA-Z0-9-]+(?=\.)/)
}

const getURLsFromHTML = (body, baseURL) => {
    const dom = new JSDOM(body, { url: baseURL })
    return [...dom.window.document.querySelectorAll("a")].map(a => a.href)
}

const crawlPage = async (baseURL, currentUrl = baseURL, pages = {}) => {
    if 

    currentUrl = normalizeURL(currentUrl);

    
    try {
        const response = await fetch(currentUrl)
        if (`${response.status}`.startsWith('4')) {
            throw new Error(`Rejected with ${response.status}`)
        }
        if (!response.headers.get('content-type').includes('text/html')) {
            throw new Error('Wrong content type')
        }
        const text = await response.text()
        console.log(text)
    } catch (error) {
        console.log(error)
    }
}

export { normalizeURL, getURLsFromHTML, crawlPage }


