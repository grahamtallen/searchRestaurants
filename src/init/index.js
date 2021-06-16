const csvtojson = require('csvtojson/v2')
const fs = require('fs');
const keyBy = require('lodash/keyBy');
const RESTAURANTS_ALL_PATH = 'csv/restaurants.csv'
const CUISINES_ALL_PATH = 'csv/cuisines.csv'
const DATA_STORES_PATH = 'src/data-stores/'

const main = async () => {
    let restaurantsAll = await csvtojson().fromFile(RESTAURANTS_ALL_PATH)
    const cuisinesAll = await csvtojson().fromFile(CUISINES_ALL_PATH);
    // join cusine
    const cuisinesKeyedById = keyBy(cuisinesAll, cuisine => cuisine.id);
    restaurantsAll = restaurantsAll.map(restaurant => {
        restaurant.cuisine = cuisinesKeyedById[restaurant.cuisine_id].name
        return restaurant
    })

    saveToDataStore(
        restaurantsAll.sort((a, b) => a.distance - b.distance),
        'restaurants-sorted-by-distance.json'
    )
    // data store for restaraunts by name
    let byName = {}
    restaurantsAll.forEach(restaurant => {
        const { name } = restaurant
        const nameLowerCaseNoSpaces = name.toLowerCase().replace(/\s/g, '')
        restaurant.nameLowerCaseNoSpaces = nameLowerCaseNoSpaces
        byName[nameLowerCaseNoSpaces] = restaurant
    })
    saveToDataStore(byName, 'byName-keyed-object.json')


}


const saveToDataStore = (data, filename) => {
    let json = JSON.stringify(data)
    fs.writeFileSync(DATA_STORES_PATH + filename, json)
}

module.exports = {
    DATA_STORES_PATH
}

main();