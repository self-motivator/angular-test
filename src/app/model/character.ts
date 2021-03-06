export interface C_ITEMS {
  resourceURI: string;
  name: string;
  type?: string;
}

export interface C_CATEGORY {
  available: number;
  collectionURI: string;
  items: C_ITEMS[];
}

export interface C_URL {
  type: string;
  url: string;
}

export interface C_THUMB {
  path: string;
  extension: string;
}

export interface CHARACTER {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: C_THUMB;
  resourceURI: string;
  comics?: C_CATEGORY;
  series?: C_CATEGORY;
  stories?: C_CATEGORY;
  events?: C_CATEGORY;
  urls?: C_URL[];
}

export interface RESULT_DATA {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: CHARACTER[];
}

export interface RESPONSE_RESULT {
  data: RESULT_DATA;
  code: number;
  status: string;
  copyright: string;
}
