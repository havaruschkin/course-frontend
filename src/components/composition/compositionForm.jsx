import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import {getGenres} from "../../services/genreService";
import {getComposition, saveComposition} from "../../services/compositionService";
import Chapters from "../chapter/chapters";
import ReactTags from 'react-tag-autocomplete'
import {getAllTags} from "../../services/tagService";
import Image from "../common/image";
import LanguageContext from "../../context/languageContext";

class CompositionForm extends Form {
    static contextType = LanguageContext;

    state = {
        data: {
            compositionName: "",
            description: "",
            genreId: ""
        },
        urlImage: "",
        altImage: "",
        genres: [],
        errors: {},
        chapters: [],
        tags: [],
        comments: [],
        suggestions: []
    };

    schema = {
        id: Joi.number(),
        compositionName: Joi.string()
            .required()
            .label("Title"),
        description: Joi.string()
            .required()
            .label("Description"),
        genreId: Joi.number()
            .required()
            .label("Genre")
    };

    async initGenres() {
        const {data: genres} = await getGenres();
        this.setState({genres});
    }

    async initSuggestions() {
        const {data: suggestions} = await getAllTags();
        this.setState({suggestions});
    }

    async initComposition() {
        try {
            const compositionId = this.props.match.params.id;
            if (compositionId === "new") {
                this.setState({urlImage: null});
                return
            }
            const {data: composition} = await getComposition(compositionId);
            const chapters = composition.chapters;
            const tags = composition.tags;
            const comments = composition.comments;
            const urlImage = composition.urlImage;
            const altImage = composition.altImage;
            this.setState({
                data: this.mapToViewModel(composition),
                chapters, tags, comments, urlImage, altImage
            });
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                this.props.history.replace("/not-found");
        }
    }

    async componentDidMount() {
        await this.initGenres();
        await this.initComposition();
        await this.initSuggestions();
    }

    mapToViewModel(composition) {
        return {
            id: composition.id,
            compositionName: composition.compositionName,
            description: composition.description,
            genreId: composition.genre.id,
        }
    }

    doSubmit = async () => {
        const {genres, data, tags, chapters, comments, urlImage, altImage} = this.state;
        const [genre] = genres.filter(f => f.id === +data.genreId);
        const composition = {
            id: data.id,
            compositionName: data.compositionName,
            description: data.description,
            genre,
            tags,
            chapters,
            comments,
            urlImage,
            altImage
        };
        await saveComposition(composition);
        this.props.history.push("/compositions");
    };

    onDelete = i => {
        const tags = this.state.tags.slice(0);
        tags.splice(i, 1);
        this.setState({tags});
    };

    onAddition = (tag) => {
        const tags = [...this.state.tags, tag];
        this.setState({tags});
    };

    handleImageUpload = files => {
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('upload_preset', 'gy5wfuv2');
        const options = {
            method: 'POST',
            body: formData,
        };

        return fetch('https://api.Cloudinary.com/v1_1/duuadncto/image/upload', options)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    urlImage: res.url,
                    altImage: `${res.original_filename}`
                })
            })
            .catch(err => console.log(err));
    };

    handelImageDownload = e => {
        const files = e.target.files;
        this.handleImageUpload(files);
    };

    handleDeleteImage = () => {
        this.setState({
            urlImage: null,
            altImage: null
        })
    };

    render() {
        let context = this.context;
        const {genres, chapters, tags, suggestions, urlImage, altImage} = this.state;
        const compositionId = this.props.match.params.id;
        const titlePage = (compositionId === "new" ?
            context.language.compositionForm.titleNew :
            context.language.compositionForm.titleUpdate);

        return (
            <LanguageContext.Consumer>
                {languageContext => (
                    <div>
                        <h1 className="text-center" style={{marginBottom: "50px"}}>{titlePage}</h1>
                        <form onSubmit={this.handleSubmit}>
                            <Image
                                urlImage={urlImage}
                                altImage={altImage}
                                onImageDownload={this.handelImageDownload}
                                onImageUpload={this.handleImageUpload}
                                onDeleteImage={this.handleDeleteImage}
                            />
                            {this.renderInput(
                                'compositionName',
                                languageContext.language.compositionForm.title,
                                'text')}
                            {this.renderInput(
                                'description',
                                languageContext.language.compositionForm.description,
                                'text')}
                            {this.renderSelect(
                                'genreId',
                                languageContext.language.compositionForm.genre,
                                genres)}
                            {compositionId !== "new" && (
                                <div className="mb-5">
                                    <Chapters
                                        chapters={chapters}
                                        compositionId={compositionId}
                                    />
                                </div>
                            )}
                            <div>
                                <label>{languageContext.language.compositionForm.tags}</label>
                                <ReactTags
                                    tags={tags}
                                    suggestions={suggestions}
                                    onDelete={this.onDelete}
                                    onAddition={this.onAddition}
                                    allowNew={true}
                                    placeholderText=""
                                />
                            </div>
                            {this.renderButton(languageContext.language.compositionForm.save)}
                        </form>
                    </div>
                )}
            </LanguageContext.Consumer>
        );
    }
}

export default CompositionForm;