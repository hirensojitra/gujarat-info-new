import './polyfills.server.mjs';
import{b as p}from"./chunk-45EPFRBT.mjs";import{l,n as c}from"./chunk-FOCVEZPO.mjs";import{a as s}from"./chunk-KKQ7C2Q6.mjs";import{A as n,J as m,M as o,q as t,t as a}from"./chunk-HA7GHLLK.mjs";var u=c`
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
`;var k=(()=>{class e{constructor(i,r){this.apollo=i,this.cookieService=r}login(i){return this.apollo.mutate({mutation:u,variables:{input:i},fetchPolicy:"no-cache"}).pipe(a(r=>r.data.login),n(r=>t(()=>new Error(r.message))))}checkUserHasRole(i,r){return this.apollo.query({query:p,variables:{user_id:i,role_code:r}})}static{this.\u0275fac=function(r){return new(r||e)(o(l),o(s))}}static{this.\u0275prov=m({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();export{k as a};
