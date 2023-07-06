import React, { useState } from 'react';
import { faRocket, faFire, faCertificate, faTableColumns, faCaretDown, faSquarePollVertical, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PopularPostsFilterProps } from '~/types';

const PopularPostsFilter: React.FC<PopularPostsFilterProps> = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('New');

  const popularItems = [
    { name: 'Best', icon: faRocket, caretDown: true },
    { name: 'Hot', icon: faFire, caretDown: false },
    { name: 'New', icon: faCertificate, caretDown: true },
    { name: 'Top', icon: faSquarePollVertical, caretDown: true },
    //{ name: '', icon: faEllipsis, caretDown: true },
    // Add more items as needed
  ];

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex sm:justify-between border border-solid border-gray-400 bg-white p-4 rounded shadow">
        <div className="flex space-x-1 lg:space-x-4">
          {popularItems.map((item) => (
            <div key={item.name}>
              <div
                className={`${
                  activeFilter === item.name ? 'text-blue-500 bg-gray-200' : 'text-gray-500'
                } rounded-full px-4 py-2 font-black flex place-items-center space-x-2 hover:bg-gray-300 cursor-pointer`}
                onClick={() => handleFilterChange(item.name)}
              >
                {item.icon && <FontAwesomeIcon icon={item.icon}  className={`text-xl ${item.caretDown ? 'sm:text-2xl' : 'sm:text-lg'}`} />}
                <div className="hidden sm:block">{item.name}</div>
                {item.caretDown && <FontAwesomeIcon icon={faCaretDown} />}
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="text-blue-500 hidden sm-block bg-gray-200 rounded-full px-4 py-2 font-black flex place-items-center space-x-2 hover:bg-gray-300">
            <FontAwesomeIcon icon={faTableColumns} className="text-xl sm:text-2xl" />
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularPostsFilter;
