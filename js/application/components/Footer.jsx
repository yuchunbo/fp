'use strict';

import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';

class Footer extends React.Component {

    constructor(props) {
        super(props);
		let defaultVal = this.props.value;
		this.state = {
			value:defaultVal
		}
    }

	changeTab(value){
		console.log(value);
		this.setState({
			value:value
		})
		location.href = './#/'+value;
	}

    render() {
        let footerStyle = {
			display:this.props.display,
			position:'fixed',
			bottom:0,
            width: '100%',
            textAlign: 'center',
            marginTop: '15px'
        };
        return (
            <footer style={ footerStyle }>
              <Tabs
			    value={this.state.value}
				onChange={this.changeTab.bind(this)}
			  >
				<Tab
				  icon={<FontIcon className="material-icons">school</FontIcon>}
				  label="专家"
				  value="expert"
				/>
				<Tab
				  icon={<FontIcon className="material-icons">group</FontIcon>}
				  label="人脉"
				  value="social"
				/>
				<Tab
				  icon={<FontIcon className="material-icons">receipt</FontIcon>}
				  label="甩单"
				  value="bill"
				/>
				<Tab
				  icon={<FontIcon className="material-icons">account_circle</FontIcon>}
				  label="我"
				  value="myHome"
				/>
			  </Tabs>
            </footer>
            );
    }
}

export default Footer;
