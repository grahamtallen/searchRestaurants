const fs = require('fs')

const main = targetRatingParameter => {
    /*
    A Customer Rating match is defined as a Customer Rating equal to or more than what users have asked for. 
    For example, “3” would match all the 3 stars restaurants plus all the 4 stars and 5 stars restaurants.
    */
    const {
        FiveStarRestaurants,
        FourStarRestaurants,
        ThreeStartRestaurants,
        TwoStarRestaurants,
        OneStarRestaurants,
    } = bucketedByRating
    switch (targetRatingParameter) {
        case 5:
            return FiveStarRestaurants
        case 4:
            return FiveStarRestaurants.concat(FourStarRestaurants)
        case 3:
            return FiveStarRestaurants.concat(FourStarRestaurants).concat(
                ThreeStartRestaurants
            )
        // etc
    }
}

const bucketedByRatingRaw = fs.readFileSync(
    'data-stores/bucketed-by-rating.json'
)
const bucketedByRating = JSON.parse(bucketedByRatingRaw)
console.log({
    bucketedByRating,
})

console.log('Searching for one start restaurants and lower: ', main(1))
// todo assert these results with tests
