const csvtojson = require("csvtojson/v2");

const RESTAURANTS_ALL_PATH = "csv/restaurants.csv"

const main = async () => {
	const restaurantsAll = await csvtojson().fromFile(RESTAURANTS_ALL_PATH);
	// data store for restaraunts by name
	let byName = {};
	restaurantsAll.forEach(restaurant => {
		const { name } = restaurant;
		const nameLowerCaseNoSpaces = name.toLowerCase().replace(/\s/g, "");
		restaurant.nameLowerCaseNoSpaces = nameLowerCaseNoSpaces
		byName[nameLowerCaseNoSpaces] = restaurant;
	});


	// Customer rating: bucket every restaruant by customer rating
	const FiveStarRestaurants = [];
	const FourStarRestaurants = [];
	const ThreeStarRestaurants = [];
	const TwoStarRestaurants = [];
	const OneStarRestaurants = [];
	restaurantsAll.forEach(restaurant => {
		const { customer_rating } = restaurant;
		switch (customer_rating) {
			case '5':
				FiveStarRestaurants.push(restaurant);
				break;
			case '4':
				FourStarRestaurants.push(restaurant);
				break;
			case '3':
				ThreeStarRestaurants.push(restaurant);
				break;
			case '2':
				TwoStarRestaurants.push(restaurant);
				break;
			case '1':
				OneStarRestaurants.push(restaurant);
				break;
			default:
				throw new Error("Unhandled restaurant rating: " + customer_rating)
		}
	})
	console.log({
		FiveStarRestaurants: FiveStarRestaurants.length,
		OneStarRestaurants: OneStarRestaurants.length
	})
	

}

main();

