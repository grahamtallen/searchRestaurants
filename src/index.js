const { main: filterDatasetBasedOnParameters } = require('./api/filter.js');
const { main: getHighestRatedResultSet } = require('./api/search.js');



const query = (parameters, limit) => {
    // This function recieves parameters from the user, 
    // determines the dataset to start the search with
    const dataset = filterDatasetBasedOnParameters(parameters);
    // Performs a linear search of each of the items in the list
    // Determines result set based on search
    // This also functions as another filter, 
    // see getMatchWeight to make sure non-matched items do not end up in weighted result set
    const resultset = getHighestRatedResultSet(parameters, dataset, limit);

    return resultset;
}

console.log(query({
    name: 'Crisp',
    cuisine: 'Russ',
    customer_rating: 4
}))