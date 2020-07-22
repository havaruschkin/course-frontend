import React from 'react';
import Form from "../common/form";
import Joi from "joi-browser";
import {deleteChapter, getChapter, saveChapter} from "../../services/chapterService";
import {toast} from "react-toastify";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import 'react-markdown-editor-lite/lib/index.css';
import queryString from 'query-string';

const mdParser = new MarkdownIt();

class ChapterForm extends Form {
    state = {
        data: {
            chapterName: ""
        },
        text: "",
        errors: {},
        key: ""
    };

    schema = {
        id: Joi.number(),
        chapterName: Joi.string()
            .required()
            .label("Title")
    };

    async componentDidMount() {
        try {
            const chapterId = this.props.match.params.chapterId;
            const compositionId = this.props.match.params.compositionId;
            const {key: parsed} = queryString.parse(this.props.location.search);
            this.setState({key: parsed, compositionId});
            if (chapterId === "new") return;
            const {data: chapter} = await getChapter(chapterId);
            this.setState({data: this.mapToViewModel(chapter), text: chapter.text});
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                this.props.history.replace("/not-found");
        }
    }

    mapToViewModel(chapter) {
        return {
            id: chapter.id,
            chapterName: chapter.chapterName
        }
    }

    doSubmit = async () => {
        const {data, compositionId, text, key} = this.state;
        const chapter = {
            id: data.id,
            chapterName: data.chapterName,
            text: text
        };
        await saveChapter(chapter, compositionId);
        if (key === undefined) {
            this.props.history.push(`/compositions/${compositionId}`);
        } else {
            this.props.history.push(`/compositionRead/${key}`);
        }
    };

    handleDelete = async () => {
        const {chapterId, compositionId} = this.props.match.params;
        try {
            await deleteChapter(chapterId);
            window.location = `/compositions/${compositionId}`
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                toast.error("This chapter has already been deleted.");
        }
    };

    handleEditorChange = ({text, html}) => {
        this.setState({text});
    };

    render() {
        const text = this.state.text;
        const titlePage = this.props.match.params.chapterId === "new" ?
            "Create chapter" : "Update chapter";

        return (
            <div>
                <h1 className="text-center">{titlePage}</h1>
                <form onSubmit={this.handleSubmit} style={{marginBottom: "10px"}}>
                    {this.renderInput('chapterName', 'Title', 'text')}
                    <MdEditor
                        value={text}
                        style={{height: '400px', marginBottom: "20px"}}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                    {this.renderButton('Save')}
                </form>
                {titlePage === "Update chapter" &&
                <button onClick={this.handleDelete}
                        className="btn btn-danger">
                    Delete
                </button>}
            </div>
        );
    }

}

export default ChapterForm;