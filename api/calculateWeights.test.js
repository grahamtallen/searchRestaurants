const { addWeightToRestaurant } = require("./weights.js");
const { info, error } = console;
const assert = require("assert");

const testNameWeight = () => {
    const res = {
        name: "Mcdonalds"
    }
    const params = {
        name: "Mcd"
    }
    const result = addWeightToRestaurant(res, params);
    assert.strictEqual(result.nameWeight, 0.88);
}

const testRatingWeight = () => {
    const res = {
        customer_rating: 4,
    }
    const params = {
        customer_rating: 3,
    }
    const result = addWeightToRestaurant(res, params);
    assert.strictEqual(result.ratingWeight, res.customer_rating * 0.2, "When rating is higher than searched rating, its 20% of the rating value.");
}

testRatingWeight();
testNameWeight();