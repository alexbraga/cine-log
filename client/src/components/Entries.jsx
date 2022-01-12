import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Link from "@mui/material/Link";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";
import CustomTable from "./CustomTable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionIcon from "@mui/icons-material/Description";
import DotsMenu from "./DotsMenu";
import useMediaQuery from "@mui/material/useMediaQuery";

function Entries(props) {
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width:495px)");
  const isTablet = useMediaQuery("(min-width:496px) and (max-width:768px)");
  const isLaptop = useMediaQuery("(min-width:769px) and (max-width:1024px)");
  const isLaptopLg = useMediaQuery("(min-width:1025px) and (max-width:1166px)");

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState();

  const watched = (date) => format(new Date(date), "MMM dd, yyyy");

  const handleEdit = (row) => {
    setOpenEdit(true);
    setSelectedRow(row);
  };

  const handleDelete = (row) => {
    setOpenDelete(true);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setOpenEdit(false);
    setOpenDelete(false);
    setSelectedRow();
  };

  const data = props.data;

  const columns = useMemo(
    () =>
      isMobile
        ? [
            {
              Header: "#",
              id: "row",
              Cell: ({ row }) => {
                return <div>{row.index + 1}</div>;
              },
            },
            {
              Header: "Title",
              accessor: "title",
              className: "column-left",
              Cell: ({ cell: { value }, row: { original } }) => (
                <div>
                  <p>
                    <Link
                      sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                        "&:hover": { color: "#00D67E" },
                      }}
                      color="#fff"
                      underline="none"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/details/${original.movieId}`)}
                    >
                      {value}
                    </Link>
                  </p>
                  <p>{original.year}</p>
                  <p>
                    <Rating
                      size="small"
                      value={original.details[0].rating}
                      readOnly
                      emptyIcon={<StarIcon fontSize="inherit" />}
                    />
                  </p>
                  <p>
                    <VisibilityIcon fontSize="inherit" />{" "}
                    {watched(original.date)}&nbsp;&nbsp;
                    {!original.details[0].review ? null : (
                      <DescriptionIcon fontSize="inherit" color="primary" />
                    )}
                  </p>
                </div>
              ),
            },
            {
              Header: "",
              id: "actions",
              Cell: ({ row }) => (
                <DotsMenu
                  onUpdate={() => handleEdit(row.original)}
                  onDelete={() => handleDelete(row.original)}
                />
              ),
            },
          ]
        : isTablet
        ? [
            {
              Header: "#",
              id: "row",
              Cell: ({ row }) => {
                return <div>{row.index + 1}</div>;
              },
            },
            {
              Header: "Title",
              accessor: "title",
              className: "column-left",
              Cell: ({ cell: { value }, row: { original } }) => (
                <div>
                  <p>
                    <Link
                      sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                        "&:hover": { color: "#00D67E" },
                      }}
                      color="#fff"
                      underline="none"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/details/${original.movieId}`)}
                    >
                      {value}
                    </Link>
                  </p>
                  <p>{original.year}</p>
                  <p>
                    <VisibilityIcon fontSize="inherit" />{" "}
                    {watched(original.date)}&nbsp;&nbsp;
                    {!original.details[0].review ? null : (
                      <DescriptionIcon fontSize="inherit" color="primary" />
                    )}
                  </p>
                </div>
              ),
            },
            {
              Header: "Rating",
              accessor: "details[0].rating",
              className: "column-right",
              Cell: ({ cell: { value } }) => (
                <Rating
                  size="small"
                  value={value}
                  readOnly
                  emptyIcon={<StarIcon fontSize="inherit" />}
                />
              ),
            },
            {
              Header: "",
              id: "actions",
              Cell: ({ row }) => (
                <DotsMenu
                  onUpdate={() => handleEdit(row.original)}
                  onDelete={() => handleDelete(row.original)}
                />
              ),
            },
          ]
        : isLaptop
        ? [
            {
              Header: "#",
              id: "row",
              Cell: ({ row }) => {
                return <div>{row.index + 1}</div>;
              },
            },
            {
              Header: "Title",
              accessor: "title",
              className: "column-left",
              Cell: ({ cell: { value }, row: { original } }) => (
                <div>
                  <p>
                    <Link
                      sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                        "&:hover": { color: "#00D67E" },
                      }}
                      color="#fff"
                      underline="none"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/details/${original.movieId}`)}
                    >
                      {value}
                    </Link>
                  </p>
                  <p>{original.year}</p>
                </div>
              ),
            },
            {
              Header: "Rating",
              accessor: "details[0].rating",
              className: "column-right",
              Cell: ({ cell: { value } }) => (
                <Rating
                  size="small"
                  value={value}
                  readOnly
                  emptyIcon={<StarIcon fontSize="inherit" />}
                />
              ),
            },
            {
              Header: "Watched",
              accessor: "date",
              className: "column-right",
              Cell: ({ cell: { value } }) => watched(value),
            },
            {
              Header: "View Count",
              accessor: "details[0].view_count",
              className: "column-right",
            },
            {
              Header: "Review",
              accessor: "details[0].review",
              className: "column-right",
              Cell: ({ cell: { value } }) =>
                !value ? null : <DescriptionIcon fontSize="small" />,
            },
            {
              Header: "",
              id: "actions",
              Cell: ({ row }) => (
                <DotsMenu
                  onUpdate={() => handleEdit(row.original)}
                  onDelete={() => handleDelete(row.original)}
                />
              ),
            },
          ]
        : isLaptopLg
        ? [
            {
              Header: "#",
              id: "row",
              Cell: ({ row }) => {
                return <div>{row.index + 1}</div>;
              },
            },
            {
              Header: "Title",
              accessor: "title",
              className: "column-left",
              Cell: ({ cell: { value }, row: { original } }) => (
                <div>
                  <p>
                    <Link
                      sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                        "&:hover": { color: "#00D67E" },
                      }}
                      color="#fff"
                      underline="none"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/details/${original.movieId}`)}
                    >
                      {value}
                    </Link>
                  </p>
                </div>
              ),
            },
            {
              Header: "Year",
              accessor: "year",
              className: "column-right",
            },
            {
              Header: "Rating",
              accessor: "details[0].rating",
              className: "column-right",
              Cell: ({ cell: { value } }) => (
                <Rating
                  size="small"
                  value={value}
                  readOnly
                  emptyIcon={<StarIcon fontSize="inherit" />}
                />
              ),
            },
            {
              Header: "Watched",
              accessor: "date",
              className: "column-right",
              Cell: ({ cell: { value } }) => watched(value),
            },
            {
              Header: "View Count",
              accessor: "details[0].view_count",
              className: "column-right",
            },
            {
              Header: "Review",
              accessor: "details[0].review",
              className: "column-right",
              Cell: ({ cell: { value } }) =>
                !value ? null : <DescriptionIcon fontSize="small" />,
            },
            {
              Header: "",
              id: "actions",
              Cell: ({ row }) => (
                <DotsMenu
                  onUpdate={() => handleEdit(row.original)}
                  onDelete={() => handleDelete(row.original)}
                />
              ),
            },
          ]
        : [
            {
              Header: "#",
              id: "row",
              Cell: ({ row }) => {
                return <div>{row.index + 1}</div>;
              },
            },
            {
              Header: "Title",
              accessor: "title",
              className: "column-left",
              Cell: ({ cell: { value }, row: { original } }) => (
                <p>
                  <Link
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      "&:hover": { color: "#00D67E" },
                    }}
                    color="#fff"
                    underline="none"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/details/${original.movieId}`)}
                  >
                    {value}
                  </Link>
                </p>
              ),
            },
            {
              Header: "Year",
              accessor: "year",
              className: "column-right",
            },
            {
              Header: "Rating",
              accessor: "details[0].rating",
              className: "column-right",
              Cell: ({ cell: { value } }) => (
                <Rating
                  size="small"
                  value={value}
                  readOnly
                  emptyIcon={<StarIcon fontSize="inherit" />}
                />
              ),
            },
            {
              Header: "Watched",
              accessor: "date",
              className: "column-right",
              Cell: ({ cell: { value } }) => watched(value),
            },
            {
              Header: "View Count",
              accessor: "details[0].view_count",
              className: "column-right",
            },
            {
              Header: "Review",
              accessor: "details[0].review",
              className: "column-right",
              Cell: ({ cell: { value } }) =>
                !value ? null : <DescriptionIcon fontSize="small" />,
            },
            {
              Header: "Actions",
              className: "column-right",
              Cell: ({ row }) => (
                <div>
                  <IconButton
                    aria-label="edit"
                    style={{ color: "#e0e0e0" }}
                    onClick={() => handleEdit(row.original)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    aria-label="delete"
                    style={{ color: "#e0e0e0", paddingRight: 0 }}
                    onClick={() => handleDelete(row.original)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              ),
            },
          ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMobile, isTablet, isLaptop, isLaptopLg]
  );

  return (
    <div>
      {/* TABLE */}
      <CustomTable columns={columns} data={data} />

      {/* DIALOGS */}
      {openEdit && selectedRow && (
        <EditDialog
          isOpen={openEdit}
          onClose={handleClose}
          id={selectedRow._id}
          movieId={selectedRow.movieId}
          date={selectedRow.date}
          rating={selectedRow.details[0].rating}
          review={selectedRow.details[0].review}
          onUpdate={props.onUpdate}
        />
      )}

      {openDelete && selectedRow && (
        <DeleteDialog
          isOpen={openDelete}
          onClose={handleClose}
          title="Delete this entry?"
          message={
            <span>
              <strong>
                {selectedRow.title} ({watched(selectedRow.date)})
              </strong>{" "}
              will be removed. This action cannot be undone.
            </span>
          }
          onRemove={() => {
            props.onRemove(selectedRow._id, selectedRow.movieId);
          }}
        />
      )}
    </div>
  );
}

export default Entries;
