import{e as s,g as l}from"./chunk-EU3RJ4QC.js";import{a as c}from"./chunk-DMITPIK3.js";import{A as n,J as m,M as o,q as e,t as a}from"./chunk-4GDYXFLP.js";var p=l`
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
`;var E=(()=>{class r{constructor(t,i){this.apollo=t,this.cookieService=i}login(t){return this.apollo.mutate({mutation:p,variables:{input:t},fetchPolicy:"no-cache"}).pipe(a(i=>i.data.login),n(i=>e(()=>new Error(i.message))))}static{this.\u0275fac=function(i){return new(i||r)(o(s),o(c))}}static{this.\u0275prov=m({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();export{E as a};
