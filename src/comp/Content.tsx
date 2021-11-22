import React from "react";
import Tile from "./Tile";
import "../sass/Content.scss";

type ContentProps = {
  phrase: string;
  type: string;
  data: [
    {
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
    }
  ];
};

const Content = ({ data, phrase, type }: ContentProps) => {
  return (
    <section className="content wrapper">
      <h2 className="content__title">Select a pokemon to see more information</h2>
      <div className="content__tiles">
        {data
          .filter((pokemon) =>
            type !== "all"
              ? pokemon.types.find(
                  (pokemonType) => pokemonType.type.name === type
                )
              : true
          )
          .filter((pokemon) => pokemon.name.includes(phrase))
          .map((pokemon) => (
            <Tile key={pokemon.id} pokemon={pokemon} />
          ))}
      </div>
    </section>
  );
};

export default Content;
