import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl";

const n = normalizeURL
const a = getURLsFromHTML

test('basic', () => {
    expect(n("https://www.codewars.com/kata/")).toBe("www.codewars.com/kata")
    expect(n("https://api.guildwars2.com/v2/wvw/")).toBe("api.guildwars2.com/v2/wvw")
    expect(n("http://example.com")).toBe("example.com")
})

test('short/subdomain/utf-8', () => {
    expect(n("example.com")).toBe("example.com")
    expect(n("http://proxy.example.com/path")).toBe("proxy.example.com/path")
    expect(n("http://subdomain.example.com")).toBe("subdomain.example.com")
    expect(n("http://example.com/путь")).toBe("example.com/путь")
})

test('query/fragment/path/password', () => {
    expect(n("http://username:password@example.com")).toBe("username:password@example.com")
    expect(n("http://example.com/path#fragment")).toBe("example.com/path#fragment")
    expect(n("http://example.com/path?query1=param1&query2=param2")).toBe("example.com/path?query1=param1&query2=param2")

})

test('ip port', () => {
    expect(n('http://192.168.0.1')).toBe('192.168.0.1')
})

test('singe anchor', () => {
    const href = '<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>'
    expect(a(href)).toMatchObject(['https://blog.boot.dev/'])
})

test('multiple anchors', () => {
    const href = `<html><body>${'<a href="https://blog.boot.dev"><span>example</span></a>'.repeat(4)}</body></html>`
    expect(a(href)).toMatchObject(['https://blog.boot.dev/','https://blog.boot.dev/','https://blog.boot.dev/','https://blog.boot.dev/'])
})

test('relative to absolute urls', () => {
    const href = '<html><body><a href="blog.html"><span>Go to blog</span></a><div><a href="page.html">CLICK ME</a></div</body></html>'
    const url = 'http://example.com/'
    expect(a(href, url)).toMatchObject(['http://example.com/blog.html', 'http://example.com/page.html'])
})

