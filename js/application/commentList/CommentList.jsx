'use strict';

import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Panel from '../components/Panel.jsx';
import Api   from '../components/Api';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

class CommentList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			commentList:[]
		};
    }

    componentWillMount(){
        let self = this;
		let bid = this.props.params.bid;
        let params = {
            bid:bid
        }
        Api.fetch('commentList',params,function (res) {
            self.setState({
                commentList:res
            });
        })
    }

    getChildContext() {
        return {muiTheme: getMuiTheme(lightTheme)};
    }

    render() {
		let commentList = this.state.commentList.map(function(item,index){
			return (
					<div>
				<ListItem
				  leftAvatar={<Avatar src={item.avatar} />}
				  primaryText={item.content}
				  secondaryText={
					<p>
					  <span style={{color: darkBlack}}>{item.name}</span> --
					  <span style={{color: darkBlack}}>{item.company_address}</span> --
					  {item.timestamp}
					</p>
				  }
				  secondaryTextLines={2}/>
				  <Divider inset={true} />
				  </div>
			)
		})
        return (
            <div>
                <Header
                    title="留言列表"
                    iconClassNameLeft=""
                    iconClassNameRight=""
                    leftHref=""
                    rightHref=""
                />
                <Panel>
					<List>{commentList}</List>
                </Panel>
                <Footer/>
            </div>
        );
    }
}

CommentList.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default CommentList;
