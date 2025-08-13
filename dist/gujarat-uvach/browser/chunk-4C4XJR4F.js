import{m as s,o}from"./chunk-SQRP6PMK.js";import{B as a,ka as i,pa as l}from"./chunk-YECJCXI6.js";var n=o`
  query GetAllPostsMinimal(
    $page: Int!
    $limit: Int
    $search: String
    $sortBy: String
    $order: String
    $published: Boolean
    $info_show: Boolean
  ) {
    getAllPosts(
      page: $page
      limit: $limit
      search: $search
      sortBy: $sortBy
      order: $order
      published: $published
      info_show: $info_show
    ) {
      posts {
        id
        title
        info
        image
        download_counter
      }
      pagination {
        currentPage
        totalPages
        totalPosts
      }
    }
  }
`,d=o`
  query GetAllPosts(
    $page: Int!
    $limit: Int
    $search: String
    $sortBy: String
    $order: String
    $published: Boolean
    $info_show: Boolean
  ) {
    getAllPosts(
      page: $page
      limit: $limit
      search: $search
      sortBy: $sortBy
      order: $order
      published: $published
      info_show: $info_show
    ) {
      posts {
        id
        title
        info
        info_show
        h
        w
        backgroundurl
        download_counter
        published
        track
        image
        created_at
        updated_at
        deleted_at
      }
      pagination {
        currentPage
        totalPages
        totalPosts
      }
    }
  }
`,p=o`
  query GetPostById($id: String!) {
    getPostById(id: $id) {
      id
      title
      info
      info_show
      h
      w
      backgroundurl
      download_counter
      published
      track
      data
      msg
      apiData
      image
      created_at
      updated_at
      deleted_at
      subcategory_id
      category {
        id
        name
        description
        active
      }
      deleted
      subcategory {
        id
        name
        description
        category_id
        active
      }
    }
  }
`,u=o`
  query GetAllSoftDeletedPosts(
    $page: Int!
    $limit: Int
    $search: String
    $sortBy: String
    $order: String
  ) {
    getAllSoftDeletedPosts(
      page: $page
      limit: $limit
      search: $search
      sortBy: $sortBy
      order: $order
    ) {
      posts {
        id
        title
        deleted
        deleted_at
      }
      pagination {
        currentPage
        totalPages
        totalPosts
      }
    }
  }
`,_=o`
  query GetTotalPostLength {
    getTotalPostLength
  }
`,P=o`
  query GetTotalDeletedPostLength {
    getTotalDeletedPostLength
  }
`,g=o`
  query GetDownloadCounter($id: String!) {
    getDownloadCounter(id: $id)
  }
`,T=o`
  query UpdateDownloadCounter($id: String!) {
    updateDownloadCounter(id: $id)
  }
`;var c=o`
  mutation AddPost($input: PostInput!) {
    addPost(input: $input) {
      id
      deleted
      info
      info_show
      h
      w
      title
      backgroundurl
      download_counter
      published
      track
      data
      msg
      apiData
      image
      created_at
      updated_at
      deleted_at
    }
  }
`,h=o`
  mutation UpdatePost($input: PostUpdateInput!) {
    updatePost(input: $input) {
      id
      deleted
      h
      w
      title
      info
      info_show
      backgroundurl
      data
      download_counter
      published
      track
      subcategory_id
      category {
        id
        name
      }
      subcategory {
        id
        name
      }
      apiData
    }
  }
`,D=o`
  mutation SoftDeletePost($id: String!) {
    softDeletePost(id: $id)
  }
`,m=o`
  mutation RecoverPost($id: String!) {
    recoverPost(id: $id)
  }
`,$=o`
  mutation HardDeletePost($id: String!) {
    hardDeletePost(id: $id)
  }
`,E=o`
  mutation UploadThumbnail($postId: String!, $file: Upload!) {
    uploadThumbnail(postId: $postId, file: $file)
  }
`;var G=(()=>{class r{constructor(t){this.apollo=t}getMinimalPosts(t){return this.apollo.query({query:n,variables:t,fetchPolicy:"network-only"}).pipe(a(e=>e.data.getAllPosts))}getAllPosts(t){return this.apollo.query({query:d,variables:t,fetchPolicy:"network-only"}).pipe(a(e=>e.data.getAllPosts))}getPostById(t){return this.apollo.query({query:p,variables:{id:t}}).pipe(a(e=>e.data.getPostById))}getAllSoftDeletedPosts(t){return this.apollo.query({query:u,variables:t,fetchPolicy:"network-only"}).pipe(a(e=>e.data.getAllSoftDeletedPosts))}getTotalPostLength(){return this.apollo.query({query:_}).pipe(a(t=>t.data.getTotalPostLength))}getTotalDeletedPostLength(){return this.apollo.query({query:P}).pipe(a(t=>t.data.getTotalDeletedPostLength))}getDownloadCounter(t){return this.apollo.query({query:g,variables:{id:t}}).pipe(a(e=>e.data.getDownloadCounter))}updateDownloadCounter(t){return this.apollo.query({query:T,variables:{id:t}}).pipe(a(e=>e.data.updateDownloadCounter))}addPost(t){return this.apollo.mutate({mutation:c,variables:{input:t}}).pipe(a(e=>e.data.addPost))}updatePost(t){return this.apollo.mutate({mutation:h,variables:{input:t}}).pipe(a(e=>e.data.updatePost))}softDeletePost(t){return this.apollo.mutate({mutation:D,variables:{id:t}}).pipe(a(e=>e.data.softDeletePost))}recoverPost(t){return this.apollo.mutate({mutation:m,variables:{id:t}}).pipe(a(e=>e.data.recoverPost))}hardDeletePost(t){return this.apollo.mutate({mutation:$,variables:{id:t}}).pipe(a(e=>e.data.hardDeletePost))}uploadThumbnail(t,e){return this.apollo.mutate({mutation:E,variables:{postId:t,file:e},context:{useMultipart:!0}}).pipe(a(S=>S.data.uploadThumbnail))}static{this.\u0275fac=function(e){return new(e||r)(l(s))}}static{this.\u0275prov=i({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();export{G as a};
