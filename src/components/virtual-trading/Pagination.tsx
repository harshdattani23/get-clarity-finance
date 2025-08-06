// src/components/virtual-trading/Pagination.tsx
'use client';

import React from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-white">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
