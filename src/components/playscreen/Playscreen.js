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
import { save } from '../../actions/user';


import '../../styles/playscreen.css';

export class Playscreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			screenDisplay: 'cropsView'
		}
	}
	logout = () => {
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

		let wheatTotal = this.props.currentUser.inventory.wheat;
		let soyTotal = this.props.currentUser.inventory.soy;
		let cornTotal = this.props.currentUser.inventory.corn;

		let eggTotal = this.props.currentUser.inventory.eggs;
		let baconTotal = this.props.currentUser.inventory.bacon;
		let milkTotal = this.props.currentUser.inventory.milk;

    // 1-10 1 - 1s
    // 2-15 2 - 1.5s    
		// 3-20 3 - 2s     6 - 4.5

    // 4-25 4 - 2.5s   
    // 5-30 5 - 3s   
		// 6-35 6 - 3.5s   15 - 9s  
		
    // 7-40      
    // 8-45      
		// 9-50   					24 - 13.5s
		
		//calculate harvest/produce per second
		
		let valueMap = { 
			// maps productionValues to per second yield ex; 
			// ex: 30 means it takes 3 seconds and will always have value of 5
			// 5 produced / 3 seconds = 1.66666 produced per second 
			0: 0, 
			10: 1,
			15: 1.33333,
			20: 1.5,
			25: 1.6,
			30: 1.66666,
			35: 1.71428,
			40: 1.75,
			45: 1.77777,
			50: 1.8
		};

		let cropProductionValues = [];
		this.props.currentUser.crops.forEach(crop => { //push milisec ticks onto cropProductionValues - 10->1sec, 15->1.5s, 20->2s etc
			if(crop.manager){
				cropProductionValues.push((crop.count - 1) * 5 + 10)
			} else {
				cropProductionValues.push(0)
			}
		})
		const wheatProduction = valueMap[cropProductionValues[0]]+valueMap[cropProductionValues[1]]+valueMap[cropProductionValues[2]];
		const cornProduction = valueMap[cropProductionValues[3]]+valueMap[cropProductionValues[4]]+valueMap[cropProductionValues[5]]
		const soyProduction = valueMap[cropProductionValues[6]]+valueMap[cropProductionValues[7]]+valueMap[cropProductionValues[8]];

		let animalProductionValues = [];
		this.props.currentUser.animals.forEach(animal => {
			if(animal.manager){
				animalProductionValues.push((animal.count - 1) * 5 + 10)
			} else {
				animalProductionValues.push(0)
			}
		})
		const chickenProduction = valueMap[animalProductionValues[0]]+valueMap[animalProductionValues[1]]+valueMap[animalProductionValues[2]];
		const pigProduction = valueMap[animalProductionValues[3]]+valueMap[animalProductionValues[4]]
		const cowProduction = valueMap[animalProductionValues[5]]+valueMap[animalProductionValues[6]];

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
					Wheat: {wheatTotal} --{Math.round(wheatProduction * 100) / 100}/sec<br></br>
					Corn: {cornTotal} --{Math.round(cornProduction * 100) / 100}/sec<br></br>
					Soy: {soyTotal} --{Math.round(soyProduction * 100) / 100}/sec<br></br>
					--------------<br></br>
					Eggs: {eggTotal}--{Math.round(chickenProduction * 100) / 100}/sec<br></br>
					Bacon: {baconTotal}--{Math.round(pigProduction * 100) / 100}/sec<br></br>
					Milk: {milkTotal}--{Math.round(cowProduction * 100) / 100}/sec<br></br>
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
	currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Playscreen);
