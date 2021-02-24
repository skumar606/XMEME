import React, { Component } from 'react'
import Post from './Post'

export class PostList extends Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            posts: []
        }
    }
    componentDidMount() {
        fetch('https://x-meme-backend.herokuapp.com/memes')
        .then(response => response.json())
        .then((result) => {
            // console.log(result);
            this.setState({ 
                isLoaded: true,
                posts: result
            }, (error) => {
                this.setState({
                    error: error,
                    isLoaded: true
                })
            });
            document.getElementById("loader").style.display="none";
            document.getElementById("contents").style.display="block";
        })
    }

    render() {
        const ListItems = this.state.posts.map(post => <Post key={post.id} post={post} />)
        return (
            <div>
                <div className="ui segment" id="loader" style={{height: "225px"}}>
                    <div className="ui active loader"></div>
                </div>
                <div id="contents"> {ListItems} </div>
            </div>
        )
    }
}

export default PostList
