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
            commentList:[{"bid":"1","receiver_uid":"16","content":"\u8fd9\u56de\u5e94\u8be5\u53ef\u4ee5\u4e86","timestamp":"1459926903","id":"1","uid":"16","name":"\u4e8e\u6625\u6ce2","gender":"0","age":"30","province":"0","city":"0","mobile":"18618401842","email":"yucubor@163.com","avatar":"","experience":"5","company_name":"\u963f\u91cc\u5065\u5eb7","company_type":"\u4e92\u8054\u7f51","job_name":"web\u524d\u7aef","company_address":"\u5317\u4eac\u671b\u4eac","labels":"\u5e05\u54e5\u3001\u624d\u5b50\u3001\u7ec5\u58eb","major_business":"\u7801\u519c","motto":"\u6cf1\u6cf1"},{"bid":"1","receiver_uid":"16","content":"\u518d\u662f\u4e00\u6761","timestamp":"1459928148","id":"1","uid":"16","name":"\u4e8e\u6625\u6ce2","gender":"0","age":"30","province":"0","city":"0","mobile":"18618401842","email":"yucubor@163.com","avatar":"","experience":"5","company_name":"\u963f\u91cc\u5065\u5eb7","company_type":"\u4e92\u8054\u7f51","job_name":"web\u524d\u7aef","company_address":"\u5317\u4eac\u671b\u4eac","labels":"\u5e05\u54e5\u3001\u624d\u5b50\u3001\u7ec5\u58eb","major_business":"\u7801\u519c","motto":"\u6cf1\u6cf1"}]
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
			console.log('index',index);
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
