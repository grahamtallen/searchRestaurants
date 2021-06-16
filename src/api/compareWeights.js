/*
    A, B are restaurants 
*/
const compareWeights = (a, b) => {
    return a > b
}

const getMatchWeight = ({ nameWeight, distWeight, ratingWeight, cuisineWeight }, parameters) => {
    const { name, distance, customer_rating, cuisine } = parameters;
    // The total weight based on the parameters. 0 is used to filter out results
    if (name && nameWeight === 0) {
        return 0
    } else if (cuisine && cuisineWeight === 0) {
        return 0
    } else if (customer_rating && !ratingWeight) {
        return 0
    } else if (distance && !distanceWeight) {
        return 0
    }
    return nameWeight * 2 + distWeight * 3 + ratingWeight * 2 // todo price weight
}

module.exports = {
    compareWeights,
    getMatchWeight,
}
