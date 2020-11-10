const blogReducer = (state = [], action) => {
    switch (action.type) {
    case 'INIT_BLOGS':
        return action.data
    case 'CREATE_NEW':
        return state.concat(action.data)
    case 'DELETE_BLOG':
        return state.filter(blog => {
            return blog.id !== action.data
        })
    case 'ADD_LIKE':
        return state.filter(blog => {
            return blog.id !== action.data.id
        }).concat(action.data)
    case 'ADD_COMMENT':
        return state.filter(blog => {
            return blog.id !== action.data.id
        }).concat(action.data)
    default:
        return state
    }
}

// ACTIONS

export const initializeBlogs = (blogs) => {
    return {
        'type': 'INIT_BLOGS',
        'data': blogs
    }
}

export const createNew = (blog) => {
    return {
        'type': 'CREATE_NEW',
        'data': blog
    }
}

export const addLike = (blog) => {
    return {
        'type': 'ADD_LIKE',
        'data': blog
    }
}

export const addComment = (blog) => {
    return {
        'type': 'ADD_COMMENT',
        'data': blog
    }
}

export const deleteAction = (blogId) => {
    return {
        'type': 'DELETE_BLOG',
        'data': blogId
    }
}

export default blogReducer