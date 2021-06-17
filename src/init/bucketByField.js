const { assert } = require('console')
const fs = require('fs')
const path = require('path')
const { DATA_STORES_PATH } = require('.')

const bucketArrayByColumn = (array, column, order = 'desc') => {
    // only works on a column with a reasonable amount of non-unique values
    // value must be a number or number/string
    // order is the inclusion criteria
    console.warn('Inefficient, do not run this inside of any http handler')
    const buckets = []
    let greatestDistance = 0
    let numberOfIndividualBuckets = 0
    array.forEach(element => {
        const value = element[column]
        const numValue = parseInt(value)
        const bucketForThisValue = buckets[numValue]
        if (numValue > greatestDistance) {
            greatestDistance = numValue
        }
        if (!bucketForThisValue) {
            buckets[numValue] = {
                data: [element],
                range:
                    order === 'desc'
                        ? `0 through ${numValue}`
                        : `${numValue} through 0`,
            }
            numberOfIndividualBuckets++
        } else {
            bucketForThisValue.data.unshift(element)
        }
        resolveBuckets(element, buckets, numValue, greatestDistance, order)
    })
    // console.log(`Completed: `, greatestDistance, numberOfIndividualBuckets);
    return buckets
}

const resolveBuckets = (
    newItemToAddToBucket,
    buckets,
    searchIndex,
    max,
    order
) => {
    const bucketAtThisIndex = buckets[searchIndex]
    if (bucketAtThisIndex) {
        if (order === 'desc') {
            // add this item to every bucket from the highest index down to  the search index
            for (let i = max; i > searchIndex; i--) {
                const bucketExistsAtThisHigherIndex = buckets[i]
                if (bucketExistsAtThisHigherIndex) {
                    bucketExistsAtThisHigherIndex.data.unshift(
                        newItemToAddToBucket
                    )
                }
            }
        } else if ((order = 'asc')) {
            // add this item to every bucket from the search index up to  the highest index
            for (let i = 1; i <= searchIndex; i++) {
                const bucketExistsAtThisHigherIndex = buckets[i]
                if (bucketExistsAtThisHigherIndex) {
                    bucketExistsAtThisHigherIndex.data.unshift(
                        newItemToAddToBucket
                    )
                }
            }
        }
    }
}

const saveToDataStore = (data, filename) => {
    let json = JSON.stringify(data)
    fs.writeFileSync(DATA_STORES_PATH + filename, json)
}

const sortedByDistanceRaw = fs.readFileSync(
    path.resolve('src/data-stores/restaurants-sorted-by-distance.json')
)
const sortedByDistance = JSON.parse(sortedByDistanceRaw)

const buckets = bucketArrayByColumn(sortedByDistance.reverse(), 'distance') // reverse very important here for the type of ordering we're trying to do in the next function
saveToDataStore(buckets, 'bucketed-by-distance.json')

const bucketsByRating = bucketArrayByColumn(
    sortedByDistance.reverse(),
    'customer_rating',
    'asc'
) // reverse very important here for the type of ordering we're trying to do in the next function
saveToDataStore(bucketsByRating, 'bucketed-by-rating.json')
// console.log('Shouldonly see 3 and up here', bucketsByRating[3].data.map(item => item.customer_rating))

const bucketsByPrice = bucketArrayByColumn(sortedByDistance.reverse(), 'price') // reverse very important here for the type of ordering we're trying to do in the next function
saveToDataStore(bucketsByPrice, 'bucketed-by-price.json')
