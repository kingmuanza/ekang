(window.webpackJsonp=window.webpackJsonp||[]).push([[116],{Aq7W:function(t,e,o){"use strict";o.r(e),o.d(e,"iosTransitionAnimation",(function(){return d})),o.d(e,"shadow",(function(){return l})),o("1ks5"),o("ttJE"),o("wSPg");var a=o("qea4"),r=(o("ocqh"),o("hPsP")),n=function(t){return document.querySelector(t+".ion-cloned-element")},l=function(t){return t.shadowRoot||t},s=function(t){return t.querySelector("ion-header:not(.header-collapse-condense-inactive) ion-title[size=large]")},i=function(t,e){for(var o=0,a=t.querySelectorAll("ion-buttons");o<a.length;o++){var r=a[o],n=r.closest("ion-header"),l=n&&!n.classList.contains("header-collapse-condense-inactive"),s=r.querySelector("ion-back-button"),i=r.classList.contains("buttons-collapse");if(null!==s&&("start"===r.slot||""===r.slot)&&(i&&l&&e||!i))return s}return null},c=function(t,e,o,r,s,i){var c=e?"calc(100% - "+(i.right+4)+"px)":i.left-4+"px",f=e?"7px":"-7px",d=e?"-4px":"4px",p=e?"-4px":"4px",y=e?"right":"left",m=e?"left":"right",u=o?[{offset:0,opacity:1,transform:"translate3d("+d+", "+(i.top-46)+"px, 0) scale(1)"},{offset:.6,opacity:0},{offset:1,opacity:0,transform:"translate3d("+f+", "+(s.top-40)+"px, 0) scale(2.1)"}]:[{offset:0,opacity:0,transform:"translate3d("+f+", "+(s.top-40)+"px, 0) scale(2.1)"},{offset:1,opacity:1,transform:"translate3d("+d+", "+(i.top-46)+"px, 0) scale(1)"}],b=o?[{offset:0,opacity:1,transform:"translate3d("+p+", "+(i.top-46)+"px, 0) scale(1)"},{offset:.2,opacity:0,transform:"translate3d("+p+", "+(i.top-41)+"px, 0) scale(0.6)"},{offset:1,opacity:0,transform:"translate3d("+p+", "+(i.top-41)+"px, 0) scale(0.6)"}]:[{offset:0,opacity:0,transform:"translate3d("+p+", "+(i.top-41)+"px, 0) scale(0.6)"},{offset:1,opacity:1,transform:"translate3d("+p+", "+(i.top-46)+"px, 0) scale(1)"}],S=Object(a.a)(),v=Object(a.a)(),T=n("ion-back-button"),g=l(T).querySelector(".button-text"),x=l(T).querySelector("ion-icon");T.text=r.text,T.mode=r.mode,T.icon=r.icon,T.color=r.color,T.disabled=r.disabled,T.style.setProperty("display","block"),T.style.setProperty("position","fixed"),v.addElement(x),S.addElement(g),S.beforeStyles({"transform-origin":y+" center"}).beforeAddWrite((function(){r.style.setProperty("display","none"),T.style.setProperty(y,c)})).afterAddWrite((function(){r.style.setProperty("display",""),T.style.setProperty("display","none"),T.style.removeProperty(y)})).keyframes(u),v.beforeStyles({"transform-origin":m+" center"}).keyframes(b),t.addAnimation([S,v])},f=function(t,e,o,r,l,s){var i,c=e?"calc(100% - "+r.right+"px)":r.left+"px",f=e?"-18px":"18px",d=e?"right":"left",p=o?[{offset:0,opacity:0,transform:"translate3d("+f+", "+(s.top-4)+"px, 0) scale(0.49)"},{offset:.1,opacity:0},{offset:1,opacity:1,transform:"translate3d(0, "+(l.top-2)+"px, 0) scale(1)"}]:[{offset:0,opacity:.99,transform:"translate3d(0, "+(l.top-2)+"px, 0) scale(1)"},{offset:.6,opacity:0},{offset:1,opacity:0,transform:"translate3d("+f+", "+(s.top-4)+"px, 0) scale(0.5)"}],y=n("ion-title"),m=Object(a.a)();y.innerText=r.innerText,y.size=r.size,y.color=r.color,m.addElement(y),m.beforeStyles((i={"transform-origin":d+" center",height:"46px",display:"",position:"relative"},i[d]=c,i)).beforeAddWrite((function(){r.style.setProperty("display","none")})).afterAddWrite((function(){r.style.setProperty("display",""),y.style.setProperty("display","none")})).keyframes(p),t.addAnimation(m)},d=function(t,e){try{var o="rtl"===t.ownerDocument.dir,n=o?"-99.5%":"99.5%",d=o?"33%":"-33%",p=e.enteringEl,y=e.leavingEl,m="back"===e.direction,u=p.querySelector(":scope > ion-content"),b=p.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *"),S=p.querySelectorAll(":scope > ion-header > ion-toolbar"),v=Object(a.a)(),T=Object(a.a)();if(v.addElement(p).duration(e.duration||540).easing(e.easing||"cubic-bezier(0.32,0.72,0,1)").fill("both").beforeRemoveClass("ion-page-invisible"),y&&t){var g=Object(a.a)();g.addElement(t),v.addAnimation(g)}if(u||0!==S.length||0!==b.length?(T.addElement(u),T.addElement(b)):T.addElement(p.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs")),v.addAnimation(T),m?T.beforeClearStyles(["opacity"]).fromTo("transform","translateX("+d+")","translateX(0%)").fromTo("opacity",.8,1):T.beforeClearStyles(["opacity"]).fromTo("transform","translateX("+n+")","translateX(0%)"),u){var x=l(u).querySelector(".transition-effect");if(x){var X=x.querySelector(".transition-cover"),h=x.querySelector(".transition-shadow"),q=Object(a.a)(),E=Object(a.a)(),A=Object(a.a)();q.addElement(x).beforeStyles({opacity:"1",display:"block"}).afterStyles({opacity:"",display:""}),E.addElement(X).beforeClearStyles(["opacity"]).fromTo("opacity",0,.1),A.addElement(h).beforeClearStyles(["opacity"]).fromTo("opacity",.03,.7),q.addAnimation([E,A]),T.addAnimation([q])}}var j=p.querySelector("ion-header.header-collapse-condense"),O=function(t,e,o,a,r){var n=i(a,o),l=s(r),d=s(a),p=i(r,o),y=null!==n&&null!==l&&!o,m=null!==d&&null!==p&&o;if(y){var u=l.getBoundingClientRect(),b=n.getBoundingClientRect();f(t,e,o,l,u,b),c(t,e,o,n,u,b)}else if(m){var S=d.getBoundingClientRect(),v=p.getBoundingClientRect();f(t,e,o,d,S,v),c(t,e,o,p,S,v)}return{forward:y,backward:m}}(v,o,m,p,y),C=O.forward,k=O.backward;if(S.forEach((function(t){var e,r=Object(a.a)();r.addElement(t),v.addAnimation(r);var s=Object(a.a)();s.addElement(t.querySelector("ion-title"));var i,c=Object(a.a)(),f=Array.from(t.querySelectorAll("ion-buttons,[menuToggle]")),p=t.closest("ion-header"),y=p&&p.classList.contains("header-collapse-condense-inactive");i=f.filter(m?function(t){var e=t.classList.contains("buttons-collapse");return e&&!y||!e}:function(t){return!t.classList.contains("buttons-collapse")}),c.addElement(i);var u=Object(a.a)();u.addElement(t.querySelectorAll(":scope > *:not(ion-title):not(ion-buttons):not([menuToggle])"));var b=Object(a.a)();b.addElement(l(t).querySelector(".toolbar-background"));var S=Object(a.a)(),T=t.querySelector("ion-back-button");if(T&&S.addElement(T),r.addAnimation([s,c,u,b,S]),c.fromTo("opacity",.01,1),u.fromTo("opacity",.01,1),m)y||s.fromTo("transform","translateX("+d+")","translateX(0%)").fromTo("opacity",.01,1),u.fromTo("transform","translateX("+d+")","translateX(0%)"),S.fromTo("opacity",.01,1);else if(j||s.fromTo("transform","translateX("+n+")","translateX(0%)").fromTo("opacity",.01,1),u.fromTo("transform","translateX("+n+")","translateX(0%)"),b.beforeClearStyles(["opacity","transform"]),(null===(e=p)||void 0===e?void 0:e.translucent)?b.fromTo("transform",o?"translateX(-100%)":"translateX(100%)","translateX(0px)"):b.fromTo("opacity",.01,1),C||S.fromTo("opacity",.01,1),T&&!C){var g=Object(a.a)();g.addElement(l(T).querySelector(".button-text")).fromTo("transform",o?"translateX(-100px)":"translateX(100px)","translateX(0px)"),r.addAnimation(g)}})),y){var w=Object(a.a)(),P=y.querySelector(":scope > ion-content");if(w.addElement(P),w.addElement(y.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *")),v.addAnimation(w),m){w.beforeClearStyles(["opacity"]).fromTo("transform","translateX(0%)",o?"translateX(-100%)":"translateX(100%)");var L=Object(r.b)(y);v.afterAddWrite((function(){"normal"===v.getDirection()&&L.style.setProperty("display","none")}))}else w.fromTo("transform","translateX(0%)","translateX("+d+")").fromTo("opacity",1,.8);if(P){var R=l(P).querySelector(".transition-effect");if(R){var W=R.querySelector(".transition-cover"),z=R.querySelector(".transition-shadow"),B=Object(a.a)(),J=Object(a.a)(),D=Object(a.a)();B.addElement(R).beforeStyles({opacity:"1",display:"block"}).afterStyles({opacity:"",display:""}),J.addElement(W).beforeClearStyles(["opacity"]).fromTo("opacity",.1,0),D.addElement(z).beforeClearStyles(["opacity"]).fromTo("opacity",.7,.03),B.addAnimation([J,D]),w.addAnimation([B])}}y.querySelectorAll(":scope > ion-header > ion-toolbar").forEach((function(t){var e,r=Object(a.a)();r.addElement(t);var n=Object(a.a)();n.addElement(t.querySelector("ion-title"));var s=Object(a.a)(),i=t.querySelectorAll("ion-buttons,[menuToggle]"),c=t.closest("ion-header"),f=c&&c.classList.contains("header-collapse-condense-inactive"),p=Array.from(i).filter((function(t){var e=t.classList.contains("buttons-collapse");return e&&!f||!e}));s.addElement(p);var y=Object(a.a)(),u=t.querySelectorAll(":scope > *:not(ion-title):not(ion-buttons):not([menuToggle])");u.length>0&&y.addElement(u);var b=Object(a.a)();b.addElement(l(t).querySelector(".toolbar-background"));var S=Object(a.a)(),T=t.querySelector("ion-back-button");if(T&&S.addElement(T),r.addAnimation([n,s,y,S,b]),v.addAnimation(r),S.fromTo("opacity",.99,0),s.fromTo("opacity",.99,0),y.fromTo("opacity",.99,0),m){if(f||n.fromTo("transform","translateX(0%)",o?"translateX(-100%)":"translateX(100%)").fromTo("opacity",.99,0),y.fromTo("transform","translateX(0%)",o?"translateX(-100%)":"translateX(100%)"),b.beforeClearStyles(["opacity","transform"]),(null===(e=c)||void 0===e?void 0:e.translucent)?b.fromTo("transform","translateX(0px)",o?"translateX(-100%)":"translateX(100%)"):b.fromTo("opacity",.99,0),T&&!k){var g=Object(a.a)();g.addElement(l(T).querySelector(".button-text")).fromTo("transform","translateX(0%)","translateX("+(o?-124:124)+"px)"),r.addAnimation(g)}}else f||n.fromTo("transform","translateX(0%)","translateX("+d+")").fromTo("opacity",.99,0).afterClearStyles(["transform","opacity"]),y.fromTo("transform","translateX(0%)","translateX("+d+")").afterClearStyles(["transform","opacity"]),S.afterClearStyles(["opacity"]),n.afterClearStyles(["opacity"]),s.afterClearStyles(["opacity"])}))}return v}catch(F){throw F}}}}]);