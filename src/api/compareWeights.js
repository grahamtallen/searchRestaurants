/*
    A, B are restaurants 
*/
const compareWeights = (
    a,
    b
) => {
    return a > b
}

const getMatchWeight = ({
    nameWeight,
    distWeight,
    ratingWeight,
}) => {
    // const { name, distance, customer_rating } = parameters;

    // todo filter out certain weights based on existence parameters
    return (
        nameWeight * 2 +
        distWeight * 3 +
        ratingWeight * 2
    ) // todo price weight
}

module.exports = {
    compareWeights,
    getMatchWeight,
}
