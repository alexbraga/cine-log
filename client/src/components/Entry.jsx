import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Link from "@mui/material/Link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import DeleteDialog from "../components/DeleteDialog";
import EditDialog from "../components/EditDialog";

function Entry(props) {
  const navigate = useNavigate();

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleEdit = () => {
    setOpenEdit(true);
  };

  const handleDelete = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenEdit(false);
    setOpenDelete(false);
  };

  function handleClick(event) {
    event.preventDefault();
    navigate(`/details/${props.movieId}`);
  }

  return (
    <TableRow>
      <TableCell>{props.index}</TableCell>
      {/* TITLE */}
      <TableCell>
        <Link
          sx={{
            fontWeight: "bold",
            "&:hover": { color: "#00D67E" },
          }}
          color="#fff"
          underline="none"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        >
          {props.title}
        </Link>
      </TableCell>
      {/* RELEASE YEAR */}
      <TableCell align="right">{props.year}</TableCell>

      {/* RATING */}
      <TableCell align="right">
        <Rating
          size="small"
          value={props.rating}
          readOnly
          emptyIcon={<StarIcon fontSize="small" />}
        />
      </TableCell>
      {/* WATCHED ON */}
      <TableCell align="right">{props.date}</TableCell>
      {/* VIEW COUNT */}
      <TableCell align="right">{props.count}</TableCell>
      {/* HAS REVIEW */}
      <TableCell align="right">
        {!props.review ? null : <CheckIcon color="primary" />}
      </TableCell>
      {/* ACTION BUTTONS */}
      <TableCell align="right">
        <IconButton
          aria-label="edit"
          style={{ color: "#e0e0e0" }}
          onClick={handleEdit}
        >
          <EditIcon />
        </IconButton>

        <IconButton
          aria-label="delete"
          style={{ color: "#e0e0e0" }}
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>

        {/* DIALOGS */}
        <EditDialog
          isOpen={openEdit}
          onClose={handleClose}
          id={props.id}
          movieId={props.movieId}
          date={props.date}
          rating={props.rating}
          review={props.review}
          onUpdate={props.onUpdate}
        />

        <DeleteDialog
          isOpen={openDelete}
          onClose={handleClose}
          title="Delete this entry?"
          message={
            <span>
              <strong>
                {props.title} ({props.date})
              </strong>{" "}
              will be removed. This action cannot be undone.
            </span>
          }
          onRemove={() => {
            props.onRemove(props.id, props.movieId);
          }}
        />
      </TableCell>
    </TableRow>
  );
}

export default Entry;
