'use strict';

import React from 'react';
import $ from 'jquery/src/jquery';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Panel from '../components/Panel.jsx';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';


class Login extends React.Component {

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
    };

	login(){
		let username = this.refs['username'].getValue();
		let password = this.refs['password'].getValue();
		let URL = '/fpapi/index.php?s=Home/Logreg/login';
		let params = {
			user_login:username,
			user_pass:password
		};
		let self = this;

		$.ajax({
			url:URL,
			data:params,
			type:'post',
			success:function(res){
				console.log(res);
				if(res=='success'){
					self.setState({
						hint:'登录成功',
						open:true
					})
				    location.href = './#/index';
				}else{
					self.setState({
						hint:'用户名与密码不符',
						open:true
					})
				}
			}
		})  
	}

    render() {
		let style = {
			margin:'10px'
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
				    title="登录"
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
                    />
                    <TextField
						ref="password"
						type="password"
                        hintText="密码"
                        floatingLabelText="请输入密码"
                    />
                    <div>
                        <RaisedButton label="注册" style={style} secondary={true}/>
                        <RaisedButton label="登录" style={style} primary={true} onClick={this.login.bind(this)}/>
                    </div>
					<Dialog
					  actions={actions}
					  modal={false}
					  open={this.state.open}
					>
					{this.state.hint}
					</Dialog>
                </Panel>
                <Footer/>
            </div>
        );
    }
}

Login.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default Login;
