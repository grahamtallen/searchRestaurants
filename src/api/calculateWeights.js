const levenshtein = require('fast-levenshtein')
const { getMatchWeight } = require('./compareWeights')

// This function is designed to assign a weight to each restaurant
// This weight will determine is priority order in the sort
// Weight is a percentage, btw 0 and 1
const calculateRestaurantWeight = (restaurant, params) => {
    const {
        name: nameRestaurant,
        cuisine: cuisineRestaurant,
        customer_rating: customer_ratingRestaurant,
        distance: distanceRestaurant,
        price: priceRestaurant,
    } = restaurant
    const {
        name: nameParam,
        cuisine: cuisineParam,
        customer_rating: customer_ratingParam,
        distance: distanceParam,
        price: priceParam,
    } = params

    const nameWeight = calculateStringWeight(nameRestaurant, nameParam)
    const cuisineWeight = calculateStringWeight(cuisineRestaurant, cuisineParam)


    // rating
    let ratingWeight = 0
    // less than the param is 0
    if (customer_ratingRestaurant < customer_ratingParam) {
        ratingWeight = 0
    } else {
        const value = customer_ratingRestaurant
        ratingWeight = parseInt(value) * 0.2
    }

    // distance
    let distWeight
    if (distanceRestaurant === 0) {
        // there is no negative distance, so no need to consider the param in this case
        distWeight = 1;
    } else if (distanceParam && distanceRestaurant > distanceParam) {
        // exclude anything that is farther  than the specified farthest restaurant
        distWeight = 0
    } else {
        // distance weight-ing algo
        // assuming that a distance greater than 100 is negligible and not relevant
        distWeight = (100 - distanceRestaurant) * 0.01
    }

    // price
    let priceWeight
    if (priceRestaurant === 0) {
        priceWeight = 1
    } else if (priceParam && priceRestaurant > priceParam) {
        priceWeight = 0
    } else {
        priceWeight = (100 - priceRestaurant) * 0.01
    }


    const allWeights = {
        nameWeight,
        ratingWeight,
        distWeight,
        cuisineWeight,
        priceWeight,
    }

    const matchWeight = getMatchWeight(allWeights, params)

    return {
        ...allWeights,
        matchWeight,
    }
}

const calculateStringWeight = (value, search) => {
    let weight
    if (search) {
        if (!value.includes(search)) {
            weight = 0
        } else {
            const editDist = levenshtein.get(value, search)
            // TODO logarithm
            weight = 1 - editDist / 50
        }
    } else {
        weight = 0
    }
    return weight
}

module.exports = {
    calculateRestaurantWeight,
}
