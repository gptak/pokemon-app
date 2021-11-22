import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../sass/DataPage.scss";

type DataPageProps = {
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
  checkCookies: () => void;
};

function DataPage({ pokemon, checkCookies }: DataPageProps) {
  const pokemonName = (
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
  ).replace("-", " ");

  useEffect(() => {
    checkCookies();
  }, [checkCookies]);

  return (
    <section className="datapage">
      <div className="wrapper">
        <div
          className={`datapage__card light ${pokemon.types[0].type.name}-bg`}
        >
          <h2 className="datapage__card_title">{pokemonName}</h2>
          <div className="datapage__card_images">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt={`${pokemon.name}`}
            />
          </div>

          <div className="datapage__card_info">
            <div className="datapage__card_text">
              <table>
                <tbody>
                  <tr>
                    <th>
                      <span>Type:</span>
                    </th>
                    <td>
                      {pokemon.types.map((slot) => {
                        return (
                          <span key={slot.type.name}>
                            {slot.type.name.charAt(0).toUpperCase() +
                              slot.type.name.slice(1)}
                          </span>
                        );
                      })}
                    </td>
                  </tr>
                  <tr>
                    <th>Abilities:</th>
                    <td>
                      {pokemon.abilities.map((slot) => {
                        return (
                          <span key={slot.ability.name}>
                            {(
                              slot.ability.name.charAt(0).toUpperCase() +
                              slot.ability.name.slice(1)
                            ).replace("-", " ")}
                          </span>
                        );
                      })}
                    </td>
                  </tr>
                  <tr>
                    <th>Weight:</th>
                    <td>
                      <span>{parseInt(pokemon.weight) / 10} kg</span>
                    </td>
                  </tr>
                  <tr>
                    <th>Height:</th>
                    <td>
                      <span>{parseInt(pokemon.height) / 10} m</span>
                    </td>
                  </tr>
                  <tr>
                    <th>Held items:</th>
                    <td>
                      {pokemon.held_items[0] === undefined ? (
                        <span>none</span>
                      ) : (
                        pokemon.held_items.map((item) => {
                          return (
                            <span key={item.item.name}>
                              {(
                                item.item.name.charAt(0).toUpperCase() +
                                item.item.name.slice(1)
                              ).replace("-", " ")}
                            </span>
                          );
                        })
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="datapage__card_stats">
              <table>
                <tbody>
                  {pokemon.stats.map((stat) => {
                    const divStyle = {
                      width: stat.base_stat * 0.3921 + "%",
                    };
                    return (
                      <tr key={stat.stat.name}>
                        <th>
                          {stat.stat.name.charAt(0).toUpperCase() +
                            stat.stat.name.slice(1).replace("-", " ")}
                          :
                        </th>
                        <td>{stat.base_stat}</td>
                        <td>
                          <div className="datapage__card_stats_column">
                            <div
                              className="datapage__card_stats_line"
                              style={divStyle}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="datapage__card_return">
            <Link to="/" className="datapage__card_button">
              Return
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DataPage;
