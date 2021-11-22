import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

import MainPage from "./pages/MainPage";
import DataPage from "./pages/DataPage";
import LoginPage from "./pages/LoginPage";

import "./sass/App.scss";
import LoadingScreen from "./pages/LoadingScreen";

type InitialData = [
  {
    name: string;
    url: string;
  }
];

type Pokemon = {
  abilities: [
    {
      ability: {
        name: string;
      };
    }
  ];
  height: string;
  held_items: [
    {
      item: {
        name: string;
      };
    }
  ];
  id: string;
  name: string;
  sprites: any;
  stats: [
    {
      base_stat: number;
      effort: number;
      stat: {
        name: string;
        url: string;
      };
    }
  ];
  types: [
    {
      slot: string;
      type: {
        name: string;
      };
    }
  ];
  weight: string;
};

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [filteredType, setFilterdType] = useState<string>("all");
  const [token, setToken] = useState<boolean>(false);

  // DATA FETCHING

  const initialURL: string = "https://pokeapi.co/api/v2/pokemon?limit=1500";

  useEffect(() => {
    async function fetchData() {
      let response: any = await fetchInitialData(initialURL);
      await fetchPokemon(response.results);
      setLoading(false);
    }

    const fetchInitialData = async (url: string) => {
      return new Promise((resolve, reject) => {
        fetch(url)
          .then((res) => res.json())
          .then((initialData) => {
            resolve(initialData);
          });
      });
    };

    const fetchPokemon = async (initialData: InitialData) => {
      let _pokemonData = await Promise.all(
        initialData.map((pokemon) => {
          let pokemonRecord = getPokemon(pokemon.url);
          return pokemonRecord;
        })
      );
      setData(_pokemonData);
    };

    const getPokemon = (url: string) => {
      return new Promise((resolve, reject) => {
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            resolve(data);
          });
      });
    };

    checkCookies();
    fetchData();
  }, []);

  // SEARCH

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchPhrase(e.target.value.toLowerCase());
  };

  //FILTER

  const handleTypeFilter = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setFilterdType(e.target.value);
  };

  //RESET

  const reset = (): void => {
    setSearchPhrase("");
    setFilterdType("all");
  };

  //COOKIES CHECK

  const checkCookies = (): void => {
    const cookies = Cookies.get();

    if (cookies.logged === "true") {
      setToken(true);
    } else {
      setToken(false);
    }
  };

  if (!loading) {
    return (
      <BrowserRouter>
        {token ? (
          <Route exact path="/">
            <MainPage
              phrase={searchPhrase}
              type={filteredType}
              data={data}
              search={handleSearchInput}
              filter={handleTypeFilter}
              reset={reset}
              checkCookies={checkCookies}
            />
          </Route>
        ) : (
          <Redirect exact to="/login" />
        )}
        {data.map((pokemon: Pokemon) => {
          return token ? (
            <Route key={pokemon.id} path={`/${pokemon.name}`}>
              <DataPage pokemon={pokemon} checkCookies={checkCookies} />
            </Route>
          ) : (
            <Redirect key={pokemon.id} exact to="/login" />
          );
        })}
        <Route path="/login">
          <LoginPage checkCookies={checkCookies} />
        </Route>
      </BrowserRouter>
    );
  } else {
    return <LoadingScreen />;
  }
};

export default App;
