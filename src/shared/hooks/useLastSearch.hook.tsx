import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LOCAL_STORAGE_TITLE } from "../consts";

const tryGetInitialSearch = () => {
  const initialSearch = localStorage.getItem(LOCAL_STORAGE_TITLE);

  return initialSearch || "";
};

const saveLastSearch = (value: string) =>
  localStorage.setItem(LOCAL_STORAGE_TITLE, value);

export const useLastSearch = (): [string, Dispatch<SetStateAction<string>>] => {
  const [lastSearch, setLastSearch] = useState(tryGetInitialSearch);

  useEffect(() => {
    saveLastSearch(lastSearch);

    return () => {
      lastSearch && saveLastSearch(lastSearch);
    };
  }, [lastSearch]);

  return [lastSearch, setLastSearch];
};
