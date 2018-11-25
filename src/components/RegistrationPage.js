import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import RegistrationForm from './forms/Registration-form';
// import CardImg from '../components/card/CardImg';

import '../styles/landing-page.css';

export const RegistrationPage = (props) => {
	// If we are logged in (which happens automatically when registration
	// is successful) redirect to the user's playscreen
	if (props.loggedIn) {
		return <Redirect to="/playscreen" />;
	}
	const setName = (username) => {
		localStorage.setItem('username', username);		
	}
	return (
		<div className="home">
			<div className='landing-logo'></div>
			<div className={'login-text'}>
		
			</div>
			<RegistrationForm loading={props.loading} setLocalName={(username) => setName(username)}/>
		</div>
	);
}

const mapStateToProps = state => ({
	loggedIn: state.user.currentUser !== null,
	loading: state.auth.loading

});

export default connect(mapStateToProps)(RegistrationPage);
