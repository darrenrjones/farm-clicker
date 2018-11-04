import React from "react";
import { connect } from "react-redux";
import rateMap from '../../actions/helpers/rateMap';

import '../../styles/inventory.css';
import InventoryTableRow from "./InventoryTableRow";


export const Inventory = (props) => {

	const cropRates = props.currentUser.crops.map(crop => crop.manager ? rateMap[crop.count] : 0); // if no manager dont add to total.

	const animalRates = props.currentUser.animals.map(animal => animal.manager ? rateMap[animal.count] : 0);

	const wheatProduction = cropRates[0] + cropRates[1] + cropRates[2];
	const cornProduction = cropRates[3] + cropRates[4] + cropRates[5];
	const soyProduction = cropRates[6] + cropRates[7] + cropRates[8];
	const cloverProduction = cropRates[9] + cropRates[10] + cropRates[11];
	const fishfoodProduction = cropRates[12];

	const eggsProduction = animalRates[0] + animalRates[1] + animalRates[2];
	const baconProduction = animalRates[3] + animalRates[4] + animalRates[5];
	const woolProduction = animalRates[6] + animalRates[7] + animalRates[8];
	const milkProduction = animalRates[9] + animalRates[10];
	const goatcheeseProduction = animalRates[11];
	const fishfilletProduction = animalRates[12];

	const wheatConsumption = eggsProduction + baconProduction + goatcheeseProduction;
	const cornConsumption = baconProduction + milkProduction + goatcheeseProduction;
	const soyConsumption = milkProduction + goatcheeseProduction;
	const cloverConsumption = woolProduction + goatcheeseProduction;
	const fishfoodConsumption = fishfilletProduction;

	// const roundToTwo = num => {
	// 	return (Math.round(num * 100) / 100);
	// }

	return (
		<div className="inventory-table inventory-table--4cols">

			<div className="inventory-table-cell"><p></p></div>
			<div className="inventory-table-cell"><h3>In Stock</h3></div>
			<div className="inventory-table-cell"><h3>+rate/sec</h3></div>
			<div className="inventory-table-cell"><h3>-rate/sec</h3></div>

			<InventoryTableRow
				name='wheat'
				inventoryName={props.currentUser.inventory.wheat}
				productionCall={wheatProduction}
				consumptionCall={wheatConsumption}
				screen='crops'
				source='wheat'
			/>

			<InventoryTableRow
				name='corn'
				inventoryName={props.currentUser.inventory.corn}
				productionCall={cornProduction}
				consumptionCall={cornConsumption}
				screen='crops'
				source='corn'
			/>

			<InventoryTableRow
				name='soy'
				inventoryName={props.currentUser.inventory.soy}
				productionCall={soyProduction}
				consumptionCall={soyConsumption}
				screen='crops'
				source='soy'
			/>

			<InventoryTableRow
				name='clover'
				inventoryName={props.currentUser.inventory.clover}
				productionCall={cloverProduction}
				consumptionCall={cloverConsumption}
				screen='crops'
				source='clover'
			/>

			<InventoryTableRow
				name='fishfood'
				inventoryName={props.currentUser.inventory.fishfood}
				productionCall={fishfoodProduction}
				consumptionCall={fishfoodConsumption}
				screen='crops'
				source='fishfood'
			/>

			<InventoryTableRow
				name='eggs'
				inventoryName={props.currentUser.inventory.eggs}
				productionCall={eggsProduction}
				consumptionCall={null}
				screen='products'
				source='eggs'
			/>

			<InventoryTableRow
				name='bacon'
				inventoryName={props.currentUser.inventory.bacon}
				productionCall={baconProduction}
				consumptionCall={null}
				screen='products'
				source='bacon'
			/>

			<InventoryTableRow
				name='wool'
				inventoryName={props.currentUser.inventory.wool}
				productionCall={woolProduction}
				consumptionCall={null}
				screen='products'
				source='wool'
			/>

			<InventoryTableRow
				name='milk'
				inventoryName={props.currentUser.inventory.milk}
				productionCall={milkProduction}
				consumptionCall={null}
				screen='products'
				source='milk'
			/>

			<InventoryTableRow
				name='goat'
				inventoryName={props.currentUser.inventory.goatcheese}
				productionCall={goatcheeseProduction}
				consumptionCall={null}
				screen='products'
				source='goatcheese'
			/>

			<InventoryTableRow
				name='fish'
				inventoryName={props.currentUser.inventory.fishfillet}
				productionCall={fishfilletProduction}
				consumptionCall={null}
				screen='products'
				source='fishfillet'
			/>
		</div>
	)

}


