// Main function to test the queries and results sets
// Run by using Node.js `node src/index.js`

const { performQueryAndGetResultSet } = require('./api/query')

const main = () => {
    const LIMIT = 5
    console.log(
        performQueryAndGetResultSet(
            {
                name: 'Grill',
                customer_rating: 5,
                distance: 5,
                cuisine: 'Other',
            },
            LIMIT
        ).
    )
    console.log(
        performQueryAndGetResultSet(
            {
                // name: 'Grill',
                customer_rating: 5,
                distance: 3,
                // cuisine: 'Other',
            },
            LIMIT
        )
    ) // for viewing fields in the log
    //.map(restaurant => restaurant.distance))
}

main()
