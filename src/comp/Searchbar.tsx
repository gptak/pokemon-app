import "../sass/Searchbar.scss";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

type SearchbarProps = {
  phrase: string;
  type: string;
  checkCookies: () => void;
  search: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  reset: () => void;
};

const Searchbar = ({ search, filter, phrase, type, reset }: SearchbarProps) => {
  const types = [
    "all",
    "bug",
    "dark",
    "dragon",
    "electric",
    "fairy",
    "fighting",
    "fire",
    "flying",
    "ghost",
    "grass",
    "ground",
    "ice",
    "normal",
    "poison",
    "psychic",
    "rock",
    "steel",
    "water",
  ];

  const history = useHistory();

  const handleLogout = () => {
    Cookies.remove("logged");
    history.push("/login");
  };

  return (
    <div className="searchbar">
      <div className="searchbar__container wrapper">
        <div className="searchbar__input">
          <div className="searchbar__input_search">
            <label htmlFor="search">Search: </label>
            <input value={phrase} name="search" onChange={search} autoComplete="off"/>
          </div>
          <div className="searchbar__input_filter">
            <label htmlFor="type">Filter type: </label>
            <select name="type" onChange={filter} value={type} >
              {types.map((type) => {
                return (
                  <option value={type} key={type}>
                    {type}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="searchbar__button">
          <button className="searchbar__button_reset" onClick={reset}>
            Reset
          </button>
          <button className="searchbar__button_logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
