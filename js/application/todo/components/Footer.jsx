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
            marginTop: '15px',
            fontFamily:'华文行楷',
            fontSize:'30px'
        };
        return (
            <footer style={ footerStyle }>
              <span>{ '宠辱不惊 闲看庭前花开花落 haha' }</span><br/><span>{ '去留无意 漫随天外云卷云舒'}</span>
            </footer>
            );
    }
}

export default Footer;
