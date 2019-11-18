import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './NavBar';
import LatestPhoto from "./LatestPhoto";
import PhotoOfTheDay from "./PhotoOfTheDay"
import FavoritesPhoto from "./FavoritesPhoto";

import Search from "./Search";
import SearchResults from "./SearchResults";

class App extends React.Component {

  state = {
    faves: [],
  };

  handleFaveToggle = (obj) => {
    const faves = [...this.state.faves];

    const imgID = faves.map((item, index) => {
      if (item !== undefined) {
        return item.data[0].nasa_id;
      }
    });

    const faveIndex = imgID.indexOf(obj.data[0].nasa_id);

    if (faveIndex === -1) {
      faves.push(obj);
    } else {
      faves.splice(faveIndex, 1);
    }

    this.setState({ faves });
    localStorage.setItem('faves', JSON.stringify(faves));
  };

  componentDidMount = () => {
    var getobj = localStorage.getItem('faves');
    if (getobj !== null) {
      getobj = JSON.parse(getobj);
      this.setState({ faves: [...getobj] });
    }
    //localStorage.clear();
  }

  render() {
    return (
      <div className="nasa-wrapper">
        <Router>
          <div className="nasa-header">
            <a className="logo-block"><img className="nasa-logo" src={process.env.PUBLIC_URL + '/images/nasa-logo.svg'} /></a>
            <div className="banner-wrapper">
              <img className="banner mb" src={'./images/banner.jpg'} />
              <img className="banner dt" src={'./images/banner_dt.jpg'} />
            </div>
            <Route path="/" component={Search} />
          </div>

          <div className="container-wrapper">
            <div className="inner-container">
              <NavBar />
              <Route exact path="/search/:query" render={(routeProps) => (<SearchResults {...routeProps} faves={this.state.faves} onFaveToggle={this.handleFaveToggle} />)} />
              <Route exact path="/" render={(routeProps) => (<LatestPhoto {...routeProps} faves={this.state.faves} onFaveToggle={this.handleFaveToggle} />)} />
              <Route exact path="/latestphoto" render={(routeProps) => (<LatestPhoto {...routeProps} faves={this.state.faves} onFaveToggle={this.handleFaveToggle} />)} />
              <Route path="/photooftheday" component={PhotoOfTheDay} />
              <Route path="/favoritesphoto" render={(routeProps) => (<FavoritesPhoto {...routeProps} faves={this.state.faves} onFaveToggle={this.handleFaveToggle} />)} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
