import React, { useEffect, useState } from "react";
import Entry from "../components/Entry";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { format } from "date-fns";
import CustomCard from "../layout/CustomCard";
import CustomSnackbar from "../components/CustomSnackbar";

function Diary() {
  const [entries, setEntries] = useState([]);
  const [showList, setShowList] = useState(true);
  const [snackMessage, setSnackMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  // GET USER'S DIARY ENTRIES
  useEffect(() => {
    axios
      .get("/api/diary")
      .then((response) => {
        setEntries(response.data);

        // If `response.data` returns an empty array - which might be due to an error, manually deleted entries or if it's a new account -, then diary list is not showed
        if (JSON.stringify(response.data) === JSON.stringify([])) {
          setShowList(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdated]);

  // HANDLE ENTRIES
  // Actions passed to the "Entry" component to be executed from the "Edit Dialog" on saving updates
  function editEntry(entryId, data) {
    axios.patch(`/api/diary/${entryId}`, data).then((response) => {
      // On successful response display success message and change `isUpdated` state to force a re-render of `useEffect()` and update diary list info
      setSnackMessage(response.data.message);
      setOpenSnackbar(true);
      setIsUpdated(!isUpdated);
    });
  }

  // Actions passed to the "Entry" component to be executed from the "Delete Dialog" on deleting entry
  function deleteEntry(entryId, movieId) {
    axios
      .delete(`/api/diary/${entryId}`, { data: { movieId: movieId } })
      .then((response) => {
        // On successful response display success message
        setSnackMessage(response.data.message);
        setOpenSnackbar(true);
      });

    // Filter deleted entry out and return updated list
    setEntries((prevEntries) => {
      return prevEntries.filter((entry) => {
        return entry._id !== entryId;
      });
    });
  }

  // HANDLE SNACKBAR
  function handleClose(event, reason) {
    setOpenSnackbar(false);

    if (reason === "clickaway") {
      return;
    }
  }

  return (
    <div>
      <CustomCard
        title="Diary"
        content={
          showList ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell align="right">Release Year</TableCell>
                    <TableCell align="right">Rating</TableCell>
                    <TableCell align="right">Watched</TableCell>
                    <TableCell align="right">View Count</TableCell>
                    <TableCell align="right">Review</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {entries.map((entry, index) => {
                    return (
                      <Entry
                        key={entry._id}
                        index={index + 1}
                        id={entry._id}
                        movieId={entry.movieId}
                        title={entry.title}
                        year={entry.year}
                        rating={entry.details[0].rating}
                        date={format(new Date(entry.date), "MMM dd, yyyy")}
                        count={entry.details[0].view_count}
                        review={entry.details[0].review}
                        onUpdate={editEntry}
                        onRemove={deleteEntry}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            "Your diary is empty! Look for a movie you've watched in the search box above and start building your diary =)"
          )
        }
      />

      <CustomSnackbar
        open={openSnackbar}
        close={handleClose}
        message={snackMessage}
      />
    </div>
  );
}

export default Diary;
