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
			screenDisplay: 'farmView'
		}
	}


	render() {

		const logout = () => {
			this.props.dispatch(save()) //autosave when logout
			this.props.dispatch(clearAuth())
			clearAuthToken()
		}

		const saveState = () => {
			this.props.dispatch(save())
		}

		const animalRender = () => {
			this.setState({ screenDisplay: 'animalView' })
		}

		const farmRender = () => {
			this.setState({ screenDisplay: 'farmView' })
		}

		if (!this.props.currentUser) {
			return <Redirect to='/' />
		}

		let display;
		if (this.state.screenDisplay === 'animalView') {
			display = (<AnimalRender />)
		} else if (this.state.screenDisplay === 'farmView') {
			display = (<CropRender />)
		}

		let wheatTotal = this.props.crops[0].total +
		this.props.crops[1].total +
		this.props.crops[2].total




		return (
			<div className='playscreen-div'>

				<Header
					currentUser={this.props.currentUser}
				/>

				<button onClick={logout}>logout</button>
				<button onClick={saveState}>save</button>
				<br></br>
				<button onClick={animalRender}>animalRender</button>
				<br></br>
				<button onClick={farmRender}>farmRender</button>
				{/* <span>view: {this.state.screenDisplay}</span> */}


				<div className='crops-inventory'>
					<h2>Crops</h2>
					Wheat: {wheatTotal}<br></br>
					Corn: {
						this.props.crops[3].total +
						this.props.crops[4].total +
						this.props.crops[5].total
					}<br></br>
					Soy: {
						this.props.crops[6].total +
						this.props.crops[7].total +
						this.props.crops[8].total
					}<br></br>
					{/* Alfalfa: {this.props.crops.alfalfa.total}<br></br> */}
					{/* Hay: {this.props.crops.hay.total}<br></br> */}
					{/* Fishfood: {this.props.crops.fishfood.total}<br></br>                 */}
				</div>
				<div className='animals-inventory'>
					<h2>Livestock</h2>
					Chickens: {
						this.props.animals[0].total +
						this.props.animals[1].total +
						this.props.animals[2].total
					}<br></br>
					Pigs: {
						this.props.animals[3].total +
						this.props.animals[4].total
					}<br></br>
					Cows: {
						this.props.animals[5].total +
						this.props.animals[6].total
					}
				</div>

				{display}



			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: state.user.currentUser,
	crops: state.crops.crops,
	animals: state.animals.animals,

});

export default connect(mapStateToProps)(Playscreen);
