import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { makeStyles } from '@mui/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from "react-redux"
import { deleteUser, loadUsers } from '../redux/actions';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from "react-router-dom"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const useStyles = makeStyles({
  table: {
    marginTop: 100,
    minWidth: 900
  }
})
const btnStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))
export const Home = () => {
  const classes = useStyles();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  //users : destructure from intial state
  const { users } = useSelector(state => state.data);
  React.useEffect(() => {
    dispatch(loadUsers())
  }, [])


  const handleClick = (id) => {
    if (window.confirm("Etes vous sur que vous voulez supprimer l'utilisateur?")) {
      dispatch(deleteUser(id))
    }
  }
  return (
    <>
      <div className={btnStyles.root}>
        <Button variant="contained" color="primary" onClick={()=>navigate('/addUser')}>
          Ajoutter
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nom</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Contact</StyledTableCell>
              <StyledTableCell align="center">Addresse</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
                <StyledTableCell align="center">{row.contact}</StyledTableCell>
                <StyledTableCell align="center">{row.address}</StyledTableCell>
                <StyledTableCell align="center">
                  <div className={btnStyles.root}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                      <Button style={{ marginRight: 5 }} color='secondary' onClick={() => handleClick(row.id)}>Supprimer</Button>
                      <Button color='primary' onClick={()=>navigate(`/editUser/${row.id}`)} >Modifier</Button>
                    </ButtonGroup>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>

  )
}
