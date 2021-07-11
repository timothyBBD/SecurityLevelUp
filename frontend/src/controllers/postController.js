const postController = {
    getAllPosts: () => {
        const posts = [
            {
                title: 'foo',
                content: 'foo'
            },
            {
                title: 'foo',
                content: 'foo'
            }
        ]
    },
    insertPost: (title, content) => {
        console.log('Do Insert Logic');
    }
}