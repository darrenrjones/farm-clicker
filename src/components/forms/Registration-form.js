import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../../actions/user';
import { login } from '../../actions/auth';
import Input from './input';
import { required, nonEmpty, matches, length, isTrimmed } from './validators';
const passwordLength = length({ min: 8, max: 72 });
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
	onSubmit(values) {
		const { username, farmname, password } = values;
		const user = { username, farmname, password };
		return this.props
			.dispatch(registerUser(user))
			.then(() => this.props.dispatch(login(username, password)));

	}

	render() {
		return (
			<form
				className="login-form"
				onSubmit={this.props.handleSubmit(values =>
					this.onSubmit(values)
				)}>

				<label htmlFor="username">username :</label>
				<Field
					component={Input}
					type="text"
					name="username"
					validate={[required, nonEmpty, isTrimmed]}
				/>
				<label htmlFor="farmname">farm name :</label>
				<Field
					component={Input}
					type="text"
					name="farmname"
					validate={[required, nonEmpty, isTrimmed]}
				/>
				<label htmlFor="password">password :</label>
				<Field
					component={Input}
					type="password"
					name="password"
					validate={[required, passwordLength, isTrimmed]}
				/>
				<label htmlFor="passwordConfirm">confirm password :</label>
				<Field
					component={Input}
					type="password"
					name="passwordConfirm"
					validate={[required, nonEmpty, matchesPassword]}
				/>
				<button
					type="submit"
					disabled={this.props.pristine || this.props.submitting}>
					Register
                </button>
			</form>
		);
	}
}

export default reduxForm({
	form: 'registration',
	onSubmitFail: (errors, dispatch) =>
		dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
