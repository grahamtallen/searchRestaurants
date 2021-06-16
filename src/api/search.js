const sortedByDistance = JSON.parse(sortedByDistanceRaw)
const { info, error } = console
const assert = require('assert')
const { getMatchWeight, compareWeights } = require('./compareWeights.js')

const main = (params, onResult) => {
    const {
        name,
        distance,
        rating,
    } = params

    const LIMIT = 5
    // This  array will always hold <= LIMIT elements
    // The zeroth element will hold the highest weighted restaurant
    // The index-4 element will hold the LIMITth highest weighted restaurant
    // loop will continue till the end of the entire list, and will have perfectly weighted values for each parameter.
    // At the end, it is assumed that the highestWeights array contains the top LIMIT list matches based on the provided parameters.
    // No other calculations are needed, the response can be returned.
    const highestWeights = []

    // the given data array of restaurants should always be

    for (let i = 0; i < dataset.length; i++) {
        const restauraunt = dataset[i]
        const { name, customer_rating, distance } = restauraunt
        info('Restaurant: ', {
            name,
            customer_rating,
            distance,
        })

        // if (name.includes("Grill")) {

        // }
        // TODO tune string parameters
        const currentRestaurantWeights = calculateRestaurantWeight(
            restauraunt,
            params
        )
        const { matchWeight } = currentRestaurantWeights
        // console.log('Restaurant Weights: ', currentRestaurantWeights)
        // console.log('Total: ', matchWeight)
        if (highestWeights.length === 0) {
            // add restaurants with any weight to highestWeights when it is zero
            if (matchWeight) {
                highestWeights.unshift(
                    mergeObjects(restauraunt, currentRestaurantWeights)
                )
            }
        } else {
            // compare to first (zeroth) element in highestWeights array
            // linear function
            const lastElement = highestWeights[highestWeights.length - 1]
            const weightedHigherThanLastElement = compareWeights(
                matchWeight,
                lastElement.matchWeight,
                params
            )
        
            if (weightedHigherThanLastElement) {
                // info({weightedHigherThanFirstElement})
                // if the current item is weighted higher than the last item in the list,
                // continue iterating until one is found that has a higher rating than the current element

                // At most this should only iterate up to the 2nd element
                // the first if statement here handles the case where the first element is lower

                // push each other element up one,
                // const newHighestWeights = highestWeights.slice(highestWeights)

                // push this element to the last element,
                // dropping the first element
                const getElementIndexRatedHigherThanCurrentRestaraunt = (
                    searchRestaraunt,
                    indextoCompare,
                    weightedSortedRestaraunts = []
                ) => {
                    
                    // Using in-memory variable highestWeights
                    const restarauntAtComparisonIndex =
                        weightedSortedRestaraunts[indextoCompare]
                    const weightComparisonResult = compareWeights(
                        searchRestaraunt.matchWeight,
                        restarauntAtComparisonIndex.matchWeight
                    )
                    const isZerothElement = indextoCompare === 0

                    if (weightComparisonResult) {
                        if (isZerothElement) {
                            // current searchRestaraunt
                            return 'This restaraunt is highest weighted'
                        } else {
                            return getElementIndexRatedHigherThanCurrentRestaraunt(
                                searchRestaraunt,
                                currentIndex - 1, // iterate upwards until zero element is compared or higher restaurant found
                                weightedSortedRestaraunts
                            )
                        }
                    } else {
                        return indextoCompare
                    }
                }

                const indexThatCurrentRestarantShouldReplace =
                    getElementIndexRatedHigherThanCurrentRestaraunt(
                        restauraunt,
                        highestWeights.length - 1, // get last index of array
                        highestWeights
                    )

                if (
                    indexThatCurrentRestarantShouldReplace ===
                    'This restaraunt is highest weighted'
                ) {
                    highestWeights.unshift(
                        mergeObjects(restauraunt, currentRestaurantWeights)
                    )
                }
                //console.log(indexThatCurrentRestarantShouldReplace)
            }
        }
    }

    return highestWeights
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