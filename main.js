import { crawlPage } from './crawl.js'

function main() {
    const argv = process.argv
    if (argv.length < 3 || argv.length > 3) {
        console.log('invalid input')
        exit()
    }
    
    const BASE_URL = argv.pop()

    console.log(`starting seach from ${BASE_URL}`)
    
    crawlPage(BASE_URL)
}

main()