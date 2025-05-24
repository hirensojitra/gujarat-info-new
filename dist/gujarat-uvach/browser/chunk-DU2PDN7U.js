import{l as E,n as s}from"./chunk-M63T62QT.js";import{M as m,ga as l,la as p,u as o,z as n}from"./chunk-PXJRLMEI.js";var c=s`
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
`,u=s`
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
`,d=s`
  mutation ResendEmailOtp($email: String!) {
    resendEmailOtp(email: $email) {
      email_otp_token
      otp_expires_at
    }
  }
`;var k=(()=>{class i{constructor(e){this.apollo=e,this.email="",this.passKey=""}register(e){return this.setCredentials(e),this.apollo.mutate({mutation:c,variables:{input:e},fetchPolicy:"network-only",errorPolicy:"none"}).pipe(n(t=>{if(!t.data)throw new Error("No data received");return t.data.register}),m(t=>{let r=t.graphQLErrors?.[0]?.message;if(r)return o(()=>new Error(r));let a=t.networkError?.message;return o(()=>new Error(a||t.message))}))}verifyOtp(e,t){return console.log("verifyOtp",e,t),this.apollo.mutate({mutation:u,variables:{token:e,otp_code:t},fetchPolicy:"network-only",errorPolicy:"none"}).pipe(n(r=>{if(!r.data)throw new Error("No data received");return r.data.verifyEmailOtp}),m(r=>{let a=r.graphQLErrors?.[0]?.message;if(a)return o(()=>new Error(a));let g=r.networkError?.message;return o(()=>new Error(g||r.message))}))}resendOtp(e){return this.apollo.mutate({mutation:d,variables:{email:e}})}setCredentials(e){this.email=e.email,this.passKey=e.pass_key}getEmail(){return this.email}getPassKey(){return this.passKey}static{this.\u0275fac=function(t){return new(t||i)(p(E))}}static{this.\u0275prov=l({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();export{k as a};
