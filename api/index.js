const { calculateRestaurantWeight } = require("./calculateWeights.js");
const fs = require("fs");
// data-stores/restaurants-sorted-by-distance.json must be present in order for the file to run
// see the init directory
const sortedByDistanceRaw = fs.readFileSync("data-stores/restaurants-sorted-by-distance.json");
const sortedByDistance = JSON.parse(sortedByDistanceRaw);
const { info, error } = console;
const assert = require("assert");
const { getMatchWeight, compareWeights } = require("./compareWeights.js");

const tryAQuery = () => {
    const params = {
        // name: "Grill",
        // distance: 2,
        rating: 4,
    }


    const LIMIT = 5;
    // This  array will always hold <= LIMIT elements
    // The zeroth element will hold the highest weighted restaurant
    // The index-4 element will hold the LIMITth highest weighted restaurant
    // loop will continue till the end of the entire list, and will have perfectly weighted values for each parameter.
    // At the end, it is assumed that the highestWeights array contains the top LIMIT list matches based on the provided parameters.
    // No other calculations are needed, the response can be returned.
    const highestWeights = [];

    // the given data array of restaurants should always be

    for (let i = 0; i < sortedByDistance.length; i++) {
        const restauraunt = sortedByDistance[i];
        const { name, customer_rating, distance} = restauraunt;
        info("Restaurant: ", { name, customer_rating, distance})

        // if (name.includes("Grill")) {
            
        // }
        // TODO tune string parameters
        const currentRestaurantWeights = calculateRestaurantWeight(restauraunt, params);
        const { nameWeight, ratingWeight, distWeight, matchWeight } = currentRestaurantWeights;
        console.log("Restaurant Weights: ", currentRestaurantWeights);
        console.log("Total: ", matchWeight);
        if (highestWeights.length === 0) {
            // add restaurants with any weight to highestWeights when it is zero
            if (matchWeight) {
                highestWeights.unshift(addRestaurauntWithWeights(restauraunt, currentRestaurantWeights));
            }
        } else {
            // compare to first (zeroth) element in highestWeights array
            const firstElement = highestWeights[0];
            const weightedHigherThanFirstElement = compareWeights(
                matchWeight,
                firstElement.matchWeight,
                params,
            )
            const lastElement = highestWeights[highestWeights.length - 1];
            const weightedHigherThanLastElement = compareWeights(
                matchWeight,
                lastElement.matchWeight,
                params,
            )
            console.log({firstElement, lastElement})
            console.log({weightedHigherThanFirstElement, weightedHigherThanLastElement})
            if (weightedHigherThanFirstElement) {
                // unshift and add this restaurant to the first element in the array
                highestWeights.unshift(addRestaurauntWithWeights(restauraunt, currentRestaurantWeights))
                // the last element will be dropped
                // check length here for error state?
                // delete highestWeights[LIMIT + 1]
            } else if (weightedHigherThanLastElement) {
                highestWeights[highestWeights.length - 1] = addRestaurauntWithWeights(restauraunt, currentRestaurantWeights)
                // info({weightedHigherThanFirstElement})
                // if the current item is weighted higher than the last item in the list,
                // continue iterating until one is found that has a higher rating than the current element

                // At most this should only iterate up to the 2nd element
                // the first if statement here handles the case where the first element is lower

                // push each other element up one,
                // const newHighestWeights = highestWeights.slice(highestWeights)
                
                // push this element to the last element, 
                // dropping the first element
            }
        }
    }

    return highestWeights
}

const addRestaurauntWithWeights = (restauraunt, weights) => {
    return {
        ...restauraunt,
        ...weights,
    }
}

info(tryAQuery());