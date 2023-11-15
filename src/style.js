import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

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
    loading:{
        textAlign: 'center',
    }
  }));

  export {StyledTableCell, StyledTableRow, useStyles }