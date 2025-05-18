import './polyfills.server.mjs';
import{a as tt}from"./chunk-3O7WEI2B.mjs";import{k as ot,m as rt,s as nt}from"./chunk-FB7IJT3G.mjs";import{a as Z}from"./chunk-V3XCU73E.mjs";import{l as at,n}from"./chunk-GBKCLE7P.mjs";import"./chunk-UTLWTILM.mjs";import{y as et,z as it}from"./chunk-HHJGTDKF.mjs";import"./chunk-FKHLV6NY.mjs";import{$a as Y,Bb as X,Cb as z,Ea as d,Fa as c,Ga as u,Ha as S,Ia as T,J as B,Ja as E,K as y,Ka as k,La as m,Lb as H,M as G,Nb as V,Oa as U,Pa as W,Q as q,Qa as F,R as _,Sa as h,Ta as D,Ua as L,W as P,X as x,fa as N,ka as M,kc as Q,na as l,nc as K,oa as g,oc as J,qb as j,qc as C,t as s,wa as v,xa as b,ya as p,za as R}from"./chunk-BBEXDNKP.mjs";import{a as A,b as $,h as I}from"./chunk-VVCT4QZE.mjs";var st=n`
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
`,lt=n`
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
`,dt=n`
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
`,ct=n`
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
`,pt=n`
  query GetTotalPostLength {
    getTotalPostLength
  }
`,gt=n`
  query GetTotalDeletedPostLength {
    getTotalDeletedPostLength
  }
`,mt=n`
  query GetDownloadCounter($id: String!) {
    getDownloadCounter(id: $id)
  }
`,ut=n`
  query UpdateDownloadCounter($id: String!) {
    updateDownloadCounter(id: $id)
  }
`;var ht=n`
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
`,ft=n`
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
`,yt=n`
  mutation SoftDeletePost($id: String!) {
    softDeletePost(id: $id)
  }
`,_t=n`
  mutation RecoverPost($id: String!) {
    recoverPost(id: $id)
  }
`,Pt=n`
  mutation HardDeletePost($id: String!) {
    hardDeletePost(id: $id)
  }
`,xt=n`
  mutation UploadThumbnail($postId: String!, $file: Upload!) {
    uploadThumbnail(postId: $postId, file: $file)
  }
`;var vt=(()=>{class i{constructor(t){this.apollo=t}getMinimalPosts(t){return this.apollo.query({query:st,variables:t,fetchPolicy:"network-only"}).pipe(s(e=>e.data.getAllPosts))}getAllPosts(t){return this.apollo.query({query:lt,variables:t,fetchPolicy:"network-only"}).pipe(s(e=>e.data.getAllPosts))}getPostById(t){return this.apollo.query({query:dt,variables:{id:t}}).pipe(s(e=>e.data.getPostById))}getAllSoftDeletedPosts(t){return this.apollo.query({query:ct,variables:t,fetchPolicy:"network-only"}).pipe(s(e=>e.data.getAllSoftDeletedPosts))}getTotalPostLength(){return this.apollo.query({query:pt}).pipe(s(t=>t.data.getTotalPostLength))}getTotalDeletedPostLength(){return this.apollo.query({query:gt}).pipe(s(t=>t.data.getTotalDeletedPostLength))}getDownloadCounter(t){return this.apollo.query({query:mt,variables:{id:t}}).pipe(s(e=>e.data.getDownloadCounter))}updateDownloadCounter(t){return this.apollo.query({query:ut,variables:{id:t}}).pipe(s(e=>e.data.updateDownloadCounter))}addPost(t){return this.apollo.mutate({mutation:ht,variables:{input:t}}).pipe(s(e=>e.data.addPost))}updatePost(t){return this.apollo.mutate({mutation:ft,variables:{input:t}}).pipe(s(e=>e.data.updatePost))}softDeletePost(t){return this.apollo.mutate({mutation:yt,variables:{id:t}}).pipe(s(e=>e.data.softDeletePost))}recoverPost(t){return this.apollo.mutate({mutation:_t,variables:{id:t}}).pipe(s(e=>e.data.recoverPost))}hardDeletePost(t){return this.apollo.mutate({mutation:Pt,variables:{id:t}}).pipe(s(e=>e.data.hardDeletePost))}uploadThumbnail(t,e){return this.apollo.mutate({mutation:xt,variables:{postId:t,file:e},context:{useMultipart:!0}}).pipe(s(o=>o.data.uploadThumbnail))}static{this.\u0275fac=function(e){return new(e||i)(G(at))}}static{this.\u0275prov=B({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();var Et=["masonryGrid"],kt=()=>[10,20,30];function Dt(i,f){if(i&1&&(d(0,"div",3)(1,"div",4),u(2,"img",5),d(3,"div",6),u(4,"div",7),c(),d(5,"b",8),h(6),c()()()),i&2){let t=m();l(4),R("width",t.progress,"%"),b("aria-valuenow",t.progress),l(2),L("",t.progress,"%")}}function Lt(i,f){if(i&1){let t=E();S(0),d(1,"div",22)(2,"a",23)(3,"div",24)(4,"img",25),k("load",function(o){let r=P(t).$implicit,a=m(3);return x(a.onSvgLoad(r,o))}),c(),d(5,"div",26)(6,"h5",27),h(7),c(),d(8,"p",28),h(9),c(),d(10,"p",29),u(11,"i",30),h(12),c()()()()(),T()}if(i&2){let t=f.$implicit;l(2),p("routerLink","/poster/"+t.id),l(2),p("src",t.image,M),b("alt",t.title),l(3),L(" ",t.title," "),l(2),D(t.info),l(3),D(t.download_counter)}}function Ct(i,f){if(i&1&&(S(0),d(1,"div",19)(2,"div",20,0),v(4,Lt,13,6,"ng-container",21),c()(),T()),i&2){let t=m(2);l(4),p("ngForOf",t.posts)}}function Ot(i,f){if(i&1){let t=E();d(0,"div",9)(1,"div",10)(2,"a",11),u(3,"img",12),c()(),d(4,"div",13)(5,"div",14)(6,"div",15)(7,"div",16),v(8,Ct,5,1,"ng-container",17),c()()()(),d(9,"div",18),k("currentPageChange",function(o){P(t);let r=m();return x(r.changePage(o))})("pageSizeChange",function(o){P(t);let r=m();return x(r.changePageSize(o))}),c()()}if(i&2){let t=m();l(2),p("routerLink","/latest"),l(6),p("ngIf",t.posts.length),l(),p("currentPage",t.currentPage)("totalItems",t.pagination.totalPosts)("pageSize",t.limit)("pageSizes",Y(6,kt))}}var wt=(()=>{class i{constructor(t,e,o,r,a,w,St){this.postService=t,this.route=e,this.router=o,this.authService=r,this.platformId=a,this.cdr=w,this.colorService=St,this.posts=[],this.currentPage=1,this.limit=10,this.search="",this.sortBy="created_at",this.order="desc",this.pagination={totalPosts:0,currentPage:1,totalPages:0},this.loading=!1,this.progress=0,this.imgUrl=Z.MasterApi+"/thumb-images/",this.isBrowser=V(this.platformId)}ngOnInit(){this.routeSub=this.route.queryParams.subscribe(t=>{this.currentPage=+t.page||this.currentPage,this.limit=+t.limit||this.limit,this.search=t.search??this.search,this.sortBy=t.sortBy??this.sortBy,this.order=t.order??this.order,this.loadPosts()})}ngAfterViewInit(){this.isBrowser&&(this.initMasonry(),window.addEventListener("resize",()=>this.masonryInstance?.layout()))}ngOnDestroy(){this.routeSub?.unsubscribe()}initMasonry(){this.masonryGridRef&&this.isBrowser&&(this.masonryInstance=new Masonry(this.masonryGridRef.nativeElement,{itemSelector:".masonry-box",percentPosition:!0}))}loadPosts(){this.loading=!0,this.progress=0,this.postService.getMinimalPosts({page:this.currentPage,limit:this.limit,search:this.search,sortBy:this.sortBy,order:this.order,published:!0,info_show:!0}).subscribe(t=>{let e=t.posts.length,o=0,r=t.posts.map(a=>this.toDataURI(this.imgUrl+a.id).then(w=>(o++,this.progress=Math.round(o/e*100),this.cdr.detectChanges(),$(A({},a),{image:w}))));Promise.all(r).then(a=>{this.posts=a,this.pagination=t.pagination,this.loading=!1,this.progress=100,this.cdr.detectChanges(),this.initMasonry()})})}toDataURI(t){return this.isBrowser?fetch(t,{mode:"cors"}).then(e=>e.blob()).then(e=>new Promise((o,r)=>{let a=new FileReader;a.onloadend=()=>o(a.result),a.onerror=r,a.readAsDataURL(e)})).catch(e=>(console.error("convertImage error",e),"")):Promise.resolve(t)}changePage(t){t!==this.currentPage&&(this.currentPage=t,this.updateUrl())}changePageSize(t){t!==this.limit&&(this.limit=t,this.currentPage=1,this.updateUrl())}updateUrl(){this.router.navigate([],{relativeTo:this.route,queryParams:{page:this.currentPage,limit:this.limit,search:this.search,sortBy:this.sortBy,order:this.order},queryParamsHandling:"merge"})}isAdmin(){return this.authService.hasRole(["admin","master"])}onSvgLoad(t,e){if(!this.isBrowser)return;window.dispatchEvent(new Event("resize"));let o=e?.target?.parentElement;o&&t.image&&this.colorService.getColors(t.image,5).then(r=>{r.length>=3&&(o.style.backgroundColor=r[4]||"",o.style.color=r[2],o.querySelectorAll("img").forEach(a=>a.style.boxShadow=`0 0.5rem 1rem ${r[2]}`))}).catch(console.error)}getColors(t,e){return I(this,null,function*(){try{return yield this.colorService.getColors(t,e)}catch{return[]}})}static{this.\u0275fac=function(e){return new(e||i)(g(vt),g(Q),g(K),g(tt),g(N),g(j),g(ot))}}static{this.\u0275cmp=q({type:i,selectors:[["app-latest"]],viewQuery:function(e,o){if(e&1&&U(Et,5),e&2){let r;W(r=F())&&(o.masonryGridRef=r.first)}},decls:2,vars:2,consts:[["masonryGrid",""],["class","h-100-vh d-flex flex-column align-items-center",4,"ngIf"],["class","h-100-vh d-flex flex-column",4,"ngIf"],[1,"h-100-vh","d-flex","flex-column","align-items-center"],[1,"flex-grow-1","p-3","position-relative","overflow-hidden","w-100","d-flex","flex-column","justify-content-center","align-items-center"],["src","assets/images/svg/logo.svg","alt","Post New",1,"w-60-px","mb-3"],[1,"progress","w-100",2,"height","5px"],["role","progressbar","aria-valuemin","0","aria-valuemax","100",1,"progress-bar"],[1,"p-3"],[1,"h-100-vh","d-flex","flex-column"],[1,"d-flex","align-items-center","justify-content-center"],[1,"max-w-50","my-2",3,"routerLink"],["src","assets/images/svg/logo-large.svg","alt","PostNew.in",1,"max-w-300-px","w-100"],[1,"flex-grow-1","position-relative","overflow-hidden"],[1,"position-absolute","h-100","w-100","d-flex","overflow-auto","flex-column"],[1,"container-fluid","h-100","w-100","py-3"],[1,"row","g-3"],[4,"ngIf"],["pagination","",1,"mt-0","mb-0","px-3",3,"currentPageChange","pageSizeChange","currentPage","totalItems","pageSize","pageSizes"],[1,"col-12","px-md-3","px-2"],["data-masonry","{'percentPosition': true}",1,"row","g-md-4","g-3"],[4,"ngFor","ngForOf"],[1,"col-lg-3","col-xl-2","col-md-6","col-6","masonry-box"],["target","_blank",1,"text-decoration-none","d-block",3,"routerLink"],[1,"card","p-4","pb-0","rounded-4","border-0"],[1,"w-100","img-fluid","d-block","card-img-top","rounded-3","shadow",3,"load","src"],[1,"card-body","px-0"],[1,"card-title","text-truncate-2"],[1,"card-text","text-truncate-2"],[1,"m-0","fw-bold"],[1,"fa","fa-download","me-2"]],template:function(e,o){e&1&&v(0,Dt,7,4,"div",1)(1,Ot,10,7,"div",2),e&2&&(p("ngIf",o.isBrowser&&o.loading),l(),p("ngIf",o.isBrowser&&!o.loading))},dependencies:[X,z,J,rt]})}}return i})();var At=[{path:"",component:wt,data:{title:"Proposal for Web Application Poster Generation Service | PostNew",description:"Discover our web application for generating election campaign posters, festival posts, and other promotional activities. Customize posters with photos, names, addresses, designations, and contact details for efficient and personalized promotional material.",keywords:"poster generation, campaign posters, election posters, festival posts, promotional activities, customization, PostNew, web application",robots:"index, follow","og:image":"https://api.postnew.in/api/v1/img/uploads/wLmyK?quality=10","og:image:alt":"PostNew Logo","og:image:type":"image/svg+xml","og:image:width":"1200","og:image:height":"630","og:title":"Web Application Poster Generation Service | PostNew","og:description":"Generate personalized posters for campaigns and festivals with Gujarat Info\u2019s web application. Easily customize with your photos, names, and contact details."}}],bt=(()=>{class i{static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275mod=_({type:i})}static{this.\u0275inj=y({imports:[C.forChild(At),C]})}}return i})();var de=(()=>{class i{static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275mod=_({type:i})}static{this.\u0275inj=y({imports:[H,bt,nt,et,it]})}}return i})();export{de as LatestModule};
