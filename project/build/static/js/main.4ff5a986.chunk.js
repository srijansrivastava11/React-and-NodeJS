(this["webpackJsonpreact-contact-us"]=this["webpackJsonpreact-contact-us"]||[]).push([[0],[,,,,,,,,,function(e,t,n){e.exports=n(19)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(8),o=n.n(c),l=(n(14),n(1)),s=(n(15),n(6));n(16);var i=function(e){return r.a.createElement("tr",null,r.a.createElement("td",null,"".concat(e.firstname)),r.a.createElement("td",null,"".concat(e.lastname)),r.a.createElement("td",null,"".concat(e.email)),r.a.createElement("td",null,"".concat(e.phone)),r.a.createElement("td",null,r.a.createElement("button",{className:"btn-outline-danger rounded ",onClick:e.handleDelete},"Delete")))},m=n(5),u=n(3),d=(n(17),function(e){var t=Object(a.useState)({firstname:"",lastname:"",email:"",phone:""}),n=Object(l.a)(t,2),c=n[0],o=n[1],s="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})),i=function(e){var t=e.target.value;o(Object(u.a)(Object(u.a)({},c),{},Object(m.a)({},e.target.name,t)))},d=function(){o({firstname:"",lastname:"",email:"",phone:""})};return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:function(t){t.preventDefault(),c.firstname.length>0&&c.lastname.length>0&&c.email.length>0&&c.phone.length>0&&(e.handleAdd(Object(u.a)(Object(u.a)({},c),{},{id:s})),d())}},r.a.createElement("div",{className:"row"},r.a.createElement("div",null),r.a.createElement("div",{className:"col "},r.a.createElement("div",{className:"contactForm"},r.a.createElement("label",null,"Name:"),r.a.createElement("input",{className:"form-control",name:"firstname",id:"name",value:c.firstname,onChange:i,type:"text",placeholder:"Enter name of contact",required:!0,pattern:".{4,}",title:"Please enter at least 4 characters."})),r.a.createElement("div",{className:"contactForm"},r.a.createElement("label",null,"Lastname:"),r.a.createElement("input",{className:"form-control",name:"lastname",id:"lastname",value:c.lastname,onChange:i,type:"text",placeholder:"Enter surname of contact",required:!0}))),r.a.createElement("div",{className:"col"},r.a.createElement("div",{className:"contactForm"},r.a.createElement("label",null,"Email:"),r.a.createElement("input",{className:"form-control",name:"email",id:"email",value:c.email,onChange:i,type:"email",placeholder:"Enter email of contact",required:!0})),r.a.createElement("div",{className:"contactForm"},r.a.createElement("label",null,"Phone:"),r.a.createElement("input",{className:"form-control",name:"phone",id:"phone",value:c.phone,onChange:i,type:"tel",placeholder:"Enter phone of contact",required:!0}))),r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("button",{className:"btn-success saveBtn",type:"submit"},"Save Contact")),r.a.createElement("div",null,r.a.createElement("button",{className:"btn-outline-secondary clearBtn",onClick:d,type:"reset"},"Clear"))),r.a.createElement("div",null))))});n(18);var h=function(e){e.user;var t=Object(a.useState)([]),n=Object(l.a)(t,2),c=n[0],o=n[1],m=Object(a.useState)(""),u=Object(l.a)(m,2),h=u[0],f=u[1],E=Object(a.useState)(""),v=Object(l.a)(E,2),b=v[0],p=v[1],g=Object(a.useState)(""),j=Object(l.a)(g,2),N=(j[0],j[1]),x=c.filter((function(e){return e.phone.startsWith(b)||e.firstname.startsWith(b)||e.lastname.startsWith(b)})),O=function(e){o(Object(s.a)(c.filter((function(t){return t.id!==e})))),x=c,function(e){return fetch("/contactDetails/".concat(e),{method:"DELETE"}).catch((function(){return Promise.reject({error:"network-error"})})).then((function(e){return e.ok}))}(e).then((function(){})).catch((function(e){N(e.error)}))},y=function(e){var t=e.setContacts,n=e.setError;fetch("/contactDetails",{method:"GET"}).catch((function(){return Promise.reject({code:"network-error"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).then((function(e){t(e.contacts),f(e.username),x=c})).catch((function(e){n(e.error)}))};return Object(a.useEffect)((function(){y({setContacts:o,setError:N})}),[]),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"header"},"WELCOME"),r.a.createElement("div",{className:"second-header"},h),r.a.createElement("div",{className:"row "},r.a.createElement("div",{className:"col "},r.a.createElement("div",{className:"row justify-content-center fixBox"},r.a.createElement("input",{className:"searchBar",name:"search",value:b,onChange:function(e){p(e.target.value)},placeholder:"Search by Name or Phone"}),r.a.createElement("span",null,r.a.createElement("i",{className:"fa fa-search"}))))),r.a.createElement("div",{className:"formBox"},r.a.createElement(d,{handleAdd:function(e){var t;o([].concat(Object(s.a)(c),[e])),x=c,(t=e,fetch("/contactDetails",{method:"POST",body:JSON.stringify({contactInfo:t}),headers:new Headers({"content-type":"application/json"})}).catch((function(){return Promise.reject({error:"network-error"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))).then((function(){})).catch((function(e){N(e.error)}))}})),r.a.createElement("div",{className:"row justify-content-center contentTable"},r.a.createElement("div",{className:"col"},r.a.createElement("table",{className:"table table-hover"},r.a.createElement("thead",{className:"headerColor"},r.a.createElement("tr",{className:""},r.a.createElement("th",null,"Name"),r.a.createElement("th",null,"Lastname"),r.a.createElement("th",null,"Email"),r.a.createElement("th",null,"Phone"),r.a.createElement("th",null,"Action"))),r.a.createElement("tbody",null,x.map((function(e){return r.a.createElement(i,{key:e.id,firstname:e.firstname,lastname:e.lastname,email:e.email,phone:e.phone,handleDelete:function(){return O(e.id)}})})))))))},f=function(e){var t=e.user,n=e.onLogout;return r.a.createElement("ul",null,t.isLoggedIn?r.a.createElement("div",null,r.a.createElement("button",{className:"btn-logout",type:"button",onClick:function(){fetch("/session",{method:"DELETE"}).catch((function(){return Promise.reject({code:"network-error"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).then((function(){return n()}))}},"Logout")):"")},E=function(e){e.user;var t=e.onLogin,n=Object(a.useState)(""),c=Object(l.a)(n,2),o=c[0],s=c[1],i=Object(a.useState)(""),m=Object(l.a)(i,2),u=m[0],d=m[1],h=Object(a.useState)(""),f=Object(l.a)(h,2),E=f[0],v=f[1];return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"title"},"Welcome to Contacts Management System, Please Login with your details"),r.a.createElement("div",{className:"admin-div"},r.a.createElement("button",{className:"create admin-login",type:"button",onClick:function(){document.querySelector(".password").style.display="inline-block",document.querySelector(".admin-login").remove()}},"Admin Login")),r.a.createElement("div",{className:"heading"},"Enter Username"),r.a.createElement("input",{className:"username",name:"text",type:"text",onChange:function(e){var t=e.target.value;s(t)},value:o,placeholder:"Username"}),r.a.createElement("br",null),r.a.createElement("input",{type:"password",className:"password",name:"password",onChange:function(e){var t=e.target.value;v(t)},value:E,placeholder:"Password"}),r.a.createElement("br",null),r.a.createElement("button",{className:"create",type:"button",onClick:function(){(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return fetch("/session",{method:"POST",headers:new Headers({"content-type":"application/json"}),body:JSON.stringify({username:e,password:t})}).catch((function(){return Promise.reject({code:"network-error"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))})(o,E).then((function(e){t(e)})).catch((function(e){d(e.error)}))}},"Login"),r.a.createElement("div",{className:"error-msg"},u))};var v=function(){var e,t=Object(a.useState)({isLoggedIn:!1}),n=Object(l.a)(t,2),c=n[0],o=n[1],s=Object(a.useState)(""),i=Object(l.a)(s,2),m=i[0],u=i[1];return Object(a.useEffect)((function(){fetch("/session",{method:"GET"}).catch((function(){return Promise.reject({code:"network-error"})})).then((function(e){return e.ok?e.json():Promise.reject({code:"login-invalid"})})).then((function(e){o({isLoggedIn:!0,username:e.userName})})).catch((function(e){u(e.error),o({isLoggedIn:!1})}))}),[]),e=c.isLoggedIn?r.a.createElement(h,{user:c,error:m}):r.a.createElement(E,{onLogin:function(e){o({isLoggedIn:!0,username:e.username})}}),r.a.createElement("div",{className:"backgroundImage"},r.a.createElement("div",{className:"App"},r.a.createElement(f,{user:c,onLogout:function(){o({isLoggedIn:!1})}}),e))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[9,1,2]]]);
//# sourceMappingURL=main.4ff5a986.chunk.js.map