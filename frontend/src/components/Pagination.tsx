import React from 'react'

import '@/styles/pagination.scss';

const Pagination = ({currentPage, totalPages}: any) => {
    return (
        <div className='pagination'>
            {Number(currentPage) > 1 && (
                <>
                    <div className="pagination-item prev">
                        <i></i>
                    </div>
                    <div className="pagination-item">1</div>
                </>
            )}
            {Number(currentPage) > 2 && (
                <div className="pagination-item ellipsis">...</div>
            )}
            <div className="pagination-item current">{currentPage}</div>
            {Number(totalPages) - Number(currentPage) > 1 && (
                <div className="pagination-item ellipsis">...</div>
            )}
            {Number(currentPage) < Number(totalPages) && (
                <>
                    <div className="pagination-item">{totalPages}</div>
                    <div className="pagination-item next">
                        <i></i>
                    </div>
                </>
            )}
        </div>
    )
}

export default Pagination