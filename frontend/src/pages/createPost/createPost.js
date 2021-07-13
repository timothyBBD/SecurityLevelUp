import React, { useState } from 'react';
import './createPost.css'
import { postController } from '../../controllers'
import Alert from 'react-bootstrap/Alert'

export default function CreatePost(props) {

    const [showError, setShowError] = useState(false);
    const [errorHeader, setErrorHeader] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    const updateArticles = props.update;

    async function insertPost(title, description) {
        if (showError) {
            setShowError(false);
        }

        if (!title && !description) {
            setErrorHeader("Duuude...? Do didn't enter anything?");
            setErrorMessage("Add at least like a header.");
            setShowError(true);
            setTimeout(() => {setShowError(false);}, 8000);
        } else {
            postController.insertPost(title, description)
            .then((response) => {
        
                console.debug('Response from insert article received:', response);
        
    
                updateArticles();
            }).catch((e) => {
                console.debug('Error adding article with exception: ', e);
        
                setErrorHeader("Whoops. Something went wrong.");
                setErrorMessage("I think... just try again next time? Or don't.");
                setShowError(true);
                setTimeout(() => {setShowError(false);}, 8000);
            });
        }
    }

    function addPost(event) {
        event.preventDefault();

        const title = event.target[0].value;
        const description = event.target[1].value;

        insertPost(title, description);
    }

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
            <Alert show={showError} variant="danger" onClose={() => setShowError(false)} transition>
                <Alert.Heading>{errorHeader}</Alert.Heading>
                <p>
                    {errorMessage}
                </p>
            </Alert>
            <main>
                {/* {true ? insertPostForm : notAdminTitle} */}
                <Content/>
            </main>
        </div>
    )
}