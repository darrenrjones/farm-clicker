import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import LoginForm from './forms/Login-form';

import '../styles/landing-page.css';

export const LandingPage = (props) => {
	// If we are logged in redirect straight to the playscreen
	if (props.loggedIn) {
		return <Redirect to="/playscreen" />;
	}

	return (
		<div className="home">
			<h1>Welcome to Farm Clicker</h1>
			<p>Log in or Register below </p>
			<LoginForm />
			<Link to="/register">Register</Link>
		</div>
	);
}

const mapStateToProps = state => ({
	loggedIn: state.user.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
