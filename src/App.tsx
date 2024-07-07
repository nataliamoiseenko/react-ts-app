import { Component, ChangeEvent } from "react";
import "./App.css";
import Header from "./components/Header";
import ResultsList from "./components/ResultsList";
import SearchForm from "./components/SearchForm";
import { BASE_URL, LOCAL_STORAGE_TITLE } from "./consts";
import { TbLoaderQuarter } from "react-icons/tb";

type AppState = {
  input: string;
  result: [] | null;
  isLoading: boolean;
};

class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      input: "",
      result: null,
      isLoading: true,
    };
  }

  sendSearchRequest = async () => {
    localStorage.setItem(LOCAL_STORAGE_TITLE, this.state.input);
    const result = await fetch(
      `${BASE_URL}/?filter[name_cont]=${this.state.input}`,
    );

    const searchResult = await result.json();
    this.setState({
      input: this.state.input,
      result: searchResult.data,
      isLoading: false,
    });
  };

  componentDidMount(): void {
    const initialSearch = localStorage.getItem(LOCAL_STORAGE_TITLE);
    initialSearch
      ? this.setState({ input: initialSearch }, () => this.sendSearchRequest())
      : this.sendSearchRequest();
  }

  updateInput = (e: ChangeEvent) =>
    this.setState({ input: (e.target as HTMLInputElement).value });

  render() {
    return (
      <>
        <Header />
        <div className="container">
          <div className={this.state.isLoading ? "blured" : ""}>
            <SearchForm
              input={this.state.input}
              updateInput={this.updateInput}
              sendSearchRequest={this.sendSearchRequest}
              isLoading={this.state.isLoading}
            />
            <ResultsList result={this.state.result} />
          </div>

          {this.state.isLoading && <TbLoaderQuarter className="loader-icon" />}
        </div>
      </>
    );
  }
}

export default App;
