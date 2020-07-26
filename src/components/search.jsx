import React, {Component} from "react";

class Search extends Component {
    state = {search: ""};

    handleSubmit = async e => {
        e.preventDefault();
        window.location = `/search?search=${this.state.search}`;
        this.setState({search: ""});
    };

    handleChange = e => {
        const search = e.currentTarget.value;
        this.setState({search});
    };

    render() {
        return (
            <div className="m-2">
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <input
                        id="search"
                        value={this.state.search}
                        onChange={this.handleChange}
                        type="text"
                        className="form-control m-2"
                        placeholder="Search"
                    />
                </form>
            </div>
        );
    }

}

export default Search