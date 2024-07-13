import { ChangeEvent, SyntheticEvent } from "react";
import { RiSearchLine } from "react-icons/ri";

type SearchFormProps = {
  input: string;
  updateInput: (e: ChangeEvent) => void;
  sendSearchRequest: (value: string) => void;
  isLoading?: boolean;
};

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
