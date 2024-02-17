import { FC, ChangeEvent } from 'react';
import './filters.css';

interface FiltersProps {
  headingText: string;
  filterData: string[];
  handleFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Filters: FC<FiltersProps> = ({
  filterData,
  headingText,
  handleFilterChange,
}) => {
  return (
    <div className='filter flex'>
      <h2 className=''>{headingText}</h2>
      {Boolean(filterData.length > 0) &&
        filterData.map((data) => {
          return (
            <div className='checkbox flex' key={data}>
              <input
                type='checkbox'
                name={data}
                id={data}
                onChange={handleFilterChange}
              />
              <label htmlFor={data}>{data}</label>
            </div>
          );
        })}
    </div>
  );
};

export default Filters;
