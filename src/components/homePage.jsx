import React, {Component} from 'react';
import CompositionCard from "./composition/compositionCard";
import {getGenres} from "../services/genreService";
import {getCompositions} from "../services/compositionService";
import ListGroup from "./common/listGroup";
import {getAllTags} from "../services/tagService";
import _ from "lodash";
import TagsCloud from "./common/tagsCloud";
import CarouselCompositions from "./carousel";

class HomePage extends Component {
    state = {
        compositions: [],
        genres: [],
        tags: [],
        sortColumn: {path: 'rating', order: 'desc'}
    };

    async componentDidMount() {
        await this.initGenres();
        await this.initTags();
        await this.initCompositions();
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

    render() {

        const {compositions, selectedGenre, selectedTag, genres, tags, sortColumn} = this.state;
        const filteredCompositionsByGenre = selectedGenre && selectedGenre.id
            ? compositions.filter(c => c.genre.id === selectedGenre.id)
            : compositions;
        const filteredCompositionsByTag = selectedTag && selectedTag.id
            ? filteredCompositionsByGenre.filter(c => c.tags.map(tag => tag.id).includes(selectedTag.id))
            : filteredCompositionsByGenre;
        const sortedCompositions = _.orderBy(filteredCompositionsByTag, function (object) {
            return new Date(object.updatedAt)
        }, "desc");
        const sortedCompositionsByRating = _.orderBy(compositions, [sortColumn.path], [sortColumn.order]);

        return (
            <div>
                <div className="row">
                    <div className="col-md col-lg-4 mb-5">
                        <div className="mb-3">
                            <ListGroup items={genres}
                                       selectedItem={selectedGenre}
                                       onItemSelect={this.handleGenreSelect}/>
                        </div>
                        <div className="mb-3">
                            <TagsCloud tags={tags}
                                       onItemSelect={this.handleTagSelect}
                                       selectedTag={selectedTag}/>
                        </div>
                    </div>
                    <CarouselCompositions compositionsTop={sortedCompositionsByRating.slice(0, 3)}/>
                </div>
                <CompositionCard sortedCompositions={sortedCompositions}/>
            </div>
        );
    }
}

export default HomePage;