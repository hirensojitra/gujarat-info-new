import './polyfills.server.mjs';
import{a as rt}from"./chunk-XQKX43WP.mjs";import{k as st,m as lt,r as dt}from"./chunk-SIBFRYWF.mjs";import{a as ot}from"./chunk-6R42DWSS.mjs";import{l as ct,n as a}from"./chunk-FOCVEZPO.mjs";import"./chunk-NLHNYVOG.mjs";import{y as nt,z as at}from"./chunk-G2SKTGLZ.mjs";import"./chunk-KKQ7C2Q6.mjs";import{$a as H,Bb as Q,Cb as K,Ea as d,Fa as c,Ga as f,Ha as k,Ia as L,J as N,Ja as D,K as P,Ka as C,La as u,Lb as J,M as R,Nb as Z,Oa as j,Pa as X,Q as U,Qa as z,R as x,Sa as y,Ta as O,Ua as I,W as w,X as v,fa as W,ka as F,kc as tt,na as l,nc as et,oa as m,oc as it,qb as V,qc as A,t as s,wa as b,xa as E,ya as p,za as Y}from"./chunk-HA7GHLLK.mjs";import{a as G,b as q,h as M}from"./chunk-VVCT4QZE.mjs";var pt=a`
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
`,gt=a`
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
`,mt=a`
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
`,ut=a`
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
`,ht=a`
  query GetTotalPostLength {
    getTotalPostLength
  }
`,ft=a`
  query GetTotalDeletedPostLength {
    getTotalDeletedPostLength
  }
`,yt=a`
  query GetDownloadCounter($id: String!) {
    getDownloadCounter(id: $id)
  }
`,_t=a`
  query UpdateDownloadCounter($id: String!) {
    updateDownloadCounter(id: $id)
  }
`;var Pt=a`
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
`,xt=a`
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
`,wt=a`
  mutation SoftDeletePost($id: String!) {
    softDeletePost(id: $id)
  }
`,vt=a`
  mutation RecoverPost($id: String!) {
    recoverPost(id: $id)
  }
`,bt=a`
  mutation HardDeletePost($id: String!) {
    hardDeletePost(id: $id)
  }
`,St=a`
  mutation UploadThumbnail($postId: String!, $file: Upload!) {
    uploadThumbnail(postId: $postId, file: $file)
  }
`;var Tt=(()=>{class i{constructor(t){this.apollo=t}getMinimalPosts(t){return this.apollo.query({query:pt,variables:t,fetchPolicy:"network-only"}).pipe(s(e=>e.data.getAllPosts))}getAllPosts(t){return this.apollo.query({query:gt,variables:t,fetchPolicy:"network-only"}).pipe(s(e=>e.data.getAllPosts))}getPostById(t){return this.apollo.query({query:mt,variables:{id:t}}).pipe(s(e=>e.data.getPostById))}getAllSoftDeletedPosts(t){return this.apollo.query({query:ut,variables:t,fetchPolicy:"network-only"}).pipe(s(e=>e.data.getAllSoftDeletedPosts))}getTotalPostLength(){return this.apollo.query({query:ht}).pipe(s(t=>t.data.getTotalPostLength))}getTotalDeletedPostLength(){return this.apollo.query({query:ft}).pipe(s(t=>t.data.getTotalDeletedPostLength))}getDownloadCounter(t){return this.apollo.query({query:yt,variables:{id:t}}).pipe(s(e=>e.data.getDownloadCounter))}updateDownloadCounter(t){return this.apollo.query({query:_t,variables:{id:t}}).pipe(s(e=>e.data.updateDownloadCounter))}addPost(t){return this.apollo.mutate({mutation:Pt,variables:{input:t}}).pipe(s(e=>e.data.addPost))}updatePost(t){return this.apollo.mutate({mutation:xt,variables:{input:t}}).pipe(s(e=>e.data.updatePost))}softDeletePost(t){return this.apollo.mutate({mutation:wt,variables:{id:t}}).pipe(s(e=>e.data.softDeletePost))}recoverPost(t){return this.apollo.mutate({mutation:vt,variables:{id:t}}).pipe(s(e=>e.data.recoverPost))}hardDeletePost(t){return this.apollo.mutate({mutation:bt,variables:{id:t}}).pipe(s(e=>e.data.hardDeletePost))}uploadThumbnail(t,e){return this.apollo.mutate({mutation:St,variables:{postId:t,file:e},context:{useMultipart:!0}}).pipe(s(o=>o.data.uploadThumbnail))}static{this.\u0275fac=function(e){return new(e||i)(R(ct))}}static{this.\u0275prov=N({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();var Ct=["masonryGrid"],Ot=()=>[10,20,30];function It(i,_){if(i&1&&(d(0,"div",3)(1,"div",4),f(2,"img",5),d(3,"div",6),f(4,"div",7),c(),d(5,"b",8),y(6),c()()()),i&2){let t=u();l(4),Y("width",t.progress,"%"),E("aria-valuenow",t.progress),l(2),I("",t.progress,"%")}}function At(i,_){if(i&1){let t=D();k(0),d(1,"div",22)(2,"a",23)(3,"div",24)(4,"img",25),C("load",function(o){let r=w(t).$implicit,n=u(3);return v(n.onImgLoad(r,o))}),c(),d(5,"div",26)(6,"h5",27),y(7),c(),d(8,"p",28),y(9),c(),d(10,"p",29),f(11,"i",30),y(12),c()()()()(),L()}if(i&2){let t=_.$implicit;l(2),p("routerLink","/poster/"+t.id),l(2),p("src",t.image,F),E("alt",t.title),l(3),I(" ",t.title," "),l(2),O(t.info),l(3),O(t.download_counter)}}function $t(i,_){if(i&1&&(k(0),d(1,"div",19)(2,"div",20,0),b(4,At,13,6,"ng-container",21),c()(),L()),i&2){let t=u(2);l(4),p("ngForOf",t.posts)}}function Bt(i,_){if(i&1){let t=D();d(0,"div",9)(1,"div",10)(2,"a",11),f(3,"img",12),c()(),d(4,"div",13)(5,"div",14)(6,"div",15)(7,"div",16),b(8,$t,5,1,"ng-container",17),c()()()(),d(9,"div",18),C("currentPageChange",function(o){w(t);let r=u();return v(r.changePage(o))})("pageSizeChange",function(o){w(t);let r=u();return v(r.changePageSize(o))}),c()()}if(i&2){let t=u();l(2),p("routerLink","/latest"),l(6),p("ngIf",t.posts.length),l(),p("currentPage",t.currentPage)("totalItems",t.pagination.totalPosts)("pageSize",t.limit)("pageSizes",H(6,Ot))}}var Et=(()=>{class i{constructor(t,e,o,r,n,g,S){this.postService=t,this.route=e,this.router=o,this.authService=r,this.platformId=n,this.cdr=g,this.colorService=S,this.posts=[],this.currentPage=1,this.limit=10,this.search="",this.sortBy="created_at",this.order="desc",this.pagination={totalPosts:0,currentPage:1,totalPages:0},this.loading=!1,this.progress=0,this.imgUrl=ot.MasterApi+"/thumb-images/",this.isBrowser=Z(this.platformId)}ngOnInit(){this.routeSub=this.route.queryParams.subscribe(t=>{this.currentPage=+t.page||this.currentPage,this.limit=+t.limit||this.limit,this.search=t.search??this.search,this.sortBy=t.sortBy??this.sortBy,this.order=t.order??this.order,this.loadPosts()})}ngAfterViewInit(){this.isBrowser&&(this.initMasonry(),window.addEventListener("resize",()=>this.masonryInstance?.layout()))}ngOnDestroy(){this.routeSub?.unsubscribe()}initMasonry(){this.masonryGridRef&&this.isBrowser&&(this.masonryInstance=new Masonry(this.masonryGridRef.nativeElement,{itemSelector:".masonry-box",percentPosition:!0}))}loadPosts(){this.loading=!0,this.progress=0,this.postService.getMinimalPosts({page:this.currentPage,limit:this.limit,search:this.search,sortBy:this.sortBy,order:this.order,published:!0,info_show:!0}).subscribe(t=>{let e=t.posts.length,o=0,r=t.posts.map(n=>this.toDataURI(this.imgUrl+n.id).then(g=>(o++,this.progress=Math.round(o/e*100),this.cdr.detectChanges(),q(G({},n),{image:g}))));Promise.all(r).then(n=>{this.posts=n,this.pagination=t.pagination,this.loading=!1,this.progress=100,this.cdr.detectChanges(),this.initMasonry()})})}toDataURI(t){return this.isBrowser?fetch(t,{mode:"cors"}).then(e=>e.blob()).then(e=>new Promise((o,r)=>{let n=new FileReader;n.onloadend=()=>o(n.result),n.onerror=r,n.readAsDataURL(e)})).catch(e=>(console.error("convertImage error",e),"")):Promise.resolve(t)}changePage(t){t!==this.currentPage&&(this.currentPage=t,this.updateUrl())}changePageSize(t){t!==this.limit&&(this.limit=t,this.currentPage=1,this.updateUrl())}updateUrl(){this.router.navigate([],{relativeTo:this.route,queryParams:{page:this.currentPage,limit:this.limit,search:this.search,sortBy:this.sortBy,order:this.order},queryParamsHandling:"merge"})}isAdmin(){return this.authService.hasRole(["admin","master"])}getLuminance({r:t,g:e,b:o}){let r=[t,e,o].map(n=>(n/=255,n<=.03928?n/12.92:Math.pow((n+.055)/1.055,2.4)));return .2126*r[0]+.7152*r[1]+.0722*r[2]}hexToRGB(t){let e=parseInt(t.slice(1,3),16),o=parseInt(t.slice(3,5),16),r=parseInt(t.slice(5,7),16);return{r:e,g:o,b:r}}onImgLoad(t,e){if(!this.isBrowser)return;window.dispatchEvent(new Event("resize"));let o=e?.target?.parentElement;o&&t.image&&this.colorService.getColors(t.image,10).then(r=>{if(!(!r||r.length===0)&&r.length>=3){let g=r.slice(2).map(h=>{let T=this.hexToRGB(h),Lt=this.getLuminance(T);return{hex:h,luminance:Lt}});g.sort((h,T)=>h.luminance-T.luminance);let S=g[1].hex,B=g[g.length-1].hex;o.style.backgroundColor=S||"",o.style.color=B,o.querySelectorAll("img").forEach(h=>(h.style.boxShadow=`0 0.5rem 1rem ${B}`,"important"))}}).catch(console.error)}getColors(t,e){return M(this,null,function*(){try{return yield this.colorService.getColors(t,e)}catch{return[]}})}static{this.\u0275fac=function(e){return new(e||i)(m(Tt),m(tt),m(et),m(rt),m(W),m(V),m(st))}}static{this.\u0275cmp=U({type:i,selectors:[["app-latest"]],viewQuery:function(e,o){if(e&1&&j(Ct,5),e&2){let r;X(r=z())&&(o.masonryGridRef=r.first)}},decls:2,vars:2,consts:[["masonryGrid",""],["class","h-100-vh d-flex flex-column align-items-center",4,"ngIf"],["class","h-100-vh d-flex flex-column",4,"ngIf"],[1,"h-100-vh","d-flex","flex-column","align-items-center"],[1,"flex-grow-1","p-3","position-relative","overflow-hidden","w-100","d-flex","flex-column","justify-content-center","align-items-center"],["src","assets/images/svg/logo.svg","alt","Post New",1,"w-60-px","mb-3"],[1,"progress","w-100",2,"height","5px"],["role","progressbar","aria-valuemin","0","aria-valuemax","100",1,"progress-bar"],[1,"p-3"],[1,"h-100-vh","d-flex","flex-column"],[1,"d-flex","align-items-center","justify-content-center"],[1,"max-w-50","my-2",3,"routerLink"],["src","assets/images/svg/logo-large.svg","alt","PostNew.in",1,"max-w-300-px","w-100"],[1,"flex-grow-1","position-relative","overflow-hidden"],[1,"position-absolute","h-100","w-100","d-flex","overflow-auto","flex-column"],[1,"container-fluid","h-100","w-100","py-3"],[1,"row","g-3"],[4,"ngIf"],["pagination","",1,"mt-0","mb-0","px-3",3,"currentPageChange","pageSizeChange","currentPage","totalItems","pageSize","pageSizes"],[1,"col-12","px-md-3","px-2"],["data-masonry","{'percentPosition': true}",1,"row","g-md-4","g-3"],[4,"ngFor","ngForOf"],[1,"col-lg-3","col-xl-2","col-md-6","col-6","masonry-box"],["target","_blank",1,"text-decoration-none","d-block",3,"routerLink"],[1,"card","p-4","pb-0","rounded-4","border-0","shadow-sm"],[1,"w-100","img-fluid","d-block","card-img-top","rounded-3","shadow","shadow-md",3,"load","src"],[1,"card-body","px-0"],[1,"card-title","text-truncate-2"],[1,"card-text","text-truncate-2"],[1,"m-0","fw-bold"],[1,"fa","fa-download","me-2"]],template:function(e,o){e&1&&b(0,It,7,4,"div",1)(1,Bt,10,7,"div",2),e&2&&(p("ngIf",o.isBrowser&&o.loading),l(),p("ngIf",o.isBrowser&&!o.loading))},dependencies:[Q,K,it,lt]})}}return i})();var Gt=[{path:"",component:Et,data:{title:"Proposal for Web Application Poster Generation Service | PostNew",description:"Discover our web application for generating election campaign posters, festival posts, and other promotional activities. Customize posters with photos, names, addresses, designations, and contact details for efficient and personalized promotional material.",keywords:"poster generation, campaign posters, election posters, festival posts, promotional activities, customization, PostNew, web application",robots:"index, follow","og:image":"https://api.postnew.in/api/v1/img/uploads/wLmyK?quality=10","og:image:alt":"PostNew Logo","og:image:type":"image/svg+xml","og:image:width":"1200","og:image:height":"630","og:title":"Web Application Poster Generation Service | PostNew","og:description":"Generate personalized posters for campaigns and festivals with Gujarat Info\u2019s web application. Easily customize with your photos, names, and contact details."}}],kt=(()=>{class i{static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275mod=x({type:i})}static{this.\u0275inj=P({imports:[A.forChild(Gt),A]})}}return i})();var me=(()=>{class i{static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275mod=x({type:i})}static{this.\u0275inj=P({imports:[J,kt,dt,nt,at]})}}return i})();export{me as LatestModule};
