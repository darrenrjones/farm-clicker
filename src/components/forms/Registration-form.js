import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../../actions/user';
// import { login } from '../../actions/auth';
import Input from './input';
import Spinner from './Spinner';

import { required, nonEmpty, matches, length, isTrimmed } from './validators';

import { Link, Redirect } from 'react-router-dom';


const passwordLength = length({ min: 8, max: 72 });
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
	state = {
		registered: false
	}
	onSubmit(values) {
		const { username, farmname, password } = values;
		const user = { username, farmname, password };
		return this.props
			.dispatch(registerUser(user))
			.then((res) => {
				if (res) {
					this.props.setLocalName(res.username);
					// there is a successful user response from register instead of error so redirect to login on line 38
					this.setState(() => ({
						registered: true
					}))
				}
			})
	}

	render() {
		if (this.state.registered === true) {			
			return <Redirect to='/' />
    }
		let spinner, error;
		if (this.props.loading) {
			spinner = <Spinner />
		} else {
			spinner = null
		}
		return (
			<form
				className="login-form"
				onSubmit={this.props.handleSubmit(values =>
					this.onSubmit(values)
				)}>

				{/* <label htmlFor="username">username :</label> */}
				<Field
					component={Input}
					type="text"
					name="username"
					validate={[required, nonEmpty, isTrimmed]}
					placeholder="Username"
				/>
				{/* <label htmlFor="farmname">farm name :</label> */}
				<Field
					component={Input}
					type="text"
					name="farmname"
					validate={[required, nonEmpty, isTrimmed]}
					placeholder="Farm Name"
				/>
				{/* <label htmlFor="password">password :</label> */}
				<Field
					component={Input}
					type="password"
					name="password"
					validate={[required, passwordLength, isTrimmed]}
					placeholder="Password"
				/>
				{/* <label htmlFor="passwordConfirm">confirm password :</label> */}
				<Field
					component={Input}
					type="password"
					name="passwordConfirm"
					validate={[required, nonEmpty, matchesPassword]}
					placeholder="Password"
				/>
				{error}
				{spinner}
				<button
					type="submit"
					disabled={this.props.pristine || this.props.submitting}>
					Register
				</button>

				<p>or</p>

				<Link to="/">Login</Link>
			</form>
		);
	}
}

export default reduxForm({
	form: 'registration',
	onSubmitFail: (errors, dispatch) =>
		dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
