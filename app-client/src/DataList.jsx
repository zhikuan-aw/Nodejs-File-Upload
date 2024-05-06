import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";

const DataList = () => {
  const [data, setData] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const isStart = currentPage < 3;
  const isEnd = totalPages - currentPage < 3;
  const paginationBaseNum = isStart
    ? 1
    : isEnd
    ? totalPages - 4
    : currentPage - 2;

  const fetchData = useCallback(() => {
    fetch(`http://localhost:3000/data?page=${currentPage}&search=${search}`)
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
        setTotalPages(result.totalPages);
      })
      .catch(() => setError("Failed to fetch data"));
  }, [currentPage, search]);

  const debouncedFetchData = useCallback(debounce(fetchData, 300), [fetchData]);

  useEffect(() => {
    debouncedFetchData();
    // Cleanup if the component unmounts
    return debouncedFetchData.cancel;
  }, [debouncedFetchData]);

  const handleSearchInput = (e) => {
    setCurrentPage(1);
    setSearch(e.target.value);
  };

  if (!search && !data?.length) {
    return (
      <span className='flex justify-center text-lg font-semibold mt-8'>
        Upload data to start
      </span>
    );
  }

  return (
    <div>
      <input
        className='w-full rounded-md border-2 px-2 py-1 border-black mb-4'
        type='text'
        placeholder='Search...'
        value={search}
        onChange={handleSearchInput}
      />
      {error ? (
        <p>Unable to find your search results: {error}</p>
      ) : (
        <>
          <table className='table-auto mb-4'>
            <thead>
              <tr>
                {data.length > 0 &&
                  Object.keys(data[0]).map((key) => (
                    <th
                      key={key}
                      className='p-4 bg-green-600 border text-white border-white'
                    >
                      {key}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className='text-sm'>
              {data?.map((row, index) => (
                <tr key={index} className='even:bg-white odd:bg-slate-100 h-20'>
                  {Object.values(row).map((value, idx) => {
                    const hasSearchTerm =
                      search &&
                      String(value).toLowerCase().indexOf(search) > -1;

                    return (
                      <td
                        key={idx}
                        className={`p-2 border border-slate-200 ${
                          hasSearchTerm ? "text-orange-500" : ""
                        }`}
                      >
                        <span className='text-ellipsis line-clamp-3'>
                          {value}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex gap-8 justify-center pb-4 items-center relative'>
            {[...Array(Math.min(totalPages, 5))].map((_, idx) => {
              const pageNum = paginationBaseNum + idx;

              return (
                <button
                  key={pageNum}
                  className={`size-10 rounded-sm text-white ${
                    pageNum === currentPage
                      ? "bg-blue-400 font-bold cursor-default"
                      : "bg-slate-500 hover:bg-blue-600"
                  }`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            {data?.length > 0 && (
              <span className='absolute right-0 top-0 text-neutral-500 text-sm'>
                {currentPage} of {totalPages} page(s)
              </span>
            )}
            {search && !data?.length > 0 && (
              <span className='flex justify-center text-lg font-semibold mt-8'>
                {`No data found in search for ${search}...`}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DataList;
