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

    // Customer rating: bucket every restaruant by customer rating
    const FiveStarRestaurants = []
    const FourStarRestaurants = []
    const ThreeStarRestaurants = []
    const TwoStarRestaurants = []
    const OneStarRestaurants = []
    // TODO bucket all items in a single list based on range
    restaurantsAll.forEach(restaurant => {
        const { customer_rating } = restaurant
        switch (customer_rating) {
            case '5':
                FiveStarRestaurants.push(restaurant)
                break
            case '4':
                FourStarRestaurants.push(restaurant)
                break
            case '3':
                ThreeStarRestaurants.push(restaurant)
                break
            case '2':
                TwoStarRestaurants.push(restaurant)
                break
            case '1':
                OneStarRestaurants.push(restaurant)
                break
            default:
                throw new Error(
                    'Unhandled restaurant rating: ' + customer_rating
                )
        }
    })
    const completeBucketedRestaurants = {
        FiveStarRestaurants,
        FourStarRestaurants,
        ThreeStarRestaurants,
        TwoStarRestaurants,
        OneStarRestaurants,
    }

    saveToDataStore(completeBucketedRestaurants, 'bucketed-by-rating.json')


    // Distance: keep it simple and build a set with the distance as the key

    // add all restaurants distances to a distances array
    distances = restaurantsAll.sort((a, b) => {
        const distA = parseFloat(a.distance)
        const distB = parseFloat(b.distance)
        // sort the shorter distances first
        return distA - distB
    })
    // const distancesBucketed
}

// main()

const saveToDataStore = (data, filename) => {
    let json = JSON.stringify(data)
    fs.writeFileSync(DATA_STORES_PATH + filename, json)
}

module.exports = {
    DATA_STORES_PATH
}

main();