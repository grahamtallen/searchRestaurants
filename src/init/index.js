const csvtojson = require('csvtojson/v2')
const { bucketArrayByColumn } = require("./bucketByField") // some files are initialized inside of the module
const fs = require('fs')
const keyBy = require('lodash/keyBy')
const path = require('path')
const RESTAURANTS_ALL_PATH = 'csv/restaurants.csv'
const CUISINES_ALL_PATH = 'csv/cuisines.csv'

const main = async () => {
    let restaurantsAll = await csvtojson().fromFile(RESTAURANTS_ALL_PATH)
    const cuisinesAll = await csvtojson().fromFile(CUISINES_ALL_PATH)
    // join cusine
    const cuisinesKeyedById = keyBy(cuisinesAll, cuisine => cuisine.id)
    restaurantsAll = restaurantsAll.map(restaurant => {
        restaurant.cuisine = cuisinesKeyedById[restaurant.cuisine_id].name
        return restaurant
    })
    const sortedByDistance = restaurantsAll.sort((a, b) => a.distance - b.distance);
    saveToDataStore(
        sortedByDistance,
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
}

const saveToDataStore = (data, filename) => {
    let json = JSON.stringify(data)
    fs.writeFileSync('src/data-stores/' + filename, json)
}

main()
