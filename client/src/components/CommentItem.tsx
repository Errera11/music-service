import React from 'react';

const CommentItem = ({username, description} : {username: string, description: string}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', border: '2px solid gray', width: '200px', margin: '10px 0px', padding: '10px'}}>
            <div style={{fontWeight: 'bold'}}>
                {username}
            </div>
            <div>
                {description}
            </div>
        </div>
    );
};

export default CommentItem;