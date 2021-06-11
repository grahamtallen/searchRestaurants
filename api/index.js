const { addWeightToRestaurant } = require("./weights.js");
const fs = require("fs");
const sortedByDistanceRaw = fs.readFileSync("data-stores/restaurants-sorted-by-distance.json");
const sortedByDistance = JSON.parse(sortedByDistanceRaw);
const { info, error } = console;
const assert = require("assert");

const tryAQuery = () => {
    const params = {
        name: "Mcd"
    }
    // This array will always hold <= 5 elements
    // The zeroth element will hold the highest weighted restaurant
    // The index-4 element will hold the 5th highest weighted restaurant
    const highestWeights = [];
    for (let i = 0; i < sortedByDistance.length; i++) {
        const restauraunt = sortedByDistance[i];
        info(addWeightToRestaurant(restauraunt, {}))
    }
}

tryAQuery();