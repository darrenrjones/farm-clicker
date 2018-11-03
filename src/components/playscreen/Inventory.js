import React from "react";
import { connect } from "react-redux";
import rateMap from '../../actions/helpers/rateMap';


export const Inventory = (props) => {

	const cropRates = props.currentUser.crops.map(crop => crop.manager ? rateMap[crop.count] : 0); // if no manager dont add to total.

	const animalRates = props.currentUser.animals.map(animal => animal.manager ? rateMap[animal.count] : 0);

	const wheatProduction = cropRates[0] + cropRates[1] + cropRates[2];
	const cornProduction = cropRates[3] + cropRates[4] + cropRates[5];
	const soyProduction = cropRates[6] + cropRates[7] + cropRates[8];
	const cloverProduction = cropRates[9] + cropRates[10] + cropRates[11];
	const fishfoodProduction = cropRates[12];

	const eggProduction = animalRates[0] + animalRates[1] + animalRates[2];
	const baconProduction = animalRates[3] + animalRates[4] + animalRates[5];
	const woolProduction = animalRates[6] + animalRates[7] + animalRates[8];
	const milkProduction = animalRates[9] + animalRates[10];
	const goatcheeseProduction = animalRates[11];
	const fishfilletProduction = animalRates[12];

	const wheatConsumption = eggProduction + baconProduction + goatcheeseProduction;
	const cornConsumption = baconProduction + milkProduction + goatcheeseProduction;
	const soyConsumption = milkProduction + goatcheeseProduction;
	const cloverConsumption = woolProduction + goatcheeseProduction;
	const fishfoodConsumption = fishfilletProduction;

	const roundToTwo = num => {
		return (Math.round(num * 100) / 100);
	}

	return (
		<div class="Rtable Rtable--4cols">

			<div class="Rtable-cell"><h3>Wheat</h3></div>
			<div class="Rtable-cell">{props.currentUser.inventory.wheat}</div>
			<div class="Rtable-cell">+{roundToTwo(wheatProduction)}/sec</div>
			<div class="Rtable-cell"><strong>-{roundToTwo(wheatConsumption)} /sec</strong></div>

		<div class="Rtable-cell"><h3>Wheat</h3></div>
			<div class="Rtable-cell">{props.currentUser.inventory.wheat}</div>
			<div class="Rtable-cell">+{roundToTwo(wheatProduction)}/sec</div>
			<div class="Rtable-cell"><strong>-{roundToTwo(wheatConsumption)} /sec</strong></div>
			<div class="Rtable-cell"><h3>Wheat</h3></div>
			<div class="Rtable-cell">{props.currentUser.inventory.wheat}</div>
			<div class="Rtable-cell">+{roundToTwo(wheatProduction)}/sec</div>
			<div class="Rtable-cell"><strong>-{roundToTwo(wheatConsumption)} /sec</strong></div>
		</div>
	)









	// return (
	// 	<div className='inventory-text'>
			// Wheat: {props.currentUser.inventory.wheat}
			// <br></br>
			// +{roundToTwo(wheatProduction)}
			// <span>/sec</span>
			// <br></br>
			// -{roundToTwo(wheatConsumption)} /sec  <br></br>
			// <br></br>

	// 		Corn: {props.currentUser.inventory.corn}
	// 		<br></br>
	// 		+{Math.round(cornProduction * 10) / 10}
	// 		<span>/sec</span>
	// 		<br></br>
	// 		-{roundToTwo(cornConsumption)} /sec  <br></br>
	// 		<br></br>

	// 		Soy: {props.currentUser.inventory.soy}
	// 		<br></br>
	// 		+{Math.round(soyProduction * 10) / 10}
	// 		<span>/sec</span>
	// 		<br></br>
	// 		-{roundToTwo(soyConsumption)} /sec  <br></br>
	// 		<br></br>

	// 		Clover: {props.currentUser.inventory.clover}
	// 		<br></br>
	// 		+{Math.round(cloverProduction * 10) / 10}
	// 		<span>/sec</span>
	// 		<br></br>
	// 		-{roundToTwo(cloverConsumption)} /sec  <br></br>
	// 		<br></br>

	// 		Fishfood: {props.currentUser.inventory.fishfood}
	// 		<br></br>
	// 		+{Math.round(fishfoodProduction * 10) / 10}
	// 		<span>/sec</span>
	// 		<br></br>
	// 		-{roundToTwo(fishfoodConsumption)} /sec  <br></br>
	// 		<br></br>





	// 		Eggs: {props.currentUser.inventory.eggs}
	// 		<br></br>
	// 		+{Math.round(eggProduction * 10) / 10}
	// 		<span>/sec</span>
	// 		<br></br>
	// 		<br></br>

	// 		Bacon: {props.currentUser.inventory.bacon}
	// 		<br></br>
	// 		+{Math.round(baconProduction * 10) / 10}
	// 		<span>/sec</span>
	// 		<br></br>
	// 		<br></br>

	// 		Wool: {props.currentUser.inventory.wool}
	// 		<br></br>
	// 		+{Math.round(woolProduction * 10) / 10}
	// 		<span>/sec</span>
	// 		<br></br>
	// 		<br></br>

	// 		Milk: {props.currentUser.inventory.milk}
	// 		<br></br>
	// 		+{Math.round(milkProduction * 10) / 10}
	// 		<span>/sec</span>
	// 		<br></br>
	// 		<br></br>

	// 		Goat Cheese: {props.currentUser.inventory.goatcheese}
	// 		<br></br>
	// 		+{Math.round(goatcheeseProduction * 10) / 10}
	// 		<span>/sec</span>
	// 		<br></br>
	// 		<br></br>

	// 		Fish Fillet: {props.currentUser.inventory.fishfillet}
	// 		<br></br>
	// 		+{Math.round(fishfilletProduction * 10) / 10}
	// 		<span>/sec</span>
	// 		<br></br>
	// 		<br></br>
	// 	</div>
	// )

}


const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(Inventory);
