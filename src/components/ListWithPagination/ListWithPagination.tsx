import { usePagination } from "../../hooks/usePagination";
import { Pagination } from "../Pagination/Pagination";
import Loader from "../Loader/Loader";
import { useFetch } from "../../hooks/useFetch";
import { getData } from "../../api/api";
import { TOTAL_PAGES, INITIAL_PAGE } from "../../config/constants";
import { Post } from "../../interfaces";

interface ListWithPaginationProps {
  children: (props: { data: Post[] }) => React.ReactNode;
}

export const ListWithPagination = ({ children }: ListWithPaginationProps) => {
  const { currentPage, handleNextPage, handlePreviousPage, handlePageClick } =
    usePagination(INITIAL_PAGE, TOTAL_PAGES);

  const { data, isLoading, error } = useFetch<Post[]>(
    getData,
    `/posts?_page=${currentPage}&_limit=4`
  );

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <>
      {children({ data })}
      <Pagination
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handlePageClick={handlePageClick}
        totalPages={TOTAL_PAGES}
        currentPage={currentPage}
      />
    </>
  );
};
