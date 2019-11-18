
import React from "react";
import Thumbnail from "./Thumbnail";

const SEARCH_URL = `https://images-api.nasa.gov/search?q=star`;

class LatestPhoto extends React.Component {
    state = {
        results: {}
    };

    getPhotoResults = () => {
        fetch(SEARCH_URL)
            .then(response => response.json())
            .then(data => this.setState({ results: data }))
            .catch(err => console.warn("error making API request:", err));
    };

    componentDidMount() {
        this.getPhotoResults(this.props.match.params.query);
    }

    componentDidUpdate(oldProps, oldState) {
        if (oldProps.match.params.query !== this.props.match.params.query) {
            this.getPhotoResults(this.props.match.params.query);
        }
    }

    render() {

        let myResult;
        let photoList;
        if ("collection" in this.state.results) {

            const sortedPhotos = this.state.results.collection.items.sort((a, b) => {
                const aDate = new Date(a.data[0].date_created);
                const bDate = new Date(b.data[0].date_created);
                if (aDate < bDate) {
                    return 1;
                } else if (aDate > bDate) {
                    return -1;
                }
                return 0;
            });


            photoList = sortedPhotos.map((photo, index) => {

                const imgID = this.props.faves.map((item, index) => {
                    if (item !== undefined) {
                        return item.data[0].nasa_id;
                    }
                });

                return (
                    <Thumbnail
                        photo={photo.links}
                        key={index}
                        isFave={imgID.includes(photo.data[0].nasa_id)}
                        //isFave={false}
                        onFaveToggle={() => this.props.onFaveToggle(photo)}
                    />
                )
            });

            // console.log(this.state.results.collection.items);
            // const listItems = this.state.results.collection.items;

            myResult = {
                photo: photoList
            }
        } else {
            myResult = {
                photo: <p className="results-title">Loading results...</p>
            }
        }

        return (
            <div className="containner">
                <h2 className="results-title">Latest Photo</h2>
                <div className="results flex-container">
                    {myResult.photo}
                </div>
            </div>
        );
    }
}

export default LatestPhoto;



// import React from 'react';

// const LatestPhoto = () => {
//     return (
//         <div>
//             <h2 className="page-title">Most Popular</h2>
//         </div>
//     );
// };

// export default LatestPhoto;