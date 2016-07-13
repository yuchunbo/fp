'use strict';

import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Panel from '../components/Panel.jsx';
import Api   from '../components/Api';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

class PersonInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			userInfo:{"id":"2","uid":"17","name":"\u6d4b\u8bd5\u5458","gender":"0","age":"30","province":"0","city":"0","mobile":"18510871665","email":"test@test.com","avatar":"http:\/\/tp2.sinaimg.cn\/2061701733\/180\/5670816717\/1","experience":"1","company_name":"test","company_type":"testest","job_name":"testttt","company_address":"tessss","labels":"ttt","major_business":"sss","motto":"\u6d4b\u8bd5\u4e00\u4e0b"}
		};
    }

	componentWillMount(){
        let self = this;
		let uid = this.props.params.uid;
        let params = {
            uid:uid
        }
        Api.fetch('userDetail',params,function (res) {
			if(res[0]){
				self.setState({
					userInfo:res[0]
				});
			}else{
				//todo
			}
        })
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

    render() {
        return (
            <div>
                <Header
                    title="详细信息"
                    iconClassNameLeft=""
                    iconClassNameRight=""
                    leftHref=""
                    rightHref=""
                />
                <Panel>
                   <Card>
					<CardHeader
					  title={this.state.userInfo.name}
					  subtitle={this.state.userInfo.major_business}
					  avatar="http://lorempixel.com/100/100/nature/"
					/>
					<CardText>{this.state.userInfo.province} {this.state.userInfo.city}</CardText>
					<CardText>{this.state.userInfo.mobile}</CardText>
					<CardText>{this.state.userInfo.email}</CardText>
				  </Card> 
                </Panel>
                <Footer/>
            </div>
        );
    }
}

PersonInfo.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default PersonInfo;
