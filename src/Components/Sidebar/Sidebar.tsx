import Filters from '../Filters/Filters';
import { FILTERS_CONSTANTS } from '../../Constants/Filters';
import './sidebar.css';
import { ChangeEvent } from 'react';
import { useStoreContext } from '../../Context/store';

const Sidebar = () => {
  const { setAppliedFilters } = useStoreContext();
  const handleFilterChange = (filterText: string, filterCategory: string) => {
    setAppliedFilters((prevState) => {
      switch (filterCategory) {
        case 'Color': {
          const currentMap = new Map(prevState.color);
          if (currentMap.has(filterText)) {
            currentMap.delete(filterText);
          } else {
            currentMap.set(filterText, 1);
          }
          return {
            ...prevState,
            color: currentMap,
          };
        }
        case 'Gender': {
          const currentMap = new Map(prevState.gender);
          if (currentMap.has(filterText)) {
            currentMap.delete(filterText);
          } else {
            currentMap.set(filterText, 1);
          }
          return {
            ...prevState,
            gender: currentMap,
          };
        }
        case 'Price': {
          const currentMap = new Map(prevState.priceRange);
          if (currentMap.has(filterText)) {
            currentMap.delete(filterText);
          } else {
            currentMap.set(filterText, 1);
          }
          return {
            ...prevState,
            priceRange: currentMap,
          };
        }
        case 'Type': {
          const currentMap = new Map(prevState.type);
          if (currentMap.has(filterText)) {
            currentMap.delete(filterText);
          } else {
            currentMap.set(filterText, 1);
          }
          return {
            ...prevState,
            type: currentMap,
          };
        }
      }
      return prevState;
    });
  };
  return (
    <div className='sidebar flex'>
      {FILTERS_CONSTANTS.map((filter) => {
        return (
          <Filters
            key={filter.HEADING_TEXT}
            headingText={filter.HEADING_TEXT}
            filterData={filter.FILTER_DATA}
            handleFilterChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleFilterChange(e.target.id, filter.HEADING_TEXT);
            }}
          />
        );
      })}
    </div>
  );
};

export default Sidebar;
