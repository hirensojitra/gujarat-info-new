import{b as c}from"./chunk-VCSFWOKU.js";import{m as l,o as s}from"./chunk-SQRP6PMK.js";import{B as i,O as n,ka as a,pa as m,w as o}from"./chunk-YECJCXI6.js";var u=s`
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
`;var k=(()=>{class e{constructor(t){this.apollo=t}login(t){return this.apollo.mutate({mutation:u,variables:{input:t},fetchPolicy:"network-only"}).pipe(i(r=>r.data.login),n(r=>r.networkError?o(()=>new Error("Network error: Could not connect to the server. Please check your internet connection or try again later.")):o(()=>new Error(r.message))))}checkUserHasRole(t,r){return this.apollo.query({query:c,variables:{user_id:t,role_code:r}})}static{this.\u0275fac=function(r){return new(r||e)(m(l))}}static{this.\u0275prov=a({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();export{k as a};
