import { usePagination } from "../../hooks/usePagination";
import { Pagination } from "../../components/Pagination/Pagination";
import { ItemNews } from "../../components/ItemNews/ItemNews";
import styles from "./styles.module.css";
import { useFetch } from "../../hooks/useFetch";
import { TOTAL_PAGES, INITIAL_PAGE } from "../../config/constants";
import Loader from "../../components/Loader/Loader";
import { getData } from "../../api/api";
import { Post } from "../../interfaces";

export const NewsPage = () => {
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
      <ul className={styles.newsList}>
        {data.map((item) => {
          return <ItemNews key={item.id} item={item} />;
        })}
      </ul>
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
