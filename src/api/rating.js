const fs = require('fs')
const path = require('path')
const bucketedByRatingRaw = fs.readFileSync(
    path.resolve('src/data-stores/bucketed-by-rating.json')
)
const bucketedByRating = JSON.parse(bucketedByRatingRaw)


const main = (targetRatingParameter) => {
    /*
    A Customer Rating match is defined as a Customer Rating equal to or more than what users have asked for. 
    For example, “3” would match all the 3 stars restaurants plus all the 4 stars and 5 stars restaurants.
    */
    return bucketedByRating[targetRatingParameter].data;
}

module.exports = {
    main,
}
