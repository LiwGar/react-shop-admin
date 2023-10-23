import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export default function Pagination({ totalItems, itemsPerPage, neighbours, setOffset }) {
  const items = [];
  const [current, setCurrent] = useState(1);
  const totalPage = Math.ceil(totalItems / itemsPerPage);
  const end = Math.min(Math.max(neighbours * 2 + 2, neighbours + current + 1), totalPage + 1);
  const start = Math.min(Math.max(end - (neighbours * 2 + 1), 1), Math.max(current - neighbours, 1));

  for (let i = start; i < end; i++) {
    items.push(
      <a
        key={`Paginador-${i}`}
        onClick={() => {
          setCurrent(i);
          setOffset((i - 1) * itemsPerPage);
        }}
        href="#"
        aria-current="page"
        className={`${getClassActive(i)} relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
      >
        {i}
      </a>
    );
  }

  function getClassActive(i) {
    return i === current ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50';
  }

  function prevPage() {
    if (current > 1) {
      setCurrent(current - 1);
      setOffset((current - 2) * itemsPerPage);
    }
  }

  function nextPage() {
    if (current < totalPage) {
      setCurrent(current + 1);
      setOffset(current * itemsPerPage);
    }
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{itemsPerPage * (current - 1) + 1} </span>to{' '}
            <span className="font-medium">{current * itemsPerPage < totalItems ? current * itemsPerPage : totalItems} </span> of
            <span className="font-medium"> {totalItems} </span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              onClick={() => prevPage()}
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {items}
            <a
              onClick={() => nextPage()}
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
