import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { clearAuthToken } from '../../local-storage'
//components
import { Header } from '../header/Header';
import { CropRender } from '../playscreen/CropRender';
import { AnimalRender } from '../playscreen/AnimalRender';

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
			managerDisplay: false,
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
	toggleManagerView = () => {
		this.setState({ managerDisplay: !this.state.managerDisplay })
	}

	roundToTwo = num => {
		return (Math.round(num * 100) / 100);
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
		const cloverProduction = cropRates[9] + cropRates[10] + cropRates[11];

		const eggProduction = animalRates[0] + animalRates[1] + animalRates[2];
		const baconProduction = animalRates[3] + animalRates[4] + animalRates[5];
		const woolProduction = animalRates[6] + animalRates[7] + animalRates[8];
		const milkProduction = animalRates[9] + animalRates[10];


		const wheatConsumption = eggProduction + baconProduction;
		const cornConsumption = baconProduction + milkProduction;
		const soyConsumption = milkProduction;
		const cloverConsumption = woolProduction;

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
					Wheat: {this.props.currentUser.inventory.wheat}
					<br></br>
					+{this.roundToTwo(wheatProduction)}
					<span>/sec</span>
					<br></br>
					-{this.roundToTwo(wheatConsumption)} /sec  <br></br>
					<br></br>

					Corn: {this.props.currentUser.inventory.corn}
					<br></br>
					+{Math.round(cornProduction * 10) / 10}
					<span>/sec</span>
					<br></br>
					-{this.roundToTwo(cornConsumption)} /sec  <br></br>
					<br></br>

					Soy: {this.props.currentUser.inventory.soy}
					<br></br>
					+{Math.round(soyProduction * 10) / 10}
					<span>/sec</span>
					<br></br>
					-{this.roundToTwo(soyConsumption)} /sec  <br></br>
					<br></br>

					Clover: {this.props.currentUser.inventory.clover}
					<br></br>
					+{Math.round(cloverProduction * 10) / 10}
					<span>/sec</span>
					<br></br>
					-{this.roundToTwo(cloverConsumption)} /sec  <br></br>
					<br></br>




					
					Eggs: {this.props.currentUser.inventory.eggs}
					<br></br>
					+{Math.round(eggProduction * 10) / 10}
					<span>/sec</span>
					<br></br>
					-XX /sec  <br></br>
					<br></br>

					Bacon: {this.props.currentUser.inventory.bacon}
					<br></br>
					+{Math.round(baconProduction * 10) / 10}
					<span>/sec</span>
					<br></br>
					-XX /sec  <br></br>
					<br></br>
					
					Wool: {this.props.currentUser.inventory.wool}
					<br></br>
					+{Math.round(woolProduction * 10) / 10}
					<span>/sec</span>
					<br></br>
					-XX /sec  <br></br>
					<br></br>

					Milk: {this.props.currentUser.inventory.milk}
					<br></br>
					+{Math.round(milkProduction * 10) / 10}
					<span>/sec</span>
					<br></br>
					-XX /sec  <br></br>
					<br></br>
				</div>
				{/* <p>
					screenDisplay: {this.state.screenDisplay}<br></br>
					managerDisplay: {this.state.managerDisplay.toString()}
				</p> */}
				{/* <p>
					wheatInterval: {this.state.wheatInterval} <br></br>
					cornInterval : {this.state.cornInterval}
				</p> */}

				<div className="manager-view-container">
					<button
						className="manager-view-toggle-button"
						onClick={this.toggleManagerView}
					>
						toggle M View
					</button>
				</div>



				<AnimalRender
					screenDisplay={this.state.screenDisplay}
					managerDisplay={this.state.managerDisplay}
				/>
				<CropRender
					screenDisplay={this.state.screenDisplay}
					managerDisplay={this.state.managerDisplay}
				/>

			</div>

		);

	}

}

const mapStateToProps = state => ({
	currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Playscreen);
