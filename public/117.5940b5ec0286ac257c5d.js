(window.webpackJsonp=window.webpackJsonp||[]).push([[117],{TDb9:function(a,n,e){"use strict";e.r(n),e.d(n,"mdTransitionAnimation",(function(){return o})),e("1ks5"),e("ttJE"),e("wSPg");var t=e("qea4"),i=(e("ocqh"),e("hPsP")),o=function(a,n){var e="back"===n.direction,o=n.enteringEl,r=n.leavingEl,c=Object(i.b)(o),d=c.querySelector("ion-toolbar"),s=Object(t.a)();if(s.addElement(c).fill("both").beforeRemoveClass("ion-page-invisible"),e?s.duration(n.duration||200).easing("cubic-bezier(0.47,0,0.745,0.715)"):s.duration(n.duration||280).easing("cubic-bezier(0.36,0.66,0.04,1)").fromTo("transform","translateY(40px)","translateY(0px)").fromTo("opacity",.01,1),d){var b=Object(t.a)();b.addElement(d),s.addAnimation(b)}if(r&&e){s.duration(n.duration||200).easing("cubic-bezier(0.47,0,0.745,0.715)");var l=Object(t.a)();l.addElement(Object(i.b)(r)).afterStyles({display:"none"}).fromTo("transform","translateY(0px)","translateY(40px)").fromTo("opacity",1,0),s.addAnimation(l)}return s}}}]);