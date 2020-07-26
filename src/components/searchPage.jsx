import React, {Component} from "react";
import queryString from "query-string";
import {getCompositionsSearch} from "../services/compositionService";
import {Link} from "react-router-dom";
import LanguageContext from "../context/languageContext";

class SearchPage extends Component {
    static contextType = LanguageContext;

    state = {
        compositions: []
    };

    async componentDidMount() {
        const {search} = queryString.parse(this.props.location.search);
        const {data: compositions} = await getCompositionsSearch(search);
        this.setState({compositions});
    }

    render() {
        const {compositions} = this.state;

        return (
            <LanguageContext.Consumer>
                {languageContext => (
                    <React.Fragment>
                        <h2 className="mb-5 text-center">{languageContext.language.searchTitle}</h2>
                        <table className="table-bordered table">
                            <thead>
                            <tr>
                                <th>{languageContext.language.compositionForm.title}</th>
                                <th>{languageContext.language.compositionForm.genre}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {compositions.map(composition => (
                                <tr key={composition.id}>
                                    <td>
                                        <Link to={`/compositionRead/${composition.id}`}
                                              title="To read">
                                            {composition.compositionName}
                                        </Link>
                                    </td>
                                    <td>
                                        {composition.genre.genreName}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </React.Fragment>
                )}
            </LanguageContext.Consumer>
        );
    }
}

export default SearchPage;