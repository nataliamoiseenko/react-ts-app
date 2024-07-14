import type { SyntheticEvent } from "react";
import type { SearchFormProps } from "../shared/types";
import { RiSearchLine } from "react-icons/ri";

const SearchForm = ({
  input,
  updateInput,
  sendSearchRequest,
}: SearchFormProps) => {
  const onSubmitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();
    sendSearchRequest(input);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          placeholder="Enter your search request"
          value={input}
          onChange={updateInput}
        />
        <button type="submit">
          <RiSearchLine />
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
