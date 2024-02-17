import { FC, useEffect, useState } from 'react';
import './searchBar.css';
import { useStoreContext } from '../../Context/store';
import { ProductType } from '../../Containers/ProductCatalog/ProductCatalog';

const SearchBar: FC<{
  setData: (value: ProductType[]) => void;
}> = ({ setData }) => {
  const [searchText, setSearchText] = useState('');
  const { productData } = useStoreContext();

  const triggerSearch = () => {
    const searchedItems = productData.filter((product) => {
      return Object.values(product).some((value) => {
        if (typeof value === 'string') {
          const regex = new RegExp(searchText, 'gi');
          return regex.test(value);
        }
      });
    });
    setData(searchedItems);
  };

  useEffect(() => {
    if (searchText === '') {
      setData(productData);
    }
  }, [searchText]);

  return (
    <div className='flex search-bar'>
      <input
        type='search'
        name='searchText'
        value={searchText}
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            triggerSearch();
          }
        }}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        placeholder='Search for products...'
      />
      <button className='Search-button-container' onClick={triggerSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
