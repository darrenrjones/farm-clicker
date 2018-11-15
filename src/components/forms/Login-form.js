import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import Spinner from './Spinner';
import { login } from '../../actions/auth';
// import { required, nonEmpty } from './validators';

export class LoginForm extends React.Component {
	onSubmit(values) {
		return this.props.dispatch(login(values.username, values.password));

	}

	render() {
		let error, spinner
		if (this.props.error) {
			error = (
				<div className="form-error" aria-live="polite">
					{this.props.error}
				</div>
			);
		}
		if(this.props.loading){
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
				{error}
				{/* <label htmlFor="username">username :</label> */}
				<Field
					component={Input}
					type="text"
					name="username"
					id="username"
					placeholder="Username"
					// validate={[required, nonEmpty]}
				/>
				{/* <label htmlFor="password">password :</label> */}
				<Field
					component={Input}
					type="password"
					name="password"
					id="password"
					placeholder="Password"
				// validate={[required, nonEmpty]}
				/>
				<button disabled={this.props.pristine || this.props.submitting}>
					Log in
				</button>
				{spinner}
			</form>
		);
	}
}

export default reduxForm({
	form: 'login',
	onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
