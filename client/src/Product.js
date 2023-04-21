
import './App.css';
import { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, TextField } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

function Product() {
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover
      }
    }
  }))(TableRow);

  const [product, setProduct] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState(null)
  const [image, setImage] = useState('');


  useEffect(() => {
    getDetails();

  }, [])
  // console.log(product)

  const getDetails = () => {
    fetch("http://localhost:5000/list").then((result) => {
      result.json().then((resp) => {
        // console.log(resp)
        setProduct(resp)
        setName(resp[0].name)
        setDescription(resp[0].description)
        setUserId(resp[0]._id)
        setDescription("");
        setName("")

      })
    })

  }

  const saveData = () => {
    console.log({ name, description });
    let data = { name, description, image }
  

    fetch("http://localhost:5000/create", {
      method: "POST",

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then((result) => {
      "resp"
      console.log(result, "result")
      result.json().then((resp) => {
        console.log("resp", resp)
        getDetails();

      })
    })

  }

  const deleteUser = (_id) => {
    console.log(_id)
    fetch(`http://localhost:5000/delete/${_id}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp)
        getDetails();
      })
    })
  }

  const selectUser = _id => {
    const index = product.findIndex(item => item._id === _id)
    console.log(index)
    console.log('id', _id)
    setName(product[index].name)
    setDescription(product[index].description)
    setUserId(product[index]._id)
  }

  const UpdateUser = () => {
    // console.log({name, description, userId })
    let item = { name, description, userId }
    fetch(`http://localhost:5000/update/${userId}`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp)
        getDetails();
      })
    })
  }

  return (
    <div className="App">
      <h1>Product Details</h1>
      <div>
        <TextField label="Name" type='text' multiline maxRows={4} value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Name' /> <br /> <br />
        <TextField label="Description" type='text' multiline maxRows={4} value={description} onChange={(e) => { setDescription(e.target.value) }} placeholder='Description' /> <br /> <br />
        <Button onClick={UpdateUser} style={{ padding: 5, marginRight: 10 }} variant="contained">Update Product</Button>
        <Button onClick={saveData} style={{ padding: 5 }} variant="contained">Add New Product</Button>
      </div>

      <div style={{ padding: 30 }}>
        <TableContainer component={Paper}>
          <Table border="1">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
               
                <StyledTableCell>Operation1</StyledTableCell>
                <StyledTableCell>Operation2</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {product.map((item) =>
                <StyledTableRow >
                  <StyledTableCell>{item._id}</StyledTableCell>
                  <StyledTableCell>{item.name}</StyledTableCell>
                  <StyledTableCell>{item.description}</StyledTableCell>
               

                   <StyledTableCell> <Button onClick={() => deleteUser(item._id)}>Delete</Button></StyledTableCell>
                  <StyledTableCell><Button onClick={() => selectUser(item._id)}>Update</Button></StyledTableCell>

                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

    </div>
  );
}

export default Product;
