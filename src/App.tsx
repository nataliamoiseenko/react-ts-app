import { ChangeEvent, useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import ResultsList from "./components/ResultsList";
import SearchForm from "./components/SearchForm";
import { BASE_URL } from "./consts";
import { TbLoaderQuarter } from "react-icons/tb";
import { useLastSearch } from "./shared/hooks/useLastSearch.hook";

type AppState = {
  input: string;
  result: [] | null;
  isLoading: boolean;
};

const App = () => {
  const [appState, setAppState] = useState<AppState>({
    input: "",
    result: null,
    isLoading: true,
  });

  const [lastSearch, setLastSearch] = useLastSearch();

  useEffect(() => {
    if (lastSearch) {
      sendSearchRequest(lastSearch);
      setAppState({ ...appState, input: lastSearch });
    } else sendSearchRequest();
  }, [lastSearch]);

  const sendSearchRequest = async (value = "") => {
    setLastSearch(value);
    const result = await fetch(`${BASE_URL}/?filter[name_cont]=${value}`);

    const searchResult = await result.json();
    setAppState({
      input: value,
      result: searchResult.data,
      isLoading: false,
    });
  };

  const updateInput = (e: ChangeEvent) =>
    setAppState({ ...appState, input: (e.target as HTMLInputElement).value });

  return (
    <>
      <Header />
      <div className="container">
        <div className={appState.isLoading ? "blured" : ""}>
          <SearchForm
            input={appState.input}
            updateInput={updateInput}
            sendSearchRequest={sendSearchRequest}
            isLoading={appState.isLoading}
          />
          <ResultsList result={appState.result} />
        </div>

        {appState.isLoading && <TbLoaderQuarter className="loader-icon" />}
      </div>
    </>
  );
};

export default App;
