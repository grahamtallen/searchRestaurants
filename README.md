# searchRestaurants

A small node program that performs queries on a restaurants database.

## Methodology

The focus of this project was to optimize the performance of querying against this dataset. One important optimization - Before the queries are run, there are buckets that are generated so that queries do not have to perform the bucketing at the runtime. See `src/init/index.js`
The best function to start analyzing this my code is `performQueryAndGetResultSet`.
It will get the data set of items filtered by the current search parameters
And then, build a result set of the 5 required best-matches based on parameters
It will only iterate through the dataset one time, for effeciency. 
Nodejs was chosen simply because I am fluent in it.

Assumptions

-   The string parameters will always be spelled correctly.
-   The restaraunts are evenly distributed amoung their attribute values. There is no need to optimize or make assumptions about the distributions of the data set, or optimize for any specific ranges.
-   The number of rows on each table is unbounded.
-   customer_rating has a max value of 5 and a minimum value of 1.
-   customer_rating, price, distance is always an integer.
-   Each parameter can contain only one value.
-   Only return the 5 Best Matches.
-   Code is clean, readable, testable, robust, performant, and maintainable.
-   Price can be bucketed to intervals of 5

Weaknesses of this approach and todos

- The filters to limit the size of the data linearly searched could be improved. Right now they only work one at at time, so adding multiple parameters will slow down the problem, see src/api/filter.js
- The performance of the fast-levenshtein library is unknown

Prerequisites

- Install node.js (preferrably with nvm)
- If you did not use nvm to install node, you must also install npm - node package manger

Installing libraries

- `npm -i`

Running the program
- Initialize the json bucket files used for optimized querying:
- run the command `mkdir src/data-stores && node src/init/index.js`
- This will create a number of bucketed data results in src/data-stores
- run the command `node src/index.js`
- The results of the two queries in that file are logged to the console
- You can try getting different result sets by modifying those parameters

Testing

- Queries should return expected results.
- Tests can be found throughout theses .js and .test.js files, where the assert() module is used to assert an expected result. The assert module will throw an error to stderr if any test recieves an unexpected result.

Quantifying performance

- Execution time was measured using the time linux program: "time node src/index.js"

Notes:

Readablility

Installed modern prettier

Robust

Works in such a way that if other services fail, it reports correctly - N/A

Maintainability

Methodology:

Assess the problem space: what do we need to solve first?

-   Base case - The search function needs to handle each parameter accurately first,
    then implement the solution for "best matches"
    Ideally, each restarant is seeded into some data store that stores each one by its column value, implement column based storage that DW's use.
    Take each parameter and build a data store that can quickly get results for that type of query.
