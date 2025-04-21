import Input from "./Input";
import {useSelector} from "react-redux";
import Pagination from "./Pagination";

const Search = ({ query = {}, setQuery , products, maxPageCount}) => {
  const { search, minPrice, maxPrice } = query;
  const clickedBar = useSelector((state) => state.users.clickedBar);


  const onQueryChange = (key, value) => {
    setQuery({
      ...query,
      page: 1,
      [key]: value,

    });
  };


  const onPageChange = (selectedItem) => {
    const selectedPage = selectedItem.selected + 1; // react-paginate uses zero-based index
    setQuery({
      ...query,
      page: selectedPage,
    });
  };




  return (
    <>
      <div
        className="search-container"
        style={{
          opacity: !clickedBar ? 1 : 0,
          transition: 'opacity 0.1s ease-in-out',
        }}
      >

        <div className="filters">
          <div style={{display: "block"}}>
            <label>
              Min Price
              <Input
                className="input__filter"
                type="text"
                placeholder="Min Price"
                value={minPrice}
                onChange={({target: {value}}) => onQueryChange('minPrice', value)}
              />
            </label>
          </div>


          <label>
            Max Price
            <Input
              className="input__filter"
              type="text"
              placeholder="Max Price"
              value={maxPrice}
              onChange={({target: {value}}) => onQueryChange('maxPrice', value)}
            />
          </label>

        </div>
      </div>


      {products?.length > 0 && maxPageCount > 1 && (
        <div className="pagination">
          <Pagination
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={maxPageCount}
            onPageChange={onPageChange}
            forcePage={(query.page || 1) - 1}
            pageLinkClassName="pagination__page"
            previousLinkClassName="pagination__page"
            nextLinkClassName="pagination__page"
            activeLinkClassName="pagination__page active"
            containerClassName="pagination__wrapper"
          />
        </div>

      )}

    </>


  );
};


export default Search



