import { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import type { DetailsProps } from "../shared/types";

const Details = ({
  closeDetail,
  image,
  born,
  died,
  house,
  name,
  species,
  gender,
  blood_status,
  eye_color,
  hair_color,
  skin_color,
  nationality,
  marital_status,
  patronus,
  boggart,
  animagus,
  alias_names,
}: DetailsProps) => {
  const detailContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (detailContainer.current?.contains(event.target as Element)) return;

      closeDetail();
    };

    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [closeDetail]);

  return (
    <div className="details" ref={detailContainer}>
      <AiOutlineClose onClick={closeDetail} className="details__close" />

      {image ? (
        <img src={image} alt={name} />
      ) : (
        <img
          src="https://potterdb.com/images/missing_character.svg"
          alt="missing_character"
        />
      )}

      {name && <h3>Name: {name}</h3>}
      {species && <p>Species: {species}</p>}
      {gender && <p>Gender: {gender}</p>}
      {blood_status && <p>Blood status: {blood_status}</p>}
      {eye_color && <p>Eye color: {eye_color}</p>}
      {hair_color && <p>Hair color: {hair_color}</p>}
      {skin_color && <p>Skin color: {skin_color}</p>}
      {nationality && <p>Nationality: {nationality}</p>}
      {marital_status && <p>Marital status: {marital_status}</p>}
      {house && <p>House: {house}</p>}
      {patronus && <p>Patronus: {patronus}</p>}
      {boggart && <p>Boggart: {boggart}</p>}
      {animagus && <p>Animagus: {animagus}</p>}
      {born && <p>Born: {born}</p>}
      {died && <p>Died: {died}</p>}
      {alias_names && !!alias_names.length && (
        <p>
          Alias names:{" "}
          {alias_names.map((el, index) => (
            <span key={index}>{el + "; "}</span>
          ))}
        </p>
      )}
    </div>
  );
};

export default Details;
