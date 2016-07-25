'use strict';

import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Panel from '../components/Panel.jsx';
import Api   from '../components/Api';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

class Follow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            followList:[]
        };
    }

    getChildContext() {
        return {muiTheme: getMuiTheme(lightTheme)};
    }

    componentWillMount(){
        this.fetchDataThenRenderList();
    }

    handleOpen() {
        this.setState({open: true});
    };

    handleClose() {
        this.setState({open: false});
    };

    fetchDataThenRenderList(){
        let self = this;
        let params = {};
        if(this.props.params.type=='er'){
            params['follower'] = true;
        }else if(this.props.params.type=='ee'){
            params['followee'] = true;
        }

        Api.fetch('relation',params,function(res){
            self.setState({
                followList:res
            })
        })
    }

    hrefPersenInfo(uid){
        location.href = './#/personInfo/'+uid;
    }

    render() {
        let self = this;
        let followList = this.state.followList.map(function(item,index){
            return (
                <div>
                    <ListItem
                        leftAvatar={<Avatar src={item.avatar} />}
                        primaryText={item.name}
                        secondaryText={
					<p>
					  <span style={{color: darkBlack}}>{item.motto}</span><br/>
					  <span style={{color: darkBlack}}>{item.province}--{item.city}</span>
					</p>
				  }
                        secondaryTextLines={2}
                        onClick={self.hrefPersenInfo.bind(self,item.uid)}/>
                    <Divider inset={true} />
                </div>
            )
        })
        return (
            <div>
                <Header
                    title="关注"
                    iconClassNameLeft=""
                    iconClassNameRight=""
                    leftHref=""
                    rightHref=""
                />
                <Panel>
                    <List>{followList}</List>
                </Panel>
                <Footer
                display="none"/>
            </div>
        );
    }
}

Follow.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default Follow;
