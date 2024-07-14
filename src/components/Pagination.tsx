import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { DEFAULT_PAGINATION_SIZE } from "../shared/consts";
import type { PaginationProps } from "../shared/types";

const Pagination = ({
  currentNumber,
  prevNumber,
  prevLink,
  nextNumber,
  nextLink,
  firstNumber,
  firstLink,
  lastNumber,
  lastLink,
  count,
  paginationHandler,
}: PaginationProps) => {
  return (
    <div className="pagination">
      <div className="pagination__container">
        <button
          className="pagination__item"
          onClick={() => paginationHandler(prevLink)}
          disabled={!prevLink}
        >
          <AiOutlineArrowLeft />
        </button>

        {firstLink && (
          <button
            className="pagination__item"
            onClick={() => paginationHandler(firstLink)}
          >
            {firstNumber}
          </button>
        )}

        {firstNumber && prevNumber && prevNumber - firstNumber > 1 && (
          <div className="pagination__item">...</div>
        )}

        {prevLink && prevNumber !== firstNumber && (
          <button
            className="pagination__item"
            onClick={() => paginationHandler(prevLink)}
          >
            {prevNumber}
          </button>
        )}

        <div className="pagination__item _current">{currentNumber}</div>

        {nextLink && nextNumber !== lastNumber && (
          <button
            className="pagination__item"
            onClick={() => paginationHandler(nextLink)}
          >
            {nextNumber}
          </button>
        )}

        {lastNumber && nextNumber && lastNumber - nextNumber > 1 && (
          <div className="pagination__item">...</div>
        )}

        {lastLink && (
          <button
            className="pagination__item"
            onClick={() => paginationHandler(lastLink)}
          >
            {lastNumber}
          </button>
        )}

        <button
          className="pagination__item"
          onClick={() => paginationHandler(nextLink)}
          disabled={!nextLink}
        >
          <AiOutlineArrowRight />
        </button>
      </div>

      <span>
        Results{" "}
        {currentNumber * DEFAULT_PAGINATION_SIZE - DEFAULT_PAGINATION_SIZE + 1}{" "}
        - {lastNumber ? currentNumber * DEFAULT_PAGINATION_SIZE : count} out of
        total {count}
      </span>
    </div>
  );
};

export default Pagination;
