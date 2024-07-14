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
      {house && <p>House: {house}</p>}
      {born && <p>Born: {born}</p>}
      {died && <p>Died: {died}</p>}
      {species && <p>Species: {species}</p>}
      {gender && <p>Gender: {gender}</p>}
    </div>
  );
};

export default Details;
