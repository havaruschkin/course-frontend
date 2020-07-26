import React from 'react';
import Form from "../common/form";
import CommentsBlock from 'simple-react-comments';
import {getComments} from "../../services/commentService";
import SockJS from "sockjs-client";
import Stomp from "stomp-websocket";
import {apiUrl} from "../../config";

class CommentForm extends Form {
    state = {
        comments: [],
        stompClient: ""
    };

    async componentDidMount() {
        this.connect();
        const {data: comments} = await getComments(this.props.compositionId);
        this.setState({comments: this.mapToViewModel(comments)});
    }

    mapToViewModel(comments) {
        return comments.map(comment => (
            {
                text: comment.text,
                authorUrl: comment.authorUrl,
                avatarUrl: comment.avatarUrl,
                fullName: comment.fullName,
                createdAt: new Date(comment.createdAt)
            }
        ));
    }

    connect = () => {
        const apiEndpoint = apiUrl + "/gs-guide-websocket";
        const topic = "/topic/commenting";
        const socket = new SockJS(apiEndpoint);
        const stompClient = Stomp.over(socket);
        this.setState({stompClient});
        stompClient.connect({}, frame => {
            console.log('Connected: ' + frame);
            stompClient.subscribe(topic, commenting => {
                this.addNewComment(JSON.parse(commenting.body))
            });
        });
    };

    addNewComment = (comment) => {
        if (comment.compositionId !== Number(this.props.compositionId)) return;
        const newComment = {
            text: comment.text,
            authorUrl: "#",
            avatarUrl: "#avatarUrl",
            fullName: comment.username,
            createdAt: new Date()
        };
        const comments = [...this.state.comments, newComment];
        this.setState({comments})
    };

    sendComment = text => {
        const {stompClient} = this.state;
        if (text.length > 0) {
            stompClient.send("/app/comment", {}, JSON.stringify(
                {
                    compositionId: this.props.compositionId,
                    text: text,
                    username: this.props.user.sub
                }));
        }
    };

    render() {
        return (
            <div>
                <CommentsBlock
                    comments={this.state.comments}
                    isLoggedIn
                    reactRouter={true}
                    onSubmit={this.sendComment}
                />
            </div>
        );
    }

}

export default CommentForm;