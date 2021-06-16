const levenshtein = require('fast-levenshtein')
const { getMatchWeight } = require('./compareWeights')

// This function is designed to assign a weight to each restaurant
// This weight will determine is priority order in the sort
// Weight is a percentage, btw 0 and 1
const calculateRestaurantWeight = (restaurant, params) => {
    const {
        name: nameRestaurant,
        customer_rating: customer_ratingRestaurant,
        distance: distanceRestaurant,
        //        price: priceRestaurant,
    } = restaurant
    const {
        name: nameParam,
        customer_rating: customer_ratingParam,
        distance: distanceParam,
        //        price: priceParam,
    } = params

    // look into PageRank for multi-param searching
    let nameWeight
    if (nameParam) {
        // string must include name parameter in some capacity
        // otherwise weight is 0
        if (!nameRestaurant.includes(nameParam)) {
            nameWeight = 0
        } else {
            // TODO look into cosign similarity matching
            // TODO Bag of words/keywords
            // TODO look https://github.com/ccsv/Presentations/blob/gh-pages/NLP/TextRank.pdf
            // https://www.npmjs.com/package/textrank

            const editDist = levenshtein.get(nameRestaurant, nameParam)
            // TODO logarithm
            nameWeight = 1 - editDist / 50
        }
    } else {
        nameWeight = 0
    }

    // todo cuisine

    // rating
    let ratingWeight = 0
    // less than the param is 0
    if (customer_ratingRestaurant < customer_ratingParam) {
        ratingWeight = 0
    } else {
        const value = customer_ratingRestaurant
        // todo 3 is something like 0.600000001
        ratingWeight = parseInt(value) * 0.2
    }

    // distance
    let distWeight
    if (distanceRestaurant === 0) {
        // there is no negative distance, so no need to consider the param in this case
        distWeight = 1 // you're right there on it bud
    } else if (distanceParam && distanceRestaurant > distanceParam) {
        // exclude anything that is farther  than the specified farthest restaurant
        distWeight = 0
    } else {
        // distance weight-ing algo
        // assuming that a distance greater than 100 is negligible and not relevant
        distWeight = (100 - distanceRestaurant) * 0.01
    }
    // TODO look into logarithm for distance

    const matchWeight = getMatchWeight({
        nameWeight,
        distWeight,
        ratingWeight,
    })

    return {
        nameWeight,
        ratingWeight,
        distWeight,
        matchWeight,
    }
}

module.exports = {
    calculateRestaurantWeight,
}