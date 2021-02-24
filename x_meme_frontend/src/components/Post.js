import React, { Component } from 'react'

export class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.post.name,
            caption: this.props.post.caption,
            url: this.props.post.url
        }

        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.addForm = this.addForm.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleDoubleClick(event) {
        console.log("liked");
    }

    handleClick(event) {
        console.log('liked');
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let data = {
            caption: this.state.caption,
            url: this.state.url
        }
        fetch('https://x-meme-backend.herokuapp.com/memes/'+this.props.post.id, {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        .then(response => {
            console.log(response);
            document.getElementById(this.props.post.id).style.display = "none";
            document.getElementById(this.props.post.id+"success").className = "ui green message";
            document.getElementById(this.props.post.id+"success").style.display = "block";
            document.getElementById(this.props.post.id+"caption").innerHTML = data.caption;
            document.getElementById(this.props.post.id+"url").setAttribute("src", data.url);
            document.getElementById(this.props.post.id+"success").innerHTML = "Successfully updated the post!";
        })
        .catch(err => {
            console.log(err);
            document.getElementById(this.props.post.id+"success").className = "ui red message";
            document.getElementById(this.props.post.id+"success").style.display = "block";
            document.getElementById(this.props.post.id+"success").innerHTML = err;
        })
    }

    addForm(event) {
        event.preventDefault();
        document.getElementById(this.props.post.id).style.display = "block";
    }

    render() {
        return (
            <div>
                <div className="ui fluid card">
                    <div className="content" style={{borderBottom: "1px solid #A8B2A8"}}>
                        <span style={{fontSize: "16px", fontWeight: "bold"}}>{this.props.post.name}</span>
                    </div>
                    <div className="image">
                        <img id={this.props.post.id+"url"} onDoubleClick={this.handleDoubleClick} src={this.props.post.url} alt="meme"/>
                    </div>
                    <div className="content">
                        <div id={this.props.post.id+"caption"}>{this.props.post.caption}</div>
                    </div>
                    <div className="extra content">
                        <a onClick={this.addForm} className="right floated">
                            <i className="edit icon"></i>
                            Edit
                        </a>
                        {/* <span>
                            <i onClick={this.handleClick} className="heart outline like icon"></i>
                            <span>17 likes</span>
                        </span> */}
                    </div>
                </div>
                <div className="ui segment" id={this.props.post.id} style={{display: "none", marginBottom: "14px"}}>
                    <form className="ui form" onSubmit={this.handleSubmit}>
                        <div className="disabled field">
                            <label htmlFor="">Meme Owner</label>
                            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Enter your full name"/>
                        </div>
                        <div className="field required">
                            <label htmlFor="">Caption</label>
                            <input type="text" name="caption" value={this.state.caption} onChange={this.handleChange} placeholder="Be creative with the caption" required/>
                        </div>
                        <div className="field required">
                            <label htmlFor="">Meme URL</label>
                            <input type="text" name="url" value={this.state.url} onChange={this.handleChange} placeholder="Enter URL of your meme here" required/>
                        </div>
                        <button className="ui fluid button" type="submit">Update Post</button>
                    </form>
                </div>
                <div className="ui message" id={this.props.post.id+"success"} style={{display: "none", marginBottom: "14px"}}>
                    
                </div>
            </div>
        )
    }
}

export default Post
