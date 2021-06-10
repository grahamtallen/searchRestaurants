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
	s

	console.log(byName)
	

}

main();

