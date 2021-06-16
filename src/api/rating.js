const fs = require('fs')
const path = require('path')

const main = (targetRatingParameter) => {
    /*
    A Customer Rating match is defined as a Customer Rating equal to or more than what users have asked for. 
    For example, “3” would match all the 3 stars restaurants plus all the 4 stars and 5 stars restaurants.
    */
    const {
        FiveStarRestaurants,
        FourStarRestaurants,
        ThreeStarRestaurants,
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
                ThreeStarRestaurants
            )
        case 2: 
            return FiveStarRestaurants.concat(FourStarRestaurants).concat(
                ThreeStarRestaurants).concat(TwoStarRestaurants)
        case 1: 
            return FiveStarRestaurants.concat(FourStarRestaurants).concat(
                ThreeStarRestaurants).concat(TwoStarRestaurants).concat(OneStarRestaurants)
        default:
            throw new Error("Invalid rating provided")
    }
}

const bucketedByRatingRaw = fs.readFileSync(
    path.resolve('src/data-stores/bucketed-by-rating.json')
)
const bucketedByRating = JSON.parse(bucketedByRatingRaw)
const {FiveStarRestaurants, FourStarRestaurants, ThreeStarRestaurants, TwoStarRestaurants, OneStarRestaurants} = bucketedByRating
console.log({FiveStarRestaurants: FiveStarRestaurants.length, FourStarRestaurants: FourStarRestaurants.length, ThreeStarRestaurants: ThreeStarRestaurants.length, TwoStarRestaurants: TwoStarRestaurants.length, OneStarRestaurants: OneStarRestaurants.length});

//
// todo assert these results with tests
//
module.exports = {
    main,
}
