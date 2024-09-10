import { crawlPage } from './crawl.js'
import { printReport } from './report.js'

async function main() {
    const argv = process.argv
    if (argv.length < 3 || argv.length > 3) {
        console.log('invalid input')
        process.exit()
    }
    
    const BASE_URL = argv.pop()

    console.log(`starting seach from ${BASE_URL}`)
    
    const pages = await crawlPage(BASE_URL)

    printReport(pages)
}

main()