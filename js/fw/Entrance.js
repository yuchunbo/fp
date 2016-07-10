/**
 *  Entrance.js launch the application.
 *
 *  @author  yuc
 *  @date    Jun 16, 2016
 *
 */
'use strict';
import {Splash} from 'splash-screen';
import React from 'react';
import ReactDOM from 'react-dom';
import Application from 'js/application/Application.jsx';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';


import Login from 'js/application/login/Login.jsx';
import Register from 'js/application/register/Register.jsx';
import Social from 'js/application/social/Social.jsx';
import Factory from 'js/application/factory/Factory.jsx';
import CommentList from 'js/application/commentList/CommentList.jsx';

class Entrance {

    constructor() {}

    beforeStart() {
        let injectTapEventPlugin = require('react-tap-event-plugin');
        //Needed for onTouchTap
        //Can go away when react 1.0 release
        //Check this repo:
        //https://github.com/zilverline/react-tap-event-plugin
        injectTapEventPlugin();
    }

    _destroySplash() {
        let _this = this;
        Splash.destroy();
        require('splash-screen/dist/splash.min.css').unuse();
        setTimeout(function() {
            if (Splash.isRunning()) {
                _this.destroySplash();
            }
        }, 100);
    }

    launch() {
        ReactDOM.render((
            <Router>
            <Route path="/" component={Social}/>
            <Route path="login" component={Login}/>
            <Route path="register" component={Register}/>
            <Route path="social" component={Social}/>
            <Route path="factory" component={Factory}/>
			<Route path="commentList/:bid" component={CommentList}/>
            </Router>
    ), document.querySelector('#view'));
    }

    run() {
        this.beforeStart();
        this._destroySplash();
        this.launch();
    }

}

export default Entrance;
