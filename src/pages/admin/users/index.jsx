import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import usersSlice, {
  userInfo,
  editUserInDB,
} from "../../../redux/slices/usersSlice";
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

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Users() {
  const usersData = useSelector((state) => state.user.users);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedUserData, setEditedUserData] = useState({
    name: "",
    surname: "",
    email: "",
    balance: "",
  });

  useEffect(() => {
    dispatch(userInfo());
    // console.log(userInfo());
  }, [dispatch]);
  const handleDelete = (userId) => {
    // Dispatch the deleteUser action with the user ID
    dispatch(deleteUserInDB(userId));
  };
  console.log(usersData);

  const handleEdit = (user) => {
    setIsEditModalOpen(true);
  };

  // const handleCloseEditModel = () => {
  //   setEditedUserData(null);
  //   setIsEditModalOpen(false);
  // };
  const handleClose = () => {
    setOpen(false);
    setEditedUserData(null);
  };
  const handleOpen = (user) => {
    console.log("editing user: ", user);
    console.log(editedUserData);
    setEditedUserData(user);
    console.log(editedUserData);
    setOpen(true);
  };
  const handleEditSubmit = (user) => {
    dispatch(
      editUserInDB({
        userId: user.id,
        updatedUser: user,
      })
    );
    setIsEditModalOpen(false);
    setOpen(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [open, setOpen] = useState(false);
  const filteredProducts = usersData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  //Sorted

  const [sortNameDirection, setSortNameDirection] = useState("");
  const [sortSurnameDirection, setSortSurnameDirection] = useState("");
  const [sortBalanceDirection, setSortBalanceDirection] = useState("");

  const handleSortName = () => {
    if (sortNameDirection == "") {
      setSortNameDirection("asc");
    } else {
      setSortNameDirection(sortNameDirection === "asc" ? "desc" : "asc");
    }
    setSortSurnameDirection("");
    setSortBalanceDirection("");
  };

  const handleSortSurname = () => {
    if (sortSurnameDirection == "") {
      setSortSurnameDirection("asc");
    } else {
      setSortSurnameDirection(sortSurnameDirection === "asc" ? "desc" : "asc");
    }
    setSortNameDirection("");
    setSortBalanceDirection("");
  };

  const handleSortBalance = () => {
    if (sortBalanceDirection == "") {
      setSortBalanceDirection("asc");
    } else {
      setSortBalanceDirection(sortBalanceDirection === "asc" ? "desc" : "asc");
    }
    setSortNameDirection("");
    setSortSurnameDirection("");
  };
  const sortedData = filteredProducts.sort((a, b) => {
    if (sortNameDirection === "asc") {
      return a.name.localeCompare(b.name);
    }
    if (sortNameDirection === "desc") {
      return b.name.localeCompare(a.name);
    }
    if (sortSurnameDirection === "asc") {
      return a.surname.localeCompare(b.surname);
    }
    if (sortSurnameDirection === "desc") {
      return b.surname.localeCompare(a.surname);
    }
    if (sortBalanceDirection === "asc") {
      return a.balance - b.balance;
    }
    if (sortBalanceDirection === "desc") {
      return b.balance - a.balance;
    }
  });

  return (
    <>
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
            <div style={{ textAlign: "center" }}>
              <input
                type="text"
                placeholder="Type to search.."
                value={search}
                style={{
                  width: "35%",
                  minHeight: "40px",
                  borderRadius: "10px",
                  margin: "10px",
                }}
                onChange={(e) => {
                  setSearch(e.target.value);
                  console.log(e.target.value);
                }}
              />
              <button
                style={{
                  marginLeft: "10px",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  backgroundColor: "purple",
                  color: "white",
                  borderColor: "purple",
                }}
                onClick={handleSortName}
              >
                Sort by Name
              </button>
              <button
                style={{
                  marginLeft: "10px",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  backgroundColor: "purple",
                  color: "white",
                  borderColor: "purple",
                }}
                onClick={handleSortSurname}
              >
                Sort by Surname
              </button>
              <button
                style={{
                  marginLeft: "10px",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  backgroundColor: "purple",
                  color: "white",
                  borderColor: "purple",
                }}
                onClick={handleSortBalance}
              >
                Sort by Balance
              </button>
            </div>

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
                  {sortedData.map((user) => (
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
                            backgroundColor: "#82CCFF",
                            color: "black",
                            border: "none",
                            padding: "10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleOpen(user)}
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={{
                fontWeight: "800",
                fontFamily: "revert-layer",
                margin: "15px",
                textAlign: "center",
                fontSize: "25px",
              }}
            >
              EDIT USER
            </Typography>
            <Box sx={{ flexGrow: 1 }} textAlign="center">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <label htmlFor="editName">Name</label> <br />
                  <input
                    name="name"
                    type="text"
                    id="editName"
                    defaultValue={editedUserData?.name}
                    style={{
                      borderRadius: "25px",
                      minHeight: "40px",
                      margin: "5px",
                      width: "100%",
                    }}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label htmlFor="editSurname">Surname</label> <br />
                  <input
                    name="surname"
                    type="text"
                    id="editSurname"
                    defaultValue={editedUserData?.surname}
                    style={{
                      borderRadius: "25px",
                      minHeight: "40px",
                      margin: "5px",
                      width: "100%",
                    }}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label htmlFor="editEmail">Email</label> <br />
                  <input
                    name="email"
                    type="text"
                    id="editEmail"
                    defaultValue={editedUserData?.email}
                    style={{
                      borderRadius: "25px",
                      minHeight: "40px",
                      margin: "5px",
                      width: "100%",
                    }}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label htmlFor="balance">Balence</label> <br />
                  <input
                    name="balance"
                    type="number"
                    id="balance"
                    defaultValue={editedUserData?.balance}
                    style={{
                      borderRadius: "25px",
                      minHeight: "40px",
                      margin: "5px",
                      width: "100%",
                    }}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="success"
                    style={{
                      padding: "14px 30px",
                      borderRadius: "12px",
                    }}
                    onClick={() => handleEditSubmit(editedUserData)}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default Users;
