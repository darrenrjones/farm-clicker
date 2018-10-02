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

	render() {

		if (!this.props.currentUser) {
			return <Redirect to='/' />
		}

		const logout = () => {
			this.props.dispatch(save()) //autosave when logout
			this.props.dispatch(clearAuth())
			clearAuthToken()
		}

		const animalsRender = () => {
			this.setState({ screenDisplay: 'animalsView' })
		}
		const cropsRender = () => {
			this.setState({ screenDisplay: 'cropsView' })
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
				<br></br>
				<button onClick={this.state.screenDisplay === 'cropsView' ? animalsRender : cropsRender}>
					{this.state.screenDisplay === 'cropsView' ? 'animalsRender' : 'cropsRender'}
				</button>

				<div className='crops-inventory'>
					Wheat: {wheatTotal}<br></br>
					Corn: {cornTotal}<br></br>
					Soy: {soyTotal}<br></br>
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
	crops: state.crops.crops,
	animals: state.animals.animals,

});

export default connect(mapStateToProps)(Playscreen);
