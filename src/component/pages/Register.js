import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import axios from 'axios';

export default class Registration extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			lastname: '',
			firstname: '',
			phone: '',
			email: '',
			userId: '',
			password: '',
			confirm_password: ''			
		}
		this.handleInputChange = this.handleInputChange.bind(this);
	};

	handleInputChange(event) {
		this.setState({
			[event.target.name] : event.target.value
		})
	}

	resetForm() {
		
		this.setState({
			lastname: '',
			firstname: '',
			phone: '',
			email: '',
			userId: '',
			password: '',
			confirm_password: ''
		});
	}

	validateForm = (lastname,firstname,phone,email,userId,password,confirm_password) => {
		
		if(lastname === "" || firstname === "" || phone === "" || userId === "" || email === "" || password === "" || confirm_password === "") {
			return 1;
		} else if(password != confirm_password) {
			return 2;
		} else {
			return 3;
		}
	}

	signUp = (event) => {
		event.preventDefault();
		const details = this.state;
		const status = document.getElementById('message');
		const regBtn = document.getElementById('registerButton');
		
		let lastname= details.lastname;
		let firstname= details.firstname;
		let phone= details.phone;
		let email= details.email;
		let userId= details.userId;
		let password= details.password;
		let confirm_password= details.confirm_password;
		
		let validateForm = this.validateForm(lastname,firstname,phone,email,userId,password,confirm_password);

		if(validateForm === 1) {
			status.innerHTML = "<p style='color:red'> Please fill all fields </p>";
		} else if(validateForm === 2) {
			status.innerHTML = "<p style='color:red'> Password does not match </p>";
		} else if(validateForm === 3)  {

			status.innerHTML = "<p style='color:green'> Please wait... </p>";
			regBtn.setAttribute('disabled','disabled');

			let registerEntity = {
                firstname: firstname,
				lastname: lastname,
                email: email,
                userId: userId,
                password: password,
				confirm_password: password,
                phone: phone
						
			}
                console.log(registerEntity)
			axios({
				method: 'post',
				url: 'http://localhost:8088/api/v1.0/tweets/register',
				data: registerEntity,
				header: {
					'Accept': 'application/json',
					'Content-type': 'application/json'
				}
			}).then(response => {
				if(response.status === 200 && response.statusText === 'OK') {
					console.log(response.registerEntity);
					regBtn.removeAttribute('disabled');
					
					if(response.registerEntity === 1) {
						status.innerHTML = "<p style='color:red'> Please fill all fields </p>";
					} else if(response.registerEntity === 2) {
						status.innerHTML = "<p style='color:red'> Phone number exists </p>";
					} else if(response.registerEntity === 3) {
						status.innerHTML = "<p style='color:red'> Email address exists </p>";
					} else if(response.registerEntity === 4) {
						status.innerHTML = "<p style='color:red'> userId number exists </p>";
					} else if(response.registerEntity === 5) {
						status.innerHTML = "<p style='color:red'> Password does not match </p>";
					} else if(response.registerEntity === 6) {
						status.innerHTML = "<p style='color:green'> Your registration was successful. Please wait... </p>";
						this.resetForm(); 
						localStorage.setItem('userId_reg',true);
						window.location = "/";
					} else {
						status.innerHTML = "<p style='color:red'> Invalid request </p>";
					}
				} else {
					console.log('error');
					status.innerHTML = "<p style='color:red'> Invalid request </p>";
				}
			}).
			catch( (error) => {
				//console.log(error);
				regBtn.removeAttribute('disabled');
				status.innerHTML = "<p style='color:red'> Invalid request </p>";
			});
		}
	}

	render() {
		return (
			
			<form method="POST" onSubmit={event => this.signUp(event)}>				
					<h3> Sign up </h3> <hr/>
				
                    <div className="form-group">
                    <label>UserId</label>
					<input type="text" name="userId" className="form-control" value={this.state.userId} placeholder='Enter your userId' onChange={event => this.handleInputChange(event)}/> <br/>                
                    </div>

                    <div className="form-group">
                    <label>FirstName</label>
					<input type="text" name="firstname" className="form-control" value={this.state.firstname} placeholder='Enter firstname' onChange={event => this.handleInputChange(event)}/> <br/>
                    </div>

                    <div className="form-group">
                    <label>LastName</label>
					<input type="text"  name="lastname" className="form-control" value={this.state.lastname} placeholder='Enter lastname' onChange={event => this.handleInputChange(event)}/> <br/>
                    </div>

                    <div className="form-group">
                    <label>Email</label>
					<input type="email"   name="email" className="form-control" value={this.state.email} placeholder='Enter email address' onChange={event => this.handleInputChange(event)}/> <br/>
                    </div>

                    <div className="form-group">
                    <label>Password</label>
					<input type="password"   name="password" className="form-control" value={this.state.password} placeholder='Enter password' onChange={event => this.handleInputChange(event)}/> <br/>
                    </div>

                    <div className="form-group">
                    <label>Comfirm Password</label>
					<input type="password" name="confirm_password" className="form-control" value={this.state.confirm_password} placeholder='Enter confirm password' onChange={event => this.handleInputChange(event)}/> <br/>
					</div>

                    <div className="form-group">
                    <label>Conatct Number</label>
					<input type="tel"  name="phone" className="form-control" value={this.state.phone} placeholder='Enter phone number' onChange={event => this.handleInputChange(event)}/> <br/>
                    </div>
				

					<button className="btn btn-warning" id="registerButton" type="submit"> Sign Up! </button>
					<br/><br/>
					<div id="message"></div>
				
				
				
			</form>
		);
	}
}
