import{a as E}from"./chunk-7YVPWAOW.js";import{a as c}from"./chunk-WIB4C2YZ.js";import{a as h,c as g}from"./chunk-KB4EY57F.js";import{B as n,O as s,da as m,ka as d,pa as u,w as i}from"./chunk-YECJCXI6.js";var q=(()=>{class p{constructor(o,t){this.http=o,this.authCookieService=t,this.graphqlEndpoint=c.MasterApi+"/graphql"}sendGraphQLRequest(o,t={}){let a=new h({"Content-Type":"application/json"}),r=this.authCookieService.getToken();return r&&(a=a.set("Authorization",`Bearer ${r}`)),this.http.post(this.graphqlEndpoint,{query:o,variables:t},{headers:a}).pipe(n(e=>{if(e.errors)throw console.error("GraphQL Errors:",e.errors),new Error(e.errors[0].message||"GraphQL error occurred");return e.data}),s(e=>(console.error("HTTP Error sending GraphQL request:",e),i(()=>new Error("Failed to send GraphQL request")))))}saveData(o,t){let a=`
      mutation SaveTrackData($input: FormDataInput!) {
        saveTrackData(input: $input) {
          message
        }
      }
    `,r={input:{formData:o,imgParam:t}};return this.sendGraphQLRequest(a,r).pipe(n(e=>e.saveTrackData.message))}getTrackData(o){let t=`
      query GetTrackData($imgParam: String!) {
        getTrackData(imgParam: $imgParam) {
          value_data
          timestamp
        }
      }
    `,a={imgParam:o};return this.sendGraphQLRequest(t,a).pipe(n(r=>r.getTrackData))}generateExcel(o){let t=`
      query ExportTrackExcel($imgParam: String!) {
        exportTrackExcel(imgParam: $imgParam)
      }
    `,a={imgParam:o};return this.sendGraphQLRequest(t,a).pipe(n(r=>r.exportTrackExcel),s(r=>(console.error("Error getting Excel URL from GraphQL:",r),i(()=>new Error("Failed to get Excel file URL")))),m(r=>{if(!r)return i(()=>new Error("Excel file URL is empty"));let e=r.startsWith("/")?c.MasterApi+r:r;return this.http.get(e,{responseType:"blob"}).pipe(s(l=>(console.error("Error downloading Excel file:",l),i(()=>new Error("Failed to download Excel file")))))}))}generatePdf(o){let t=`
      query ExportTrackPdf($imgParam: String!) {
        exportTrackPdf(imgParam: $imgParam)
      }
    `,a={imgParam:o};return this.sendGraphQLRequest(t,a).pipe(n(r=>r.exportTrackPdf),s(r=>(console.error("Error getting PDF URL from GraphQL:",r),i(()=>new Error("Failed to get PDF file URL")))),m(r=>{if(!r)return i(()=>new Error("PDF file URL is empty"));let e=r.startsWith("/")?c.MasterApi+r:r;return this.http.get(e,{responseType:"blob"}).pipe(s(l=>(console.error("Error downloading PDF file:",l),i(()=>new Error("Failed to download PDF file")))))}))}downloadFile(o,t,a){let r=window.URL.createObjectURL(o),e=document.createElement("a");e.href=r,e.download=t,document.body.appendChild(e),e.click(),document.body.removeChild(e),window.URL.revokeObjectURL(r)}static{this.\u0275fac=function(t){return new(t||p)(u(g),u(E))}}static{this.\u0275prov=d({token:p,factory:p.\u0275fac,providedIn:"root"})}}return p})();export{q as a};
