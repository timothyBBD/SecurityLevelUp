import React from 'react';
import './article.scss';

export default function Article(params) {
    const {title, message} = params;

    return (
        <article className="article">
            <h3>{title}</h3>
            <hr/>
            <p>{message}</p>
        </article>
    )
}