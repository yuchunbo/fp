'use strict';

import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Panel from '../components/Panel.jsx';
import Api   from '../components/Api';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

class PersonInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			userInfo:{}
		};
    }

	componentWillMount(){
        let self = this;
		let uid = this.props.params.uid;
        let params = {
            id:uid
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
                    <Table>
                        <TableBody
                            displayRowCheckbox={false}>
                            <TableRow>
                                <TableRowColumn>公司名称</TableRowColumn>
                                <TableRowColumn>{this.state.userInfo.company_name}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>公司地址</TableRowColumn>
                                <TableRowColumn>{this.state.userInfo.company_address}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>她的标签</TableRowColumn>
                                <TableRowColumn>{this.state.userInfo.labels}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>她的业务</TableRowColumn>
                                <TableRowColumn></TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>主营业务</TableRowColumn>
                                <TableRowColumn>{this.state.userInfo.major_business}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>个性签名</TableRowColumn>
                                <TableRowColumn>{this.state.userInfo.motto}</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Panel>
                <Footer
                    value="social"/>
            </div>
        );
    }
}


PersonInfo.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default PersonInfo;
