const assert = require('assert')
const { main: getDataSetBasedOnRating } = require('./rating.js');
const { main: getDataSetBasedOnDistance } = require('./distance.js');

const main = (name, distance = 100, rating = null) => {
    let dataset = []
    // Based on the query options, choose the right filtered dataset
    // these don't work simultaneously
    // Rating is the easiest to start

    if (rating) {
        // get filtered rating set based on rating
        dataset = getDataSetBasedOnRating(rating)
        
    }
    if (distance) {
        dataset = getDataSetBasedOnDistance(distance)
    }
    if (name) {
        // filter dataset based on name
    }
    return dataset
}

const testMainApiFunctions = () => {
    // gets the smallest dataset possible for each parameter
    // expected results can be inferred based on known size of each set

    // Distance
    // Filtering out all of the items that are less than the provided distance parameter
    const resultOfFilteringByDistance = main(null, 3, null);
    // combination of the size of the 1 distance bucket, the 2 and the 3, so
    // 20 + 20 + 28
    assert.strictEqual(resultOfFilteringByDistance.length, 68, 'Result of filtering by distance is items 68')

    /*
    Ratings
    {
        FiveStarRestaurants: 38,
        FourStarRestaurants: 31,
        ThreeStarRestaurants: 44,
        TwoStarRestaurants: 47,
        OneStarRestaurants: 40
    }
    */
    const resultOfFilteringByRating = main(null, null, 3);
    // should include Five, Four, Three star restaraunts, so
    // 44 + 31 + 38
    assert.strictEqual(resultOfFilteringByRating.length, 113);

    const resultOfFilteringByHighRating = main(null, null, 5);
    assert.strictEqual(resultOfFilteringByHighRating.length, 38);

    const resultOfFilteringByLowRating = main(null, null, 1);
    // 44 + 31 + 38 + 44 + 47 + 40
    assert.strictEqual(resultOfFilteringByLowRating.length, 200);

}

testMainApiFunctions()

module.exports = {
    main,
}
