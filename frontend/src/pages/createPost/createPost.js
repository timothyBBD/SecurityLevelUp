import React, { useEffect, useState } from 'react';
import './createPost.css'
import { postController } from '../../controllers'




export default function CreatePost(props) {

    const [admin, setAdmin] = useState(false);
    const isLoggedIn = props.isLoggedIn;
    const updateArticles = props.update;

    async function insertPost(title, description) {
    
        postController.insertPost(title, description)
        .then((response) => {
    
            console.log('response articles', response);
    
    
            // setArticles(response.data);
    
            // var decoded = jwt_decode(response.data); 
    
            // console.debug('decoded', decoded);
    
            // localStorage.setItem('token', decoded);
    
            // userInformation.loggedIn(true);
            // userInformation.username(decoded.sub);
    
            updateArticles();
        }).catch((e) => {
            console.debug('Error getting articles in exception: ', e);
    
            // setInvalidUser(true);
        });
    }

    function CheckIsAdmin() {
        const isAdmin = true;
        setAdmin(isAdmin);
    }

    function addPost(event) {
        event.preventDefault();

        const title = event.target[0].value;
        const description = event.target[1].value;

        insertPost(title, description);
    }

    useEffect(() => {
        CheckIsAdmin();
    })

    function insertPostForm() {
        return <form onSubmit={addPost} className="post-form">
            <input type="text" placeholder="Give your post a title" />
            <textarea rows="5" columns="64" placeholder="What are you going to write about" />
            <button type="submit">Post</button>
        </form>
    }

    function notAdminTitle(params) {
        return <h2>Please log in to create a blog.</h2>
    }

    const Content = props.isLoggedIn ? insertPostForm : notAdminTitle;

    return (
        <div className="page">
            {/* lskjdf */}
            <main>
                {/* {true ? insertPostForm : notAdminTitle} */}
                <Content/>
            </main>
        </div>
    )
}