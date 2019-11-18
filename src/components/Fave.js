import React, { Component } from 'react';

class Fave extends Component {
    handleClick = e => {
        e.stopPropagation();
        this.props.onFaveToggle();
    };

    render() {
        return (
            <span className={`fav-box ${this.props.isFave ? "active" : " "}`} onClick={this.handleClick}><i className="fav-icon"></i></span>
        )
    }
}

export default Fave;