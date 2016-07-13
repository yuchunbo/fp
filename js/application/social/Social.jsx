'use strict';

import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Panel from '../components/Panel.jsx';
import Api   from '../components/Api';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';

class Social extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            industry:[
                <MenuItem key={1} value={1} primaryText="全部行业" />,
                <MenuItem key={2} value={2} primaryText="行业1" />,
                <MenuItem key={3} value={3} primaryText="行业2" />,
            ],
            area:[
                <MenuItem key={1} value={1} primaryText="全部地区" />,
                <MenuItem key={2} value={2} primaryText="地区1" />,
                <MenuItem key={3} value={3} primaryText="地区2" />,
            ],
            business:[
                <MenuItem key={1} value={1} primaryText="全部业务" />,
                <MenuItem key={2} value={2} primaryText="业务1" />,
                <MenuItem key={3} value={3} primaryText="业务2" />,
            ],
            indusVal:'',
            areaVal:'',
            busiVal:'',
            socialList:[{"id":"1","uid":"16","name":"\u4e8e\u6625\u6ce2","gender":"0","age":"30","province":"0","city":"0","mobile":"18618401842","email":"yucubor@163.com","avatar":"","experience":"5","company_name":"\u963f\u91cc\u5065\u5eb7","company_type":"\u4e92\u8054\u7f51","job_name":"web\u524d\u7aef","company_address":"\u5317\u4eac\u671b\u4eac","labels":"\u5e05\u54e5\u3001\u624d\u5b50\u3001\u7ec5\u58eb","major_business":"\u7801\u519c","motto":"\u6cf1\u6cf1"},{"id":"2","uid":"17","name":"\u6d4b\u8bd5\u5458","gender":"0","age":"30","province":"0","city":"0","mobile":"18510871665","email":"test@test.com","avatar":"http:\/\/tp2.sinaimg.cn\/2061701733\/180\/5670816717\/1","experience":"1","company_name":"test","company_type":"testest","job_name":"testttt","company_address":"tessss","labels":"ttt","major_business":"sss","motto":"\u6d4b\u8bd5\u4e00\u4e0b"}]
        };
    }

    getChildContext() {
        return {muiTheme: getMuiTheme(lightTheme)};
    }

	componentWillMount(){
		this.fetchDataThenRenderList();
	}

    handleIndusChange (event, index, indusVal) {
        this.setState({indusVal});
        console.log(this.state.indusVal);
		this.fetchDataThenRenderList()
    }

    handleAreaChange (event, index, areaVal) {
        this.setState({areaVal});
        console.log(this.state.areaVal);
		this.fetchDataThenRenderList()
    }

    handleBusiChange (event, index, busiVal) {
        this.setState({busiVal});
        console.log(this.state.busiVal);
		this.fetchDataThenRenderList()
    }

	fetchDataThenRenderList(){
		let self = this;
		let params = {
			company_type:this.state.indusVal,
			city:this.state.areaVal,
			major_business:this.state.busiVal
		}
		Api.fetch('seekUsers',params,function(res){
			self.setState({
				socialList:res
			})
		})
	}
	
	hrefPersenInfo(uid){
		location.href = './#/persenInfo/'+uid;
	}

    render() {
        let selectStyle = {
            width:'30%'
        }
		let self = this;

        let socialList = this.state.socialList.map(function(item,index){
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
                        secondaryTextLines={2}
						onClick={self.hrefPersenInfo.bind(self,item.uid)}/>
                    <Divider inset={true} />
                </div>
            )
        })
        return (
            <div>
                <Header
                    title="人脉"
                    iconClassNameLeft=""
                    iconClassNameRight=""
                    leftHref=""
                    rightHref=""
                />
                <Panel>
                    <SelectField
                        value={this.state.indusVal}
                        onChange={this.handleIndusChange.bind(this)}
                        floatingLabelText="行业"
                        floatingLabelFixed={true}
                        hintText="全部行业"
                        style={selectStyle}
                    >
                        {this.state.industry}
                    </SelectField>
                    <SelectField
                        value={this.state.areaVal}
                        onChange={this.handleAreaChange.bind(this)}
                        floatingLabelText="地区"
                        floatingLabelFixed={true}
                        hintText="全部地区"
                        style={selectStyle}
                    >
                        {this.state.area}
                    </SelectField>
                    <SelectField
                        value={this.state.busiVal}
                        onChange={this.handleBusiChange.bind(this)}
                        floatingLabelText="业务"
                        floatingLabelFixed={true}
                        hintText="全部业务"
                        style={selectStyle}
                    >
                        {this.state.business}
                    </SelectField>
                    <List>{socialList}</List>
                </Panel>
                <Footer
				  initialSelectedIndex="1"
				/>
            </div>
        );
    }
}

Social.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default Social;
