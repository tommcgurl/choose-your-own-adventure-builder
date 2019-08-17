import { gql } from 'apollo-boost';

export const CREATE_USER = gql`
  mutation createUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      id
      username
    }
  }
`;
