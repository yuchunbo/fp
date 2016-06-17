'use strict';

import React from 'react';

class Footer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let footerStyle = {
            display: 'block',
            width: '100%',
            textAlign: 'center',
            marginTop: '15px'
        };
        return (
            <footer style={ footerStyle }>
              <span>{ '\u00A9 于洛舒' }</span>
            </footer>
            );
    }
}

export default Footer;
