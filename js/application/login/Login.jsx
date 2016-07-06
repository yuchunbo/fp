'use strict';

import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Panel from '../components/Panel.jsx';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    getChildContext() {
        return {muiTheme: getMuiTheme(lightTheme)};
    }

	login(){
		let username = this.refs['username'].getValue();
		let password = this.refs['password'].getValue();
		let URL = 'http://123.56.128.70/fpapi/index.php?s=Home/Logreg/login';
		let body = JSON.stringify({username:username,password:password});

		var request = new Request(URL, {method:'post',body: body});  
		fetch(request).then(function(response) {  
			console.log(response.json());  
		});  
	}

    render() {
		let style = {
			margin:'10px'
		}
        return (
            <div>
                <Header title="登录"/>
                <Panel>
                    <TextField
						ref="username"
                        hintText="用户名"
                        floatingLabelText="请输入用户名"
                    />
                    <TextField
						ref="password"
                        hintText="密码"
                        floatingLabelText="请输入密码"
                    />
                    <div>
                        <RaisedButton label="注册" style={style} secondary={true}/>
                        <RaisedButton label="登录" style={style} primary={true} onClick={this.login.bind(this)}/>
                    </div>
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
