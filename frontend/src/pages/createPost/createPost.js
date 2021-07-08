import React from 'react';
import './createPost.css'

export default function CreatePost() {
    function addPost(event) {
        event.preventDefault();
        const title = event.target[0].value;
        const description = event.target[1].value;

        console.log(`${title} ${description}`);
    }

    return (
        <div className="page">
            <nav></nav>
            <main>
                <form onSubmit={addPost} className="post-form">
                    <input type="text" placeholder="Give your post a title"  />
                    <textarea rows="5" columns="64" placeholder="What are you going to write about"/>
                    <button type="submit">Post</button>
                </form>
            </main>
        </div>
    )
}