const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(Inventory);


// <div class="inventory-table-cell"><h3>Wheat</h3></div>
// <div class="inventory-table-cell">{props.currentUser.inventory.wheat}</div>
// <div class="inventory-table-cell">+{roundToTwo(wheatProduction)}/sec</div>
// <div class="inventory-table-cell"><strong>-{roundToTwo(wheatConsumption)} /sec</strong></div>

// <div class="inventory-table-cell"><h3>corn</h3></div>
// <div class="inventory-table-cell">{props.currentUser.inventory.corn}</div>
// <div class="inventory-table-cell">+{roundToTwo(cornProduction)}/sec</div>
// <div class="inventory-table-cell"><strong>-{roundToTwo(cornConsumption)} /sec</strong></div>

// <div class="inventory-table-cell"><h3>soy</h3></div>
// <div class="inventory-table-cell">{props.currentUser.inventory.soy}</div>
// <div class="inventory-table-cell">+{roundToTwo(soyProduction)}/sec</div>
// <div class="inventory-table-cell"><strong>-{roundToTwo(soyConsumption)} /sec</strong></div>

// <div class="inventory-table-cell"><h3>clover</h3></div>
// <div class="inventory-table-cell">{props.currentUser.inventory.clover}</div>
// <div class="inventory-table-cell">+{roundToTwo(cloverProduction)}/sec</div>
// <div class="inventory-table-cell"><strong>-{roundToTwo(cloverConsumption)} /sec</strong></div>

// <div class="inventory-table-cell"><h3>fishfood</h3></div>
// <div class="inventory-table-cell">{props.currentUser.inventory.fishfood}</div>
// <div class="inventory-table-cell">+{roundToTwo(fishfoodProduction)}/sec</div>
// <div class="inventory-table-cell"><strong>-{roundToTwo(fishfoodConsumption)} /sec</strong></div>

//<div class="inventory-table-cell"><h3>eggs</h3></div>
//	<div class="inventory-table-cell">{props.currentUser.inventory.eggs}</div>
//	<div class="inventory-table-cell">+{roundToTwo(eggProduction)}/sec</div>
//	<div class="inventory-table-cell"><strong>-0 /sec</strong></div>
//
//	<div class="inventory-table-cell"><h3>bacon</h3></div>
//	<div class="inventory-table-cell">{props.currentUser.inventory.bacon}</div>
//	<div class="inventory-table-cell">+{roundToTwo(baconProduction)}/sec</div>
//	<div class="inventory-table-cell"><strong>-0 /sec</strong></div>
//
//	<div class="inventory-table-cell"><h3>wool</h3></div>
//	<div class="inventory-table-cell">{props.currentUser.inventory.wool}</div>
//	<div class="inventory-table-cell">+{roundToTwo(woolProduction)}/sec</div>
//	<div class="inventory-table-cell"><strong>-0 /sec</strong></div>
//
//	<div class="inventory-table-cell"><h3>milk</h3></div>
//	<div class="inventory-table-cell">{props.currentUser.inventory.milk}</div>
//	<div class="inventory-table-cell">+{roundToTwo(milkProduction)}/sec</div>
//	<div class="inventory-table-cell"><strong>-0 /sec</strong></div>
//
//	<div class="inventory-table-cell"><h3>goatcheese</h3></div>
//	<div class="inventory-table-cell">{props.currentUser.inventory.goatcheese}</div>
//	<div class="inventory-table-cell">+{roundToTwo(goatcheeseProduction)}/sec</div>
//	<div class="inventory-table-cell"><strong>-0 /sec</strong></div>
//
//	<div class="inventory-table-cell"><h3>fishfillet</h3></div>
//	<div class="inventory-table-cell">{props.currentUser.inventory.fishfillet}</div>
//	<div class="inventory-table-cell">+{roundToTwo(fishfilletProduction)}/sec</div>
//	<div class="inventory-table-cell"><strong>-0 /sec</strong></div>  