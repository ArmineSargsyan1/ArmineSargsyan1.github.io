import React from 'react';
import ReactPaginate from "react-paginate";

const Pagination = (
  {
    activeLinkClassName,
    nextLinkClassName,
    previousLinkClassName,
    pageLinkClassName,
    containerClassName,
    renderOnZeroPageCount,
    previousLabel,
    pageCount,
    nextLabel,
    breakLabel,
    pageRangeDisplayed,
    onPageChange,
    forcePage,
    ...p

  }


) =>
{
  return (
    <div className="pagination__wrapper">
      <ReactPaginate
        breakLabel={breakLabel}
        nextLabel={nextLabel}
        onPageChange={onPageChange}
        pageRangeDisplayed={pageRangeDisplayed}
        pageCount={pageCount}
        forcePage={forcePage}
        previousLabel={previousLabel}
         // renderOnZeroPageCount={renderOnZeroPageCount}
        containerClassName={containerClassName}
        pageLinkClassName={pageLinkClassName}
        previousLinkClassName={previousLinkClassName}
        nextLinkClassName={nextLinkClassName}
        activeLinkClassName={activeLinkClassName}
        {...p}
      />
    </div>
  );
};




export default Pagination;
