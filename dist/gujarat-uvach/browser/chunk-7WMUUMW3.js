import{m as u,o as a}from"./chunk-SQRP6PMK.js";import{B as n,O as s,ka as m,pa as d,w as o}from"./chunk-YECJCXI6.js";var c=a`
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
`,p=a`
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
`,g=a`
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
`,h=a`
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
`;var O=(()=>{class i{constructor(e){this.apollo=e,this.email="",this.passKey=""}register(e){return this.setCredentials(e),this.apollo.mutate({mutation:c,variables:{input:e},fetchPolicy:"network-only",errorPolicy:"none"}).pipe(n(r=>{if(!r.data)throw new Error("No data received");return r.data.register}),s(r=>{if(r.networkError)return o(()=>new Error("Network error: Could not connect to the server. Please check your internet connection or try again later."));let t=r.graphQLErrors?.[0]?.message;return t?o(()=>new Error(t)):o(()=>new Error(r.message))}))}verifyOtp(e,r){return console.log("verifyOtp",e,r),this.apollo.mutate({mutation:p,variables:{token:e,otp_code:r},fetchPolicy:"network-only",errorPolicy:"none"}).pipe(n(t=>{if(!t.data)throw new Error("No data received");return t.data.verifyEmailOtp}),s(t=>{if(t.networkError)return o(()=>new Error("Network error: Could not connect to the server. Please check your internet connection or try again later."));let l=t.graphQLErrors?.[0]?.message;return l?o(()=>new Error(l)):o(()=>new Error(t.message))}))}resendOtp(e){return this.apollo.mutate({mutation:g,variables:{email:e}})}googleAuth(e){return this.apollo.mutate({mutation:E,variables:{idToken:e},fetchPolicy:"network-only",errorPolicy:"none"}).pipe(n(r=>{if(!r.data)throw new Error("No data received");return r.data.googleAuth}),s(this.extractError))}setPassword(e,r){return this.apollo.mutate({mutation:h,variables:{userId:e,newPassword:r},fetchPolicy:"network-only",errorPolicy:"none"}).pipe(n(t=>{if(!t.data)throw new Error("No data received");return t.data.setPassword}),s(this.extractError))}setCredentials(e){this.email=e.email,this.passKey=e.pass_key}getEmail(){return this.email}getPassKey(){return this.passKey}extractError(e){let r=e.graphQLErrors?.[0]?.message;if(r)return o(()=>new Error(r));let t=e.networkError?.message;return o(()=>new Error(t||e.message))}static{this.\u0275fac=function(r){return new(r||i)(d(u))}}static{this.\u0275prov=m({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();export{O as a};
