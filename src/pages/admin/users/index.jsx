import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import usersSlice, { userInfo } from "../../../redux/slices/usersSlice";
import { deleteUserInDB } from "../../../redux/slices/usersSlice";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Link } from "react-router-dom";
import Dashboard from "../dashboard";
function Users() {
  const usersData = useSelector((state) => state.user.users);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userInfo());
    console.log(userInfo());
  }, [dispatch]);
  const handleDelete = (userId) => {
    // Dispatch the deleteUser action with the user ID
    dispatch(deleteUserInDB(userId));
  };
  console.log(usersData);
  return (
    <Grid container>
      <Dashboard />

      <Grid item lg={9} md={8} xs={12}>
        <Paper
          elevation={3}
          style={{
            padding: "16px",
            width: "100%",
          }}
        >
          <TableContainer component={Paper} style={{ height: "100vh" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Surname</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Balance</TableCell>
                  <TableCell>Delete</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.surname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.balance}$</TableCell>
                    <TableCell>
                      <button
                        style={{
                          backgroundColor: "#BF211E",
                          color: "white",
                          border: "none",
                          padding: "10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDelete(user.id)}
                      >
                        delete
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        style={{
                          backgroundColor: "#E5F993",
                          color: "black",
                          border: "none",
                          padding: "10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        edit
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Users;
