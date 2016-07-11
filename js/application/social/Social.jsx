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
            socialList:[]
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

    render() {
        let selectStyle = {
            width:'30%'
        }

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
                        secondaryTextLines={2}/>
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
                <Footer/>
            </div>
        );
    }
}

Social.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default Social;
