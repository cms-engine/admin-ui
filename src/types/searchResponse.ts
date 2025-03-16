export interface SearchResponse<T> {
  page: number;
  size: number;
  elements: number;
  totalElements: number;
  data: T[];
}
