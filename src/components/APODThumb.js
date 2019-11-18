import React from "react";

const APODThumbs = props => {
    return <img data-large={props.photo.hdurl} src={props.photo != undefined ? props.photo.url : ''} alt="" title={props.photo.title} />
};

export default APODThumbs;
