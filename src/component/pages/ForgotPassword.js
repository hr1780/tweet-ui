import React, { Component } from "react";

export default class ForgotPassword extends Component {
    render() {
        return (
            <form>

                <h3>Forgot Password</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" required/>
                </div>
                <div className="form-group">
                    <label>UserId</label>
                    <input type="text" className="form-control" placeholder="Enter UserId" required/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" required/>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                <p className="forgot-password text-right">
                    Forgot <a href="/Home.js">password?</a>
                </p>
            </form>
        );
    }
}