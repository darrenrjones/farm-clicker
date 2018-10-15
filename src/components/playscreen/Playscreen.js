import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { clearAuthToken } from '../../local-storage'
//components
import { Header } from '../header/Header';
import { CropRender } from '../playscreen/cropRender';
import { AnimalRender } from '../playscreen/animalRender';

//actions
import { clearAuth } from '../../actions/auth';
import { save, setLastLogout, manageLostTime } from '../../actions/user';
import rateMap from '../../actions/helpers/rateMap';

import '../../styles/playscreen.css';

export class Playscreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			screenDisplay: 'cropsView',
			wheatProduction: 0,
		}
	}
	componentDidMount() {
		window.addEventListener("beforeunload", this.onPageUnload);
		// if(this.props.currentUser){
		// 	let timeElapsed = Math.floor(Date.now() / 1000) - this.props.currentUser.lastLogout;
		// 	console.log(`props.lastLogout: ${this.props.currentUser.lastLogout}`)
		// 	console.log(timeElapsed + ' seconds passed');
		// manageLostTime takes (timeElapsed, crops, animals)
		// loop through crops and if crop.manager get addValue = (crop.count rateMap value) * timeElapsed
		// }
	}

	// this.calculateWheatProduction(this.props.currentUser);

	componentWillUnmount() {
		window.removeEventListener("beforeunload", this.onPageUnload);
	}
	onPageUnload = (event) => {
		event.preventDefault();
		let timeStamp = Math.floor(Date.now() / 1000); //seconds
		this.props.dispatch(setLastLogout(timeStamp));
		this.props.dispatch(save()) //autosave when logout
	}
	logout = () => {
		let timeStamp = Math.floor(Date.now() / 1000); //seconds
		this.props.dispatch(setLastLogout(timeStamp));
		this.props.dispatch(save()) //autosave when logout
		this.props.dispatch(clearAuth())
		clearAuthToken()
	}
	animalsRender = () => {
		this.setState({ screenDisplay: 'animalsView' })
	}
	cropsRender = () => {
		this.setState({ screenDisplay: 'cropsView' })
	}

	// cropRates = this.props.currentUser ? this.props.currentUser.crops.map(crop => rateMap[crop.count]) : null;
	// animalRates = this.props.currentUser ? this.props.currentUser.animals.map(animal => rateMap[animal.count]) : null;

	// wheatProduction = this.cropRates[0] + this.cropRates[1] + this.cropRates[2];
	// cornProduction = this.cropRates[3] + this.cropRates[4] + this.cropRates[5];
	// soyProduction = this.cropRates[6] + this.cropRates[7] + this.cropRates[8];

	// eggProduction = this.animalRates[0] + this.animalRates[1] + this.animalRates[2];
	// baconProduction = this.animalRates[3] + this.animalRates[4];
	// milkProduction = this.animalRates[5] + this.animalRates[6];

	render() {

		if (!this.props.currentUser) {
			return <Redirect to='/' />
		}

		// const wheatProduction = this.getFieldProductionRate(this.props.currentUser.crops[0]) + this.getFieldProductionRate(this.props.currentUser.crops[1]) + this.getFieldProductionRate(this.props.currentUser.crops[2]);
		// const cornProduction = this.getFieldProductionRate(this.props.currentUser.crops[3]) + this.getFieldProductionRate(this.props.currentUser.crops[4]) + this.getFieldProductionRate(this.props.currentUser.crops[5]);
		// const soyProduction = this.getFieldProductionRate(this.props.currentUser.crops[6]) + this.getFieldProductionRate(this.props.currentUser.crops[7]) + this.getFieldProductionRate(this.props.currentUser.crops[8]);

		// const eggProduction = this.getFieldProductionRate(this.props.currentUser.animals[0]) + this.getFieldProductionRate(this.props.currentUser.animals[1]) + this.getFieldProductionRate(this.props.currentUser.animals[2]);
		// const baconProduction = this.getFieldProductionRate(this.props.currentUser.animals[3]) + this.getFieldProductionRate(this.props.currentUser.animals[4]);
		// const milkProduction = this.getFieldProductionRate(this.props.currentUser.animals[5]) + this.getFieldProductionRate(this.props.currentUser.animals[6]);

		// const cropRates = this.props.currentUser.crops.map(crop => rateMap[crop.count]);
		const cropRates = this.props.currentUser.crops.map(crop => crop.manager ? rateMap[crop.count] : 0); // if no manager dont add to total.

		const animalRates = this.props.currentUser.animals.map(animal => animal.manager ? rateMap[animal.count] : 0);
		const wheatProduction = cropRates[0] + cropRates[1] + cropRates[2];
		const cornProduction = cropRates[3] + cropRates[4] + cropRates[5];
		const soyProduction = cropRates[6] + cropRates[7] + cropRates[8];

		const eggProduction = animalRates[0] + animalRates[1] + animalRates[2];
		const baconProduction = animalRates[3] + animalRates[4];
		const milkProduction = animalRates[5] + animalRates[6];
		console.log(`croprates: ${cropRates}`);


		return (
			<div className='playscreen-div'>

				<Header
					currentUser={this.props.currentUser}
				/>

				<button onClick={this.logout}>logout</button>
				<br></br>
				<button className="screenDisplay-button" onClick={this.state.screenDisplay === 'cropsView' ? this.animalsRender : this.cropsRender}>
					{this.state.screenDisplay === 'cropsView' ? <div><span>manage</span><br></br>animals</div> : <div><span>manage</span><br></br>crops</div>}
				</button>

				<div className='crops-inventory'>
					Wheat: {this.props.currentUser.inventory.wheat} --
						{Math.round(wheatProduction * 100) / 100}/sec
						<br></br>
					Corn: {this.props.currentUser.inventory.corn} --
					{Math.round(cornProduction * 100) / 100}/sec
					<br></br>
					Soy: {this.props.currentUser.inventory.soy} --
					{Math.round(soyProduction * 100) / 100}/sec
					<br></br>
					--------------<br></br>
					Eggs: {this.props.currentUser.inventory.eggs}--
					{Math.round(eggProduction * 100) / 100}/sec
					<br></br>
					Bacon: {this.props.currentUser.inventory.bacon}--
					{Math.round(baconProduction * 100) / 100}/sec
					<br></br>
					Milk: {this.props.currentUser.inventory.milk}--
					{Math.round(milkProduction * 100) / 100}/sec
					<br></br>
				</div>

				<AnimalRender
					screenDisplay={this.state.screenDisplay}
				/>
				<CropRender
					screenDisplay={this.state.screenDisplay}
				/>

			</div>

		);

	}

}

const mapStateToProps = state => ({
	currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Playscreen);
