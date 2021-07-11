import React, { useEffect, useState } from 'react';
import './createPost.css'
import { postController } from '../../controllers'


async function insertPost(title, description) {
    postController.insertPost(title, description)
}


export default function CreatePost() {
    const [admin, setAdmin] = useState(false);

    function CheckIsAdmin() {
        const isAdmin = false;
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
        return <h2>Only Admins are allowed to make posts</h2>
    }

    const Content = admin ? insertPostForm : notAdminTitle;

    return (
        <div className="page">
            <main>
                <Content />
            </main>
        </div>
    )
}