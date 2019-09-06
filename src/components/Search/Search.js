import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';

import './Search.css'

class Search extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="input-search">
                <span><Glyphicon className="search-icon" glyph="search"/></span>
                <input type="text" className="paragraph search-box" placeholder="Search..." aria-label="Username" aria-describedby="basic-addon1" />
            </div>
        );
    }
}

export default Search;