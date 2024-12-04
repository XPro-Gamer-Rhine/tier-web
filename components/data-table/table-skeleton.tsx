import {
  Skeleton,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";
export const TableSkeleton = ({ rowCount = 3, column }: any) => {
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableBody>
            {[...Array(rowCount)].map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {[...Array(column.length)].map((_, colIndex) => (
                  <TableCell
                    key={colIndex}
                    style={{ minWidth: column.minWidth }}
                  >
                    <Skeleton variant="rectangular" width="100%" height={20} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
