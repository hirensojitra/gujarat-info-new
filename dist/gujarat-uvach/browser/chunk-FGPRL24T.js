import{l as u,n as a}from"./chunk-M63T62QT.js";import{M as s,ga as l,la as d,u as o,z as n}from"./chunk-PXJRLMEI.js";var p=a`
  mutation RegisterUser($input: RegisterInput!) {
    register(input: $input) {
      token
      user_id
      role_id
      username
      is_email_verified
      email_otp_token
      otp_expires_at
    }
  }
`,g=a`
  mutation VerifyEmailOtp($token: String!, $otp_code: String!) {
    verifyEmailOtp(token: $token, otp_code: $otp_code) {
      token
      user {
        id
        firstname
        middlename
        lastname
        email
        email_verified
        username
        role_id
        birthday
        gender
        marital_status
        language {
          id
          name
        }
      }
    }
  }
`,c=a`
  mutation ResendEmailOtp($email: String!) {
    resendEmailOtp(email: $email) {
      email_otp_token
      otp_expires_at
    }
  }
`,E=a`
  mutation GoogleAuth($idToken: String!) {
    googleAuth(idToken: $idToken) {
      token
      requiresPassword
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
        birthday
        gender
        marital_status
        language {
          id
          name
        }
      }
    }
  }
`,_=a`
  mutation SetPassword($userId: ID!, $newPassword: String!) {
    setPassword(userId: $userId, newPassword: $newPassword) {
      token
      user {
        id
        firstname
        middlename
        lastname
        email
        username
        role_id
        email_verified
        number
        number_verified
        birthday
        gender
        marital_status
        language {
          id
          name
        }
      }
    }
  }
`;var S=(()=>{class i{constructor(e){this.apollo=e,this.email="",this.passKey=""}register(e){return this.setCredentials(e),this.apollo.mutate({mutation:p,variables:{input:e},fetchPolicy:"network-only",errorPolicy:"none"}).pipe(n(r=>{if(!r.data)throw new Error("No data received");return r.data.register}),s(r=>{let t=r.graphQLErrors?.[0]?.message;if(t)return o(()=>new Error(t));let m=r.networkError?.message;return o(()=>new Error(m||r.message))}))}verifyOtp(e,r){return console.log("verifyOtp",e,r),this.apollo.mutate({mutation:g,variables:{token:e,otp_code:r},fetchPolicy:"network-only",errorPolicy:"none"}).pipe(n(t=>{if(!t.data)throw new Error("No data received");return t.data.verifyEmailOtp}),s(t=>{let m=t.graphQLErrors?.[0]?.message;if(m)return o(()=>new Error(m));let f=t.networkError?.message;return o(()=>new Error(f||t.message))}))}resendOtp(e){return this.apollo.mutate({mutation:c,variables:{email:e}})}googleAuth(e){return this.apollo.mutate({mutation:E,variables:{idToken:e},fetchPolicy:"network-only",errorPolicy:"none"}).pipe(n(r=>{if(!r.data)throw new Error("No data received");return r.data.googleAuth}),s(this.extractError))}setPassword(e,r){return this.apollo.mutate({mutation:_,variables:{userId:e,newPassword:r},fetchPolicy:"network-only",errorPolicy:"none"}).pipe(n(t=>{if(!t.data)throw new Error("No data received");return t.data.setPassword}),s(this.extractError))}setCredentials(e){this.email=e.email,this.passKey=e.pass_key}getEmail(){return this.email}getPassKey(){return this.passKey}extractError(e){let r=e.graphQLErrors?.[0]?.message;if(r)return o(()=>new Error(r));let t=e.networkError?.message;return o(()=>new Error(t||e.message))}static{this.\u0275fac=function(r){return new(r||i)(d(u))}}static{this.\u0275prov=l({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();export{S as a};
