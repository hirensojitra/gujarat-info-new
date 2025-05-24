import{n as e}from"./chunk-M63T62QT.js";var o=e`
  query ValidateToken($token: String) {
    validateToken(token: $token) {
      token
      user {
        id
        firstname
        middlename
        lastname
        number
        number_verified
        role_id
        email
        email_verified
        username
      }
    }
  }
`,i=e`
  query HasRole($user_id: String!, $role_code: String!) {
    hasRole(user_id: $user_id, role_code: $role_code)
  }
`;export{o as a,i as b};
