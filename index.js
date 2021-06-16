



const query = (parameters, limit) => {
    // This function recieves parameters from the user, 
    // determines the dataset to start the search with
    const dataset = filterDatasetBasedOnParameters(parameters);
    // Performs a linear search of each of the items in the list
    // Determines result set based on search
    const resultset = getHighestRatedResultSet(parameters, limit);

    return resultset;
}