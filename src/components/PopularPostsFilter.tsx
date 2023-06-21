import React from 'react';
import { faRocket, faFire, faCertificate, faTableColumns, faCaretDown, faSquarePollVertical, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PopularPostsFilter = () => {
  const popularItems = [
    { name: 'Best', isBlue: true, icon: faRocket, caretDown: true },
    { name: 'Hot', isBlue: false, icon: faFire, caretDown: false },
    { name: 'New', isBlue: false, icon: faCertificate, caretDown: true },
    { name: 'Top', isBlue: false, icon: faSquarePollVertical, caretDown: true },
    { name: '', isBlue: false, icon: faEllipsis, caretDown: true },
    // Add more items as needed
  ];

  return (
    <div className="flex flex-col space-y-4">
        <div className="flex place-items-center justify-between border border-solid border-gray-400 bg-white p-4 rounded shadow">
            <div className="flex space-x-1 lg:space-x-4">
                {popularItems.map((item) => (
                <div key={item.name}>
                    {item.isBlue ? (
                    <div className="text-blue-500 bg-gray-200 rounded-full px-4 py-2 font-black flex place-items-center space-x-2 hover:bg-gray-300">
                        {item.icon && <FontAwesomeIcon icon={item.icon} className="text-xl" />}
                        <div>{item.name}</div>
                        {item.caretDown && <FontAwesomeIcon icon={faCaretDown} />}
                    </div>
                    ) : (
                    <div className="text-gray-500 rounded-full p-2 font-black space-x-2 flex place-items-center hover:bg-gray-300">
                        {item.icon && <FontAwesomeIcon icon={item.icon} className="text-xl" />}
                        <div>{item.name}</div>
                        {item.caretDown && <FontAwesomeIcon icon={faCaretDown} />}
                    </div>
                    )}
                </div>
                ))}
            </div>
            <div>
                <div className="text-blue-500 bg-gray-200 rounded-full px-4 py-2 font-black flex place-items-center space-x-2 hover:bg-gray-300">
                <FontAwesomeIcon icon={faTableColumns} className="text-xl" />
                <FontAwesomeIcon icon={faCaretDown} />
                </div>
            </div>
        </div>
    </div>
  );
};

export default PopularPostsFilter;
