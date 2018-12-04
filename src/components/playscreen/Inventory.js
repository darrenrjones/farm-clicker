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
		<div className="inventory-table-container">

			<div className="inventory-table-cell-icon"><p></p></div>
			<div className="inventory-table-cell"><p>In Stock</p></div>
			<div className="inventory-table-cell"><p>+rate/sec</p></div>
			<div className="inventory-table-cell"><p>-rate/sec</p></div>

			<InventoryTableRow
				name='wheat'
				inventoryCount={props.currentUser.inventory.wheat}
				productionAmount={wheatProduction}
				consumptionAmount={wheatConsumption}
				screen='crops'
				source='wheat'
			/>

			<InventoryTableRow
				name='corn'
				inventoryCount={props.currentUser.inventory.corn}
				productionAmount={cornProduction}
				consumptionAmount={cornConsumption}
				screen='crops'
				source='corn'
			/>

			<InventoryTableRow
				name='soy'
				inventoryCount={props.currentUser.inventory.soy}
				productionAmount={soyProduction}
				consumptionAmount={soyConsumption}
				screen='crops'
				source='soy'
			/>

			<InventoryTableRow
				name='clover'
				inventoryCount={props.currentUser.inventory.clover}
				productionAmount={cloverProduction}
				consumptionAmount={cloverConsumption}
				screen='crops'
				source='clover'
			/>

			<InventoryTableRow
				name='fishfood'
				inventoryCount={props.currentUser.inventory.fishfood}
				productionAmount={fishfoodProduction}
				consumptionAmount={fishfoodConsumption}
				screen='crops'
				source='fishfood'
			/>

			<InventoryTableRow
				name='eggs'
				inventoryCount={props.currentUser.inventory.eggs}
				productionAmount={eggsProduction}
				consumptionAmount={null}
				screen='products'
				source='eggs'
			/>

			<InventoryTableRow
				name='bacon'
				inventoryCount={props.currentUser.inventory.bacon}
				productionAmount={baconProduction}
				consumptionAmount={null}
				screen='products'
				source='bacon'
			/>

			<InventoryTableRow
				name='wool'
				inventoryCount={props.currentUser.inventory.wool}
				productionAmount={woolProduction}
				consumptionAmount={null}
				screen='products'
				source='wool'
			/>

			<InventoryTableRow
				name='milk'
				inventoryCount={props.currentUser.inventory.milk}
				productionAmount={milkProduction}
				consumptionAmount={null}
				screen='products'
				source='milk'
			/>

			<InventoryTableRow
				name='goat'
				inventoryCount={props.currentUser.inventory.goatcheese}
				productionAmount={goatcheeseProduction}
				consumptionAmount={null}
				screen='products'
				source='goatcheese'
			/>

			<InventoryTableRow
				name='fish'
				inventoryCount={props.currentUser.inventory.fishfillet}
				productionAmount={fishfilletProduction}
				consumptionAmount={null}
				screen='products'
				source='fishfillet'
			/>
		</div>
	)

}


const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(Inventory);