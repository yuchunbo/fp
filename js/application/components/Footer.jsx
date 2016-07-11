'use strict';

import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';

class Footer extends React.Component {

    constructor(props) {
        super(props);
    }

	changeTab(e){
		console.log(e);
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
			    initialSelectedIndex={this.props.initialSelectedIndex}
				onChange={this.changeTab.bind(this)}
			  >
				<Tab
				  icon={<FontIcon className="material-icons">school</FontIcon>}
				  label="专家"
				/>
				<Tab
				  icon={<FontIcon className="material-icons">group</FontIcon>}
				  label="人脉"
				/>
				<Tab
				  icon={<FontIcon className="material-icons">receipt</FontIcon>}
				  label="甩单"
				/>
				<Tab
				  icon={<FontIcon className="material-icons">account_circle</FontIcon>}
				  label="我"
				/>
			  </Tabs>
            </footer>
            );
    }
}

export default Footer;
