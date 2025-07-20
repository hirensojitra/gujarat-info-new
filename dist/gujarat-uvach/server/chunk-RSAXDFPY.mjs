import './polyfills.server.mjs';
import{b as p}from"./chunk-QIXRFZRN.mjs";import{l as s,n as c}from"./chunk-VLBISCZS.mjs";import{a as l}from"./chunk-UQ36SCSZ.mjs";import{B as a,O as n,ka as m,pa as o,w as t}from"./chunk-34OSZFTC.mjs";var u=c`
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
