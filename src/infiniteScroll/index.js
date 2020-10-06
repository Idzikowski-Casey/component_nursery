import React, { useState, useRef } from "react";
import h from "@macrostrat/hyper";
import useBookSearch from "./useBookSearch";
import { useCallback } from "react";

export function InfiniteScroll() {
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState("");
  const { books, error, loading, hasMore } = useBookSearch(query, pageNumber);
  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function handleSearch(e) {
    setQuery(e.target.value);
    setPageNumber(1);
  }

  return (
    <div>
      <input type="text" value={query} onChange={handleSearch}></input>
      {books.map((book, index) => {
        if (books.length === index + 1) {
          return (
            <div key={book} ref={lastElementRef}>
              {book}
            </div>
          );
        } else {
          return <div key={book}>{book}</div>;
        }
      })}
      <div>{loading && "loading..."}</div>
      <div>{error && "Error"}</div>
    </div>
  );
}
