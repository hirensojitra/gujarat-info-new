function a(e){return e?e.firstname&&e.lastname?`${e.firstname} ${e.lastname}`:e.username?e.username:e.email?e.email.split("@")[0]:"User":"User"}export{a};
