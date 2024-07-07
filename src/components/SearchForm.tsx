import { Component, ChangeEvent, SyntheticEvent } from "react";

type SearchFormProps = {
  input: string;
  updateInput: (e: ChangeEvent) => void;
  sendSearchRequest: () => void;
  isLoading: boolean;
};

class SearchForm extends Component<SearchFormProps> {
  constructor(props: SearchFormProps) {
    super(props);
  }

  onSubmitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();
    this.props.sendSearchRequest();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <input
            placeholder="Enter your search request"
            value={this.props.input}
            onChange={this.props.updateInput}
          />
          <button type="submit">Go</button>
        </form>
      </div>
    );
  }
}

export default SearchForm;
