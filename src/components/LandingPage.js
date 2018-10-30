import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

// import CardImg from '../components/card/CardImg';
import LoginForm from './forms/Login-form';

import '../styles/landing-page.css';

export const LandingPage = (props) => {
	// If we are logged in redirect straight to the playscreen
	if (props.loggedIn) {
		return <Redirect to="/playscreen" />;
	}

	return (
		<div className="home">
			<div className='landing-logo'></div>

			{/* <div className={'login-text'}> */}
			{/* <CardImg
          screen={'animals'}
          source={'chicken'}
          imgClass={'tiny-crop-icon'}
        /> */}
			{/* Log in or Register below */}
			{/* <CardImg
          screen={'animals'}
          source={'chicken'}
          imgClass={'tiny-crop-icon'}
        /> */}

			{/* </div> */}
			<div className='home-content'>
				<LoginForm />
				<Link to="/register">Register</Link>
			</div>
		</div>
	);
}

const mapStateToProps = state => ({
	loggedIn: state.user.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
