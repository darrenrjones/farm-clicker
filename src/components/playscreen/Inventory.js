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