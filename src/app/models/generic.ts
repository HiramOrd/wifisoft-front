export interface GenericText {
  title: string;
  content: string;
  image: string;
}

export interface GenericRequest<T> {
  code: number;
  message: string;
  data: T;
}
