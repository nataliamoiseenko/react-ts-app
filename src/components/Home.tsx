import { ChangeEvent, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ResultsList from "./ResultsList";
import SearchForm from "./SearchForm";
import { BASE_URL, DEFAULT_PAGINATION_SIZE } from "../shared/consts";
import { useLastSearch } from "../shared/hooks/useLastSearch.hook";
import type { HomeProps, PaginationState } from "../shared/types";

const App = ({
  blured,
  setLoading,
  setSearchParams,
  openDetails,
}: HomeProps) => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<[]>(null!);

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
      setInput(lastSearch);
    } else sendSearchRequest();
  }, [lastSearch]);

  const sendSearchRequest = async (value = "") => {
    setLastSearch(value);

    const url = `${BASE_URL}/?filter[name_cont]=${value}&page[size]=${DEFAULT_PAGINATION_SIZE}`;
    handleRequest(url);
  };

  const handleRequest = async (url: string) => {
    setLoading(true);

    const queryParamsObj = new URLSearchParams(url.split("?")[1]);
    const pageNumber = queryParamsObj.get("page[number]");
    pageNumber && setSearchParams(new URLSearchParams(`page=${pageNumber}`));

    const result = await fetch(url);
    const searchResult = await result.json();

    setResults(searchResult?.data);
    setLoading(false);
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
    setInput((e.target as HTMLInputElement).value);

  return (
    <>
      <div className={` ${blured ? "home__blured" : ""}`}>
        <SearchForm
          input={input}
          updateInput={updateInput}
          sendSearchRequest={sendSearchRequest}
        />
        <div className="container">
          <ResultsList
            result={results}
            pagination={paginationState}
            paginationHandler={handleRequest}
            handleDetailSelect={openDetails}
          />
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default App;
