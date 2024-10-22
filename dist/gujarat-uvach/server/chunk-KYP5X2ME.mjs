import './polyfills.server.mjs';
import{a as u}from"./chunk-BHXUZULZ.mjs";import{C as s,Lb as n,g as a,i as r,q as h,z as p}from"./chunk-DQOPYUJW.mjs";var m=(()=>{class i{constructor(t){this.http=t,this.apiUrl=u.MasterApi+"/village"}getVillage(){return this.http.get(`${this.apiUrl}`)}getVillageById(t){return this.http.get(`${this.apiUrl}/${t}`)}getVillageByTaluka(t){return this.http.get(this.apiUrl+`/taluka/${t}`)}deleteVillage(t){let e=`${this.apiUrl}/delete/${t}`;return this.http.put(e,{})}addVillage(t){return this.http.post(`${this.apiUrl}`,t)}updateVillageName(t,e){return this.http.put(`${this.apiUrl}/${t}`,e)}checkVillageNameAvailability(t){return this.http.post(`${this.apiUrl}village-name/`,{name:t})}checkVillageNameAvailabilityValidator(){return t=>{let e=t.value;return this.checkVillageNameAvailability(e).pipe(r(l=>l.isTaken?{villageNameTaken:!0}:null),h(()=>a(null)))}}checkVillageIdAvailability(t){return this.http.post(`${this.apiUrl}village-id/`,{id:t})}checkVillageIdAvailabilityValidator(){return t=>{let e=t.value;return this.checkVillageIdAvailability(e).pipe(r(l=>l.isTaken?{villageIdTaken:!0}:null),h(()=>a(null)))}}getDeletedVillageLength(t,e){return this.http.get(`${this.apiUrl}/deleted/${e}`)}getDeletedVillage(t){return this.http.get(this.apiUrl+`/deleted-by-taluka/${t}`)}toggleVillageActive(t){return this.http.put(`${this.apiUrl}/restore/${t}`,{})}static{this.\u0275fac=function(e){return new(e||i)(s(n))}}static{this.\u0275prov=p({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();export{m as a};
