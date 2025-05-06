import './polyfills.server.mjs';
import{e as l,g as i}from"./chunk-S3WKFLAG.mjs";import{A as n,J as p,M as m,q as o,t as a}from"./chunk-UPVURMLA.mjs";var c=i`
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
`,E=i`
  mutation VerifyEmailOtp($token: String!, $otp_code: String!) {
    verifyEmailOtp(token: $token, otp_code: $otp_code)
  }
`;var R=(()=>{class r{constructor(t){this.apollo=t,this.email="",this.passKey=""}register(t){return this.setCredentials(t),this.apollo.mutate({mutation:c,variables:{input:t},fetchPolicy:"network-only",errorPolicy:"none"}).pipe(a(e=>{if(!e.data)throw new Error("No data received");return e.data.register}),n(e=>{let s=e.graphQLErrors?.[0]?.message;if(s)return o(()=>new Error(s));let f=e.networkError?.message;return o(()=>new Error(f||e.message))}))}setCredentials(t){this.email=t.email,this.passKey=t.pass_key}getEmail(){return this.email}getPassKey(){return this.passKey}static{this.\u0275fac=function(e){return new(e||r)(m(l))}}static{this.\u0275prov=p({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();export{E as a,R as b};
