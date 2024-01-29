import React from 'react'

import ReactLoading from 'react-loading';

const Loading = () => {
    return (
        <div className="loading" style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', padding: '60px'}}>
            <ReactLoading type='spin' color='#07604B' />
        </div>
    )
}

export default Loading