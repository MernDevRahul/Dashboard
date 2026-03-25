import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { useDeleteContestMutation, useFetchContestsQuery } from "../redux/services/contestService";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import { highlightText } from "../utils/helper";
import { toast } from "react-toastify";

const baseUrl =
  import.meta.env.VITE_MODE == "DEV"
    ? import.meta.env.VITE_DEV_BASE_URL
    : import.meta.env.VITE_PROD_BASE_URL;

const ContestsListLayer = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [deleteContest] = useDeleteContestMutation();
  const { data, isLoading, isFetching } = useFetchContestsQuery(
    {
      page,
      limit,
      status,
      search: debouncedSearch,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [search]);

  const handleDelete = async (id) =>{
    try {
      const res = await deleteContest(id).unwrap();
      if(res.success) toast.success("Contest Deleted Successfully")
    } catch (error) {
      toast.error(error.message);
    }
  }

  // loading Fallback
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <form className="navbar-search">
            <input
              type="text"
              className="bg-base h-40-px w-auto"
              name="search"
              placeholder="Search By Contest Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Icon icon="ion:search-outline" className="icon" />
          </form>
          <select
            value={status}
            className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
          </select>
          {(status || search) && (
            <button
              type="button"
              className="text-sm btn-sm radius-8 text-danger text-decoration-underline d-flex align-items-center gap-1"
              onClick={() => {
                setStatus("");
                setSearch("");
              }}
            >
              clear
            </button>
          )}
        </div>
        <Link
          to="/add-contest"
          className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
        >
          <Icon
            icon="ic:baseline-plus"
            className="icon text-xl line-height-1"
          />
          Add New Contest
        </Link>
      </div>
      <div className="card-body p-24 position-relative">
        {isFetching && (
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center">
            <span className="text-sm bg-white px-3 py-1 radius-8 shadow-sm">
              Updating...
            </span>
          </div>
        )}
        <div className={`table-responsive scroll-sm ${isFetching ? "opacity-50" : ""}`}>
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">
                  <div className="d-flex align-items-center gap-10">
                    <div className="form-check style-check d-flex align-items-center">
                      <input
                        className="form-check-input radius-4 border input-form-dark"
                        type="checkbox"
                        name="checkbox"
                        id="selectAll"
                      />
                    </div>
                    S.L
                  </div>
                </th>
                <th scope="col">Contest Name</th>
                <th scope="col">Client Name</th>
                <th scope="col">Client Email</th>
                <th scope="col">Total Seasons</th>
                <th scope="col">Created At</th>
                <th scope="col" className="text-center">
                  Status
                </th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center gap-10">
                      <div className="form-check style-check d-flex align-items-center">
                        <input
                          className="form-check-input radius-4 border border-neutral-400"
                          type="checkbox"
                          name="checkbox"
                        />
                      </div>
                      {index + 1}
                    </div>
                  </td>
                  <td>{highlightText(item.name || "", debouncedSearch)}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={`${baseUrl}${item.client?.profile || ""}`}
                        alt={item.client?.name || "Client"}
                        className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                      />
                      <div className="flex-grow-1">
                        <span className="text-md mb-0 fw-normal text-secondary-light">
                          {item.client?.name || "N/A"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-md mb-0 fw-normal text-secondary-light">
                      {item.client?.email || "N/A"}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="text-md mb-0 fw-normal text-secondary-light">
                      {item.totalSeasons || 0}
                    </span>
                  </td>
                  <td>
                    <span className="text-md mb-0 fw-normal text-secondary-light">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </td>
                  <td className="text-center">
                    <span
                      className={`px-24 py-4 radius-4 fw-medium text-sm text-capitalize ${
                        item.status === "active"
                          ? "bg-success-focus text-success-600 border border-success-main"
                          : item.status === "inactive"
                            ? "bg-warning-focus text-warning-600 border border-warning-main"
                            : item.status === "blocked"
                              ? "bg-danger-focus text-danger-600 border border-danger-main"
                              : "bg-neutral-200 text-neutral-600 border border-neutral-400"
                      }`}
                    >
                      {item.status || "Unknown"}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="d-flex align-items-center gap-10 justify-content-center">
                      <button
                        type="button"
                        className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                      >
                        <Icon
                          icon="majesticons:eye-line"
                          className="icon text-xl"
                        />
                      </button>
                      <Link
                        to={`/edit-contest/${item?.slug}`}
                        className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                      >
                        <Icon icon="lucide:edit" className="menu-icon" />
                      </Link>
                      <button
                        type="button"
                        className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                      onClick={()=> handleDelete(item._id)}
                      >
                        <Icon
                          icon="fluent:delete-24-regular"
                          className="menu-icon"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
          <span>
            Showing {(page - 1) * limit + 1} to{" "}
            {Math.min(page * limit, data?.total || 0)} of {data?.total || 0}{" "}
            entries
          </span>
          <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
            {/* Prev */}
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setPage((prev) => prev - 1)}
                disabled={page === 1}
              >
                <Icon icon="ep:d-arrow-left" />
              </button>
            </li>

            {/* Page Numbers */}
            {[...Array(data?.pages || 0)].map((_, i) => {
              const pageNumber = i + 1;
              return (
                <li key={pageNumber} className="page-item">
                  <button
                    className={`page-link ${
                      page === pageNumber
                        ? "bg-primary-600 text-white"
                        : "bg-neutral-200"
                    }`}
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                </li>
              );
            })}

            {/* Next */}
            <li
              className={`page-item ${page === data?.pages ? "disabled" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page === data?.pages}
              >
                <Icon icon="ep:d-arrow-right" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContestsListLayer;
