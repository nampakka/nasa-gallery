import React, { Component } from 'react';
import Thumbnail from "./Thumbnail";

class FavoritesPhoto extends Component {
    render() {

        const faveImg = this.props.faves.map((item, index) => {
            if (item !== undefined) {

                const imgID = this.props.faves.map((item, index) => {
                    if (item !== undefined) {
                        return item.data[0].nasa_id;
                    }
                });

                return (
                    <Thumbnail
                        photo={item.links}
                        key={index}
                        isFave={imgID.includes(item.data[0].nasa_id)}
                        onFaveToggle={() => this.props.onFaveToggle(item)}
                    />
                )
            }
        });

        return (
            <div className="containner">
                <h2 className="results-title">
                    <div className="results flex-container">
                        {faveImg}
                    </div>
                </h2>
            </div>
        )
    }
}

export default FavoritesPhoto;