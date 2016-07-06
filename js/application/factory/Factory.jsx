'use strict';

import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Panel from '../components/Panel.jsx';


class Factory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {todoList: [], filter: 'all'};
    }

    getChildContext() {
        return {muiTheme: getMuiTheme(lightTheme)};
    }

    render() {
        return (
            <div>
                <Header title="模板"/>
                <Panel>
                    Factory
                </Panel>
                <Footer/>
            </div>
        );
    }
}

Factory.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default Factory;
