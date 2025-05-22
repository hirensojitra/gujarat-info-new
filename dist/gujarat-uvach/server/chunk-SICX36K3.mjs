import './polyfills.server.mjs';
import{f as dt,m as ct,r as mt}from"./chunk-UA4BA7HJ.mjs";import{a as nt}from"./chunk-SQ5METGS.mjs";import{a as rt}from"./chunk-AJBY5M5H.mjs";import{l as at,n as d}from"./chunk-MBILACOW.mjs";import"./chunk-LECRJSB3.mjs";import{y as st,z as lt}from"./chunk-AEJPAB7T.mjs";import"./chunk-6V7CEZXP.mjs";import{A as $,v as et,y as it,z as ot}from"./chunk-VQ4GWJMU.mjs";import{$b as X,Aa as x,Ab as p,Bb as Y,Gc as J,Kb as n,Lb as a,Mb as g,Na as W,Nb as L,Ob as C,Pb as O,Rb as T,Tb as f,Zb as z,_b as H,bb as j,bc as l,cc as D,dc as A,dd as Q,ed as K,fa as M,ga as P,gb as m,hb as h,ka as q,kc as V,nb as F,nd as Z,pd as tt,qa as U,ra as v,yb as S,z as c,za as _,zb as I}from"./chunk-37EVSRTU.mjs";import{a as R,b as G,h as N}from"./chunk-VVCT4QZE.mjs";var pt=d`
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
`,gt=d`
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
`,ht=d`
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
`,ut=d`
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
`,ft=d`
  query GetTotalPostLength {
    getTotalPostLength
  }
`,yt=d`
  query GetTotalDeletedPostLength {
    getTotalDeletedPostLength
  }
`,_t=d`
  query GetDownloadCounter($id: String!) {
    getDownloadCounter(id: $id)
  }
`,xt=d`
  query UpdateDownloadCounter($id: String!) {
    updateDownloadCounter(id: $id)
  }
`;var bt=d`
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
`,wt=d`
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
`,Pt=d`
  mutation SoftDeletePost($id: String!) {
    softDeletePost(id: $id)
  }
`,vt=d`
  mutation RecoverPost($id: String!) {
    recoverPost(id: $id)
  }
`,St=d`
  mutation HardDeletePost($id: String!) {
    hardDeletePost(id: $id)
  }
`,Tt=d`
  mutation UploadThumbnail($postId: String!, $file: Upload!) {
    uploadThumbnail(postId: $postId, file: $file)
  }
`;var Et=(()=>{class i{constructor(t){this.apollo=t}getMinimalPosts(t){return this.apollo.query({query:pt,variables:t,fetchPolicy:"network-only"}).pipe(c(e=>e.data.getAllPosts))}getAllPosts(t){return this.apollo.query({query:gt,variables:t,fetchPolicy:"network-only"}).pipe(c(e=>e.data.getAllPosts))}getPostById(t){return this.apollo.query({query:ht,variables:{id:t}}).pipe(c(e=>e.data.getPostById))}getAllSoftDeletedPosts(t){return this.apollo.query({query:ut,variables:t,fetchPolicy:"network-only"}).pipe(c(e=>e.data.getAllSoftDeletedPosts))}getTotalPostLength(){return this.apollo.query({query:ft}).pipe(c(t=>t.data.getTotalPostLength))}getTotalDeletedPostLength(){return this.apollo.query({query:yt}).pipe(c(t=>t.data.getTotalDeletedPostLength))}getDownloadCounter(t){return this.apollo.query({query:_t,variables:{id:t}}).pipe(c(e=>e.data.getDownloadCounter))}updateDownloadCounter(t){return this.apollo.query({query:xt,variables:{id:t}}).pipe(c(e=>e.data.updateDownloadCounter))}addPost(t){return this.apollo.mutate({mutation:bt,variables:{input:t}}).pipe(c(e=>e.data.addPost))}updatePost(t){return this.apollo.mutate({mutation:wt,variables:{input:t}}).pipe(c(e=>e.data.updatePost))}softDeletePost(t){return this.apollo.mutate({mutation:Pt,variables:{id:t}}).pipe(c(e=>e.data.softDeletePost))}recoverPost(t){return this.apollo.mutate({mutation:vt,variables:{id:t}}).pipe(c(e=>e.data.recoverPost))}hardDeletePost(t){return this.apollo.mutate({mutation:St,variables:{id:t}}).pipe(c(e=>e.data.hardDeletePost))}uploadThumbnail(t,e){return this.apollo.mutate({mutation:Tt,variables:{postId:t,file:e},context:{useMultipart:!0}}).pipe(c(o=>o.data.uploadThumbnail))}static{this.\u0275fac=function(e){return new(e||i)(q(at))}}static{this.\u0275prov=M({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();var Ot=["masonryGrid"],Dt=()=>[10,20,30];function At(i,b){if(i&1&&(n(0,"div",22)(1,"div",23),g(2,"img",24),n(3,"div",25),g(4,"div",26),a(),n(5,"b",27),l(6),a()()()),i&2){let t=f();m(4),Y("width",t.progress,"%"),I("aria-valuenow",t.progress),m(2),A("",t.progress,"%")}}function $t(i,b){if(i&1){let t=O();L(0),n(1,"div",45)(2,"a",46)(3,"div",47)(4,"img",48),T("load",function(o){let r=_(t).$implicit,s=f(3);return x(s.onImgLoad(r,o))}),a(),n(5,"div",49)(6,"h5",50),l(7),a(),n(8,"p",51),l(9),a(),n(10,"p",52),g(11,"i",53),l(12),a()()()()(),C()}if(i&2){let t=b.$implicit;m(2),p("routerLink","/poster/"+t.id),m(2),p("src",t.image,j),I("alt",t.title),m(3),A(" ",t.title," "),m(2),D(t.info),m(3),D(t.download_counter)}}function Bt(i,b){if(i&1&&(L(0),n(1,"div",42)(2,"div",43,0),S(4,$t,13,6,"ng-container",44),a()(),C()),i&2){let t=f(2);m(4),p("ngForOf",t.posts)}}function Rt(i,b){if(i&1){let t=O();n(0,"div",28)(1,"div",29)(2,"a",30),g(3,"img",31),a()(),n(4,"div",32)(5,"div",33)(6,"div",34)(7,"div",35),S(8,Bt,5,1,"ng-container",36),a()()()(),n(9,"div",37),T("currentPageChange",function(o){_(t);let r=f();return x(r.changePage(o))})("pageSizeChange",function(o){_(t);let r=f();return x(r.changePageSize(o))}),a(),n(10,"div",38)(11,"div",39)(12,"a",40),T("click",function(){return _(t),f().myInfo.show(),x(!1)}),l(13,"Contact"),a(),n(14,"a",41),l(15,"More Info"),a()()()()}if(i&2){let t=f();m(2),p("routerLink","/latest"),m(6),p("ngIf",t.posts.length),m(),p("currentPage",t.currentPage)("totalItems",t.pagination.totalPosts)("pageSize",t.limit)("pageSizes",V(7,Dt)),m(5),p("routerLink","/about-us")}}var kt=(()=>{class i{constructor(t,e,o,r,s,u,E,w){this.renderer=t,this.postService=e,this.route=o,this.router=r,this.authService=s,this.platformId=u,this.cdr=E,this.colorService=w,this.posts=[],this.currentPage=1,this.limit=10,this.search="",this.sortBy="created_at",this.order="desc",this.pagination={totalPosts:0,currentPage:1,totalPages:0},this.loading=!1,this.progress=0,this.imgUrl=rt.MasterApi+"/thumb-images/",this.isBrowser=tt(this.platformId)}ngOnInit(){this.routeSub=this.route.queryParams.subscribe(t=>{this.currentPage=+t.page||this.currentPage,this.limit=+t.limit||this.limit,this.search=t.search??this.search,this.sortBy=t.sortBy??this.sortBy,this.order=t.order??this.order,this.loadPosts()})}ngAfterViewInit(){this.isBrowser&&(this.myInfo=new bootstrap.Modal(document.getElementById("myInfo"),{focus:!1,keyboard:!1,static:!1}),this.initMasonry(),window.addEventListener("resize",()=>this.masonryInstance?.layout()))}ngOnDestroy(){this.routeSub?.unsubscribe()}initMasonry(){this.masonryGridRef&&this.isBrowser&&(this.masonryInstance=new Masonry(this.masonryGridRef.nativeElement,{itemSelector:".masonry-box",percentPosition:!0}))}loadPosts(){this.loading=!0,this.progress=0,this.postService.getMinimalPosts({page:this.currentPage,limit:this.limit,search:this.search,sortBy:this.sortBy,order:this.order,published:!0,info_show:!0}).subscribe(t=>{let e=t.posts.length,o=0,r=t.posts.map(s=>this.toDataURI(this.imgUrl+s.id).then(u=>(o++,this.progress=Math.round(o/e*100),this.cdr.detectChanges(),G(R({},s),{image:u}))));Promise.all(r).then(s=>{this.posts=s,this.pagination=t.pagination,this.loading=!1,this.progress=100,this.cdr.detectChanges(),this.initMasonry()})})}toDataURI(t){return this.isBrowser?fetch(t,{mode:"cors"}).then(e=>e.blob()).then(e=>new Promise((o,r)=>{let s=new FileReader;s.onloadend=()=>o(s.result),s.onerror=r,s.readAsDataURL(e)})).catch(e=>(console.error("convertImage error",e),"")):Promise.resolve(t)}changePage(t){t!==this.currentPage&&(this.currentPage=t,this.updateUrl())}changePageSize(t){t!==this.limit&&(this.limit=t,this.currentPage=1,this.updateUrl())}updateUrl(){this.router.navigate([],{relativeTo:this.route,queryParams:{page:this.currentPage,limit:this.limit,search:this.search,sortBy:this.sortBy,order:this.order},queryParamsHandling:"merge"})}isAdmin(){return this.authService.hasRole(["admin","master"])}getLuminance({r:t,g:e,b:o}){let r=[t,e,o].map(s=>(s/=255,s<=.03928?s/12.92:Math.pow((s+.055)/1.055,2.4)));return .2126*r[0]+.7152*r[1]+.0722*r[2]}hexToRGB(t){let e=parseInt(t.slice(1,3),16),o=parseInt(t.slice(3,5),16),r=parseInt(t.slice(5,7),16);return{r:e,g:o,b:r}}onImgLoad(t,e){if(!this.isBrowser)return;window.dispatchEvent(new Event("resize"));let o=e?.target?.parentElement;o&&t.image&&this.colorService.getColors(t.image,10).then(r=>{if(!(!r||r.length===0)&&r.length>=3){let u=r.slice(2).map(y=>{let k=this.hexToRGB(y),Lt=this.getLuminance(k);return{hex:y,luminance:Lt}});u.sort((y,k)=>y.luminance-k.luminance);let E=u[1].hex,w=u[u.length-1].hex;o.style.backgroundColor=E||"",o.style.color=w,o.querySelectorAll("img").forEach(y=>(y.style.boxShadow=`0 0.5rem 1rem ${w}`,"important"))}}).catch(console.error)}getColors(t,e){return N(this,null,function*(){try{return yield this.colorService.getColors(t,e)}catch{return[]}})}static{this.\u0275fac=function(e){return new(e||i)(h(F),h(Et),h(et),h(it),h(nt),h(W),h(J),h(dt))}}static{this.\u0275cmp=U({type:i,selectors:[["app-latest"]],viewQuery:function(e,o){if(e&1&&z(Ot,5),e&2){let r;H(r=X())&&(o.masonryGridRef=r.first)}},decls:35,vars:2,consts:[["masonryGrid",""],["class","h-100-vh d-flex flex-column align-items-center",4,"ngIf"],["class","h-100-vh d-flex flex-column",4,"ngIf"],["id","myInfo","tabindex","-1","aria-labelledby","myInfoLabel","aria-hidden","true",1,"modal","fade"],[1,"modal-dialog","modal-dialog-centered","modal-dialog-scrollable"],[1,"modal-content"],[1,"modal-header"],["id","myInfoLabel",1,"modal-title"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn-close"],[1,"modal-body"],[1,"mb-3"],["for","email",1,"form-label"],["href","mailto:hirensojitra007@gmail.com",1,"form-control","text-decoration-none","fw-bold"],["for","mobile",1,"form-label"],["href","tel:+919429558759",1,"form-control","text-decoration-none","fw-bold"],["for","social",1,"form-label"],["href","http://www.facebook.com/SOJITRAHIREN","target","_blank",1,"btn","btn-primary","m-2","text-decoration-none"],[1,"fa","fa-facebook","me-2"],["href","http://www.instagram.com/HIREN_SOJITRA","target","_blank",1,"btn","btn-danger","m-2","text-decoration-none"],[1,"fa","fa-instagram","me-2"],["href","http://www.twitter.com/SOJITRA_HIREN","target","_blank",1,"btn","btn-dark","m-2","text-decoration-none"],[1,"fa","fa-twitter","me-2"],[1,"h-100-vh","d-flex","flex-column","align-items-center"],[1,"flex-grow-1","p-3","position-relative","overflow-hidden","w-100","d-flex","flex-column","justify-content-center","align-items-center"],["src","assets/images/svg/logo.svg","alt","Post New",1,"w-60-px","mb-3"],[1,"progress","w-100",2,"height","5px"],["role","progressbar","aria-valuemin","0","aria-valuemax","100",1,"progress-bar"],[1,"p-3"],[1,"h-100-vh","d-flex","flex-column"],[1,"d-flex","align-items-center","justify-content-center"],[1,"max-w-50","my-2",3,"routerLink"],["src","assets/images/svg/logo-large.svg","alt","PostNew.in",1,"max-w-300-px","w-100"],[1,"flex-grow-1","position-relative","overflow-hidden"],[1,"position-absolute","h-100","w-100","d-flex","overflow-auto","flex-column"],[1,"container-fluid","h-100","w-100","py-3"],[1,"row","g-3"],[4,"ngIf"],["pagination","",1,"mt-0","mb-0","px-3",3,"currentPageChange","pageSizeChange","currentPage","totalItems","pageSize","pageSizes"],[1,"bg-dark","border-top","p-1","text-light","position-sticky","bottom-0","z-2"],[1,"w-100","mx-auto","d-flex","align-items-center","justify-content-center"],["href","https://www.facebook.com/SOJITRAHIREN","target","_blank",1,"fw-bold","btn","btn-danger","ms-3",3,"click"],[1,"text-danger","fw-bold","text-decoration-none","mx-3","my-1",3,"routerLink"],[1,"col-12","px-md-3","px-2"],["data-masonry","{'percentPosition': true}",1,"row","g-md-4","g-3"],[4,"ngFor","ngForOf"],[1,"col-lg-3","col-xl-2","col-md-6","col-6","masonry-box"],["target","_blank",1,"text-decoration-none","d-block",3,"routerLink"],[1,"card","p-4","pb-0","rounded-4","border-0","shadow-sm"],[1,"w-100","img-fluid","d-block","card-img-top","rounded-3","shadow","shadow-md",3,"load","src"],[1,"card-body","px-0"],[1,"card-title","text-truncate-2"],[1,"card-text","text-truncate-2"],[1,"m-0","fw-bold"],[1,"fa","fa-download","me-2"]],template:function(e,o){e&1&&(S(0,At,7,4,"div",1)(1,Rt,16,8,"div",2),n(2,"div",3)(3,"div",4)(4,"div",5)(5,"div",6)(6,"h5",7),l(7,"Contact Information"),a(),g(8,"button",8),a(),n(9,"div",9)(10,"h5"),l(11,"Hiren Sojitra"),a(),n(12,"div",10)(13,"label",11),l(14,"Email:"),a(),n(15,"a",12),l(16,"hirensojitra007@gmail.com"),a()(),n(17,"div",10)(18,"label",13),l(19,"Mobile:"),a(),n(20,"a",14),l(21,"+919429558759"),a()(),n(22,"div",10)(23,"label",15),l(24,"Social Links:"),a(),g(25,"br"),n(26,"a",16),g(27,"i",17),l(28,"Facebook"),a(),n(29,"a",18),g(30,"i",19),l(31,"Instagram"),a(),n(32,"a",20),g(33,"i",21),l(34,"Twitter"),a()()()()()()),e&2&&(p("ngIf",o.isBrowser&&o.loading),m(),p("ngIf",o.isBrowser&&!o.loading))},dependencies:[Q,K,ot,ct]})}}return i})();var Gt=[{path:"",component:kt,data:{title:"Proposal for Web Application Poster Generation Service | PostNew",description:"Discover our web application for generating election campaign posters, festival posts, and other promotional activities. Customize posters with photos, names, addresses, designations, and contact details for efficient and personalized promotional material.",keywords:"poster generation, campaign posters, election posters, festival posts, promotional activities, customization, PostNew, web application",robots:"index, follow","og:image":"https://api.postnew.in/api/v1/img/uploads/wLmyK?quality=10","og:image:alt":"PostNew Logo","og:image:type":"image/svg+xml","og:image:width":"1200","og:image:height":"630","og:title":"Web Application Poster Generation Service | PostNew","og:description":"Generate personalized posters for campaigns and festivals with Gujarat Info\u2019s web application. Easily customize with your photos, names, and contact details."}}],It=(()=>{class i{static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275mod=v({type:i})}static{this.\u0275inj=P({imports:[$.forChild(Gt),$]})}}return i})();var he=(()=>{class i{static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275mod=v({type:i})}static{this.\u0275inj=P({imports:[Z,It,mt,st,lt]})}}return i})();export{he as LatestModule};
