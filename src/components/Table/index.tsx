"use client";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Paper,
    Checkbox,
    CircularProgress,
    Skeleton,
} from "@mui/material";

import useTable from "./useTable";
import UserTableHead from "./TableHead";
import UserTableToolbar from "./TableToolbar";
import CustomSnackbars from "../CustomSnackbars";

export default function EnhancedTable() {
    const {
        handleRequestSort,
        handleBlockUsers,
        handleChangePage,
        handleChangeRowsPerPage,
        handleClick,
        handleDeleteUsers,
        handleSelectAllClick,
        handleUnblockUsers,
        loadingUsers,
        snackbarState,
        emptyRows,
        sortedRows,
        selected,
        order,
        orderBy,
        page,
        rowsPerPage,
        rows,
        loading,
        error,
    } = useTable();

    if (loading) {
        return (
            <Box sx={{ width: "100%" }}>
                <Skeleton variant="rectangular" width="100%" height="450px" />
            </Box>
        );
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                <UserTableToolbar
                    numSelected={selected.length}
                    onDelete={() => handleDeleteUsers([...selected])}
                    onBlock={() => handleBlockUsers([...selected])}
                    onUnblock={() => handleUnblockUsers([...selected])}
                />
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        <UserTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {sortedRows
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row) => {
                                    const isItemSelected =
                                        selected.indexOf(row.id) !== -1;
                                    const labelId = `enhanced-table-checkbox-${row.id}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) =>
                                                handleClick(event, row.id)
                                            }
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        "aria-labelledby":
                                                            labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.email}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.last_login
                                                    ? new Date(
                                                          row.last_login
                                                      ).toLocaleDateString(
                                                          "en-US",
                                                          {
                                                              year: "numeric",
                                                              month: "long",
                                                              day: "numeric",
                                                          }
                                                      )
                                                    : "No data available"}
                                            </TableCell>

                                            <TableCell align="left">
                                                {row.status
                                                    ? "Active"
                                                    : "Block"}
                                            </TableCell>

                                            <TableCell
                                                align="left"
                                                padding="none">
                                                {loadingUsers[row.id] ? (
                                                    <CircularProgress
                                                        size={24}
                                                    />
                                                ) : null}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <CustomSnackbars {...snackbarState} />
        </Box>
    );
}
