const { addWeightToRestaurant } = require("./weights.js");
const fs = require("fs");
// data-stores/restaurants-sorted-by-distance.json must be present in order for the file to run
// see the init directory
const sortedByDistanceRaw = fs.readFileSync("data-stores/restaurants-sorted-by-distance.json");
const sortedByDistance = JSON.parse(sortedByDistanceRaw);
const { info, error } = console;
const assert = require("assert");

const tryAQuery = () => {
    const params = {
        name: "Grill"
    }
    // This array will always hold <= 5 elements
    // The zeroth element will hold the highest weighted restaurant
    // The index-4 element will hold the 5th highest weighted restaurant
    // loop will continue till the end of the entire list, and will have perfectly weighted values for each parameter.
    // At the end, it is assumed that the highestWeights array contains the top 5 list matches based on the provided parameters.
    // No other calculations are needed, the response can be returned.

    // the given data array of restaurants should always be

    const highestWeights = [];
    for (let i = 0; i < sortedByDistance.length; i++) {
        const restauraunt = sortedByDistance[i];
        const { name, customer_rating, distance} = restauraunt;
        // if (name.includes("Grill")) {
        //     info({ name, customer_rating, distance})
            
        // }
        // TODO tune string parameters
        const { nameWeight, ratingWeight, distWeight } = addWeightToRestaurant(restauraunt, params);
        // compare to first (zeroth) element in highestWeights array

        if (weightedHigherThanFirstElement) {
            // unshift and add this restaurant to the first element in the array
            // the last element will be dropped
        }

        // compare to last element in highestWeights array
        if (!weightedHigherThanFirstElement && weightedHigherThanLastElement) {
            // if the last element is the 5th item in the array,
            // 
            // push this element to the last element, push each other element up one
            // dropping the first element
        }
        
    }
}

tryAQuery();