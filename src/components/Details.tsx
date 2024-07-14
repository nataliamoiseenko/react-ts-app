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
  return (
    <div className="details">
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
