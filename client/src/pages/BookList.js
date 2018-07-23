import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Icon,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import Layout from '../components/Layout'

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
  state = {
    open: false
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { data, classes } = this.props
    const books = data.books || []
    return (
      <Layout>
        <Grid container spacing={16}>
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
                          <Icon onClick={this.handleClickOpen}>delete</Icon>
                        </IconButton>
                      </CustomTableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">删除</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">确定删除这条记录？</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="secondary">
                  取消
                </Button>
                <Button onClick={this.handleClose} color="primary" autoFocus>
                  确定
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        </Grid>
      </Layout>
    )
  }
}

export default withStyles(styles)(graphql(getBooksQuery)(BookList))
