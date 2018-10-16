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
import { save, setLastLogout } from '../../actions/user';
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
	}
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


	render() {

		if (!this.props.currentUser) {
			return <Redirect to='/' />
		}
		
		const cropRates = this.props.currentUser.crops.map(crop => crop.manager ? rateMap[crop.count] : 0); // if no manager dont add to total.

		const animalRates = this.props.currentUser.animals.map(animal => animal.manager ? rateMap[animal.count] : 0);
		
		const wheatProduction = cropRates[0] + cropRates[1] + cropRates[2];
		const cornProduction = cropRates[3] + cropRates[4] + cropRates[5];
		const soyProduction = cropRates[6] + cropRates[7] + cropRates[8];

		const eggProduction = animalRates[0] + animalRates[1] + animalRates[2];
		const baconProduction = animalRates[3] + animalRates[4];
		const milkProduction = animalRates[5] + animalRates[6];


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
