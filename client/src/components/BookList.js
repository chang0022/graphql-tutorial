import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Icon } from '@material-ui/core'

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
})

const getBooksQuery = gql`
  {
    books {
      id
      name
      genre
      author {
        name
      }
    }
  }
`

class BookList extends Component {
  render() {
    const { data, classes } = this.props
    const books = data.books || []
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>图书名</CustomTableCell>
              <CustomTableCell>类别</CustomTableCell>
              <CustomTableCell>作者</CustomTableCell>
              <CustomTableCell>操作</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map(i => {
              return (
                <TableRow className={classes.row} key={i.id}>
                  <CustomTableCell component="th" scope="row">
                    {i.name}
                  </CustomTableCell>
                  <CustomTableCell>{i.genre}</CustomTableCell>
                  <CustomTableCell>{i.author.name}</CustomTableCell>
                  <CustomTableCell>
                    <IconButton aria-label="Delete">
                      <Icon>delete</Icon>
                    </IconButton>
                  </CustomTableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(graphql(getBooksQuery)(BookList))
