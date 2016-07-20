'use strict';

import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import $ from 'jquery/src/jquery';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Panel from '../components/Panel.jsx';
import Api   from '../components/Api';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';

class BillDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open:false,
            snackbarOpen:false,
            billComment:'',
            billInfo:{}
        };
    }

    getChildContext() {
        return {muiTheme: getMuiTheme(lightTheme)};
    }

    componentWillMount(){
        let self = this;
        let bid = this.props.params.bid;
        let params = {
            bid:bid
        }
        Api.fetch('billDetail',params,function (res) {
            if(res[0]){
                self.setState({
                    billInfo:res[0]
                });
            }else{
                //todo
            }
        })
    }

    hrefComment(bid) {
        location.href = './#/commentList/'+bid;
    }

    handleChangeBillComment(event) {
        let value = event.target.value;
        if($.trim(value)!==''){
            this.setState({
                submitDisabled:false
            })
        }else{
            this.setState({
                submitDisabled:true
            })
        }
        this.setState({
            billComment:value
        })
    }

    handleBillBtn() {
        this.setState({
            open:true
        })
    }

    handleClose(){
        this.setState({open: false});
    }

    submitComment() {
        this.setState({open: false});
        let self = this;
        let bid = this.props.params.bid;
        let params = {
            bid:bid,
            content:this.state.billComment
        }
        Api.fetch('submitComment',params,function (res) {
            if(res==1){
                self.setState({
                    snackbarOpen:true,
                    submitResult:'甩单成功'
                });
                setTimeout(function () {
                    location.href = './#/myBills';
                    self.setState({
                        snackbarOpen:false
                    });
                },3000)
            }else{
                self.setState({
                    snackbarOpen:true,
                    submitResult:'发送失败，请重试'
                });
                setTimeout(function () {
                    self.setState({
                        snackbarOpen:false
                    });
                },3000)
            }
        })
    };

    render() {
        let billInfo = this.state.billInfo;
        let style = {
            billInfo:{
                color:'#000'
            },
            submitBtnCont:{
                textAlign:'center'
            },
            submitBtn:{
                width:'90%'
            },
            actionsContainer:{
                textAlign:'center'
            },
            commentInput:{
                width:'50%'
            },
            snackbar:{
                textAlign:'center'
            }
        }
        const actions = [
            <FlatButton
                label="取消"
                secondary={true}
                onTouchTap={this.handleClose.bind(this)}
            />,
            <FlatButton
                label="提交"
                primary={true}
                disabled={this.state.submitDisabled}
                onTouchTap={this.submitComment.bind(this)}
            />,
        ];

        return (
            <div>
                <Header
                    title="甩单详情"
                    iconClassNameLeft=""
                    iconClassNameRight=""
                    leftHref=""
                    rightHref=""
                />
                <Panel>
                    <Card>
                        <CardHeader
                            title={billInfo.name}
                            subtitle={ billInfo.type + " | " + billInfo.company_address}
                            avatar={billInfo.avatar}
                        />
                    </Card>
                    <Table>
                        <TableBody
                            displayRowCheckbox={false}>
                            <TableRow>
                                <TableRowColumn>甩单名称</TableRowColumn>
                                <TableRowColumn style={style.billInfo}>{billInfo.title}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>贷款金额</TableRowColumn>
                                <TableRowColumn style={style.billInfo}>{billInfo.amount}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>客户身份</TableRowColumn>
                                <TableRowColumn style={style.billInfo}>{billInfo.c_identity}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>客户年龄</TableRowColumn>
                                <TableRowColumn style={style.billInfo}>{billInfo.c_age}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>征信好坏</TableRowColumn>
                                <TableRowColumn style={style.billInfo}>{billInfo.c_credit}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>每月流水</TableRowColumn>
                                <TableRowColumn style={style.billInfo}>{billInfo.c_salary}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>车房情况</TableRowColumn>
                                <TableRowColumn style={style.billInfo}>{billInfo.c_car_house}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>甩单详情</TableRowColumn>
                                <TableRowColumn style={style.billInfo}>{billInfo.detail}</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <FlatButton label="查看详情" secondary={true}
                                onClick={this.hrefComment.bind(this,billInfo.bid)}/>
                    <div style={style.submitBtnCont}>
                        <RaisedButton label="接单"  primary={true}
                                      style={style.submitBtn}
                                      onClick={this.handleBillBtn.bind(this)}/>
                    </div>
                </Panel>
                <Dialog
                    actions={actions}
                    actionsContainerStyle={style.actionsContainer}
                    modal={true}
                    open={this.state.open}
                >
                    <TextField
                        ref="billComment"
                        fullWidth={true}
                        hintText="接单留言"
                        floatingLabelText="请输入接单留言"
                        value={this.state.billComment}
                        onChange={this.handleChangeBillComment.bind(this)}
                    />
                </Dialog>
                <Snackbar
                    open={this.state.snackbarOpen}
                    message={this.state.submitResult}
                    style={style.snackbar}
                    autoHideDuration={2500}
                />
                <Footer
                    display="none"
                    value="bill"/>
            </div>
        );
    }
}


BillDetail.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default BillDetail;
