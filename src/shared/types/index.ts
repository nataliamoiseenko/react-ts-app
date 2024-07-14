import type { ChangeEvent } from "react";

export type PaginationState = {
  currentNumber: number;
  currentLink: string;
  prevNumber?: number;
  prevLink?: string;
  nextNumber?: number;
  nextLink?: string;
  firstNumber?: number;
  firstLink?: string;
  lastNumber?: number;
  lastLink?: string;
  count: number;
};

export type DetailsType = {
  alias_names?: string[];
  animagus?: string;
  blood_status?: string;
  boggart?: string;
  born?: string;
  died?: string;
  eye_color?: string;
  family_members?: string[];
  gender?: string;
  hair_color?: string;
  height?: string;
  house?: string;
  image?: string;
  jobs?: string[];
  marital_status?: string;
  name?: string;
  nationality?: string;
  patronus?: string;
  romances?: string[];
  skin_color?: string;
  slug?: string;
  species?: string;
  titles?: string[];
  wands?: string[];
  weight?: string;
  wiki?: string;
};

export type HomeProps = {
  blured: boolean;
  setLoading: (status: boolean) => void;
  setSearchParams: (urlParams: URLSearchParams) => void;
  openDetails: (is: string) => Promise<void>;
};

export type SearchFormProps = {
  input: string;
  updateInput: (e: ChangeEvent) => void;
  sendSearchRequest: (value: string) => void;
  isLoading?: boolean;
};

export type ResultsListProps = {
  result: [] | null;
  pagination: PaginationState;
  paginationHandler: (requestUrl: string) => void;
  handleDetailSelect: (id: string) => void;
};

export type PaginationProps = PaginationState & {
  paginationHandler: (requestUrl: string) => void;
};

export type Character = {
  id: string;
  attributes: Attributes;
  links: {
    self: string;
  };
  type: string;
};

export type Attributes = {
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

export type DetailsProps = DetailsType & {
  closeDetail: () => void;
};
