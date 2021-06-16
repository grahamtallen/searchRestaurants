const fs = require("fs");
const path = require("path");
const { DATA_STORES_PATH } = require(".");



const bucketArrayByColumn = (array, column) => {
    // only works on a column with a reasonable amount of non-unique values
    // value must be a number or number/string
    console.warn('Inefficient, do not run this inside of any http handler');
    const buckets = [];
    let greatestDistance = 0;
    let numberOfIndividualBuckets = 0;
    array.forEach((element) => {
        const value = element[column];
        const numValue = parseInt(value);
        const bucketForThisValue = buckets[numValue];
        if (numValue > greatestDistance) {
            greatestDistance =  numValue
        };
        if (!bucketForThisValue) {
            buckets[numValue] = {
                data: [element],
                range: `${numValue} through 0)`
            }
            numberOfIndividualBuckets++
        } else {
            bucketForThisValue.data.push(element);
        }
        resolveBuckets(element, buckets, numValue, greatestDistance)
    });
    console.log(`Completed: `, greatestDistance, numberOfIndividualBuckets);
    return buckets
}

const resolveBuckets = (newItemToAddToBucket, buckets, searchIndex, max) => {
    console.log({max, searchIndex})

    const bucketAtThisIndex = buckets[searchIndex];
    if (bucketAtThisIndex) {
        // add this item to every bucket from the highest index down to  the search index
        for (let i = max; i > searchIndex; i--) {
            const bucketExistsAtThisHigherIndex = buckets[i];
            if (bucketExistsAtThisHigherIndex) {
                bucketExistsAtThisHigherIndex.data.push(newItemToAddToBucket)
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
const sortedByDistance = JSON.parse(sortedByDistanceRaw);
const buckets = bucketArrayByColumn(sortedByDistance.reverse(), 'distance'); // reverse very important here for the type of ordering we're trying to do in the next function
saveToDataStore(buckets, 'bucketed-by-distance.json');
// console.log(buckets[1].data.length, buckets[2].data.length, buckets[3].data.length)

