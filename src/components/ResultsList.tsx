import { Component } from "react";

type ResultsListProps = {
  result: [] | null;
};

type Character = {
  id: string;
  attributes: Attributes;
  links: {
    self: string;
  };
  type: string;
};

type Attributes = {
  alias_names: string[];
  animagus: string;
  blood_status: string;
  boggart: string;
  born: string;
  died: string;
  eye_color: string;
  family_members: string[];
  gender: string;
  hair_color: string;
  height: string;
  house: string;
  image: string;
  jobs: string[];
  marital_status: string;
  name: string;
  nationality: string;
  patronus: string;
  romances: string[];
  skin_color: string;
  slug: string;
  species: string;
  titles: string[];
  wands: string[];
  weight: string;
  wiki: string;
};

class ResultsList extends Component<ResultsListProps> {
  constructor(props: ResultsListProps) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.result && this.props.result.length > 0 ? (
          <ul>
            {this.props.result.map((el: Character) => (
              <li key={el.id}>
                {el.attributes.image && (
                  <img src={el.attributes.image} alt={el.attributes.name} />
                )}
                <h3>{el.attributes.name}</h3>
                <p>{el.attributes.species}</p>
                <p>{el.attributes.gender}</p>
              </li>
            ))}
          </ul>
        ) : this.props.result ? (
          <>
            <p>No results</p>
          </>
        ) : (
          <p>Start searching</p>
        )}
      </>
    );
  }
}

export default ResultsList;
