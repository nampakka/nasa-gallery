import React from 'react';

class Search extends React.Component {
    state = {
        searchText: ''
    }

    handleChange = e => {
        this.setState({
            searchText: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.history.push(`/search/${this.state.searchText}`)
    }

    render() {
        // console.log(this.state)
        return (
            <div className="search-form">
                <form onSubmit={this.handleSubmit}>
                    <input className="search-input" type="search" onChange={this.handleChange} placeholder="what you want to find" />
                    <button type="submit" className="search-button"><i className="icon-search"></i></button>
                </form>
            </div>
        )
    }
}

export default Search;