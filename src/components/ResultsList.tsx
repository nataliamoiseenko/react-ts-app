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

const ResultsList = ({ result }: ResultsListProps) => (
  <>
    {result && result.length > 0 ? (
      <ul>
        {result.map((el: Character) => (
          <li key={el.id}>
            <div className="image_container">
              {el.attributes.image ? (
                <img src={el.attributes.image} alt={el.attributes.name} />
              ) : (
                <img
                  src="https://potterdb.com/images/missing_character.svg"
                  alt="missing_character"
                />
              )}
            </div>
            <h3>{el.attributes.name}</h3>
            <p>{el.attributes.species}</p>
            <p>{el.attributes.gender}</p>
          </li>
        ))}
      </ul>
    ) : result ? (
      <>
        <p>No results</p>
      </>
    ) : (
      <p>Start searching</p>
    )}
  </>
);

export default ResultsList;
