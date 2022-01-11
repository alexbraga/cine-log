import { useTable, useSortBy } from "react-table";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

function CustomTable({ columns, data }) {
  const tableInstance = useTable({ columns, data }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps([
                  column.getSortByToggleProps(),
                  { className: column.className },
                ])}
                style={{
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "14px",
                  padding: "0 10px 10px 10px",
                }}
              >
                {column.render("Header")}
                <span>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <ArrowDownwardIcon sx={{ ml: 1 }} fontSize="inherit" />
                    ) : (
                      <ArrowUpwardIcon sx={{ ml: 1 }} fontSize="inherit" />
                    )
                  ) : (
                    ""
                  )}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps([
                      { className: cell.column.className },
                    ])}
                    style={{
                      fontSize: "13px",
                      padding: "0 10px 0 10px",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default CustomTable;
