import React, { useState, useEffect } from 'react';
import APODThumb from './APODThumb';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.REACT_APP_NASA_IMG_API_KEY;
const API_BASE_URL = 'https://api.nasa.gov/planetary/apod?api_key=';
const SEARCH_URL = `${API_BASE_URL}${API_KEY}`;
console.log(API_KEY);
const PhotoOfTheDay = (props) => {
    const [results, setResults] = useState({});

    const getAPOD = () => {
        fetch(SEARCH_URL)
            .then(response => response.json())
            .then(data => setResults(data))
            .catch(err => console.warn('error making API request:', err))
    }

    // Instead od ComponentDidMount()
    useEffect(() => {
        getAPOD();
    }, []);

    // useEffect(() => {
    //     getAPOD(props.match.params.query);
    // }, [props.match.params.query]);

    return (
        <div className="containner">
            <h2 className="results-title">Photo Of The Day</h2>
            <div className="results">
                {

                    'url' in results
                        ?
                        <APODThumb photo={results} />
                        :
                        <p className="results-title">Loading results...</p>
                }
            </div>
        </div>
    );
}


export default PhotoOfTheDay;











// import React from 'react';

// const PhotoOfTheDay = () => {
//     return (
//         <h2 className="page-title">Photo Of The Day</h2>
//     );
// };

// export default PhotoOfTheDay;