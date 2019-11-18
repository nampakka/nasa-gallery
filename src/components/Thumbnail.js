import React from "react";
import Fave from "./Fave";

const Thumbnail = props => {
    return (
        <div className="img-box">
            <img src={props.photo != undefined ? props.photo[0].href : ''} alt="" />
            <Fave onFaveToggle={props.onFaveToggle} isFave={props.isFave} />
        </div>
    )
};


// import React, { Component } from "react";
// class Thumbnail extends Component {
//     render() {
//         // console.log(this.props);
//         return (
//             <img src={this.props.photo != undefined ? this.props.photo[0].href : ''} alt="" />
//         )
//     }
// }

export default Thumbnail;
