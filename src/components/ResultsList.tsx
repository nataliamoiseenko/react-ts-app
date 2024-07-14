import type { Character, ResultsListProps } from "../shared/types";
import Pagination from "./Pagination";

const ResultsList = ({
  result,
  pagination,
  paginationHandler,
  handleDetailSelect,
}: ResultsListProps) => (
  <>
    {result && result.length > 0 ? (
      <>
        <ul>
          {result.map((el: Character) => (
            <li key={el.id}>
              <div className="image_container">
                {el.attributes.image ? (
                  <img src={el.attributes.image} alt={el.attributes.name} />
                ) : (
                  <img
                    src="https://potterdb.com/images/missing_character.svg"
                    alt="missing_character"
                  />
                )}
              </div>
              <h3>{el.attributes.name}</h3>
              <p>{el.attributes.species}</p>
              <p>{el.attributes.gender}</p>
              <button
                onClick={handleDetailSelect.bind(null, el.id)}
                className="button__view-character"
              >
                View Character
              </button>
            </li>
          ))}
        </ul>

        <Pagination {...pagination} paginationHandler={paginationHandler} />
      </>
    ) : (
      <p>No results</p>
    )}
  </>
);

export default ResultsList;
