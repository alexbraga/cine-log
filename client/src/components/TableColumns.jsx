import { format } from "date-fns";
import Link from "@mui/material/Link";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionIcon from "@mui/icons-material/Description";
import DotsMenu from "./DotsMenu";
import { SelectColumnFilter } from "./Filters";

const formatDate = (date) => format(new Date(date), "MMM dd, yyyy");

const id = {
  Header: "#",
  id: "row",
  Cell: ({ row }) => {
    return <div>{row.index + 1}</div>;
  },
};

const year = {
  Header: "Year",
  accessor: "year",
  className: "column-right",
  Filter: SelectColumnFilter,
  filter: "equals",
};

const rating = {
  Header: "Rating",
  accessor: "details[0].rating",
  className: "column-right",
  Filter: SelectColumnFilter,
  filter: "equals",
  Cell: ({ cell: { value } }) => (
    <Rating
      size="small"
      value={value}
      readOnly
      emptyIcon={<StarIcon fontSize="inherit" />}
    />
  ),
};

const watchedOn = {
  Header: "Watched",
  accessor: "date",
  className: "column-right",
  disableFilters: true,
  Cell: ({ cell: { value } }) => formatDate(value),
};

const viewCount = {
  Header: "View Count",
  accessor: "details[0].view_count",
  className: "column-right",
  disableFilters: true,
};

const review = {
  Header: "Review",
  accessor: "details[0].review",
  className: "column-right",
  disableFilters: true,
  Cell: ({ cell: { value } }) =>
    !value ? null : <DescriptionIcon fontSize="small" />,
};

const actions = (edit, remove) => {
  const actionsColumn = {
    Header: "",
    id: "actions",
    Cell: ({ row }) => (
      <DotsMenu
        onUpdate={() => edit(row.original)}
        onDelete={() => remove(row.original)}
      />
    ),
  };

  return actionsColumn;
};

export const MobileColumns = (navigate, handleEdit, handleDelete) => {
  const mobile = [
    id,
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
            <VisibilityIcon fontSize="inherit" /> {formatDate(original.date)}
            &nbsp;&nbsp;
            {!original.details[0].review ? null : (
              <DescriptionIcon fontSize="inherit" color="primary" />
            )}
          </p>
        </div>
      ),
    },
    actions(handleEdit, handleDelete),
  ];

  return mobile;
};

export const TabletColumns = (navigate, handleEdit, handleDelete) => {
  const tablet = [
    id,
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
            <VisibilityIcon fontSize="inherit" /> {formatDate(original.date)}
            &nbsp;&nbsp;
            {!original.details[0].review ? null : (
              <DescriptionIcon fontSize="inherit" color="primary" />
            )}
          </p>
        </div>
      ),
    },
    rating,
    actions(handleEdit, handleDelete),
  ];

  return tablet;
};

export const LaptopColumns = (navigate, handleEdit, handleDelete) => {
  const laptop = [
    id,
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
    rating,
    watchedOn,
    viewCount,
    review,
    actions(handleEdit, handleDelete),
  ];

  return laptop;
};

export const LaptopLgColumns = (navigate, handleEdit, handleDelete) => {
  const laptopLg = [
    id,
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
    year,
    rating,
    watchedOn,
    viewCount,
    review,
    actions(handleEdit, handleDelete),
  ];

  return laptopLg;
};

export const DesktopColumns = (navigate, handleEdit, handleDelete) => {
  const desktop = [
    id,
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
    year,
    rating,
    watchedOn,
    viewCount,
    review,
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
  ];

  return desktop;
};
