import "./App.css";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import TextField from '@material-ui/core/TextField'


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) =>({
  search:{
    marginBottom:20,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    width: 200,
    height: 30
  },
  table: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  tableContainer: {
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
}));

const App = () => {
  const classes = useStyles();
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const getProductData = async () => {
    try {
      setLoading(true);
      const data = await axios.get(
        process.env.REACT_APP_API_URL || 'https://boards.api.huddo.com/v'
      );
      setProduct(data.data);
      setLoading(false);
    } catch (e) {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return product.filter((item) => {
      return search === "" || item.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [product, search]);

  useEffect(() => {
    getProductData();
  }, []);
  return (
    <div className="App">
      <h1>Huddo Boards Services List</h1>
      <TextField
        className={classes.search}
        type="text"
        placeholder="Search here"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Service Name</StyledTableCell>
              <StyledTableCell align="right">Service Version</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {error && 
               <StyledTableRow>
               <StyledTableCell colSpan={2}>
                 <Alert severity="error">
                   <AlertTitle>Error</AlertTitle>
                   {error} — <strong>check it out!</strong>
                 </Alert>
               </StyledTableCell>
             </StyledTableRow>
            }
               
          {loading ? (
           <StyledTableRow>
              <StyledTableCell colSpan={2} style={{ textAlign: 'center' }}>
                <CircularProgress />
              </StyledTableCell>
          </StyledTableRow>
  ) :  (filteredProducts.map((item) => {
                return (
                  <StyledTableRow key={item.name}>
                    <StyledTableCell component="th" scope="row">
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.version}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default App;
