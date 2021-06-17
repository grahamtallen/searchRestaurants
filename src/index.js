const { assert } = require('console');
const { main: filterDatasetBasedOnParameters } = require('./api/filter.js');
const { main: getHighestRatedResultSet } = require('./api/search.js');



const query = (parameters, onMatchFound) => {
    // This executes onMatchFound when a result with any weight greater than 0 is found.
    // This function recieves parameters from the user, 
    // determines the dataset to iterate over
    // Does not work with multiple parameters, Big O of this algorithm with multiple parameters is always at least equal to n
    const dataset = filterDatasetBasedOnParameters(parameters);
    // Performs a linear search of each of the items in the list
    // Determines result set based on search
    // This also functions as another filter, 
    // see getMatchWeight to make sure non-matched items do not end up in weighted result set
    const resultset = getHighestRatedResultSet(parameters, dataset, onMatchFound);

    return resultset;
}

const performQueryAndGetResultSet = (parameters, limit) => {
    const highestWeights = [];
    const matchIsWeightedHigherThanItem = (match, highestWeights, index) => {
        const lowestHighWeightedItem = highestWeights[index];
        return lowestHighWeightedItem.matchWeight < match.matchWeight;
    }
    const onMatchFound = (match, nextIndex) => {
        console.log("Called", nextIndex)
        let firstIndexToCheck;
        if (nextIndex && nextIndex >= -1) {
            firstIndexToCheck = nextIndex;
        } else if (highestWeights.length) {
            firstIndexToCheck = highestWeights.length - 1;
        } else {
            firstIndexToCheck = 0
        }
        const itemExists = highestWeights[firstIndexToCheck]
        if (!itemExists) {
            if (firstIndexToCheck === 0) {
                highestWeights[0] = match;
            }
            return;
        }
        const isHigher = matchIsWeightedHigherThanItem(match, highestWeights, firstIndexToCheck);

        if (isHigher) {
            // check if there is a next highest element,
            // if not, and the next highest elemement is higher or undefined, 
            // This index should be come the current elements new home.
            const nextIndex = firstIndexToCheck - 1;
            
            // check if result set is already full
            const resultsetIsFull = highestWeights.length === limit;
            const nextItemInTheListExists = !!highestWeights[nextIndex];
            
            if (!resultsetIsFull) {
                console.log({
                    resultsetIsFull, nextItemInTheListExists, nextIndex, firstIndexToCheck
                })

            }

            if (!nextItemInTheListExists) {
                
                    highestWeights.unshift(match);
            } else {
                const isHigherThanNextItem = matchIsWeightedHigherThanItem(match, highestWeights, nextIndex);
                if (isHigherThanNextItem) {
                    // can skip since next item has already been evaulated
                    // onMatchFound(match, nextIndex)
                } else {
                    if (!resultsetIsFull) {
                        highestWeights.push(match);
                    }
                }
            }

            

        } 
    }
    query(parameters, onMatchFound);
    return highestWeights

}

console.log(performQueryAndGetResultSet({
    name: 'Grill',
    customer_rating: 5
}, 5))

const testQuerySuite = () => {
    query({
        customer_rating: 4
    }, restaurant => {
        assert(restaurant.customer_rating === '5' || restaurant.customer_rating === '4')
    });

    query({
        cuisine: 'Chinese'
    }, restaurant => {
        assert(restaurant.cuisine.includes('Chinese'))
    });

    query({
        customer_rating: 4
    }, restaurant => {
        assert(restaurant.customer_rating === '5' || restaurant.customer_rating === '4')
    });

    query({
        name: 'Lounge'
    }, restaurant => {
        assert(restaurant.name.includes('Lounge'))
    });

    // Test that the and reslationship works
}

testQuerySuite();