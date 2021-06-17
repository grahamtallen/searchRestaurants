// Main function to test the queries and results sets
// Run by using Node.js `node src/index.js`

const { performQueryAndGetResultSet } = require('./api/query')

const main = () => {
    const LIMIT = 5
    const query1 = {
        name: 'Grill',
        customer_rating: 5,
        distance: 5,
        cuisine: 'Other',
    };
    console.log("Result of query 1: ", query1)
    console.log(
        performQueryAndGetResultSet(
            query1,
            LIMIT
        )
    )
    const query2 = {
        // name: 'Grill',
        customer_rating: 5,
        distance: 3,
        // cuisine: 'Other',
    }
    console.log("Result of query 1: ", query2)
    console.log(
        performQueryAndGetResultSet(
            query2,
            LIMIT
        )
    ) // for viewing fields in the log
    //.map(restaurant => restaurant.distance))
}

main()
