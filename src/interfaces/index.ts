export interface ComponentWithClassName {
  className: string;
}

export interface Post {
  title: string;
  body: string;
  id: number;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  address: {
    city: string;
    street: string;
  }
}

export interface WeatherData {
  temperature: number;
  name: string;
  description: string;
  img: string;
}

export interface PopularCurrencies {
  [currency: string]: number;
}

export interface FormData {
  [key: string]: string;
}

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  handlePageClick: (page: number) => void;
}