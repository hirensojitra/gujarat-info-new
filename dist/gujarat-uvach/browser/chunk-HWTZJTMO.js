import{l as n,n as i}from"./chunk-AT2VF5OD.js";import{fa as a,ka as l,z as t}from"./chunk-NIQGYGOG.js";var s=i`
  query GetRoles {
    roles {
      id
      code
      name
      description
    }
  }
`,c=i`
  query GetRole($id: ID!) {
    role(id: $id) {
      id
      code
      name
      description
    }
  }
`,f=(()=>{class o{constructor(e){this.apollo=e}getRoles(){return this.apollo.watchQuery({query:s}).valueChanges.pipe(t(({data:e})=>e.roles))}getRoleById(e){return this.apollo.watchQuery({query:c,variables:{id:e}}).valueChanges.pipe(t(({data:r})=>r.role))}static{this.\u0275fac=function(r){return new(r||o)(l(n))}}static{this.\u0275prov=a({token:o,factory:o.\u0275fac,providedIn:"root"})}}return o})();export{f as a};
