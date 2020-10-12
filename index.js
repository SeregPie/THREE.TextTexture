!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("three")):"function"==typeof define&&define.amd?define(["three"],e):((t="undefined"!=typeof globalThis?globalThis:t||self).THREE=t.THREE||{},t.THREE.TextTexture=e(t.THREE))}(this,(function(t){"use strict";let e=class extends t.Texture{constructor(){super(document.createElement("canvas"));let e=null,i=()=>e||(e=this.createDrawable()),n=()=>i().width,o=()=>i().height,r=!0,l=1,a=()=>t.MathUtils.ceilPowerOfTwo(n()*l),s=()=>t.MathUtils.ceilPowerOfTwo(o()*l),h=t=>{if(l!==t){let e=a(),i=s();l=t;let n=a(),o=s();n===e&&o===i||(r=!0)}},f=(()=>{let e=new t.Vector3,i=new t.Vector3,r=new t.Vector3;return(t,l,a)=>{let s=n(),h=o();if(s&&h){t.getWorldPosition(i),a.getWorldPosition(e);let n=i.distanceTo(e);if(a.isPerspectiveCamera&&(n*=2*Math.tan(THREE.Math.degToRad(a.fov)/2)),(a.isPerspectiveCamera||a.isOrthographicCamera)&&(n/=a.zoom),n){var f,c;t.getWorldScale(r);let e=null!==(f=null===(c=l.capabilities)||void 0===c?void 0:c.maxTextureSize)&&void 0!==f?f:1/0;return Math.min(Math.max(r.x/n*(l.domElement.offsetWidth/s),r.y/n*(l.domElement.offsetHeight/h)),e/s,e/h)}}return 0}})();Object.defineProperties(this,{width:{get:n},height:{get:o},pixelRatio:{get:()=>l,set:h},needsRedraw:{set(t){t&&(r=!0,e=null)}}}),Object.assign(this,{redraw(){if(r){let t=this.image,e=t.getContext("2d");e.clearRect(0,0,t.width,t.height),t.width=a(),t.height=s(),t.width&&t.height?(e.save(),e.scale(t.width/n(),t.height/o()),((...t)=>{i().draw(...t)})(e),e.restore()):t.width=t.height=1,r=!1,this.needsUpdate=!0}},setOptimalPixelRatio(...t){h(f(...t))}})}};e.prototype.isDynamicTexture=!0;let i=class extends e{constructor({alignment:t="center",color:e="#fff",fontFamily:i="sans-serif",fontSize:n=16,fontStyle:o="normal",fontVariant:r="normal",fontWeight:l="normal",lineGap:a=1/4,padding:s=.5,strokeColor:h="#fff",strokeWidth:f=0,text:c=""}={}){super(),Object.entries({alignment:t,color:e,fontFamily:i,fontSize:n,fontStyle:o,fontVariant:r,fontWeight:l,lineGap:a,padding:s,strokeColor:h,strokeWidth:f,text:c}).forEach((([t,e])=>{Object.defineProperty(this,t,{get:()=>e,set(t){e!==t&&(e=t,this.needsRedraw=!0)}})}))}get lines(){let{text:t}=this;return t?t.split("\n"):[]}get font(){return function(t,e,i,n,o){let r=document.createElement("span");return r.style.font="1px serif",r.style.fontFamily=t,r.style.fontSize="".concat(e,"px"),r.style.fontStyle=i,r.style.fontVariant=n,r.style.fontWeight=o,r.style.font}(this.fontFamily,this.fontSize,this.fontStyle,this.fontVariant,this.fontWeight)}checkFontFace(){try{let{font:t,lines:e}=this;return e.every((e=>document.fonts.check(t,e)))}catch{}return!0}async loadFontFace(){try{let{font:t,lines:e}=this;return await Promise.all(e.map((e=>document.fonts.load(t,e))))}catch{}}createDrawable(){let{alignment:t,color:e,font:i,fontSize:n,lineGap:o,lines:r,padding:l,strokeColor:a,strokeWidth:s}=this;l*=n,o*=n,s*=n;let h=r.length,f=n+o,c=h?(()=>{let t=document.createElement("canvas").getContext("2d");return t.font=i,Math.max(...r.map((e=>t.measureText(e).width)))})():0,d=l+s/2,u=c+2*d;return{width:u,height:(h?n+f*(h-1):0)+2*d,draw(o){let l,h=d+n/2;Object.assign(o,{fillStyle:e,font:i,lineWidth:s,miterLimit:1,strokeStyle:a,textAlign:(()=>{switch(t){case"left":return l=d,"left";case"right":return l=u-d,"right"}return l=u/2,"center"})(),textBaseline:"middle"}),r.forEach((t=>{o.fillText(t,l,h),s&&o.strokeText(t,l,h),h+=f}))}}}};return i.prototype.isTextTexture=!0,i}));
