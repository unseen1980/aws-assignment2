(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{116:function(e,t,n){},205:function(e,t,n){"use strict";n.r(t);var a=n(29),c=n.n(a),s=(n(115),n(116),n(28)),l=n(0),i=n.n(l),r=n(100),o=n.n(r),j=n(207),d=n(208),h=n(6);j.a.Header,j.a.Content,j.a.Footer;var b=function(){var e=Object(l.useState)(""),t=Object(s.a)(e,2),n=t[0],a=t[1],c=Object(l.useState)({name:"",path:""}),i=Object(s.a)(c,2),r=i[0],j=i[1],b=Object(l.useState)(0),u=Object(s.a)(b,2),x=u[0],O=u[1],p=Object(l.useRef)();return Object(h.jsxs)("div",{children:[Object(h.jsx)(d.a,{orientation:"left",children:"Upload your PNG's"}),Object(h.jsxs)("div",{className:"file-upload",style:{textAlign:"center"},children:[Object(h.jsx)("input",{type:"file",id:"fileInput",ref:p,onChange:function(e){O(0);var t=e.target.files[0];console.log(t),a(t)}}),x>0&&Object(h.jsx)("div",{className:"progessBar",style:{width:x},children:x}),Object(h.jsx)("button",{onClick:function(){var e=new FormData;e.append("file",n),o.a.post("http://localhost:3001/upload",e,{onUploadProgress:function(e){var t=Math.round(e.loaded/e.total*100)+"%";O(t)}}).then((function(e){console.log(e),j({name:e.data.name,path:e.data.path}),document.getElementById("fileInput").value=""})).catch((function(e){return console.log(e)}))},className:"upbutton",children:"Upload"}),r.path&&Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("br",{}),Object(h.jsxs)("span",{children:["File uploaded at:"," ",Object(h.jsx)("a",{href:r.path,target:"_blank",children:r.path})," "]})]})]})]})},u=n(50),x=n(8),O=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,211)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,s=t.getLCP,l=t.getTTFB;n(e),a(e),c(e),s(e),l(e)}))},p=n(209),g=n(48),m=n(32),f=p.a.Meta;function y(){var e=i.a.useState(null),t=Object(s.a)(e,2),n=t[0],a=t[1];return i.a.useEffect((function(){fetch("/files").then((function(e){return e.json()})).then((function(e){a(e),console.log("---\x3e",e)}))}),[]),Object(h.jsxs)("main",{style:{padding:"1rem 0"},children:[Object(h.jsx)(d.a,{orientation:"left",children:"Gallery"}),Object(h.jsx)(g.a,{gutter:[16,16],children:n&&n.length>0&&n.map((function(e){return Object(h.jsx)(m.a,{className:"gutter-row",span:6,children:Object(h.jsxs)("div",{children:[" ",Object(h.jsxs)(p.a,{hoverable:!0,style:{width:"100%"},cover:Object(h.jsx)("img",{alt:"example",src:e.name}),children:[Object(h.jsx)(f,{title:"Links"}),Object(h.jsx)("a",{href:e.normal,target:"_blank",children:"Normal image"}),Object(h.jsx)("br",{}),Object(h.jsx)("a",{href:e.name,target:"_blank",children:"Resized image"})]})]})})}))})]})}var v=n(77),k=n(210),F=j.a.Header,N=j.a.Content,S=j.a.Footer;c.a.render(Object(h.jsx)(i.a.StrictMode,{children:Object(h.jsx)(u.a,{children:Object(h.jsxs)(j.a,{children:[Object(h.jsxs)(F,{style:{position:"fixed",zIndex:1,width:"100%"},children:[Object(h.jsx)("div",{className:"logo",children:Object(h.jsx)("span",{style:{color:"#fff"},children:"AWS Assignment 2"})}),Object(h.jsxs)(v.a,{theme:"dark",mode:"horizontal",defaultSelectedKeys:["1"],children:[Object(h.jsx)(v.a.Item,{children:Object(h.jsx)(u.b,{to:"/",children:"Home"})},"1"),Object(h.jsx)(v.a.Item,{children:Object(h.jsx)(u.b,{to:"/gallery",children:"Gallery"})},"2")]})]}),Object(h.jsxs)(N,{className:"site-layout",style:{padding:"0 50px",marginTop:64},children:[Object(h.jsx)(k.a,{style:{margin:"60px 0"}}),Object(h.jsx)("div",{className:"site-layout-background",style:{padding:24,minHeight:380},children:Object(h.jsxs)(x.c,{children:[Object(h.jsx)(x.a,{path:"/",element:Object(h.jsx)(b,{})}),Object(h.jsx)(x.a,{path:"gallery",element:Object(h.jsx)(y,{})})]})})]}),Object(h.jsx)(S,{style:{textAlign:"center"},children:"AWS Assignment 2 C.Koutsiaris"})]})})}),document.getElementById("root")),O(console.log)}},[[205,1,2]]]);
//# sourceMappingURL=main.810760c1.chunk.js.map