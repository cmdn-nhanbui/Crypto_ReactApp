import React from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const visiblePages = getVisiblePages(currentPage, totalPages);

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <div className='flex items-center space-x-2'>
      <button
        className={`px-2 py-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-50 ${
          isFirst || 'cursor-pointer'
        }`}
        disabled={isFirst}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <LeftOutlined />
      </button>

      {visiblePages.map((page, index) =>
        page === '...' ? (
          <span key={index} className='px-2 py-1 text-gray-400'>
            ...
          </span>
        ) : (
          <button
            key={index}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? 'bg-[var(--green-secondary)] text-[var(--green-primary)] font-semibold'
                : 'text-[var(--text-primary)] hover:bg-[var(--background-secondary)] cursor-pointer'
            }`}
            onClick={() => onPageChange(page as number)}
          >
            {page}
          </button>
        ),
      )}

      <button
        className={`px-2 py-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-50 ${
          isLast || 'cursor-pointer'
        }`}
        disabled={isLast}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <RightOutlined />
      </button>
    </div>
  );
};

export default Pagination;

function getVisiblePages(current: number, total: number): (number | '...')[] {
  const pages: (number | '...')[] = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (current > 4) pages.push('...');

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 3) pages.push('...');

    pages.push(total);
  }

  return pages;
}
