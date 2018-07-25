import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { graphql, compose } from 'react-apollo'
import { Typography, Paper, Button, TextField, MenuItem } from '@material-ui/core'
import Layout from '../components/Layout'

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $id: ID!) {
    addBook(name: $name, genre: $genre, authorId: $id) {
      name
      genre
      author {
        id
      }
    }
  }
`
const getAuthorsQuery = gql`
  {
    authors {
      id
      name
    }
  }
`
@compose(
  graphql(getAuthorsQuery),
  graphql(addBookMutation)
)
class AddAuthor extends Component {
  state = {
    name: '',
    genre: '',
    id: ''
  }

  getInputHandler = key => {
    return e => {
      this.setState({ [key]: e.target.value })
    }
  }

  onSubmit = () => {
    // console.log(this.state)
    console.log(this.props)
    this.props
      .mutate({
        variables: {
          name: this.state.name,
          genre: this.state.genre,
          id: this.state.id
        }
      })
      .then(({ data }) => {
        console.log('got data', data)
        this.props.history.push('/')
      })
      .catch(error => {
        console.log('there was an error sending the query', error)
      })
  }

  render() {
    const { data } = this.props
    const authors = data.authors || []

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
              label="书名"
              value={this.state.name}
              onChange={this.getInputHandler('name')}
              margin="normal"
            />
            <TextField
              fullWidth
              required
              id="genre"
              label="类别"
              value={this.state.genre}
              onChange={this.getInputHandler('genre')}
              margin="normal"
            />
            <TextField
              fullWidth
              required
              id="id"
              select
              label="作者"
              value={this.state.id}
              onChange={this.getInputHandler('id')}
              margin="normal"
            >
              {authors.map(option => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
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
