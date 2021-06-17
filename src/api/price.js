const fs = require('fs')
const path = require('path')
const bucketedByPriceRaw = fs.readFileSync(
    path.resolve('src/data-stores/bucketed-by-price.json')
)
const bucketedByPrice = JSON.parse(bucketedByPriceRaw)

const main = price => {
    return bucketedByPrice[price].data
}

const hasDataAtThatPrice = price => !!bucketedByPrice[price]

module.exports = {
    main,
    hasDataAtThatPrice,
}
