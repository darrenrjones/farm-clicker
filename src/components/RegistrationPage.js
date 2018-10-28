import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import RegistrationForm from './forms/Registration-form';

export const RegistrationPage = (props) => {
	// If we are logged in (which happens automatically when registration
	// is successful) redirect to the user's playscreen
	if (props.loggedIn) {
		return <Redirect to="/playscreen" />;
	}
	return (
		<div className="home">
			<h1>Welcome to Farm Clicker</h1>
			<h2>Register your farm below</h2>
			<RegistrationForm />
			<Link to="/">Login</Link>
		</div>
	);
}

const mapStateToProps = state => ({
	loggedIn: state.user.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
