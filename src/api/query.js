const { assert } = require('console')
const { main: filterDatasetBasedOnParameters } = require('./filter.js')
const { main: getHighestRatedResultSet } = require('./search.js')

const query = (parameters, onMatchFound) => {
    // This executes onMatchFound when a result with any weight greater than 0 is found.
    // This function recieves parameters from the user,
    // determines the dataset to iterate over
    // TODO filterDatasetBasedOnParameters Does not work with multiple parameters.
    // Because of this, Big O of this algorithm with multiple parameters is always at least equal to n
    const dataset = filterDatasetBasedOnParameters(parameters)
    // Performs a linear search of each of the items in the list
    // Determines result set based on search
    // This also functions as another filter,
    // see getMatchWeight to make sure non-matched items do not end up in weighted result set
    const resultset = getHighestRatedResultSet(
        parameters,
        dataset,
        onMatchFound
    )

    return resultset
}

const performQueryAndGetResultSet = (parameters, limit) => {
    let highestWeights = []

    const onMatchFound = match => {
        if (highestWeights.length === 0) {
            highestWeights.unshift(match)
        } else {
            const highestWeightsCopy = highestWeights
            for (let i = highestWeights.length - 1; i >= 0; i--) {
                const item = highestWeights[i]
                const isHigherOrEqual =
                    i === 0 ||
                    (item ? match.matchWeight >= item.matchWeight : false)
                if (isHigherOrEqual) {
                    highestWeightsCopy.unshift(match)
                
                    break // no need to continue the loop, highest item found
                } else {
                    continue
                }
            }
            if (highestWeightsCopy.length > limit) {
                highestWeightsCopy.pop();
            }
            highestWeights = highestWeightsCopy
        }
    }
    query(parameters, onMatchFound)
    return highestWeights
}

const testQuerySuite = () => {
    query(
        {
            customer_rating: 4,
        },
        restaurant => {
            assert(
                restaurant.customer_rating === '5' ||
                    restaurant.customer_rating === '4'
            )
        }
    )

    query(
        {
            cuisine: 'Chinese',
        },
        restaurant => {
            assert(restaurant.cuisine.includes('Chinese'))
        }
    )

    query(
        {
            customer_rating: 4,
        },
        restaurant => {
            assert(
                restaurant.customer_rating === '5' ||
                    restaurant.customer_rating === '4'
            )
        }
    )

    query(
        {
            name: 'Lounge',
        },
        restaurant => {
            assert(restaurant.name.includes('Lounge'))
        }
    )

    // Test that the and reslationship works
}

testQuerySuite()

module.exports = {
    performQueryAndGetResultSet,
}
