const { info, error } = console
const {  compareWeights } = require('./compareWeights.js')
const { calculateRestaurantWeight } = require('./calculateWeights')
const main = (params, dataset = 0, matchFound) => {
    // const {
    //     name,
    //     distance,
    //     rating,
    // } = params
    if (dataset.length === 0) {
        throw new Error('Dataset provided to search function is empty')
    }
 

    for (let i = 0; i < dataset.length; i++) {
        const restauraunt = dataset[i]
        const { name, customer_rating, distance, cuisine, price } = restauraunt
        // info('Restaurant: ', {
        //     name,
        //     customer_rating,
        //     distance,
        //     cuisine,
        //     price,
        // })
        const currentRestaurantWeights = calculateRestaurantWeight(
            restauraunt,
            params
        )
        const { matchWeight } = currentRestaurantWeights
        // info('Restaurant Weights: ', currentRestaurantWeights)
        if (matchWeight) {
            matchFound(
                mergeObjects(restauraunt, currentRestaurantWeights)
            )
        }
        
    }
}

const mergeObjects = (restauraunt, weights) => {
    return {
        ...restauraunt,
        ...weights,
    }
}

module.exports = {
    main
}