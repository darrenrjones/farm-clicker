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

		let wheatTotal = this.props.currentUser.cropTotals.wheat;
		let soyTotal = this.props.currentUser.cropTotals.soy;
		let cornTotal = this.props.currentUser.cropTotals.corn;


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
					Wheat: {wheatTotal}<br></br>
					Corn: {cornTotal}<br></br>
					Soy: {soyTotal}<br></br>
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
