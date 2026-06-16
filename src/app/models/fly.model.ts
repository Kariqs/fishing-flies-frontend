export type CreateFlyResponse = {
  message: string;
};

export type FliesResponse = {
  ID: number;
  imageUrl: string;
  name: string;
  category: string;
  price: string;
  hookSize: string;
  color?: string;
  hookType?: string;
};

export type GetFliesResponse = {
  flies: FliesResponse[];
};
