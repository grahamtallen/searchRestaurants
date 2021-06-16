const fs = require('fs')
const path = require('path')
const bucketedByDistanceRaw = fs.readFileSync(
    path.resolve('src/data-stores/bucketed-by-distance.json')
)
const bucketedByDistance = JSON.parse(bucketedByDistanceRaw)

const getDataSetBasedOnDistance = (distance) => {
    let resultSet = []
    for (let i = 0; i <= distance; i++) {
        const bucketAtThisDistance = bucketedByDistance[i];
        if (bucketAtThisDistance) {
           resultSet = resultSet.concat(bucketAtThisDistance.data)
        }
    }
    return resultSet;
};

module.exports = {
    getDataSetBasedOnDistance
}