import { Link } from "react-router-dom";
import "../sass/Tile.scss";

type TileProps = {
  pokemon: {
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
};

const Tile = ({ pokemon }: TileProps) => {
  const pokemonName = (
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
  ).replaceAll("-", " ");

  return (
    <Link
      to={`/${pokemon.name}`}
      className={`tile ${pokemon.types[0].type.name}`}
    >
      <div className="tile__img">
        <img src={pokemon.sprites.front_default} alt={`${pokemon.name}`} />
      </div>
      <h3 className="tile__title">{pokemonName}</h3>
    </Link>
  );
};

export default Tile;
