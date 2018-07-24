import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  wrapper: {
    margin: '0 auto',
    width: '80%',
    maxWidth: '1200px',
    display: 'flex'
  },
  brand: {
    borderRight: '2px solid #CCCCCC',
    paddingRight: '1em',
    marginRight: '1em'
  },
  toolbar: {
    padding: 0,
    flex: 1
  },
  flexContainer: {
    flex: 1,
    display: 'flex'
  },
  anchor: {
    display: 'block',
    textDecoration: 'none',
    marginRight: '16px'
  },
  button: {
    marginLeft: '10px'
  }
}

class Header extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <AppBar position="static" color="default">
        <div className={classes.wrapper}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="title" color="inherit" className={classes.brand}>
              DEMO
            </Typography>
            <Typography variant="title" color="inherit" className={classes.flexContainer}>
              <Link to="/" className={classes.anchor}>
                图书列表
              </Link>
            </Typography>
            <Button variant="raised" component={Link} to="/addBook">添加图书</Button>
            <Button variant="raised" color="primary" className={classes.button} component={Link} to="/addAuthor">
              添加作者
            </Button>
          </Toolbar>
        </div>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Header)
