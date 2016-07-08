'use strict';

import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Panel from '../components/Panel.jsx';
import Api from '../components/Api';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';


class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open:false};
    }

    getChildContext() {
        return {muiTheme: getMuiTheme(lightTheme)};
    }

	handleOpen() {
        this.setState({open: true});
    };

	handleClose() {
	    this.setState({open: false});
		if(this.state.regiSuccess){
			location.href = './#/login';
		}
    };

	handleChangeUsername(event){
		this.setState({
			username:event.target.value
		})
	}
	handleChangePassword(event){
		this.setState({
			password:event.target.value
		})
	}
	handleChangeVerifyPassword(event){
		this.setState({
			verifyPassword:event.target.value
		})
	}

	register(){
		//let username = this.refs['username'].getValue();
		//let password = this.refs['password'].getValue();
		//let verifyPassword = this.refs['verifyPassword'].getValue();
		let username = this.state.username;
		let password = this.state.password;
		let verifyPassword = this.state.verifyPassword;
		if(password !=verifyPassword){
			this.setState({
				hint:'两次密码输入不一致',
				open:true
			})
			return false;
		}
		let params = {
			user_login:username,
			user_pass:password
		};
		let self = this;

		Api.fetch('register',params,function(res){
			self.setState({
				hint:'注册成功',
				regiSuccess:true,
				open:true
			})
		}) 
	}

    render() {
		let style = {
			margin:'10px',
			width:'256px'
		}
		let dialogStyle = {
			textAlign:'center'
		}
		let actionsContainerStyle = {
			textAlign:'center'
		}
		const actions = [
		  <RaisedButton
			label="确定"
			primary={true}
			onTouchTap={this.handleClose.bind(this)}
		  />
		];
        return (
            <div>
                <Header
				    title="注册"
					iconClassNameLeft=""
					iconClassNameRight=""
					leftHref=""
					rightHref=""
			    />
                <Panel textAlign="center">
                    <TextField
						ref="username"
                        hintText="用户名"
                        floatingLabelText="请输入用户名"
						value={this.state.username}
						onChange={this.handleChangeUsername.bind(this)}
                    />
                    <TextField
						ref="password"
						type="password"
                        hintText="密码"
                        floatingLabelText="请输入密码"
						value={this.state.password}
						onChange={this.handleChangePassword.bind(this)}
                    />
					<TextField
						ref="verifyPassword"
						type="password"
						hintText="确认密码"
						floatingLabelText="再次输入密码"
						value={this.state.verifyPassword}
						onChange={this.handleChangeVerifyPassword.bind(this)}
					/>
                    <div>
                        <RaisedButton label="注册" style={style} primary={true} onClick={this.register.bind(this)}/>
                    </div>
					<Dialog
					  actions={actions}
					  style={dialogStyle}
					  actionsContainerStyle={actionsContainerStyle}
					  modal={false}
					  open={this.state.open}
					>
					{this.state.hint}
					</Dialog>
                </Panel>
                <Footer display="none"/>
            </div>
        );
    }
}

Register.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default Register;
