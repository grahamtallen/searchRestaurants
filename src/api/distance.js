const fs = require('fs')
const path = require('path')
const bucketedByDistanceRaw = fs.readFileSync(
    path.resolve('src/data-stores/bucketed-by-distance.json')
)
const bucketedByDistance = JSON.parse(bucketedByDistanceRaw)

const main = (distance) => {
    return bucketedByDistance[distance].data;
};

const hasDataAtThatDistance = (distance) => !!bucketedByDistance[distance]

module.exports = {
    main,
    hasDataAtThatDistance
}