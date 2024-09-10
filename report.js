const printReport = (pages) => {
    console.log(`Await crawling results`)

    const info = Object.entries(pages)

    info.sort((a,b) => b[1] - a[1])

    for (let i = 0; i < info.length; i++){
        const entry = info[i]
        console.log(`Found ${entry[1]} internal links to ${entry[0]}`)
    }
}


export { printReport }