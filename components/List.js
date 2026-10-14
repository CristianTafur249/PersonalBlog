import React from 'react'
import PropTypes from 'prop-types'
import PostTile from './PostTile'

export default function ListP({
    posts,
    MAX_DISPLAY,
    emptyMessage = 'Todavía no hay entradas publicadas.',
}) {
    if (!posts.length) {
        return <p className="py-12 text-lg text-muted">{emptyMessage}</p>
    }
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, MAX_DISPLAY).map((post) => (
                <PostTile key={post.slug} post={post} />
            ))}
        </div>
    )
}

ListP.propTypes = {
    posts: PropTypes.array.isRequired,
    MAX_DISPLAY: PropTypes.number,
    emptyMessage: PropTypes.string,
}
