import { useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import Header from "./components/Header";
import { BASE_URL } from "./shared/consts";
import { TbLoaderQuarter } from "react-icons/tb";
import Home from "./components/Home";
import Details from "./components/Details";
import "./App.css";
import NotFound from "./components/404";

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Record<
    string,
    string | string[]
  > | null>(null);

  const openDetails = async (id: string) => {
    setLoading(true);
    const url = `${BASE_URL}/${id}`;

    const result = await fetch(url);
    const searchResult = await result.json();

    setSelected(searchResult?.data?.attributes);
    searchParams.set("details", "1");
    setSearchParams(searchParams);
    setLoading(false);
  };

  const closeDetail = () => {
    setSelected(null);
    searchParams.delete("details");
    setSearchParams(searchParams);
  };

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              blured={loading || !!selected}
              setLoading={setLoading}
              setSearchParams={setSearchParams}
              openDetails={openDetails}
            />
          }
        >
          <Route
            path="/"
            element={
              selected && <Details {...selected} closeDetail={closeDetail} />
            }
          />
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>

      {loading && (
        <div className="overlay">
          <TbLoaderQuarter className="loader-icon" />
        </div>
      )}
    </>
  );
};

export default App;
