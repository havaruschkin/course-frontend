import React, {Component} from 'react';
import CompositionCard from "./composition/compositionCard";
import {getGenres} from "../services/genreService";
import {getCompositions} from "../services/compositionService";
import ListGroup from "./common/listGroup";
import {getAllTags} from "../services/tagService";
import _ from "lodash";
import TagsCloud from "./common/tagsCloud";

class HomePage extends Component {
    state = {
        compositions: [],
        genres: [],
        tags: [],
        sortColumn: {path: 'updatedAt', order: 'desc'}
    };

    async componentDidMount() {
        await this.initGenres();
        await this.initCompositions();
        await this.initTags();
    }

    async initGenres() {
        const {data} = await getGenres();
        const genres = [{id: "", genreName: "All Genres"}, ...data];
        this.setState({genres});
    }

    async initCompositions() {
        const {data: compositions} = await getCompositions();
        this.setState({compositions});
    }

    async initTags() {
        const {data: tags} = await getAllTags();
        this.setState({tags});
    }

    handleGenreSelect = genre => {
        this.setState({selectedGenre: genre});
    };

    handleTagSelect = tag => {
        this.state.selectedTag === tag ? this.setState({selectedTag: ""})
            : this.setState({selectedTag: tag});
    };

    handleRead = id => {
        window.location = `/compositionRead/${id}`;
    };

    render() {

        const {compositions, selectedGenre, selectedTag, genres, tags, sortColumn} = this.state;
        const filteredCompositionsByGenre = selectedGenre && selectedGenre.id
            ? compositions.filter(c => c.genre.id === selectedGenre.id)
            : compositions;
        const filteredCompositionsByTag = selectedTag && selectedTag.id
            ? filteredCompositionsByGenre.filter(c => c.tags.map(tag => tag.id).includes(selectedTag.id))
            : filteredCompositionsByGenre;
        const sortedCompositions = _.orderBy(filteredCompositionsByTag, [sortColumn.path], [sortColumn.order]);

        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup
                        items={genres}
                        selectedItem={selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                        textProperty={"genreName"}
                        valueProperty={"id"}/>
                </div>
                <div className="col">
                    <CompositionCard
                        sortedCompositions={sortedCompositions}
                        onClick={this.handleRead}
                    />
                </div>
                <div className="col-3">
                    <TagsCloud tags={tags}
                               onItemSelect={this.handleTagSelect}
                               selectedTag={selectedTag}/>
                </div>
            </div>
        );
    }
}

export default HomePage;