import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import ConfirmationDialog from "../dialogs/ConfirmationDialog";
import EditDialog from "../dialogs/EditDialog";
import ReactTable from "./ReactTable";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  MobileColumns,
  TabletColumns,
  LaptopColumns,
  LaptopLgColumns,
  DesktopColumns,
} from "./TableColumns";

function Entries(props) {
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width:495px)");
  const isTablet = useMediaQuery("(min-width:496px) and (max-width:768px)");
  const isLaptop = useMediaQuery("(min-width:769px) and (max-width:1024px)");
  const isLaptopLg = useMediaQuery("(min-width:1025px) and (max-width:1184px)");

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState();

  const formatDate = (date) => format(new Date(date), "MMM dd, yyyy");

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
        ? MobileColumns(navigate, handleEdit, handleDelete)
        : isTablet
        ? TabletColumns(navigate, handleEdit, handleDelete)
        : isLaptop
        ? LaptopColumns(navigate, handleEdit, handleDelete)
        : isLaptopLg
        ? LaptopLgColumns(navigate, handleEdit, handleDelete)
        : DesktopColumns(navigate, handleEdit, handleDelete),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMobile, isTablet, isLaptop, isLaptopLg]
  );

  return (
    <div>
      {/* TABLE */}
      <ReactTable columns={columns} data={data} />

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
        <ConfirmationDialog
          isOpen={openDelete}
          onClose={handleClose}
          title="Delete this entry?"
          message={
            <span>
              <strong>
                {selectedRow.title} ({formatDate(selectedRow.date)})
              </strong>{" "}
              will be removed. This action cannot be undone.
            </span>
          }
          confirmButton="Delete"
          onConfirm={() => {
            props.onRemove(selectedRow._id, selectedRow.movieId);
          }}
        />
      )}
    </div>
  );
}

export default Entries;
