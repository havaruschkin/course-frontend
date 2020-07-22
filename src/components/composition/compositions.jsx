import React, {Component} from "react";
import Pagination from "../common/pagination";
import {paginate} from "../../utils/paginate";
import ListGroup from "../common/listGroup";
import CompositionsTable from "./compositionsTable";
import {toast} from "react-toastify";
import _ from 'lodash';
import {Link} from "react-router-dom";
import {getGenres} from "../../services/genreService";
import {deleteComposition, getCompositionsUser} from "../../services/compositionService";
import UserInformation from "../users/userInrormation";
import {getUser, updateUser} from "../../services/userApiService";

class Compositions extends Component {
    state = {
        compositions: [],
        genres: [],
        pageSize: 10,
        currentPage: 1,
        sortColumn: {path: 'updatedAt', order: 'desc'},
        message: 'ReactInline demo',
        user: {}
    };

    async componentDidMount() {
        await this.initGenres();
        await this.initUserComposition();
        await this.initUser();
    }

    async initGenres() {
        const {data} = await getGenres();
        const genres = [{id: "", genreName: "All Genres"}, ...data];
        this.setState({genres});
    }

    async initUserComposition() {
        const {data: compositions} = await getCompositionsUser();
        this.setState({compositions});
    }

    async initUser() {
        const user = this.props.user;
        const {data: currentUser} = await getUser(user.sub);
        this.setState({user: currentUser});
    }

    handleUpdate = composition => {
        window.location = `/compositions/${composition.id}`;
    };

    handleDelete = async composition => {
        const originalComposition = this.state.compositions;
        const compositions = originalComposition.filter(c => c.id !== composition.id);
        this.setState({compositions});
        try {
            await deleteComposition(composition.id);
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                toast.error("This composition has already been deleted.");
            this.setState({compositions: originalComposition});
        }
    };

    handlePageChange = page => {
        this.setState({currentPage: page})
    };

    handleGenreSelect = genre => {
        this.setState({selectedGenre: genre, currentPage: 1});
    };

    handleSort = sortColumn => {
        this.setState({sortColumn});
    };

    dataChanged = async (data) => {
        let user = this.state.user;
        user.email = data.email;
        await updateUser(user);
        await this.initUserComposition();
    };

    render() {
        const {length: count} = this.state.compositions;
        const {
            pageSize,
            currentPage,
            selectedGenre,
            sortColumn,
            genres,
            user,
            compositions: allCompositions
        } = this.state;
        const filtered = selectedGenre && selectedGenre.id
            ? allCompositions.filter(c => c.genre.id === selectedGenre.id)
            : allCompositions;
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const compositions = paginate(sorted, currentPage, pageSize);

        return (
            <div className="row">
                <div className="col-4">
                    <ListGroup
                        items={genres}
                        selectedItem={selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                    <UserInformation
                        user={user}
                        onInPlace={this.dataChanged}/>
                </div>
                <div className="col">
                    <h1 className="text-center">Your compositions</h1>
                    <Link
                        to="/compositions/new"
                        className="btn btn-outline-primary"
                        style={{marginBottom: 20}}
                    >
                        New Composition
                    </Link>
                    {count === 0 ?
                        <p>There are no compositions</p> :
                        <p>Found {filtered.length} compositions.</p>}
                    <CompositionsTable
                        compositions={compositions}
                        sortColumn={sortColumn}
                        onLike={this.handleLike}
                        onUpdate={this.handleUpdate}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}/>
                    <Pagination
                        itemsCount={filtered.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}/>
                </div>
            </div>
        )
    }
}

export default Compositions