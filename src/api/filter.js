const assert = require('assert')
const {
    main: getDataSetBasedOnRating,
    hasDataAtThatRating,
} = require('./rating.js')
const {
    main: getDataSetBasedOnDistance,
    hasDataAtThatDistance,
} = require('./distance.js')
const {
    main: getDataSetBasedOnPrice,
    hasDataAtThatPrice,
} = require('./price.js')
const fs = require('fs')
const path = require('path')
const sortedByDistanceRaw = fs.readFileSync(
    path.resolve('src/data-stores/restaurants-sorted-by-distance.json')
)
const sortedByDistance = JSON.parse(sortedByDistanceRaw)

const main = (parameters = {}) => {
    const { distance = 100, customer_rating = null, price } = parameters
    let dataset = sortedByDistance.slice(10, 20)
    // Based on the query options, choose the right filtered dataset
    // these don't work simultaneously
    // Rating is the easiest to start

    if (customer_rating && hasDataAtThatRating(customer_rating)) {
        // get filtered rating set based on rating
        dataset = getDataSetBasedOnRating(customer_rating)
    }
    if (distance && hasDataAtThatDistance(distance)) {
        dataset = getDataSetBasedOnDistance(distance)
    }

    if (price && hasDataAtThatPrice(price)) {
        dataset = getDataSetBasedOnPrice(price)
    }

    return dataset
}

const testMainApiFunctions = () => {
    // gets the smallest dataset possible for each parameter
    // expected results can be inferred based on known size of each set

    // Distance
    // Filtering out all of the items that are less than the provided distance parameter
    const resultOfFilteringByDistance = main({ distance: 3 })
    // combination of the size of the 1 distance bucket, the 2 and the 3, so
    // 20 + 20 + 28
    // console.debug("These should only include 3's, 2's and 1'ss ", resultOfFilteringByDistance.map(res => res.distance))
    assert.strictEqual(
        resultOfFilteringByDistance.length,
        68,
        'Result of filtering by distance is items 68'
    )

    /*
        Ratings

    */
    const resultOfFilteringByRating = main({ customer_rating: 3 })

    assert.strictEqual(resultOfFilteringByRating.length, 156)

    const resultOfFilteringByHighRating = main({ customer_rating: 5 })
    assert.strictEqual(resultOfFilteringByHighRating.length, 76)

    const resultOfFilteringByLowRating = main({ customer_rating: 1 })
    // 44 + 31 + 38 + 44 + 47 + 40
    assert.strictEqual(resultOfFilteringByLowRating.length, 236)

    /*
        Testing accuracy of price
    */

    const resultOfFilteringByPrice = main({ price: 35 })
    assert.strictEqual(resultOfFilteringByPrice.length, 127)
    assert.strictEqual(
        resultOfFilteringByPrice.filter(item => {
            parseInt(item.price) > 35
        }).length,
        0,
        'Price filter excludes all over 35 priced items'
    )
}

testMainApiFunctions()

module.exports = {
    main,
}
