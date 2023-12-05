import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    loginUser(user: { username: $username, password: $password }) {        
      status
      token
    }
  }
`;

export const REGISTER_USER = gql`
mutation register($username: String!, $password: String!) {
    register(user: { username: $username, password: $password }) {        
      status
      message
      user {
        username
        password
      }
    }
  }
`;


