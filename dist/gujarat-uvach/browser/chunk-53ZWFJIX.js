import{l as n,n as o}from"./chunk-ERYRROGZ.js";import{A as i,ja as a,oa as l}from"./chunk-PDE6R37N.js";var s=o`
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
      data {
        title
        editable
        boxed
        rect {
          x
          y
          width
          height
          rx
          ry
          fill
          fillOpacity
          opacity
          rotate
          originX
          originY
          stroke
          strokeOpacity
          strokeWidth
          strokeAlignment
        }
        circle {
          cx
          cy
          r
          fill
          fillOpacity
          opacity
          originX
          originY
          stroke
          strokeWidth
          strokeOpacity
          strokeAlignment
        }
        ellipse {
          cx
          cy
          rx
          ry
          fill
          fillOpacity
          opacity
          originX
          originY
          rotate
          stroke
          strokeWidth
          strokeOpacity
          strokeAlignment
        }
        line {
          x1
          y1
          x2
          y2
          stroke
          strokeWidth
          opacity
          originX
          originY
          rotate
        }
        text {
          x
          y
          fs
          fw
          text
          api
          lang
          controlName
          dependency
          type
          color
          fontStyle {
            italic
            underline
          }
          rotate
          fontFamily
          textShadow {
            enable
            color
            blur
            offsetX
            offsetY
          }
          backgroundColor
          textEffects {
            enable
            gradient {
              enable
              startColor
              endColor
              direction
            }
            outline {
              enable
              color
              width
            }
            glow {
              enable
              color
              blur
            }
          }
          textAnchor
          alignmentBaseline
          letterSpacing
          lineHeight
          textTransformation
          opacity
          originX
          originY
        }
        image {
          r
          x
          y
          imageUrl
          borderColor
          borderWidth
          shape
          origin
          placeholder
          svgProperties {
            fill
            stroke
            strokeWidth
          }
          rotate
        }
      }
      msg
      apiData
      image
      created_at
      updated_at
      deleted_at
    }
  }
`,c=o`
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
`,g=o`
  query GetTotalPostLength {
    getTotalPostLength
  }
`,u=o`
  query GetTotalDeletedPostLength {
    getTotalDeletedPostLength
  }
`,y=o`
  query GetDownloadCounter($id: String!) {
    getDownloadCounter(id: $id)
  }
`,h=o`
  query UpdateDownloadCounter($id: String!) {
    updateDownloadCounter(id: $id)
  }
`;var f=o`
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
      data {
        title
        editable
        boxed
        rect {
          x y width height rx ry fill fillOpacity opacity rotate originX originY stroke strokeOpacity strokeWidth strokeAlignment
        }
        circle {
          cx cy r fill fillOpacity opacity originX originY stroke strokeWidth strokeOpacity strokeAlignment
        }
        ellipse {
          cx cy rx ry fill fillOpacity opacity originX originY rotate stroke strokeWidth strokeOpacity strokeAlignment
        }
        line {
          x1 y1 x2 y2 stroke strokeWidth opacity originX originY rotate
        }
        text {
          x y fs fw text api lang controlName dependency type color fontStyle { italic underline }
          rotate fontFamily textShadow { enable color blur offsetX offsetY }
          backgroundColor textEffects { enable gradient { enable startColor endColor direction } outline { enable color width } glow { enable color blur } }
          textAnchor alignmentBaseline letterSpacing lineHeight textTransformation opacity originX originY
        }
        image {
          r x y imageUrl borderColor borderWidth shape origin placeholder
          svgProperties { fill stroke strokeWidth } rotate
        }
      }
      msg
      apiData
      image
      created_at
      updated_at
      deleted_at
    }
  }
`,P=o`
  mutation UpdatePost($input: PostUpdateInput!) {
    updatePost(input: $input) {
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
      data {
        title
        editable
        boxed
        rect {
          x y width height rx ry fill fillOpacity opacity rotate originX originY stroke strokeOpacity strokeWidth strokeAlignment
        }
        circle {
          cx cy r fill fillOpacity opacity originX originY stroke strokeWidth strokeOpacity strokeAlignment
        }
        ellipse {
          cx cy rx ry fill fillOpacity opacity originX originY rotate stroke strokeWidth strokeOpacity strokeAlignment
        }
        line {
          x1 y1 x2 y2 stroke strokeWidth opacity originX originY rotate
        }
        text {
          x y fs fw text api lang controlName dependency type color fontStyle { italic underline }
          rotate fontFamily textShadow { enable color blur offsetX offsetY }
          backgroundColor textEffects { enable gradient { enable startColor endColor direction } outline { enable color width } glow { enable color blur } }
          textAnchor alignmentBaseline letterSpacing lineHeight textTransformation opacity originX originY
        }
        image {
          r x y imageUrl borderColor borderWidth shape origin placeholder
          svgProperties { fill stroke strokeWidth } rotate
        }
      }
      msg
      apiData
      image
      created_at
      updated_at
      deleted_at
    }
  }
`,_=o`
  mutation SoftDeletePost($id: String!) {
    softDeletePost(id: $id)
  }
`,m=o`
  mutation RecoverPost($id: String!) {
    recoverPost(id: $id)
  }
`,T=o`
  mutation HardDeletePost($id: String!) {
    hardDeletePost(id: $id)
  }
`,b=o`
  mutation UploadThumbnail($postId: String!, $file: Upload!) {
    uploadThumbnail(postId: $postId, file: $file)
  }
`;var q=(()=>{class r{constructor(t){this.apollo=t}getMinimalPosts(t){return this.apollo.query({query:s,variables:t,fetchPolicy:"network-only"}).pipe(i(e=>e.data.getAllPosts))}getAllPosts(t){return this.apollo.query({query:d,variables:t,fetchPolicy:"network-only"}).pipe(i(e=>e.data.getAllPosts))}getPostById(t){return this.apollo.query({query:p,variables:{id:t}}).pipe(i(e=>e.data.getPostById))}getAllSoftDeletedPosts(t){return this.apollo.query({query:c,variables:t,fetchPolicy:"network-only"}).pipe(i(e=>e.data.getAllSoftDeletedPosts))}getTotalPostLength(){return this.apollo.query({query:g}).pipe(i(t=>t.data.getTotalPostLength))}getTotalDeletedPostLength(){return this.apollo.query({query:u}).pipe(i(t=>t.data.getTotalDeletedPostLength))}getDownloadCounter(t){return this.apollo.query({query:y,variables:{id:t}}).pipe(i(e=>e.data.getDownloadCounter))}updateDownloadCounter(t){return this.apollo.query({query:h,variables:{id:t}}).pipe(i(e=>e.data.updateDownloadCounter))}addPost(t){return this.apollo.mutate({mutation:f,variables:{input:t}}).pipe(i(e=>e.data.addPost))}updatePost(t){return this.apollo.mutate({mutation:P,variables:{input:t}}).pipe(i(e=>e.data.updatePost))}softDeletePost(t){return this.apollo.mutate({mutation:_,variables:{id:t}}).pipe(i(e=>e.data.softDeletePost))}recoverPost(t){return this.apollo.mutate({mutation:m,variables:{id:t}}).pipe(i(e=>e.data.recoverPost))}hardDeletePost(t){return this.apollo.mutate({mutation:T,variables:{id:t}}).pipe(i(e=>e.data.hardDeletePost))}uploadThumbnail(t,e){return this.apollo.mutate({mutation:b,variables:{postId:t,file:e},context:{useMultipart:!0}}).pipe(i(x=>x.data.uploadThumbnail))}static{this.\u0275fac=function(e){return new(e||r)(l(n))}}static{this.\u0275prov=a({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();export{q as a};
