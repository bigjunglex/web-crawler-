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

const fetchUrl = async (url) => {
    try {
        const response = await fetch(url, {mode: 'cors'})
        if (`${response.status}`.startsWith('4')) {
            throw new Error(`Rejected with ${response.status}`)
        }
        if (!response.headers.get('content-type').includes('text/html')) {
            throw new Error(`Wrong content type, fetching ${url}`)
        }
        
        const html = await response.text()
        
        return html

    } catch (error) {
        return null
    }
}


const crawlPage = async (baseURL, currentUrl = baseURL, pages = {}) => {
    
    if (domainName(baseURL) !== domainName(currentUrl)) return pages

    const normalCurrentUrl = normalizeURL(currentUrl);

    if (pages.hasOwnProperty(normalCurrentUrl)) {
        pages[normalCurrentUrl]++
        return pages
    }  

    pages[normalCurrentUrl] = 1

    let HTMLbody;

    try {
        HTMLbody = await fetchUrl(currentUrl)
    }catch(err){
        console.log(`${err.message}`)
        return pages
    }

    const allUrls = getURLsFromHTML(HTMLbody, baseURL)
    for (let i = 0; i < allUrls.length; i++){
        pages = await crawlPage(baseURL, allUrls[i], pages)
    }

    return pages
}

export { normalizeURL, getURLsFromHTML, crawlPage }


