import React from "react";
import Thumbnail from "./Thumbnail";
import Pagination from "./Pagination";
const SEARCH_URL = `https://images-api.nasa.gov/search?q=`;

class SearchResults extends React.Component {
    state = {
        results: {}
    };

    getPhotoResults = query => {
        fetch(SEARCH_URL + this.props.match.params.query)
            .then(response => response.json())
            .then(data => this.setState({ results: data }))
            .catch(err => console.warn("error making API request:", err));
    };

    componentDidMount() {
        //console.log("Search");
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

            photoList = this.state.results.collection.items.map((photo, index) => {


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

            myResult = {
                //photo: this.state.results.collection.items.map((photo, index) => <Thumbnail photo={photo.links} key={index} />)
                photo: photoList
            }
        } else {
            myResult = {
                photo: <p className="results-title">Loading results...</p>
            }
        }

        return (
            <div className="containner">
                <h2 className="results-title">
                    Results for "{this.props.match.params.query}"
                    <div className="results flex-container">
                        {myResult.photo}
                    </div>
                </h2>
            </div>
        );
    }
}

export default SearchResults;
