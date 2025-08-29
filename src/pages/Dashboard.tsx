import { FaSearch, FaPlus } from "react-icons/fa";
import Loading from "../components/Loading.tsx";
import React, { useState, useEffect } from "react";
import { MoreVert } from "@mui/icons-material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

import { Link } from "react-router-dom";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";

import Paper from "@mui/material/Paper";

import Navbar from "../components/Navbar.tsx";
import Sidebar from "../components/Sidebar.tsx";
import { LightTooltip } from "../utils/help.tsx";
import NoDataFound from "../components/NoDataFound.tsx";

import AddProductModal from "../components/modals/AddProductModal.tsx";

import EditProductModal from "../components/modals/EditProductModal.tsx";
import { useDeleteProduct, useProducts } from "../hooks/useProducts.ts";
import { useCategories } from "../hooks/useCategories.ts";

function Row(props: any) {
  const { row, index } = props;
  const { setSelectedSingleRow } = props;
  const { setShowProductModalEdit } = props;

  const { deleteMutation } = props;

  const handleEditProduct = (obj: any) => {
    setShowProductModalEdit(true);
    setSelectedSingleRow(obj);
  };

  const maxLengthForProduct = 90;

  const productNameShort = row.title || "";

  return (
    <React.Fragment>
      <TableRow>
        <TableCell
          sx={{
            borderBottom: "none",
            borderTop: "none",
          }}
          className={`${
            index % 2 === 1
              ? "border border-gray-300"
              : "border border-gray-300"
          }`}
          align="center"
        >
          {" "}
          <div className="flex items-center justify-center">
            <div className={`flex ms-3 items-center justify-between w-full`}>
              <LightTooltip title={productNameShort}>
                <span className="text-sm font-medium cursor-pointer truncate block max-w-[400px]">
                  {productNameShort.length > maxLengthForProduct
                    ? productNameShort.slice(0, maxLengthForProduct) + "..."
                    : productNameShort}
                </span>
              </LightTooltip>
            </div>
          </div>
        </TableCell>

        <TableCell
          align="center"
          sx={{
            borderBottom: "none",
            borderTop: "none",
            fontWeight: "400",
          }}
          className={`${
            index % 2 === 1
              ? "border border-gray-300"
              : "border border-gray-300"
          }`}
        >
          <div className="text-nowrap"> {row.price}</div>
        </TableCell>

        <TableCell
          align="center"
          sx={{
            borderBottom: "none",
            borderTop: "none",
            fontWeight: "400",
          }}
          className={`${
            index % 2 === 1
              ? "border border-gray-300"
              : "border border-gray-300"
          }`}
        >
          <div className="text-nowrap"> {row.category}</div>
        </TableCell>

        <TableCell
          align="center"
          sx={{
            borderBottom: "none",
            borderTop: "none",
            fontWeight: "400",
          }}
          className={`${
            index % 2 === 1
              ? "border border-gray-300"
              : "border border-gray-300"
          }`}
        >
          <div className="text-nowrap"> {row.stock}</div>
        </TableCell>

        <TableCell
          align="center"
          sx={{
            borderBottom: "none",
            borderTop: "none",
            fontWeight: "400",
            borderRight: "none",
          }}
          className={`${
            index % 2 === 1
              ? "border border-gray-300"
              : "border border-gray-300"
          }`}
        >
          <Menu as="div" className="relative inline-block">
            <MenuButton
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="inline-flex w-full justify-center gap-x-1.5  bg-white px-1 py-1 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              <MoreVert className="text-[#52637D] z-0 text-xl" />
            </MenuButton>

            <MenuItems
              transition
              className="absolute right-7 z-10 top-0 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <Link
                    to="#"
                    onClick={() => {
                      handleEditProduct(row);
                    }}
                    style={{
                      borderBottom: "1px dashed #ccc",
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Edit
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="#"
                    onClick={() => deleteMutation.mutate(row.id)}
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Delete
                  </Link>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </TableCell>
      </TableRow>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell width={20} colSpan={50} style={{ padding: 0 }}>
          <Collapse timeout="auto" unmountOnExit>
            <Box
              sx={{
                width: "97%",
                display: "flex",
                flexDirection: "column",
                borderTop: "1px solid #D9D9D9",
                padding: "0px 50px",
              }}
            ></Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

type Row = {
  createdAt: string | number | Date;
  id: number;
  clientName: string;
  email: string;
  phone: string;
  address: string;
  registeredDate: string;
  licenseExpiry: string;
  status: string;
  [key: string]: any;
};

const Dashboard = () => {
  const { data, isLoading } = useProducts();
  const {
    data: categories = [],
  }: {
    data: Array<any>;
    isLoading: boolean;
    isError: boolean;
  } = useCategories() as any;
  console.log(data);
  const deleteMutation = useDeleteProduct();
  const [showProductModal, setShowProductModal] = useState(false);
  const [showProductModalEdit, setShowProductModalEdit] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");

  const [selectedSingleRow, setSelectedSingleRow] = useState<any>();

  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const newRows = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        category: item.category,
        stock: item.stock,
      }));
      setRows(newRows);
    }
  }, [data]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredOnSearchAndFilerRows = rows?.filter((row: any) => {
    const titleSearch = row.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    const filterByCategory = row.category
      ?.toLowerCase()
      .includes(categoryFilter.toLowerCase());

    const matchesSearch = titleSearch && filterByCategory;

    return matchesSearch;
  });

  const [sidebarOpen, setSidebarOpen] = useState(() => {
    return window.innerWidth >= 768;
  });

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const filterData = [...filteredOnSearchAndFilerRows].sort((a, b) => {
    if (sortConfig) {
      const { key, direction } = sortConfig;
      const aVal = a[key];
      const bVal = b[key];

      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
      return 0;
    }

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(filterData?.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filterData?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  console.log(categories);

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 min-h-screen bg-[var(--background-color)]">
        <Navbar />

        <main
          className={`top-20 bg-[var(--background-color)] md:pe-6 px-3 md:ps-2 h-[calc(100vh-80px)] w-full overflow-x-auto transition-all duration-300 ease-in-out ${
            sidebarOpen
              ? "md:ml-52 md:w-[calc(100vw-13rem)]"
              : "md:ml-[60px] md:w-[calc(100vw-60px)]"
          }`}
        >
          <div className="bg-[var(--background-color)]  py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold text-[#000000]">
                Products ({filteredOnSearchAndFilerRows?.length})
              </h2>
              <p className="text-sm font-normal text-[#000000]">
                View all of your product information.
              </p>
            </div>

            <div className="flex items-center flex-wrap gap-2 w-full md:w-auto">
              <LightTooltip title={"Search by Title"}>
                <div className="relative w-full md:w-72">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for Product"
                    className="w-full font-medium text-black pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                  />
                  <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                </div>
              </LightTooltip>
              <div className="relative w-full md:w-72">
                <select
                  id="category-filter"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full font-medium text-black pl-3 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                >
                  <option value="">All Categories</option>
                  {categories && categories?.length > 0 ? (
                    categories?.map((category: any) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No categories available</option>
                  )}
                </select>
              </div>

              <div className="relative inline-block"></div>

              <button
                onClick={() => setShowProductModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#122645] text-white text-sm rounded-md hover:bg-[#0f1f3a]"
              >
                <FaPlus />
                Add Product
              </button>
            </div>
          </div>

          <div className="bg-[#fff] h-auto w-full rounded-2xl overflow-x-auto mt-2 mb-7 ">
            {currentItems?.length ? (
              <div>
                <TableContainer component={Paper}>
                  <Table
                    aria-label="collapsible table"
                    style={{
                      position: "relative",
                      marginBottom: "70px",
                    }}
                  >
                    <TableHead
                      sx={{
                        padding: "0px",
                      }}
                    >
                      <TableRow
                        className="bg-[#EBF3FF] text-[#000000] py-0"
                        style={{
                          padding: "0px",
                        }}
                        sx={{
                          padding: "0px",
                        }}
                      >
                        <TableCell
                          align="left"
                          width={200}
                          sx={{
                            fontSize: "16px",

                            fontWeight: "400",
                            color: "#000000",
                          }}
                          onClick={() => handleSort("title")}
                          className="border-gray-300 border text-nowrap cursor-pointer hover:bg-gray-100"
                        >
                          <div className="ms-2 text-nowrap flex items-center gap-x-2 ">
                            Title{" "}
                            {sortConfig?.key === "title" ? (
                              sortConfig.direction === "asc" ? (
                                <LightTooltip title="Ascending">
                                  <span>
                                    <FaSortUp className="text-sm" />
                                  </span>
                                </LightTooltip>
                              ) : (
                                <LightTooltip title="Descending">
                                  <span>
                                    <FaSortDown className="text-sm" />
                                  </span>
                                </LightTooltip>
                              )
                            ) : (
                              <LightTooltip title="Sort">
                                <span>
                                  <FaSort className="text-sm" />
                                </span>
                              </LightTooltip>
                            )}
                          </div>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#000000",
                          }}
                          onClick={() => handleSort("price")}
                          className="border-gray-300 border-y-0 border cursor-pointer hover:bg-gray-100"
                        >
                          <div className="text-nowrap flex justify-center items-center gap-x-2 ">
                            {" "}
                            Price{" "}
                            {sortConfig?.key === "price" ? (
                              sortConfig.direction === "asc" ? (
                                <LightTooltip title="Ascending">
                                  <span>
                                    <FaSortUp className="text-sm" />
                                  </span>
                                </LightTooltip>
                              ) : (
                                <LightTooltip title="Descending">
                                  <span>
                                    <FaSortDown className="text-sm" />
                                  </span>
                                </LightTooltip>
                              )
                            ) : (
                              <LightTooltip title="Sort">
                                <span>
                                  <FaSort className="text-sm" />
                                </span>
                              </LightTooltip>
                            )}
                          </div>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontSize: "16px",

                            fontWeight: "400",
                            color: "#000000",
                          }}
                          onClick={() => handleSort("category")}
                          className="border-gray-300 border-y-0 border cursor-pointer hover:bg-gray-100"
                        >
                          <div className=" text-nowrap flex justify-center items-center gap-x-2 ">
                            {" "}
                            Category{" "}
                            {sortConfig?.key === "category" ? (
                              sortConfig.direction === "asc" ? (
                                <LightTooltip title="Ascending">
                                  <span>
                                    <FaSortUp className="text-sm" />
                                  </span>
                                </LightTooltip>
                              ) : (
                                <LightTooltip title="Descending">
                                  <span>
                                    <FaSortDown className="text-sm" />
                                  </span>
                                </LightTooltip>
                              )
                            ) : (
                              <LightTooltip title="Sort">
                                <span>
                                  <FaSort className="text-sm" />
                                </span>
                              </LightTooltip>
                            )}
                          </div>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#000000",
                          }}
                          onClick={() => handleSort("stock")}
                          className="border-gray-300 border-y-0 border cursor-pointer hover:bg-gray-100"
                        >
                          <div className="text-nowrap flex justify-center items-center gap-x-2 ">
                            {" "}
                            Stock
                            {sortConfig?.key === "stock" ? (
                              sortConfig.direction === "asc" ? (
                                <LightTooltip title="Ascending">
                                  <span>
                                    <FaSortUp className="text-sm" />
                                  </span>
                                </LightTooltip>
                              ) : (
                                <LightTooltip title="Descending">
                                  <span>
                                    <FaSortDown className="text-sm" />
                                  </span>
                                </LightTooltip>
                              )
                            ) : (
                              <LightTooltip title="Sort">
                                <span>
                                  <FaSort className="text-sm" />
                                </span>
                              </LightTooltip>
                            )}
                          </div>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontSize: "16px",
                            borderTop: "none",
                            fontWeight: "400",
                            borderRight: "none",
                            color: "#000000",
                          }}
                          className="border-gray-300 border "
                        >
                          <div className="text-nowrap flex justify-center items-center gap-x-2 ">
                            {" "}
                            Actions{" "}
                            {sortConfig?.key === "patientName" ? (
                              sortConfig.direction === "asc" ? (
                                <FaSortUp className="text-sm" />
                              ) : (
                                <FaSortDown className="text-sm" />
                              )
                            ) : (
                              <FaSort className="text-sm" />
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentItems.map((row: any, index: number) => (
                        <Row
                          key={row.id}
                          row={row}
                          index={index}
                          setSelectedSingleRow={setSelectedSingleRow}
                          setShowProductModalEdit={setShowProductModalEdit}
                          loading={isLoading}
                          deleteMutation={deleteMutation}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {totalPages > 1 && (
                  <div className="flex py-3 px-5 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-black">
                        Page {currentPage} of {totalPages}
                      </span>
                    </div>
                    <div className="flex justify-end items-center mt-4 gap-2">
                      <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-xs  font-semibold cursor-pointer bg-white border rounded disabled:opacity-50"
                      >
                        Prev
                      </button>

                      <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 font-semibold text-xs cursor-pointer bg-white border rounded disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : isLoading ? (
              <Loading />
            ) : (
              <NoDataFound />
            )}
          </div>

          <AddProductModal
            showModal={showProductModal}
            onClose={() => setShowProductModal(false)}
          />
          <EditProductModal
            showModal={showProductModalEdit}
            onClose={() => setShowProductModalEdit(false)}
            selectedSingleRow={selectedSingleRow}
          />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
