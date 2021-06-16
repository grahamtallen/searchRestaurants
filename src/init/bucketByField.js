const fs = require("fs");
const path = require("path");
const { DATA_STORES_PATH } = require(".");



const bucketArrayByColumn = (array, column) => {
    // only works on a column with a reasonable amount of non-unique values
    // value must be a number or number/string
    const buckets = [];
    array.forEach((element) => {
        const value = element[column];
        const numValue = parseInt(value);
        const bucketForThisValue = buckets[numValue];
        if (!bucketForThisValue) {
            buckets[numValue] = {
                data: [element]
            }
        } else {
            bucketForThisValue.data.push(element);
        }
    });
    return buckets
}

const saveToDataStore = (data, filename) => {
    let json = JSON.stringify(data)
    fs.writeFileSync(DATA_STORES_PATH + filename, json)
}

const sortedByDistanceRaw = fs.readFileSync(
    path.resolve('src/data-stores/restaurants-sorted-by-distance.json')
)
const sortedByDistance = JSON.parse(sortedByDistanceRaw);
const buckets = bucketArrayByColumn(sortedByDistance, 'distance');
saveToDataStore(buckets, 'bucketed-by-distance.json');
console.log(buckets[1].data.length, buckets[2].data.length, buckets[3].data.length)

