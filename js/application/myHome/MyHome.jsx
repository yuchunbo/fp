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
import FlatButton from 'material-ui/FlatButton';

class MyHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo:{}
        };
    }

    getChildContext() {
        return {muiTheme: getMuiTheme(lightTheme)};
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

    hrefSubpage(event){
        let innerText = event.target.innerText;
        let href;
        switch (innerText){
            case '我关注的':{
                href = './#/follow/er';
                break;
            }
            case '关注我的':{
                href = './#/follow/ee';
                break;
            }
            case '我的业务':{
                href = './#/myBusiness';
                break;
            }
            case '我的收藏':{
                href = './#/myCollection';
                break;
            }
            case '我的设置':{
                href = './#/setting';
                break;
            }
        }
        location.href = href;
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
                    title="我"
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
                            avatar={this.state.userInfo.avatar}
                        />
                    </Card>
                    <Table>
                        <TableBody
                            displayRowCheckbox={false}>
                            <TableRow>
                                <TableRowColumn><FlatButton label="我关注的" onClick={this.hrefSubpage.bind(this)}/></TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn><FlatButton label="关注我的" onClick={this.hrefSubpage.bind(this)}/></TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn><FlatButton label="我的业务" onClick={this.hrefSubpage.bind(this)}/></TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn><FlatButton label="我的收藏" onClick={this.hrefSubpage.bind(this)}/></TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn><FlatButton label="我的设置" onClick={this.hrefSubpage.bind(this)}/></TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Panel>
                <Footer/>
            </div>
        );
    }
}

MyHome.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default MyHome;
