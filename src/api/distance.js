const fs = require('fs')
const path = require('path')
const bucketedByDistanceRaw = fs.readFileSync(
    path.resolve('src/data-stores/bucketed-by-distance.json')
)
const bucketedByDistance = JSON.parse(bucketedByDistanceRaw)

const main = (distance) => {
    console.log(bucketedByDistance[1])
    return bucketedByDistance[distance].data;
};

module.exports = {
    main
}