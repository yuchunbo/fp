'use strict';

import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Panel from '../components/Panel.jsx';
import Api   from '../components/Api';

import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

class EditUserInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
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

    handleInputChange(event){
        let key   = event.target.name;
        let value = event.target.value;
        let tmpObj = {};
        tmpObj[key] = value;
        this.setState(tmpObj);
    }

    render() {
        let style = {
            textField:{
                width:'60%'
            }
        }

        return (
            <div>
                <Header
                    title="修改个人信息"
                    iconClassNameLeft=""
                    iconClassNameRight=""
                    leftHref=""
                    rightHref=""
                />
                <Panel>
                    <TextField
                        hintText="您的昵称"
                        floatingLabelText="请输入昵称"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <TextField
                        hintText="性别"
                        floatingLabelText="请输入性别"
                        name="gender"
                        value={this.state.gender}
                        onChange={this.handleInputChange.bind(this)}
                    />
                </Panel>
                <Footer
                display="none"/>
            </div>
        );
    }
}

EditUserInfo.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default EditUserInfo;
