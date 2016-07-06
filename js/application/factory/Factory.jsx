'use strict';

import React from 'react';
import $ from 'jquery/src/jquery';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Panel from '../components/Panel.jsx';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

class Factory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {todoList: [], filter: 'all'};
    }

    getChildContext() {
        return {muiTheme: getMuiTheme(lightTheme)};
    }

    handleOpen() {
        this.setState({open: true});
    };

    handleClose() {
        this.setState({open: false});
    };

    render() {
        return (
            <div>
                <Header
                    title="模板"
                    iconClassNameLeft=""
                    iconClassNameRight=""
                    leftHref=""
                    rightHref=""
                />
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
