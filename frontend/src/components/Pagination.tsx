"use client"
import React, { useState } from 'react'

import '@/styles/pagination.scss';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Pagination = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentPage = searchParams.get('page') ? searchParams.get('page') : 1;
    const totalPages = searchParams.get('pages') ? searchParams.get('pages') : 1;
    
    const handlePageChange = (e: any) => {
        const {value} = e.currentTarget.dataset;
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.set("page", value);
        const search = current.toString();
        const query = search ? `?${search}` : "";
        router.push(`${pathname}${query}`)
    }
    
    
    if(!totalPages || Number(totalPages) < 2)
        return ;
    return (
        <div className='pagination'>
            {Number(currentPage) > 1 && (
                <>
                    <div className="pagination-item prev" data-value={Number(currentPage) - 1} onClick={handlePageChange}>
                        <i></i>
                    </div>
                    <div className="pagination-item" data-value={1} onClick={handlePageChange}>1</div>
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
                    <div className="pagination-item" data-value={totalPages} onClick={handlePageChange}>{totalPages}</div>
                    <div className="pagination-item next" data-value={Number(currentPage) + 1} onClick={handlePageChange}>
                        <i></i>
                    </div>
                </>
            )}
        </div>
    )
}

export default Pagination