import './polyfills.server.mjs';
import{b as p}from"./chunk-526RFBAD.mjs";import{l as s,n as c}from"./chunk-VU3PTMYY.mjs";import{a as l}from"./chunk-KJXKQYSY.mjs";import{A as a,N as n,ja as m,oa as o,v as t}from"./chunk-FUKAYGLY.mjs";var u=c`
  mutation LoginUser($input: LoginInput!) {
    login(input: $input) {
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
`;var I=(()=>{class e{constructor(i,r){this.apollo=i,this.cookieService=r}login(i){return this.apollo.mutate({mutation:u,variables:{input:i},fetchPolicy:"network-only"}).pipe(a(r=>r.data.login),n(r=>t(()=>new Error(r.message))))}checkUserHasRole(i,r){return this.apollo.query({query:p,variables:{user_id:i,role_code:r}})}static{this.\u0275fac=function(r){return new(r||e)(o(s),o(l))}}static{this.\u0275prov=m({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();export{I as a};
