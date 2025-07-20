import './polyfills.server.mjs';
import{l as i,n as e}from"./chunk-VLBISCZS.mjs";import{B as p,ka as u,pa as m}from"./chunk-34OSZFTC.mjs";var r=e`
  query GetPostThumbs($postId: ID!) {
    getPostThumbs(postId: $postId) {
      filename
      path
    }
  }
`;var l=e`
  mutation UploadPostThumbs($postId: ID!, $thumbnails: [Upload!]!) {
    uploadPostThumbs(postId: $postId, thumbnails: $thumbnails) {
      filename
      path
    }
  }
`,n=e`
  mutation DeletePostThumbs($postId: ID!, $filenames: [String!]!) {
    deletePostThumbs(postId: $postId, filenames: $filenames)
  }
`,T=e`
  mutation UpdatePostThumbs(
    $postId: ID!
    $updates: [PostThumbUpdateInput!]!
  ) {
    updatePostThumbs(postId: $postId, updates: $updates) {
      filename
      path
    }
  }
`;var _=(()=>{class s{constructor(t){this.apollo=t}getPostThumbs(t){return this.apollo.watchQuery({query:r,variables:{postId:t}}).valueChanges.pipe(p(o=>o.data.getPostThumbs))}uploadPostThumbs(t,o){return this.apollo.mutate({mutation:l,variables:{postId:t,thumbnails:o},context:{useUpload:!0}}).pipe(p(a=>a.data.uploadPostThumbs))}deletePostThumbs(t,o){return this.apollo.mutate({mutation:n,variables:{postId:t,filenames:o}}).pipe(p(a=>a.data.deletePostThumbs))}updatePostThumbs(t,o){return this.apollo.mutate({mutation:T,variables:{postId:t,updates:o},context:{useUpload:!0}}).pipe(p(a=>a.data.updatePostThumbs))}static{this.\u0275fac=function(o){return new(o||s)(m(i))}}static{this.\u0275prov=u({token:s,factory:s.\u0275fac,providedIn:"root"})}}return s})();export{_ as a};
