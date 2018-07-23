import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import { Typography, Paper, Button, TextField } from '@material-ui/core'
import Layout from '../components/Layout'

const addAuthorMutation = gql`
  mutation($name: String!, $age: Int!) {
    addAuthor(name: $name, age: $age) {
      name
      age
    }
  }
`
@graphql(addAuthorMutation)
class AddAuthor extends Component {
  state = {
    name: '',
    age: ''
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  getInputHandler = key => {
    return e => {
      this.setState({ [key]: e.target.value })
    }
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  onSubmit = () => {
    this.props
      .mutate({
        variables: {
          name: this.state.name,
          age: this.state.age
        }
      })
      .then(({ data }) => {
        console.log('got data', data)
      })
      .catch(error => {
        console.log('there was an error sending the query', error)
      })
  }

  render() {
    return (
      <Layout>
        <Typography gutterBottom variant="headline" component="h2">
          添加作者
        </Typography>
        <Paper style={{ width: '60%', padding: '15px', marginTop: '15px' }}>
          <form noValidate autoComplete="off" style={{ marginBottom: '15px' }}>
            <TextField
              fullWidth
              required
              id="name"
              label="姓名"
              value={this.state.name}
              onChange={this.getInputHandler('name')}
              margin="normal"
            />
            <TextField
              fullWidth
              required
              id="age"
              label="年龄"
              value={this.state.age}
              onChange={this.getInputHandler('age')}
              margin="normal"
            />
          </form>
          <Button variant="raised" size="large" color="primary" onClick={this.onSubmit}>
            保存
          </Button>
        </Paper>
      </Layout>
    )
  }
}

export default AddAuthor
