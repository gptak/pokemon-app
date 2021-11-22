import { useEffect } from "react";

import Header from "../comp/Header";
import Content from "../comp/Content";
import Searchbar from "../comp/Searchbar";

type MainPageProps = {
  data: any;
  phrase: string;
  type: string;
  checkCookies: () => void;
  search: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  reset: () => void;
};

const MainPage = ({
  data,
  phrase,
  type,
  checkCookies,
  search,
  filter,
  reset,
}: MainPageProps) => {
  useEffect(() => {
    checkCookies();
  });

  return (
    <>
      <Header />
      <Searchbar
        phrase={phrase}
        type={type}
        search={search}
        filter={filter}
        reset={reset}
        checkCookies={checkCookies}
      />
      <Content data={data} phrase={phrase} type={type} />
    </>
  );
};

export default MainPage;
