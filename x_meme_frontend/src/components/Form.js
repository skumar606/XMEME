import React, { Component } from 'react'

export class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            caption: '',
            url: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    handleSubmit = (event) => {
        // let url=this.state.url;
        // if((url.protocol === "http:" || url.protocol === "https:") || url.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        //     console.log("valid url");
        // } else {
        //     console.log("invalid url");
        // }
        event.preventDefault();

        let data = {
            name: this.state.name,
            caption: this.state.caption,
            url: this.state.url
        }
        fetch('https://x-meme-backend.herokuapp.com/memes', {
            method: 'POST',
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
            if(response.status===200) {
                window.location.replace("/");
            } else if(response.status===409) {
                document.getElementById("error-message").style = "block";
                document.getElementById("error-message").className = "ui red message";
                document.getElementById("error-message").innerHTML = "Duplicate data found!";
            } else if(response.status===400) {
                document.getElementById("error-message").style = "block";
                document.getElementById("error-message").className = "ui red message";
                document.getElementById("error-message").innerHTML = "Fields can't be empty!";
            }
        })
        .catch(err => {
            console.log(err);
            document.getElementById("error-message").style = "block";
            document.getElementById("error-message").className = "ui red message";
            document.getElementById("error-message").innerHTML = err;
        })
    }

    render() {
        return (
            <div className="ui raised blue segment">
                <div className="ui large header" style={{textAlign: 'center'}}>Share creative meme</div>
                <div className="ui hidden divider"></div>
                <form className="ui form" onSubmit={this.handleSubmit}>
                    <div className="field required">
                        <label htmlFor="">Meme Owner</label>
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Enter your full name" required/>
                    </div>
                    <div className="field required">
                        <label htmlFor="">Caption</label>
                        <input type="text" name="caption" value={this.state.caption} onChange={this.handleChange} placeholder="Be creative with the caption" required/>
                    </div>
                    <div className="field required">
                        <label htmlFor="">Meme URL</label>
                        <input type="text" name="url" value={this.state.url} onChange={this.handleChange} placeholder="Enter URL of your meme here" required/>
                    </div>
                    <button className="ui violet inverted fluid large button" type="submit">Submit</button>
                </form>
                <div id="error-message" style={{display: "none"}}>

                </div>
            </div>
        )
    }
}

export default Form
