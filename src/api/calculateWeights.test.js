console.log('Running test suite for calculating weights')
const { calculateRestaurantWeight } = require('./calculateWeights.js')
const { info, error } = console
const assert = require('assert')

const testNameWeight = () => {
    const res = {
        name: 'Mcdonalds',
    }
    const params = {
        name: 'Mcd',
    }
    const result = calculateRestaurantWeight(res, params)
    assert.strictEqual(result.nameWeight, 0.88)
}

const testRatingWeight = () => {
    const res = {
        customer_rating: '4',
    }
    const params = {
        customer_rating: 3,
    }
    const result = calculateRestaurantWeight(res, params)
    assert.strictEqual(
        result.ratingWeight,
        res.customer_rating * 0.2,
        'When restaurant rating is higher than searched rating, its 20% of the rating value.'
    )
}

const testRatingWeightWithFilter = () => {
    // when less than, rating should be zero
    const res = {
        customer_rating: '3',
    }
    const params = {
        customer_rating: 4,
    }
    const result = calculateRestaurantWeight(res, params)
    assert.strictEqual(
        result.ratingWeight,
        0,
        'When restaurant rating is lower than searched rating, weight should be zero.'
    )
}

testRatingWeightWithFilter()
testRatingWeight()
testNameWeight()
