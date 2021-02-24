import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import Post from './Post';
import PostList from './PostList';

export class App extends Component {
    render() {
        return (
            <div className="app">
                <div className="ui one item huge menu">
                    <div className="item huge header" style={{color: "blue"}}>
                        X Meme
                    </div>
                </div>
                <div className="main-content">
                    <Form />
                    <div className="ui hidden divider"></div>
                    <div>
                        <div className="ui large header" style={{textAlign: 'center'}}>Recent posts</div>
                        <PostList />
                    </div>
                    <div className="ui hidden divider"></div>
                </div>
                <div className="ui segment">
                    <div style={{textAlign: "center"}}>copyright 2021</div>
                </div>
            </div>
        )
    }
}

export default App
