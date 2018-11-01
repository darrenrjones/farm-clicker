import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

//components
import Header from '../header/Header';
import { CropRender } from '../playscreen/CropRender';
import { AnimalRender } from '../playscreen/AnimalRender';
import { Inventory } from './Inventory';

//actions
// import { clearAuth } from '../../actions/auth';
import { save, setLastLogout } from '../../actions/user';
// import { clearAuthToken } from '../../local-storage'

//styles
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
	animalsRender = () => {
		this.setState({ screenDisplay: 'animalsView' })
	}
	cropsRender = () => {
		this.setState({ screenDisplay: 'cropsView' })
	}
	toggleManagerView = () => {
		this.setState({ managerDisplay: !this.state.managerDisplay })
	}

	render() {
		if (!this.props.currentUser) {
			return <Redirect to='/' />
		}
		return (
			<div className='playscreen-main'>

				<Header
					currentUser={this.props.currentUser}
					screenDisplay={this.state.screenDisplay}
					managerDisplay={this.state.managerDisplay}
				/>

				<div className='playscreen-content'>
					<AnimalRender
						screenDisplay={this.state.screenDisplay}
						managerDisplay={this.state.managerDisplay}
					/>
					<CropRender
						screenDisplay={this.state.screenDisplay}
						managerDisplay={this.state.managerDisplay}
					/>

					<div className='playscreen-inventory'>
						<button className="screenDisplay-button" onClick={this.state.screenDisplay === 'cropsView' ? this.animalsRender : this.cropsRender}>
							{this.state.screenDisplay === 'cropsView' ? <div>animals</div> : <div>crops</div>}
						</button>

						<button className="manager-view-toggle-button"
							onClick={this.toggleManagerView}>
							manager
						</button>

						<Inventory currentUser={this.props.currentUser} />
					</div>
				</div>

			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Playscreen);