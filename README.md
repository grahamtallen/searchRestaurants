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

- I did not have time to run comprehensive tests
- Execution time was measured using the time linux program: "time node src/index.js"

Assumptions

-   The string parameters will always be spelled correctly.
-   The restaraunts are evenly distributed amoung their attribute values. There is no need to optimize or make assumptions about the distributions of the data set, or optimize for any specific ranges.
-   The number of rows on each table is unbounded.
-   customer_rating has a max value of 5 and a minimum value of 1.
-   customer_rating is always an integer.
-   f(n) should be greater than or equal to O(n)
-   Each parameter can contain only one value.
-   Only return the 5 Best Matches.
-   Code is clean, readable, testable, robust, performant, and maintainable.
-   Price can be bucketed to intervals of 5

Weaknesses of this approach and todos

- The filters to limit the size of the data linearly searched could be improved. Right now they only work one at at time, so adding multiple parameters will slow down the problem, see src/api/filter.js
- The performance of the fast-levenshtein library is unknown

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
