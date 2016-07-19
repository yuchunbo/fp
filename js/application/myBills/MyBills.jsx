'use strict';

import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Panel from '../components/Panel.jsx';
import Api   from '../components/Api';

import {Tabs, Tab} from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

class MyBills extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value:'provider',
            providerBillList:[],
            receiverBillList:[]
        };
    }

    getChildContext() {
        return {muiTheme: getMuiTheme(lightTheme)};
    }

    componentWillMount(){
        this.fetchDataThenRenderList();
    }

    handleChange (value) {
        this.setState({
            value: value,
        });
        this.fetchDataThenRenderList();
    };

    fetchDataThenRenderList(){
        let self = this;
        let params = {
            type:this.state.value
        }
        Api.fetch('billList',params,function(res){
            if('receiver' == this.state.value){
                self.setState({
                    receiverBillList:res
                })
            }else{
                self.setState({
                    providerBillList:res
                })
            }
        })
    }


    hrefPersenInfo(bid){
        location.href = './#/detail/'+bid;
    }


    render() {
        let self = this;
        let tabStyle = {
            background:'#fff',
            color:'#333'
        }
        let receiverBillList = [];
        let providerBillList = [];
        if('receiver' == this.state.value){
            receiverBillList = this.state.receiverBillList.map(function(item,index){
                return (
                    <div>
                        <ListItem
                            leftAvatar={<Avatar src={item.avatar} />}
                            primaryText={item.p_name}
                            secondaryText={
					<p>
					  <span style={{color: darkBlack}}>金额：{item.amount}万</span><br/>
					  <span style={{color: darkBlack}}>流水：{item.c_salary}万/月</span> --
					  <span style={{color: darkBlack}}>{item.p_time}</span>
					</p>
				  }
                            secondaryTextLines={3}
                            onClick={self.hrefPersenInfo.bind(self,item.bid)}/>
                        <Divider inset={true} />
                    </div>
                )
            })
        }else{
            providerBillList = this.state.providerBillList.map(function(item,index){
                return (
                    <div>
                        <ListItem
                            leftAvatar={<Avatar src={item.avatar} />}
                            primaryText={item.p_name}
                            secondaryText={
					<p>
					  <span style={{color: darkBlack}}>金额：{item.amount}万</span><br/>
					  <span style={{color: darkBlack}}>流水：{item.c_salary}万/月</span> --
					  <span style={{color: darkBlack}}>{item.p_time}</span>
					</p>
				  }
                            secondaryTextLines={3}
                            onClick={self.hrefPersenInfo.bind(self,item.bid)}/>
                        <Divider inset={true} />
                    </div>
                )
            })
        }


        return (
            <div>
                <Header
                    title="我的单子"
                    iconClassNameLeft=""
                    iconClassNameRight=""
                    leftHref=""
                    rightHref=""
                />
                <Panel>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange.bind(this)}
                    >
                        <Tab style={tabStyle} label="我的甩单" value="provider" >
                            <List>{providerBillList}</List>
                        </Tab>
                        <Tab style={tabStyle} label="我的接单" value="receiver">
                            <List>{receiverBillList}</List>
                        </Tab>
                    </Tabs>
                </Panel>
                <Footer
                    value="bill"/>
            </div>
        );
    }
}


MyBills.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default MyBills;
