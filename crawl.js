import { JSDOM } from 'jsdom'

const normalizeURL = (url) => {
    return url.replace(/.+(?:\/\/)|\/$/g, '')
}

const getURLsFromHTML = (body, baseURL) => {
    const dom = new JSDOM(body, { url: baseURL })
    return [...dom.window.document.querySelectorAll("a")].map(a => a.href)
}

export { normalizeURL, getURLsFromHTML }


