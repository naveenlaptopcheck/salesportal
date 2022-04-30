import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const Pagination = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });
    // console.log('here paginationRange is:-----------')
    // console.log(paginationRange)


    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    // console.log(`last page is: ${lastPage}`);
    return (
        <ul
            className={className}
        >
            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === 1
                })}
                onClick={onPrevious}
            >
                <div>
                    <ArrowCircleLeftOutlinedIcon className='arrow-icon' />
                </div>
            </li>
            {paginationRange.map(pageNumber => {

                if (pageNumber === DOTS) {
                    return <li className="pagination-item dots">&#8230;</li>;
                }

                return (
                    <li
                        className={classnames('pagination-item', {
                            selected: pageNumber === currentPage
                        })}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === lastPage
                })}
                onClick={onNext}
            >
                <div>
                    <ArrowCircleRightOutlinedIcon className='arrow-icon' />
                </div>
            </li>
        </ul>
    );
};

export default Pagination;