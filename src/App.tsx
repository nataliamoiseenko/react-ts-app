import { ChangeEvent, useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import ResultsList from "./components/ResultsList";
import SearchForm from "./components/SearchForm";
import { BASE_URL, DEFAULT_PAGINATION_SIZE } from "./consts";
import { TbLoaderQuarter } from "react-icons/tb";
import { useLastSearch } from "./shared/hooks/useLastSearch.hook";

export type PaginationState = {
  currentNumber: number;
  currentLink: string;
  prevNumber: number;
  prevLink: string;
  nextNumber: number;
  nextLink: string;
  firstNumber: number;
  firstLink: string;
  lastNumber: number;
  lastLink: string;
  count: number;
};

type AppState = {
  input: string;
  result: [];
  isLoading: boolean;
};

const App = () => {
  const [appState, setAppState] = useState<AppState>({
    input: "",
    result: null!,
    isLoading: true,
  });

  const [paginationState, setPaginationState] = useState<PaginationState>({
    currentNumber: null!,
    currentLink: null!,
    prevNumber: null!,
    prevLink: null!,
    nextNumber: null!,
    nextLink: null!,
    firstNumber: null!,
    firstLink: null!,
    lastNumber: null!,
    lastLink: null!,
    count: null!,
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
    setAppState({ ...appState, input: value });

    const url = `${BASE_URL}/?filter[name_cont]=${value}&page[size]=${DEFAULT_PAGINATION_SIZE}`;
    handleRequest(url);
  };

  const handleRequest = async (url: string) => {
    setAppState({ ...appState, isLoading: true });

    const result = await fetch(url);
    const searchResult = await result.json();

    setAppState({
      ...appState,
      result: searchResult.data,
      isLoading: false,
    });

    setPaginationState({
      currentNumber: searchResult?.meta?.pagination?.current,
      currentLink: searchResult?.links?.current,
      prevNumber: searchResult?.meta?.pagination?.prev,
      prevLink: searchResult?.links?.prev,
      nextNumber: searchResult?.meta?.pagination?.next,
      nextLink: searchResult?.links?.next,
      firstNumber: searchResult?.meta?.pagination?.first,
      firstLink: searchResult?.links?.first,
      lastNumber: searchResult?.meta?.pagination?.last,
      lastLink: searchResult?.links?.last,
      count: searchResult?.meta?.pagination?.records,
    });
  };

  const updateInput = (e: ChangeEvent) =>
    setAppState({ ...appState, input: (e.target as HTMLInputElement).value });

  return (
    <>
      <Header />
      <div className={appState.isLoading ? "blured" : ""}>
        <SearchForm
          input={appState.input}
          updateInput={updateInput}
          sendSearchRequest={sendSearchRequest}
          isLoading={appState.isLoading}
        />
        <div className="container">
          <ResultsList
            result={appState.result}
            pagination={paginationState}
            paginationHandler={handleRequest}
          />
        </div>
      </div>

      {appState.isLoading && (
        <div className="overlay">
          <TbLoaderQuarter className="loader-icon" />
        </div>
      )}
    </>
  );
};

export default App;
