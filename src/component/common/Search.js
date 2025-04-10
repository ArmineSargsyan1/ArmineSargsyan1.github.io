import Input from "./Input";

const Search = ({ query, setQuery }) => {
  const { search, minPrice, maxPrice } = query;


  const onQueryChange = (key, value) => {
    setQuery({
      ...query,
      page: 1,
      [key]: value,
    });
  };


  return (
    <>
      <div
        style={{display: "none"}}
      >

      </div>

      <div className="search-container">
        {/* Search Bar */}
        <Input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={({target: {value}}) => onQueryChange('search', value)}

        />

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
    </>


  );
};


export default Search
