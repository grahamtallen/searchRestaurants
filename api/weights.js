const levenshtein = require("fast-levenshtein")

// This function is designed to assign a weight to each restaurant
// This weight will determine is priority order in the sort
// Weight is a percentage, 0 <= weight <= 1  = true
const addWeightToRestaurant = (restaurant, params) => {
    const { name: nameRestaurant, customer_rating: customer_ratingRestaurant, distance: distanceRestaurant, price: priceRestaurant } = restaurant;
    const { name: nameParam, customer_rating: customer_ratingParam, distance: distanceParam, price: priceParam } = params;

    let nameWeight;
    if (nameParam) {
        const editDist = levenshtein.get(nameRestaurant, nameParam);
        nameWeight = 1 - (editDist/50)
    } else {
        // alphabetical?
    }

    // todo cuisine

    // rating
    let ratingWeight = 0;
    // less than the param is 0
    if (customer_ratingRestaurant < customer_ratingParam) {
        ratingWeight = 0;
    } else {
        const value = customer_ratingRestaurant;
        // todo 3 is something like 0.600000001
        ratingWeight = parseInt(value) * 0.2
    }

    // distance
    let distWeight
    if (distanceRestaurant === 0) {
        // there is no negative distance, so no need to consider the param in this case
        distWeight = 1; // you're right there on it bud
    } else if (distanceParam && distanceRestaurant > distanceParam) {
        // exclude anything that is farther  than the specified farthest restaurant
        distWeight = 0;
    } else {
        // distance weight-ing algo
        // assuming that a distance greater than 100 is negligible and not relevant
        distWeight = (100 - distanceRestaurant) * 0.01
    }



    return {
        nameWeight,
        ratingWeight,
        distWeight,
    }
}

module.exports = {
    addWeightToRestaurant
}