/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
if(typeof YAHOO=="undefined"||!YAHOO){var YAHOO={};}YAHOO.namespace=function(){var b=arguments,g=null,e,c,f;for(e=0;e<b.length;e=e+1){f=(""+b[e]).split(".");g=YAHOO;for(c=(f[0]=="YAHOO")?1:0;c<f.length;c=c+1){g[f[c]]=g[f[c]]||{};g=g[f[c]];}}return g;};YAHOO.log=function(d,a,c){var b=YAHOO.widget.Logger;if(b&&b.log){return b.log(d,a,c);}else{return false;}};YAHOO.register=function(a,f,e){var k=YAHOO.env.modules,c,j,h,g,d;if(!k[a]){k[a]={versions:[],builds:[]};}c=k[a];j=e.version;h=e.build;g=YAHOO.env.listeners;c.name=a;c.version=j;c.build=h;c.versions.push(j);c.builds.push(h);c.mainClass=f;for(d=0;d<g.length;d=d+1){g[d](c);}if(f){f.VERSION=j;f.BUILD=h;}else{YAHOO.log("mainClass is undefined for module "+a,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(a){return YAHOO.env.modules[a]||null;};YAHOO.env.parseUA=function(d){var e=function(i){var j=0;return parseFloat(i.replace(/\./g,function(){return(j++==1)?"":".";}));},h=navigator,g={ie:0,opera:0,gecko:0,webkit:0,chrome:0,mobile:null,air:0,ipad:0,iphone:0,ipod:0,ios:null,android:0,webos:0,caja:h&&h.cajaVersion,secure:false,os:null},c=d||(navigator&&navigator.userAgent),f=window&&window.location,b=f&&f.href,a;g.secure=b&&(b.toLowerCase().indexOf("https")===0);if(c){if((/windows|win32/i).test(c)){g.os="windows";}else{if((/macintosh/i).test(c)){g.os="macintosh";}else{if((/rhino/i).test(c)){g.os="rhino";}}}if((/KHTML/).test(c)){g.webkit=1;}a=c.match(/AppleWebKit\/([^\s]*)/);if(a&&a[1]){g.webkit=e(a[1]);if(/ Mobile\//.test(c)){g.mobile="Apple";a=c.match(/OS ([^\s]*)/);if(a&&a[1]){a=e(a[1].replace("_","."));}g.ios=a;g.ipad=g.ipod=g.iphone=0;a=c.match(/iPad|iPod|iPhone/);if(a&&a[0]){g[a[0].toLowerCase()]=g.ios;}}else{a=c.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/);if(a){g.mobile=a[0];}if(/webOS/.test(c)){g.mobile="WebOS";a=c.match(/webOS\/([^\s]*);/);if(a&&a[1]){g.webos=e(a[1]);}}if(/ Android/.test(c)){g.mobile="Android";a=c.match(/Android ([^\s]*);/);if(a&&a[1]){g.android=e(a[1]);}}}a=c.match(/Chrome\/([^\s]*)/);if(a&&a[1]){g.chrome=e(a[1]);}else{a=c.match(/AdobeAIR\/([^\s]*)/);if(a){g.air=a[0];}}}if(!g.webkit){a=c.match(/Opera[\s\/]([^\s]*)/);if(a&&a[1]){g.opera=e(a[1]);a=c.match(/Version\/([^\s]*)/);if(a&&a[1]){g.opera=e(a[1]);}a=c.match(/Opera Mini[^;]*/);if(a){g.mobile=a[0];}}else{a=c.match(/MSIE\s([^;]*)/);if(a&&a[1]){g.ie=e(a[1]);}else{a=c.match(/Gecko\/([^\s]*)/);if(a){g.gecko=1;a=c.match(/rv:([^\s\)]*)/);if(a&&a[1]){g.gecko=e(a[1]);}}}}}}return g;};YAHOO.env.ua=YAHOO.env.parseUA();(function(){YAHOO.namespace("util","widget","example");if("undefined"!==typeof YAHOO_config){var b=YAHOO_config.listener,a=YAHOO.env.listeners,d=true,c;if(b){for(c=0;c<a.length;c++){if(a[c]==b){d=false;break;}}if(d){a.push(b);}}}})();YAHOO.lang=YAHOO.lang||{};(function(){var f=YAHOO.lang,a=Object.prototype,c="[object Array]",h="[object Function]",i="[object Object]",b=[],g={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;","`":"&#x60;"},d=["toString","valueOf"],e={isArray:function(j){return a.toString.apply(j)===c;},isBoolean:function(j){return typeof j==="boolean";},isFunction:function(j){return(typeof j==="function")||a.toString.apply(j)===h;},isNull:function(j){return j===null;},isNumber:function(j){return typeof j==="number"&&isFinite(j);},isObject:function(j){return(j&&(typeof j==="object"||f.isFunction(j)))||false;},isString:function(j){return typeof j==="string";},isUndefined:function(j){return typeof j==="undefined";},_IEEnumFix:(YAHOO.env.ua.ie)?function(l,k){var j,n,m;for(j=0;j<d.length;j=j+1){n=d[j];m=k[n];if(f.isFunction(m)&&m!=a[n]){l[n]=m;}}}:function(){},escapeHTML:function(j){return j.replace(/[&<>"'\/`]/g,function(k){return g[k];});},extend:function(m,n,l){if(!n||!m){throw new Error("extend failed, please check that "+"all dependencies are included.");}var k=function(){},j;k.prototype=n.prototype;m.prototype=new k();m.prototype.constructor=m;m.superclass=n.prototype;if(n.prototype.constructor==a.constructor){n.prototype.constructor=n;}if(l){for(j in l){if(f.hasOwnProperty(l,j)){m.prototype[j]=l[j];}}f._IEEnumFix(m.prototype,l);}},augmentObject:function(n,m){if(!m||!n){throw new Error("Absorb failed, verify dependencies.");}var j=arguments,l,o,k=j[2];if(k&&k!==true){for(l=2;l<j.length;l=l+1){n[j[l]]=m[j[l]];}}else{for(o in m){if(k||!(o in n)){n[o]=m[o];}}f._IEEnumFix(n,m);}return n;},augmentProto:function(m,l){if(!l||!m){throw new Error("Augment failed, verify dependencies.");}var j=[m.prototype,l.prototype],k;for(k=2;k<arguments.length;k=k+1){j.push(arguments[k]);}f.augmentObject.apply(this,j);return m;},dump:function(j,p){var l,n,r=[],t="{...}",k="f(){...}",q=", ",m=" => ";if(!f.isObject(j)){return j+"";}else{if(j instanceof Date||("nodeType" in j&&"tagName" in j)){return j;}else{if(f.isFunction(j)){return k;}}}p=(f.isNumber(p))?p:3;if(f.isArray(j)){r.push("[");for(l=0,n=j.length;l<n;l=l+1){if(f.isObject(j[l])){r.push((p>0)?f.dump(j[l],p-1):t);}else{r.push(j[l]);}r.push(q);}if(r.length>1){r.pop();}r.push("]");}else{r.push("{");for(l in j){if(f.hasOwnProperty(j,l)){r.push(l+m);if(f.isObject(j[l])){r.push((p>0)?f.dump(j[l],p-1):t);}else{r.push(j[l]);}r.push(q);}}if(r.length>1){r.pop();}r.push("}");}return r.join("");},substitute:function(x,y,E,l){var D,C,B,G,t,u,F=[],p,z=x.length,A="dump",r=" ",q="{",m="}",n,w;for(;;){D=x.lastIndexOf(q,z);if(D<0){break;}C=x.indexOf(m,D);if(D+1>C){break;}p=x.substring(D+1,C);G=p;u=null;B=G.indexOf(r);if(B>-1){u=G.substring(B+1);G=G.substring(0,B);}t=y[G];if(E){t=E(G,t,u);}if(f.isObject(t)){if(f.isArray(t)){t=f.dump(t,parseInt(u,10));}else{u=u||"";n=u.indexOf(A);if(n>-1){u=u.substring(4);}w=t.toString();if(w===i||n>-1){t=f.dump(t,parseInt(u,10));}else{t=w;}}}else{if(!f.isString(t)&&!f.isNumber(t)){t="~-"+F.length+"-~";F[F.length]=p;}}x=x.substring(0,D)+t+x.substring(C+1);if(l===false){z=D-1;}}for(D=F.length-1;D>=0;D=D-1){x=x.replace(new RegExp("~-"+D+"-~"),"{"+F[D]+"}","g");}return x;},trim:function(j){try{return j.replace(/^\s+|\s+$/g,"");}catch(k){return j;
}},merge:function(){var n={},k=arguments,j=k.length,m;for(m=0;m<j;m=m+1){f.augmentObject(n,k[m],true);}return n;},later:function(t,k,u,n,p){t=t||0;k=k||{};var l=u,s=n,q,j;if(f.isString(u)){l=k[u];}if(!l){throw new TypeError("method undefined");}if(!f.isUndefined(n)&&!f.isArray(s)){s=[n];}q=function(){l.apply(k,s||b);};j=(p)?setInterval(q,t):setTimeout(q,t);return{interval:p,cancel:function(){if(this.interval){clearInterval(j);}else{clearTimeout(j);}}};},isValue:function(j){return(f.isObject(j)||f.isString(j)||f.isNumber(j)||f.isBoolean(j));}};f.hasOwnProperty=(a.hasOwnProperty)?function(j,k){return j&&j.hasOwnProperty&&j.hasOwnProperty(k);}:function(j,k){return !f.isUndefined(j[k])&&j.constructor.prototype[k]!==j[k];};e.augmentObject(f,e,true);YAHOO.util.Lang=f;f.augment=f.augmentProto;YAHOO.augment=f.augmentProto;YAHOO.extend=f.extend;})();YAHOO.register("yahoo",YAHOO,{version:"2.9.0",build:"2800"});/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
(function(){YAHOO.env._id_counter=YAHOO.env._id_counter||0;var e=YAHOO.util,k=YAHOO.lang,L=YAHOO.env.ua,a=YAHOO.lang.trim,B={},F={},m=/^t(?:able|d|h)$/i,w=/color$/i,j=window.document,v=j.documentElement,C="ownerDocument",M="defaultView",U="documentElement",S="compatMode",z="offsetLeft",o="offsetTop",T="offsetParent",x="parentNode",K="nodeType",c="tagName",n="scrollLeft",H="scrollTop",p="getBoundingClientRect",V="getComputedStyle",y="currentStyle",l="CSS1Compat",A="BackCompat",E="class",f="className",i="",b=" ",R="(?:^|\\s)",J="(?= |$)",t="g",O="position",D="fixed",u="relative",I="left",N="top",Q="medium",P="borderLeftWidth",q="borderTopWidth",d=L.opera,h=L.webkit,g=L.gecko,s=L.ie;e.Dom={CUSTOM_ATTRIBUTES:(!v.hasAttribute)?{"for":"htmlFor","class":f}:{"htmlFor":"for","className":E},DOT_ATTRIBUTES:{checked:true},get:function(aa){var ac,X,ab,Z,W,G,Y=null;if(aa){if(typeof aa=="string"||typeof aa=="number"){ac=aa+"";aa=j.getElementById(aa);G=(aa)?aa.attributes:null;if(aa&&G&&G.id&&G.id.value===ac){return aa;}else{if(aa&&j.all){aa=null;X=j.all[ac];if(X&&X.length){for(Z=0,W=X.length;Z<W;++Z){if(X[Z].id===ac){return X[Z];}}}}}}else{if(e.Element&&aa instanceof e.Element){aa=aa.get("element");}else{if(!aa.nodeType&&"length" in aa){ab=[];for(Z=0,W=aa.length;Z<W;++Z){ab[ab.length]=e.Dom.get(aa[Z]);}aa=ab;}}}Y=aa;}return Y;},getComputedStyle:function(G,W){if(window[V]){return G[C][M][V](G,null)[W];}else{if(G[y]){return e.Dom.IE_ComputedStyle.get(G,W);}}},getStyle:function(G,W){return e.Dom.batch(G,e.Dom._getStyle,W);},_getStyle:function(){if(window[V]){return function(G,Y){Y=(Y==="float")?Y="cssFloat":e.Dom._toCamel(Y);var X=G.style[Y],W;if(!X){W=G[C][M][V](G,null);if(W){X=W[Y];}}return X;};}else{if(v[y]){return function(G,Y){var X;switch(Y){case"opacity":X=100;try{X=G.filters["DXImageTransform.Microsoft.Alpha"].opacity;}catch(Z){try{X=G.filters("alpha").opacity;}catch(W){}}return X/100;case"float":Y="styleFloat";default:Y=e.Dom._toCamel(Y);X=G[y]?G[y][Y]:null;return(G.style[Y]||X);}};}}}(),setStyle:function(G,W,X){e.Dom.batch(G,e.Dom._setStyle,{prop:W,val:X});},_setStyle:function(){if(!window.getComputedStyle&&j.documentElement.currentStyle){return function(W,G){var X=e.Dom._toCamel(G.prop),Y=G.val;if(W){switch(X){case"opacity":if(Y===""||Y===null||Y===1){W.style.removeAttribute("filter");}else{if(k.isString(W.style.filter)){W.style.filter="alpha(opacity="+Y*100+")";if(!W[y]||!W[y].hasLayout){W.style.zoom=1;}}}break;case"float":X="styleFloat";default:W.style[X]=Y;}}else{}};}else{return function(W,G){var X=e.Dom._toCamel(G.prop),Y=G.val;if(W){if(X=="float"){X="cssFloat";}W.style[X]=Y;}else{}};}}(),getXY:function(G){return e.Dom.batch(G,e.Dom._getXY);},_canPosition:function(G){return(e.Dom._getStyle(G,"display")!=="none"&&e.Dom._inDoc(G));},_getXY:function(W){var X,G,Z,ab,Y,aa,ac=Math.round,ad=false;if(e.Dom._canPosition(W)){Z=W[p]();ab=W[C];X=e.Dom.getDocumentScrollLeft(ab);G=e.Dom.getDocumentScrollTop(ab);ad=[Z[I],Z[N]];if(Y||aa){ad[0]-=aa;ad[1]-=Y;}if((G||X)){ad[0]+=X;ad[1]+=G;}ad[0]=ac(ad[0]);ad[1]=ac(ad[1]);}else{}return ad;},getX:function(G){var W=function(X){return e.Dom.getXY(X)[0];};return e.Dom.batch(G,W,e.Dom,true);},getY:function(G){var W=function(X){return e.Dom.getXY(X)[1];};return e.Dom.batch(G,W,e.Dom,true);},setXY:function(G,X,W){e.Dom.batch(G,e.Dom._setXY,{pos:X,noRetry:W});},_setXY:function(G,Z){var aa=e.Dom._getStyle(G,O),Y=e.Dom.setStyle,ad=Z.pos,W=Z.noRetry,ab=[parseInt(e.Dom.getComputedStyle(G,I),10),parseInt(e.Dom.getComputedStyle(G,N),10)],ac,X;ac=e.Dom._getXY(G);if(!ad||ac===false){return false;}if(aa=="static"){aa=u;Y(G,O,aa);}if(isNaN(ab[0])){ab[0]=(aa==u)?0:G[z];}if(isNaN(ab[1])){ab[1]=(aa==u)?0:G[o];}if(ad[0]!==null){Y(G,I,ad[0]-ac[0]+ab[0]+"px");}if(ad[1]!==null){Y(G,N,ad[1]-ac[1]+ab[1]+"px");}if(!W){X=e.Dom._getXY(G);if((ad[0]!==null&&X[0]!=ad[0])||(ad[1]!==null&&X[1]!=ad[1])){e.Dom._setXY(G,{pos:ad,noRetry:true});}}},setX:function(W,G){e.Dom.setXY(W,[G,null]);},setY:function(G,W){e.Dom.setXY(G,[null,W]);},getRegion:function(G){var W=function(X){var Y=false;if(e.Dom._canPosition(X)){Y=e.Region.getRegion(X);}else{}return Y;};return e.Dom.batch(G,W,e.Dom,true);},getClientWidth:function(){return e.Dom.getViewportWidth();},getClientHeight:function(){return e.Dom.getViewportHeight();},getElementsByClassName:function(ab,af,ac,ae,X,ad){af=af||"*";ac=(ac)?e.Dom.get(ac):null||j;if(!ac){return[];}var W=[],G=ac.getElementsByTagName(af),Z=e.Dom.hasClass;for(var Y=0,aa=G.length;Y<aa;++Y){if(Z(G[Y],ab)){W[W.length]=G[Y];}}if(ae){e.Dom.batch(W,ae,X,ad);}return W;},hasClass:function(W,G){return e.Dom.batch(W,e.Dom._hasClass,G);},_hasClass:function(X,W){var G=false,Y;if(X&&W){Y=e.Dom._getAttribute(X,f)||i;if(Y){Y=Y.replace(/\s+/g,b);}if(W.exec){G=W.test(Y);}else{G=W&&(b+Y+b).indexOf(b+W+b)>-1;}}else{}return G;},addClass:function(W,G){return e.Dom.batch(W,e.Dom._addClass,G);},_addClass:function(X,W){var G=false,Y;if(X&&W){Y=e.Dom._getAttribute(X,f)||i;if(!e.Dom._hasClass(X,W)){e.Dom.setAttribute(X,f,a(Y+b+W));G=true;}}else{}return G;},removeClass:function(W,G){return e.Dom.batch(W,e.Dom._removeClass,G);},_removeClass:function(Y,X){var W=false,aa,Z,G;if(Y&&X){aa=e.Dom._getAttribute(Y,f)||i;e.Dom.setAttribute(Y,f,aa.replace(e.Dom._getClassRegex(X),i));Z=e.Dom._getAttribute(Y,f);if(aa!==Z){e.Dom.setAttribute(Y,f,a(Z));W=true;if(e.Dom._getAttribute(Y,f)===""){G=(Y.hasAttribute&&Y.hasAttribute(E))?E:f;Y.removeAttribute(G);}}}else{}return W;},replaceClass:function(X,W,G){return e.Dom.batch(X,e.Dom._replaceClass,{from:W,to:G});},_replaceClass:function(Y,X){var W,ab,aa,G=false,Z;if(Y&&X){ab=X.from;aa=X.to;if(!aa){G=false;}else{if(!ab){G=e.Dom._addClass(Y,X.to);}else{if(ab!==aa){Z=e.Dom._getAttribute(Y,f)||i;W=(b+Z.replace(e.Dom._getClassRegex(ab),b+aa).replace(/\s+/g,b)).split(e.Dom._getClassRegex(aa));W.splice(1,0,b+aa);e.Dom.setAttribute(Y,f,a(W.join(i)));G=true;}}}}else{}return G;},generateId:function(G,X){X=X||"yui-gen";var W=function(Y){if(Y&&Y.id){return Y.id;}var Z=X+YAHOO.env._id_counter++;
if(Y){if(Y[C]&&Y[C].getElementById(Z)){return e.Dom.generateId(Y,Z+X);}Y.id=Z;}return Z;};return e.Dom.batch(G,W,e.Dom,true)||W.apply(e.Dom,arguments);},isAncestor:function(W,X){W=e.Dom.get(W);X=e.Dom.get(X);var G=false;if((W&&X)&&(W[K]&&X[K])){if(W.contains&&W!==X){G=W.contains(X);}else{if(W.compareDocumentPosition){G=!!(W.compareDocumentPosition(X)&16);}}}else{}return G;},inDocument:function(G,W){return e.Dom._inDoc(e.Dom.get(G),W);},_inDoc:function(W,X){var G=false;if(W&&W[c]){X=X||W[C];G=e.Dom.isAncestor(X[U],W);}else{}return G;},getElementsBy:function(W,af,ab,ad,X,ac,ae){af=af||"*";ab=(ab)?e.Dom.get(ab):null||j;var aa=(ae)?null:[],G;if(ab){G=ab.getElementsByTagName(af);for(var Y=0,Z=G.length;Y<Z;++Y){if(W(G[Y])){if(ae){aa=G[Y];break;}else{aa[aa.length]=G[Y];}}}if(ad){e.Dom.batch(aa,ad,X,ac);}}return aa;},getElementBy:function(X,G,W){return e.Dom.getElementsBy(X,G,W,null,null,null,true);},batch:function(X,ab,aa,Z){var Y=[],W=(Z)?aa:null;X=(X&&(X[c]||X.item))?X:e.Dom.get(X);if(X&&ab){if(X[c]||X.length===undefined){return ab.call(W,X,aa);}for(var G=0;G<X.length;++G){Y[Y.length]=ab.call(W||X[G],X[G],aa);}}else{return false;}return Y;},getDocumentHeight:function(){var W=(j[S]!=l||h)?j.body.scrollHeight:v.scrollHeight,G=Math.max(W,e.Dom.getViewportHeight());return G;},getDocumentWidth:function(){var W=(j[S]!=l||h)?j.body.scrollWidth:v.scrollWidth,G=Math.max(W,e.Dom.getViewportWidth());return G;},getViewportHeight:function(){var G=self.innerHeight,W=j[S];if((W||s)&&!d){G=(W==l)?v.clientHeight:j.body.clientHeight;}return G;},getViewportWidth:function(){var G=self.innerWidth,W=j[S];if(W||s){G=(W==l)?v.clientWidth:j.body.clientWidth;}return G;},getAncestorBy:function(G,W){while((G=G[x])){if(e.Dom._testElement(G,W)){return G;}}return null;},getAncestorByClassName:function(W,G){W=e.Dom.get(W);if(!W){return null;}var X=function(Y){return e.Dom.hasClass(Y,G);};return e.Dom.getAncestorBy(W,X);},getAncestorByTagName:function(W,G){W=e.Dom.get(W);if(!W){return null;}var X=function(Y){return Y[c]&&Y[c].toUpperCase()==G.toUpperCase();};return e.Dom.getAncestorBy(W,X);},getPreviousSiblingBy:function(G,W){while(G){G=G.previousSibling;if(e.Dom._testElement(G,W)){return G;}}return null;},getPreviousSibling:function(G){G=e.Dom.get(G);if(!G){return null;}return e.Dom.getPreviousSiblingBy(G);},getNextSiblingBy:function(G,W){while(G){G=G.nextSibling;if(e.Dom._testElement(G,W)){return G;}}return null;},getNextSibling:function(G){G=e.Dom.get(G);if(!G){return null;}return e.Dom.getNextSiblingBy(G);},getFirstChildBy:function(G,X){var W=(e.Dom._testElement(G.firstChild,X))?G.firstChild:null;return W||e.Dom.getNextSiblingBy(G.firstChild,X);},getFirstChild:function(G,W){G=e.Dom.get(G);if(!G){return null;}return e.Dom.getFirstChildBy(G);},getLastChildBy:function(G,X){if(!G){return null;}var W=(e.Dom._testElement(G.lastChild,X))?G.lastChild:null;return W||e.Dom.getPreviousSiblingBy(G.lastChild,X);},getLastChild:function(G){G=e.Dom.get(G);return e.Dom.getLastChildBy(G);},getChildrenBy:function(W,Y){var X=e.Dom.getFirstChildBy(W,Y),G=X?[X]:[];e.Dom.getNextSiblingBy(X,function(Z){if(!Y||Y(Z)){G[G.length]=Z;}return false;});return G;},getChildren:function(G){G=e.Dom.get(G);if(!G){}return e.Dom.getChildrenBy(G);},getDocumentScrollLeft:function(G){G=G||j;return Math.max(G[U].scrollLeft,G.body.scrollLeft);},getDocumentScrollTop:function(G){G=G||j;return Math.max(G[U].scrollTop,G.body.scrollTop);},insertBefore:function(W,G){W=e.Dom.get(W);G=e.Dom.get(G);if(!W||!G||!G[x]){return null;}return G[x].insertBefore(W,G);},insertAfter:function(W,G){W=e.Dom.get(W);G=e.Dom.get(G);if(!W||!G||!G[x]){return null;}if(G.nextSibling){return G[x].insertBefore(W,G.nextSibling);}else{return G[x].appendChild(W);}},getClientRegion:function(){var X=e.Dom.getDocumentScrollTop(),W=e.Dom.getDocumentScrollLeft(),Y=e.Dom.getViewportWidth()+W,G=e.Dom.getViewportHeight()+X;return new e.Region(X,Y,G,W);},setAttribute:function(W,G,X){e.Dom.batch(W,e.Dom._setAttribute,{attr:G,val:X});},_setAttribute:function(X,W){var G=e.Dom._toCamel(W.attr),Y=W.val;if(X&&X.setAttribute){if(e.Dom.DOT_ATTRIBUTES[G]&&X.tagName&&X.tagName!="BUTTON"){X[G]=Y;}else{G=e.Dom.CUSTOM_ATTRIBUTES[G]||G;X.setAttribute(G,Y);}}else{}},getAttribute:function(W,G){return e.Dom.batch(W,e.Dom._getAttribute,G);},_getAttribute:function(W,G){var X;G=e.Dom.CUSTOM_ATTRIBUTES[G]||G;if(e.Dom.DOT_ATTRIBUTES[G]){X=W[G];}else{if(W&&"getAttribute" in W){if(/^(?:href|src)$/.test(G)){X=W.getAttribute(G,2);}else{X=W.getAttribute(G);}}else{}}return X;},_toCamel:function(W){var X=B;function G(Y,Z){return Z.toUpperCase();}return X[W]||(X[W]=W.indexOf("-")===-1?W:W.replace(/-([a-z])/gi,G));},_getClassRegex:function(W){var G;if(W!==undefined){if(W.exec){G=W;}else{G=F[W];if(!G){W=W.replace(e.Dom._patterns.CLASS_RE_TOKENS,"\\$1");W=W.replace(/\s+/g,b);G=F[W]=new RegExp(R+W+J,t);}}}return G;},_patterns:{ROOT_TAG:/^body|html$/i,CLASS_RE_TOKENS:/([\.\(\)\^\$\*\+\?\|\[\]\{\}\\])/g},_testElement:function(G,W){return G&&G[K]==1&&(!W||W(G));},_calcBorders:function(X,Y){var W=parseInt(e.Dom[V](X,q),10)||0,G=parseInt(e.Dom[V](X,P),10)||0;if(g){if(m.test(X[c])){W=0;G=0;}}Y[0]+=G;Y[1]+=W;return Y;}};var r=e.Dom[V];if(L.opera){e.Dom[V]=function(W,G){var X=r(W,G);if(w.test(G)){X=e.Dom.Color.toRGB(X);}return X;};}if(L.webkit){e.Dom[V]=function(W,G){var X=r(W,G);if(X==="rgba(0, 0, 0, 0)"){X="transparent";}return X;};}if(L.ie&&L.ie>=8){e.Dom.DOT_ATTRIBUTES.type=true;}})();YAHOO.util.Region=function(d,e,a,c){this.top=d;this.y=d;this[1]=d;this.right=e;this.bottom=a;this.left=c;this.x=c;this[0]=c;this.width=this.right-this.left;this.height=this.bottom-this.top;};YAHOO.util.Region.prototype.contains=function(a){return(a.left>=this.left&&a.right<=this.right&&a.top>=this.top&&a.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(f){var d=Math.max(this.top,f.top),e=Math.min(this.right,f.right),a=Math.min(this.bottom,f.bottom),c=Math.max(this.left,f.left);
if(a>=d&&e>=c){return new YAHOO.util.Region(d,e,a,c);}else{return null;}};YAHOO.util.Region.prototype.union=function(f){var d=Math.min(this.top,f.top),e=Math.max(this.right,f.right),a=Math.max(this.bottom,f.bottom),c=Math.min(this.left,f.left);return new YAHOO.util.Region(d,e,a,c);};YAHOO.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+", height: "+this.height+", width: "+this.width+"}");};YAHOO.util.Region.getRegion=function(e){var g=YAHOO.util.Dom.getXY(e),d=g[1],f=g[0]+e.offsetWidth,a=g[1]+e.offsetHeight,c=g[0];return new YAHOO.util.Region(d,f,a,c);};YAHOO.util.Point=function(a,b){if(YAHOO.lang.isArray(a)){b=a[1];a=a[0];}YAHOO.util.Point.superclass.constructor.call(this,b,a,b,a);};YAHOO.extend(YAHOO.util.Point,YAHOO.util.Region);(function(){var b=YAHOO.util,a="clientTop",f="clientLeft",j="parentNode",k="right",w="hasLayout",i="px",u="opacity",l="auto",d="borderLeftWidth",g="borderTopWidth",p="borderRightWidth",v="borderBottomWidth",s="visible",q="transparent",n="height",e="width",h="style",t="currentStyle",r=/^width|height$/,o=/^(\d[.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz|%){1}?/i,m={get:function(x,z){var y="",A=x[t][z];if(z===u){y=b.Dom.getStyle(x,u);}else{if(!A||(A.indexOf&&A.indexOf(i)>-1)){y=A;}else{if(b.Dom.IE_COMPUTED[z]){y=b.Dom.IE_COMPUTED[z](x,z);}else{if(o.test(A)){y=b.Dom.IE.ComputedStyle.getPixel(x,z);}else{y=A;}}}}return y;},getOffset:function(z,E){var B=z[t][E],x=E.charAt(0).toUpperCase()+E.substr(1),C="offset"+x,y="pixel"+x,A="",D;if(B==l){D=z[C];if(D===undefined){A=0;}A=D;if(r.test(E)){z[h][E]=D;if(z[C]>D){A=D-(z[C]-D);}z[h][E]=l;}}else{if(!z[h][y]&&!z[h][E]){z[h][E]=B;}A=z[h][y];}return A+i;},getBorderWidth:function(x,z){var y=null;if(!x[t][w]){x[h].zoom=1;}switch(z){case g:y=x[a];break;case v:y=x.offsetHeight-x.clientHeight-x[a];break;case d:y=x[f];break;case p:y=x.offsetWidth-x.clientWidth-x[f];break;}return y+i;},getPixel:function(y,x){var A=null,B=y[t][k],z=y[t][x];y[h][k]=z;A=y[h].pixelRight;y[h][k]=B;return A+i;},getMargin:function(y,x){var z;if(y[t][x]==l){z=0+i;}else{z=b.Dom.IE.ComputedStyle.getPixel(y,x);}return z;},getVisibility:function(y,x){var z;while((z=y[t])&&z[x]=="inherit"){y=y[j];}return(z)?z[x]:s;},getColor:function(y,x){return b.Dom.Color.toRGB(y[t][x])||q;},getBorderColor:function(y,x){var z=y[t],A=z[x]||z.color;return b.Dom.Color.toRGB(b.Dom.Color.toHex(A));}},c={};c.top=c.right=c.bottom=c.left=c[e]=c[n]=m.getOffset;c.color=m.getColor;c[g]=c[p]=c[v]=c[d]=m.getBorderWidth;c.marginTop=c.marginRight=c.marginBottom=c.marginLeft=m.getMargin;c.visibility=m.getVisibility;c.borderColor=c.borderTopColor=c.borderRightColor=c.borderBottomColor=c.borderLeftColor=m.getBorderColor;b.Dom.IE_COMPUTED=c;b.Dom.IE_ComputedStyle=m;})();(function(){var c="toString",a=parseInt,b=RegExp,d=YAHOO.util;d.Dom.Color={KEYWORDS:{black:"000",silver:"c0c0c0",gray:"808080",white:"fff",maroon:"800000",red:"f00",purple:"800080",fuchsia:"f0f",green:"008000",lime:"0f0",olive:"808000",yellow:"ff0",navy:"000080",blue:"00f",teal:"008080",aqua:"0ff"},re_RGB:/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,re_hex:/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,re_hex3:/([0-9A-F])/gi,toRGB:function(e){if(!d.Dom.Color.re_RGB.test(e)){e=d.Dom.Color.toHex(e);}if(d.Dom.Color.re_hex.exec(e)){e="rgb("+[a(b.$1,16),a(b.$2,16),a(b.$3,16)].join(", ")+")";}return e;},toHex:function(f){f=d.Dom.Color.KEYWORDS[f]||f;if(d.Dom.Color.re_RGB.exec(f)){f=[Number(b.$1).toString(16),Number(b.$2).toString(16),Number(b.$3).toString(16)];for(var e=0;e<f.length;e++){if(f[e].length<2){f[e]="0"+f[e];}}f=f.join("");}if(f.length<6){f=f.replace(d.Dom.Color.re_hex3,"$1$1");}if(f!=="transparent"&&f.indexOf("#")<0){f="#"+f;}return f.toUpperCase();}};}());YAHOO.register("dom",YAHOO.util.Dom,{version:"2.9.0",build:"2800"});/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
var Y=YAHOO,Y_DOM=YAHOO.util.Dom,EMPTY_ARRAY=[],Y_UA=Y.env.ua,Y_Lang=Y.lang,Y_DOC=document,Y_DOCUMENT_ELEMENT=Y_DOC.documentElement,Y_DOM_inDoc=Y_DOM.inDocument,Y_mix=Y_Lang.augmentObject,Y_guid=Y_DOM.generateId,Y_getDoc=function(a){var b=Y_DOC;if(a){b=(a.nodeType===9)?a:a.ownerDocument||a.document||Y_DOC;}return b;},Y_Array=function(g,d){var c,b,h=d||0;try{return Array.prototype.slice.call(g,h);}catch(f){b=[];c=g.length;for(;h<c;h++){b.push(g[h]);}return b;}},Y_DOM_allById=function(f,a){a=a||Y_DOC;var b=[],c=[],d,e;if(a.querySelectorAll){c=a.querySelectorAll('[id="'+f+'"]');}else{if(a.all){b=a.all(f);if(b){if(b.nodeName){if(b.id===f){c.push(b);b=EMPTY_ARRAY;}else{b=[b];}}if(b.length){for(d=0;e=b[d++];){if(e.id===f||(e.attributes&&e.attributes.id&&e.attributes.id.value===f)){c.push(e);}}}}}else{c=[Y_getDoc(a).getElementById(f)];}}return c;};var COMPARE_DOCUMENT_POSITION="compareDocumentPosition",OWNER_DOCUMENT="ownerDocument",Selector={_foundCache:[],useNative:true,_compare:("sourceIndex" in Y_DOCUMENT_ELEMENT)?function(f,e){var d=f.sourceIndex,c=e.sourceIndex;if(d===c){return 0;}else{if(d>c){return 1;}}return -1;}:(Y_DOCUMENT_ELEMENT[COMPARE_DOCUMENT_POSITION]?function(b,a){if(b[COMPARE_DOCUMENT_POSITION](a)&4){return -1;}else{return 1;}}:function(e,d){var c,a,b;if(e&&d){c=e[OWNER_DOCUMENT].createRange();c.setStart(e,0);a=d[OWNER_DOCUMENT].createRange();a.setStart(d,0);b=c.compareBoundaryPoints(1,a);}return b;}),_sort:function(a){if(a){a=Y_Array(a,0,true);if(a.sort){a.sort(Selector._compare);}}return a;},_deDupe:function(a){var b=[],c,d;for(c=0;(d=a[c++]);){if(!d._found){b[b.length]=d;d._found=true;}}for(c=0;(d=b[c++]);){d._found=null;d.removeAttribute("_found");}return b;},query:function(b,j,k,a){if(j&&typeof j=="string"){j=Y_DOM.get(j);if(!j){return(k)?null:[];}}else{j=j||Y_DOC;}var f=[],c=(Selector.useNative&&Y_DOC.querySelector&&!a),e=[[b,j]],g,l,d,h=(c)?Selector._nativeQuery:Selector._bruteQuery;if(b&&h){if(!a&&(!c||j.tagName)){e=Selector._splitQueries(b,j);}for(d=0;(g=e[d++]);){l=h(g[0],g[1],k);if(!k){l=Y_Array(l,0,true);}if(l){f=f.concat(l);}}if(e.length>1){f=Selector._sort(Selector._deDupe(f));}}return(k)?(f[0]||null):f;},_splitQueries:function(c,f){var b=c.split(","),d=[],g="",e,a;if(f){if(f.tagName){f.id=f.id||Y_guid();g='[id="'+f.id+'"] ';}for(e=0,a=b.length;e<a;++e){c=g+b[e];d.push([c,f]);}}return d;},_nativeQuery:function(a,b,c){if(Y_UA.webkit&&a.indexOf(":checked")>-1&&(Selector.pseudos&&Selector.pseudos.checked)){return Selector.query(a,b,c,true);}try{return b["querySelector"+(c?"":"All")](a);}catch(d){return Selector.query(a,b,c,true);}},filter:function(b,a){var c=[],d,e;if(b&&a){for(d=0;(e=b[d++]);){if(Selector.test(e,a)){c[c.length]=e;}}}else{}return c;},test:function(c,d,k){var g=false,b=d.split(","),a=false,l,o,h,n,f,e,m;if(c&&c.tagName){if(!k&&!Y_DOM_inDoc(c)){l=c.parentNode;if(l){k=l;}else{n=c[OWNER_DOCUMENT].createDocumentFragment();n.appendChild(c);k=n;a=true;}}k=k||c[OWNER_DOCUMENT];if(!c.id){c.id=Y_guid();}for(f=0;(m=b[f++]);){m+='[id="'+c.id+'"]';h=Selector.query(m,k);for(e=0;o=h[e++];){if(o===c){g=true;break;}}if(g){break;}}if(a){n.removeChild(c);}}return g;}};YAHOO.util.Selector=Selector;var PARENT_NODE="parentNode",TAG_NAME="tagName",ATTRIBUTES="attributes",COMBINATOR="combinator",PSEUDOS="pseudos",SelectorCSS2={_reRegExpTokens:/([\^\$\?\[\]\*\+\-\.\(\)\|\\])/,SORT_RESULTS:true,_children:function(e,a){var b=e.children,d,c=[],f,g;if(e.children&&a&&e.children.tags){c=e.children.tags(a);}else{if((!b&&e[TAG_NAME])||(b&&a)){f=b||e.childNodes;b=[];for(d=0;(g=f[d++]);){if(g.tagName){if(!a||a===g.tagName){b.push(g);}}}}}return b||[];},_re:{attr:/(\[[^\]]*\])/g,esc:/\\[:\[\]\(\)#\.\'\>+~"]/gi,pseudos:/(\([^\)]*\))/g},shorthand:{"\\#(-?[_a-z]+[-\\w\\uE000]*)":"[id=$1]","\\.(-?[_a-z]+[-\\w\\uE000]*)":"[className~=$1]"},operators:{"":function(b,a){return !!b.getAttribute(a);},"~=":"(?:^|\\s+){val}(?:\\s+|$)","|=":"^{val}(?:-|$)"},pseudos:{"first-child":function(a){return Selector._children(a[PARENT_NODE])[0]===a;}},_bruteQuery:function(f,j,l){var g=[],a=[],i=Selector._tokenize(f),e=i[i.length-1],k=Y_getDoc(j),c,b,h,d;if(e){b=e.id;h=e.className;d=e.tagName||"*";if(j.getElementsByTagName){if(b&&(j.all||(j.nodeType===9||Y_DOM_inDoc(j)))){a=Y_DOM_allById(b,j);}else{if(h){a=j.getElementsByClassName(h);}else{a=j.getElementsByTagName(d);}}}else{c=j.firstChild;while(c){if(c.tagName){a.push(c);}c=c.nextSilbing||c.firstChild;}}if(a.length){g=Selector._filterNodes(a,i,l);}}return g;},_filterNodes:function(l,f,h){var r=0,q,s=f.length,k=s-1,e=[],o=l[0],v=o,t=Selector.getters,d,p,c,g,a,m,b,u;for(r=0;(v=o=l[r++]);){k=s-1;g=null;testLoop:while(v&&v.tagName){c=f[k];b=c.tests;q=b.length;if(q&&!a){while((u=b[--q])){d=u[1];if(t[u[0]]){m=t[u[0]](v,u[0]);}else{m=v[u[0]];if(m===undefined&&v.getAttribute){m=v.getAttribute(u[0]);}}if((d==="="&&m!==u[2])||(typeof d!=="string"&&d.test&&!d.test(m))||(!d.test&&typeof d==="function"&&!d(v,u[0],u[2]))){if((v=v[g])){while(v&&(!v.tagName||(c.tagName&&c.tagName!==v.tagName))){v=v[g];}}continue testLoop;}}}k--;if(!a&&(p=c.combinator)){g=p.axis;v=v[g];while(v&&!v.tagName){v=v[g];}if(p.direct){g=null;}}else{e.push(o);if(h){return e;}break;}}}o=v=null;return e;},combinators:{" ":{axis:"parentNode"},">":{axis:"parentNode",direct:true},"+":{axis:"previousSibling",direct:true}},_parsers:[{name:ATTRIBUTES,re:/^\uE003(-?[a-z]+[\w\-]*)+([~\|\^\$\*!=]=?)?['"]?([^\uE004'"]*)['"]?\uE004/i,fn:function(d,e){var c=d[2]||"",a=Selector.operators,b=(d[3])?d[3].replace(/\\/g,""):"",f;if((d[1]==="id"&&c==="=")||(d[1]==="className"&&Y_DOCUMENT_ELEMENT.getElementsByClassName&&(c==="~="||c==="="))){e.prefilter=d[1];d[3]=b;e[d[1]]=(d[1]==="id")?d[3]:b;}if(c in a){f=a[c];if(typeof f==="string"){d[3]=b.replace(Selector._reRegExpTokens,"\\$1");f=new RegExp(f.replace("{val}",d[3]));}d[2]=f;}if(!e.last||e.prefilter!==d[1]){return d.slice(1);}}},{name:TAG_NAME,re:/^((?:-?[_a-z]+[\w-]*)|\*)/i,fn:function(b,c){var a=b[1].toUpperCase();c.tagName=a;if(a!=="*"&&(!c.last||c.prefilter)){return[TAG_NAME,"=",a];
}if(!c.prefilter){c.prefilter="tagName";}}},{name:COMBINATOR,re:/^\s*([>+~]|\s)\s*/,fn:function(a,b){}},{name:PSEUDOS,re:/^:([\-\w]+)(?:\uE005['"]?([^\uE005]*)['"]?\uE006)*/i,fn:function(a,b){var c=Selector[PSEUDOS][a[1]];if(c){if(a[2]){a[2]=a[2].replace(/\\/g,"");}return[a[2],c];}else{return false;}}}],_getToken:function(a){return{tagName:null,id:null,className:null,attributes:{},combinator:null,tests:[]};},_tokenize:function(c){c=c||"";c=Selector._replaceShorthand(Y_Lang.trim(c));var b=Selector._getToken(),h=c,g=[],j=false,e,f,d,a;outer:do{j=false;for(d=0;(a=Selector._parsers[d++]);){if((e=a.re.exec(c))){if(a.name!==COMBINATOR){b.selector=c;}c=c.replace(e[0],"");if(!c.length){b.last=true;}if(Selector._attrFilters[e[1]]){e[1]=Selector._attrFilters[e[1]];}f=a.fn(e,b);if(f===false){j=false;break outer;}else{if(f){b.tests.push(f);}}if(!c.length||a.name===COMBINATOR){g.push(b);b=Selector._getToken(b);if(a.name===COMBINATOR){b.combinator=Selector.combinators[e[1]];}}j=true;}}}while(j&&c.length);if(!j||c.length){g=[];}return g;},_replaceShorthand:function(b){var d=Selector.shorthand,c=b.match(Selector._re.esc),e,h,g,f,a;if(c){b=b.replace(Selector._re.esc,"\uE000");}e=b.match(Selector._re.attr);h=b.match(Selector._re.pseudos);if(e){b=b.replace(Selector._re.attr,"\uE001");}if(h){b=b.replace(Selector._re.pseudos,"\uE002");}for(g in d){if(d.hasOwnProperty(g)){b=b.replace(new RegExp(g,"gi"),d[g]);}}if(e){for(f=0,a=e.length;f<a;++f){b=b.replace(/\uE001/,e[f]);}}if(h){for(f=0,a=h.length;f<a;++f){b=b.replace(/\uE002/,h[f]);}}b=b.replace(/\[/g,"\uE003");b=b.replace(/\]/g,"\uE004");b=b.replace(/\(/g,"\uE005");b=b.replace(/\)/g,"\uE006");if(c){for(f=0,a=c.length;f<a;++f){b=b.replace("\uE000",c[f]);}}return b;},_attrFilters:{"class":"className","for":"htmlFor"},getters:{href:function(b,a){return Y_DOM.getAttribute(b,a);}}};Y_mix(Selector,SelectorCSS2,true);Selector.getters.src=Selector.getters.rel=Selector.getters.href;if(Selector.useNative&&Y_DOC.querySelector){Selector.shorthand["\\.([^\\s\\\\(\\[:]*)"]="[class~=$1]";}Selector._reNth=/^(?:([\-]?\d*)(n){1}|(odd|even)$)*([\-+]?\d*)$/;Selector._getNth=function(d,o,q,h){Selector._reNth.test(o);var m=parseInt(RegExp.$1,10),c=RegExp.$2,j=RegExp.$3,k=parseInt(RegExp.$4,10)||0,p=[],l=Selector._children(d.parentNode,q),f;if(j){m=2;f="+";c="n";k=(j==="odd")?1:0;}else{if(isNaN(m)){m=(c)?1:0;}}if(m===0){if(h){k=l.length-k+1;}if(l[k-1]===d){return true;}else{return false;}}else{if(m<0){h=!!h;m=Math.abs(m);}}if(!h){for(var e=k-1,g=l.length;e<g;e+=m){if(e>=0&&l[e]===d){return true;}}}else{for(var e=l.length-k,g=l.length;e>=0;e-=m){if(e<g&&l[e]===d){return true;}}}return false;};Y_mix(Selector.pseudos,{"root":function(a){return a===a.ownerDocument.documentElement;},"nth-child":function(a,b){return Selector._getNth(a,b);},"nth-last-child":function(a,b){return Selector._getNth(a,b,null,true);},"nth-of-type":function(a,b){return Selector._getNth(a,b,a.tagName);},"nth-last-of-type":function(a,b){return Selector._getNth(a,b,a.tagName,true);},"last-child":function(b){var a=Selector._children(b.parentNode);return a[a.length-1]===b;},"first-of-type":function(a){return Selector._children(a.parentNode,a.tagName)[0]===a;},"last-of-type":function(b){var a=Selector._children(b.parentNode,b.tagName);return a[a.length-1]===b;},"only-child":function(b){var a=Selector._children(b.parentNode);return a.length===1&&a[0]===b;},"only-of-type":function(b){var a=Selector._children(b.parentNode,b.tagName);return a.length===1&&a[0]===b;},"empty":function(a){return a.childNodes.length===0;},"not":function(a,b){return !Selector.test(a,b);},"contains":function(a,b){var c=a.innerText||a.textContent||"";return c.indexOf(b)>-1;},"checked":function(a){return(a.checked===true||a.selected===true);},enabled:function(a){return(a.disabled!==undefined&&!a.disabled);},disabled:function(a){return(a.disabled);}});Y_mix(Selector.operators,{"^=":"^{val}","!=":function(b,a,c){return b[a]!==c;},"$=":"{val}$","*=":"{val}"});Selector.combinators["~"]={axis:"previousSibling"};YAHOO.register("selector",YAHOO.util.Selector,{version:"2.9.0",build:"2800"});/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
YAHOO.util.CustomEvent=function(d,c,b,a,e){this.type=d;this.scope=c||window;this.silent=b;this.fireOnce=e;this.fired=false;this.firedWith=null;this.signature=a||YAHOO.util.CustomEvent.LIST;this.subscribers=[];if(!this.silent){}var f="_YUICEOnSubscribe";if(d!==f){this.subscribeEvent=new YAHOO.util.CustomEvent(f,this,true);}this.lastError=null;};YAHOO.util.CustomEvent.LIST=0;YAHOO.util.CustomEvent.FLAT=1;YAHOO.util.CustomEvent.prototype={subscribe:function(b,c,d){if(!b){throw new Error("Invalid callback for subscriber to '"+this.type+"'");}if(this.subscribeEvent){this.subscribeEvent.fire(b,c,d);}var a=new YAHOO.util.Subscriber(b,c,d);if(this.fireOnce&&this.fired){this.notify(a,this.firedWith);}else{this.subscribers.push(a);}},unsubscribe:function(d,f){if(!d){return this.unsubscribeAll();}var e=false;for(var b=0,a=this.subscribers.length;b<a;++b){var c=this.subscribers[b];if(c&&c.contains(d,f)){this._delete(b);e=true;}}return e;},fire:function(){this.lastError=null;var h=[],a=this.subscribers.length;var d=[].slice.call(arguments,0),c=true,f,b=false;if(this.fireOnce){if(this.fired){return true;}else{this.firedWith=d;}}this.fired=true;if(!a&&this.silent){return true;}if(!this.silent){}var e=this.subscribers.slice();for(f=0;f<a;++f){var g=e[f];if(!g||!g.fn){b=true;}else{c=this.notify(g,d);if(false===c){if(!this.silent){}break;}}}return(c!==false);},notify:function(g,c){var b,i=null,f=g.getScope(this.scope),a=YAHOO.util.Event.throwErrors;if(!this.silent){}if(this.signature==YAHOO.util.CustomEvent.FLAT){if(c.length>0){i=c[0];}try{b=g.fn.call(f,i,g.obj);}catch(h){this.lastError=h;if(a){throw h;}}}else{try{b=g.fn.call(f,this.type,c,g.obj);}catch(d){this.lastError=d;if(a){throw d;}}}return b;},unsubscribeAll:function(){var a=this.subscribers.length,b;for(b=a-1;b>-1;b--){this._delete(b);}this.subscribers=[];return a;},_delete:function(a){var b=this.subscribers[a];if(b){delete b.fn;delete b.obj;}this.subscribers.splice(a,1);},toString:function(){return"CustomEvent: "+"'"+this.type+"', "+"context: "+this.scope;}};YAHOO.util.Subscriber=function(a,b,c){this.fn=a;this.obj=YAHOO.lang.isUndefined(b)?null:b;this.overrideContext=c;};YAHOO.util.Subscriber.prototype.getScope=function(a){if(this.overrideContext){if(this.overrideContext===true){return this.obj;}else{return this.overrideContext;}}return a;};YAHOO.util.Subscriber.prototype.contains=function(a,b){if(b){return(this.fn==a&&this.obj==b);}else{return(this.fn==a);}};YAHOO.util.Subscriber.prototype.toString=function(){return"Subscriber { obj: "+this.obj+", overrideContext: "+(this.overrideContext||"no")+" }";};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var g=false,h=[],j=[],a=0,e=[],b=0,c={63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9},d=YAHOO.env.ua.ie,f="focusin",i="focusout";return{POLL_RETRYS:500,POLL_INTERVAL:40,EL:0,TYPE:1,FN:2,WFN:3,UNLOAD_OBJ:3,ADJ_SCOPE:4,OBJ:5,OVERRIDE:6,CAPTURE:7,lastError:null,isSafari:YAHOO.env.ua.webkit,webkit:YAHOO.env.ua.webkit,isIE:d,_interval:null,_dri:null,_specialTypes:{focusin:(d?"focusin":"focus"),focusout:(d?"focusout":"blur")},DOMReady:false,throwErrors:false,startInterval:function(){if(!this._interval){this._interval=YAHOO.lang.later(this.POLL_INTERVAL,this,this._tryPreloadAttach,null,true);}},onAvailable:function(q,m,o,p,n){var k=(YAHOO.lang.isString(q))?[q]:q;for(var l=0;l<k.length;l=l+1){e.push({id:k[l],fn:m,obj:o,overrideContext:p,checkReady:n});}a=this.POLL_RETRYS;this.startInterval();},onContentReady:function(n,k,l,m){this.onAvailable(n,k,l,m,true);},onDOMReady:function(){this.DOMReadyEvent.subscribe.apply(this.DOMReadyEvent,arguments);},_addListener:function(m,k,v,p,t,y){if(!v||!v.call){return false;}if(this._isValidCollection(m)){var w=true;for(var q=0,s=m.length;q<s;++q){w=this.on(m[q],k,v,p,t)&&w;}return w;}else{if(YAHOO.lang.isString(m)){var o=this.getEl(m);if(o){m=o;}else{this.onAvailable(m,function(){YAHOO.util.Event._addListener(m,k,v,p,t,y);});return true;}}}if(!m){return false;}if("unload"==k&&p!==this){j[j.length]=[m,k,v,p,t];return true;}var l=m;if(t){if(t===true){l=p;}else{l=t;}}var n=function(z){return v.call(l,YAHOO.util.Event.getEvent(z,m),p);};var x=[m,k,v,n,l,p,t,y];var r=h.length;h[r]=x;try{this._simpleAdd(m,k,n,y);}catch(u){this.lastError=u;this.removeListener(m,k,v);return false;}return true;},_getType:function(k){return this._specialTypes[k]||k;},addListener:function(m,p,l,n,o){var k=((p==f||p==i)&&!YAHOO.env.ua.ie)?true:false;return this._addListener(m,this._getType(p),l,n,o,k);},addFocusListener:function(l,k,m,n){return this.on(l,f,k,m,n);},removeFocusListener:function(l,k){return this.removeListener(l,f,k);},addBlurListener:function(l,k,m,n){return this.on(l,i,k,m,n);},removeBlurListener:function(l,k){return this.removeListener(l,i,k);},removeListener:function(l,k,r){var m,p,u;k=this._getType(k);if(typeof l=="string"){l=this.getEl(l);}else{if(this._isValidCollection(l)){var s=true;for(m=l.length-1;m>-1;m--){s=(this.removeListener(l[m],k,r)&&s);}return s;}}if(!r||!r.call){return this.purgeElement(l,false,k);}if("unload"==k){for(m=j.length-1;m>-1;m--){u=j[m];if(u&&u[0]==l&&u[1]==k&&u[2]==r){j.splice(m,1);return true;}}return false;}var n=null;var o=arguments[3];if("undefined"===typeof o){o=this._getCacheIndex(h,l,k,r);}if(o>=0){n=h[o];}if(!l||!n){return false;}var t=n[this.CAPTURE]===true?true:false;try{this._simpleRemove(l,k,n[this.WFN],t);}catch(q){this.lastError=q;return false;}delete h[o][this.WFN];delete h[o][this.FN];h.splice(o,1);return true;},getTarget:function(m,l){var k=m.target||m.srcElement;return this.resolveTextNode(k);},resolveTextNode:function(l){try{if(l&&3==l.nodeType){return l.parentNode;}}catch(k){return null;}return l;},getPageX:function(l){var k=l.pageX;if(!k&&0!==k){k=l.clientX||0;if(this.isIE){k+=this._getScrollLeft();}}return k;},getPageY:function(k){var l=k.pageY;if(!l&&0!==l){l=k.clientY||0;if(this.isIE){l+=this._getScrollTop();}}return l;},getXY:function(k){return[this.getPageX(k),this.getPageY(k)];},getRelatedTarget:function(l){var k=l.relatedTarget;
if(!k){if(l.type=="mouseout"){k=l.toElement;}else{if(l.type=="mouseover"){k=l.fromElement;}}}return this.resolveTextNode(k);},getTime:function(m){if(!m.time){var l=new Date().getTime();try{m.time=l;}catch(k){this.lastError=k;return l;}}return m.time;},stopEvent:function(k){this.stopPropagation(k);this.preventDefault(k);},stopPropagation:function(k){if(k.stopPropagation){k.stopPropagation();}else{k.cancelBubble=true;}},preventDefault:function(k){if(k.preventDefault){k.preventDefault();}else{k.returnValue=false;}},getEvent:function(m,k){var l=m||window.event;if(!l){var n=this.getEvent.caller;while(n){l=n.arguments[0];if(l&&Event==l.constructor){break;}n=n.caller;}}return l;},getCharCode:function(l){var k=l.keyCode||l.charCode||0;if(YAHOO.env.ua.webkit&&(k in c)){k=c[k];}return k;},_getCacheIndex:function(n,q,r,p){for(var o=0,m=n.length;o<m;o=o+1){var k=n[o];if(k&&k[this.FN]==p&&k[this.EL]==q&&k[this.TYPE]==r){return o;}}return -1;},generateId:function(k){var l=k.id;if(!l){l="yuievtautoid-"+b;++b;k.id=l;}return l;},_isValidCollection:function(l){try{return(l&&typeof l!=="string"&&l.length&&!l.tagName&&!l.alert&&typeof l[0]!=="undefined");}catch(k){return false;}},elCache:{},getEl:function(k){return(typeof k==="string")?document.getElementById(k):k;},clearCache:function(){},DOMReadyEvent:new YAHOO.util.CustomEvent("DOMReady",YAHOO,0,0,1),_load:function(l){if(!g){g=true;var k=YAHOO.util.Event;k._ready();k._tryPreloadAttach();}},_ready:function(l){var k=YAHOO.util.Event;if(!k.DOMReady){k.DOMReady=true;k.DOMReadyEvent.fire();k._simpleRemove(document,"DOMContentLoaded",k._ready);}},_tryPreloadAttach:function(){if(e.length===0){a=0;if(this._interval){this._interval.cancel();this._interval=null;}return;}if(this.locked){return;}if(this.isIE){if(!this.DOMReady){this.startInterval();return;}}this.locked=true;var q=!g;if(!q){q=(a>0&&e.length>0);}var p=[];var r=function(t,u){var s=t;if(u.overrideContext){if(u.overrideContext===true){s=u.obj;}else{s=u.overrideContext;}}u.fn.call(s,u.obj);};var l,k,o,n,m=[];for(l=0,k=e.length;l<k;l=l+1){o=e[l];if(o){n=this.getEl(o.id);if(n){if(o.checkReady){if(g||n.nextSibling||!q){m.push(o);e[l]=null;}}else{r(n,o);e[l]=null;}}else{p.push(o);}}}for(l=0,k=m.length;l<k;l=l+1){o=m[l];r(this.getEl(o.id),o);}a--;if(q){for(l=e.length-1;l>-1;l--){o=e[l];if(!o||!o.id){e.splice(l,1);}}this.startInterval();}else{if(this._interval){this._interval.cancel();this._interval=null;}}this.locked=false;},purgeElement:function(p,q,s){var n=(YAHOO.lang.isString(p))?this.getEl(p):p;var r=this.getListeners(n,s),o,k;if(r){for(o=r.length-1;o>-1;o--){var m=r[o];this.removeListener(n,m.type,m.fn);}}if(q&&n&&n.childNodes){for(o=0,k=n.childNodes.length;o<k;++o){this.purgeElement(n.childNodes[o],q,s);}}},getListeners:function(n,k){var q=[],m;if(!k){m=[h,j];}else{if(k==="unload"){m=[j];}else{k=this._getType(k);m=[h];}}var s=(YAHOO.lang.isString(n))?this.getEl(n):n;for(var p=0;p<m.length;p=p+1){var u=m[p];if(u){for(var r=0,t=u.length;r<t;++r){var o=u[r];if(o&&o[this.EL]===s&&(!k||k===o[this.TYPE])){q.push({type:o[this.TYPE],fn:o[this.FN],obj:o[this.OBJ],adjust:o[this.OVERRIDE],scope:o[this.ADJ_SCOPE],index:r});}}}}return(q.length)?q:null;},_unload:function(s){var m=YAHOO.util.Event,p,o,n,r,q,t=j.slice(),k;for(p=0,r=j.length;p<r;++p){n=t[p];if(n){try{k=window;if(n[m.ADJ_SCOPE]){if(n[m.ADJ_SCOPE]===true){k=n[m.UNLOAD_OBJ];}else{k=n[m.ADJ_SCOPE];}}n[m.FN].call(k,m.getEvent(s,n[m.EL]),n[m.UNLOAD_OBJ]);}catch(w){}t[p]=null;}}n=null;k=null;j=null;if(h){for(o=h.length-1;o>-1;o--){n=h[o];if(n){try{m.removeListener(n[m.EL],n[m.TYPE],n[m.FN],o);}catch(v){}}}n=null;}try{m._simpleRemove(window,"unload",m._unload);m._simpleRemove(window,"load",m._load);}catch(u){}},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var k=document.documentElement,l=document.body;if(k&&(k.scrollTop||k.scrollLeft)){return[k.scrollTop,k.scrollLeft];}else{if(l){return[l.scrollTop,l.scrollLeft];}else{return[0,0];}}},regCE:function(){},_simpleAdd:function(){if(window.addEventListener){return function(m,n,l,k){m.addEventListener(n,l,(k));};}else{if(window.attachEvent){return function(m,n,l,k){m.attachEvent("on"+n,l);};}else{return function(){};}}}(),_simpleRemove:function(){if(window.removeEventListener){return function(m,n,l,k){m.removeEventListener(n,l,(k));};}else{if(window.detachEvent){return function(l,m,k){l.detachEvent("on"+m,k);};}else{return function(){};}}}()};}();(function(){var a=YAHOO.util.Event;a.on=a.addListener;a.onFocus=a.addFocusListener;a.onBlur=a.addBlurListener;
/*! DOMReady: based on work by: Dean Edwards/John Resig/Matthias Miller/Diego Perini */
if(a.isIE){if(self!==self.top){document.onreadystatechange=function(){if(document.readyState=="complete"){document.onreadystatechange=null;a._ready();}};}else{YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,YAHOO.util.Event,true);var b=document.createElement("p");a._dri=setInterval(function(){try{b.doScroll("left");clearInterval(a._dri);a._dri=null;a._ready();b=null;}catch(c){}},a.POLL_INTERVAL);}}else{if(a.webkit&&a.webkit<525){a._dri=setInterval(function(){var c=document.readyState;if("loaded"==c||"complete"==c){clearInterval(a._dri);a._dri=null;a._ready();}},a.POLL_INTERVAL);}else{a._simpleAdd(document,"DOMContentLoaded",a._ready);}}a._simpleAdd(window,"load",a._load);a._simpleAdd(window,"unload",a._unload);a._tryPreloadAttach();})();}YAHOO.util.EventProvider=function(){};YAHOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(a,c,f,e){this.__yui_events=this.__yui_events||{};var d=this.__yui_events[a];if(d){d.subscribe(c,f,e);}else{this.__yui_subscribers=this.__yui_subscribers||{};var b=this.__yui_subscribers;if(!b[a]){b[a]=[];}b[a].push({fn:c,obj:f,overrideContext:e});}},unsubscribe:function(c,e,g){this.__yui_events=this.__yui_events||{};var a=this.__yui_events;if(c){var f=a[c];if(f){return f.unsubscribe(e,g);}}else{var b=true;for(var d in a){if(YAHOO.lang.hasOwnProperty(a,d)){b=b&&a[d].unsubscribe(e,g);
}}return b;}return false;},unsubscribeAll:function(a){return this.unsubscribe(a);},createEvent:function(b,g){this.__yui_events=this.__yui_events||{};var e=g||{},d=this.__yui_events,f;if(d[b]){}else{f=new YAHOO.util.CustomEvent(b,e.scope||this,e.silent,YAHOO.util.CustomEvent.FLAT,e.fireOnce);d[b]=f;if(e.onSubscribeCallback){f.subscribeEvent.subscribe(e.onSubscribeCallback);}this.__yui_subscribers=this.__yui_subscribers||{};var a=this.__yui_subscribers[b];if(a){for(var c=0;c<a.length;++c){f.subscribe(a[c].fn,a[c].obj,a[c].overrideContext);}}}return d[b];},fireEvent:function(b){this.__yui_events=this.__yui_events||{};var d=this.__yui_events[b];if(!d){return null;}var a=[];for(var c=1;c<arguments.length;++c){a.push(arguments[c]);}return d.fire.apply(d,a);},hasEvent:function(a){if(this.__yui_events){if(this.__yui_events[a]){return true;}}return false;}};(function(){var a=YAHOO.util.Event,c=YAHOO.lang;YAHOO.util.KeyListener=function(d,i,e,f){if(!d){}else{if(!i){}else{if(!e){}}}if(!f){f=YAHOO.util.KeyListener.KEYDOWN;}var g=new YAHOO.util.CustomEvent("keyPressed");this.enabledEvent=new YAHOO.util.CustomEvent("enabled");this.disabledEvent=new YAHOO.util.CustomEvent("disabled");if(c.isString(d)){d=document.getElementById(d);}if(c.isFunction(e)){g.subscribe(e);}else{g.subscribe(e.fn,e.scope,e.correctScope);}function h(o,n){if(!i.shift){i.shift=false;}if(!i.alt){i.alt=false;}if(!i.ctrl){i.ctrl=false;}if(o.shiftKey==i.shift&&o.altKey==i.alt&&o.ctrlKey==i.ctrl){var j,m=i.keys,l;if(YAHOO.lang.isArray(m)){for(var k=0;k<m.length;k++){j=m[k];l=a.getCharCode(o);if(j==l){g.fire(l,o);break;}}}else{l=a.getCharCode(o);if(m==l){g.fire(l,o);}}}}this.enable=function(){if(!this.enabled){a.on(d,f,h);this.enabledEvent.fire(i);}this.enabled=true;};this.disable=function(){if(this.enabled){a.removeListener(d,f,h);this.disabledEvent.fire(i);}this.enabled=false;};this.toString=function(){return"KeyListener ["+i.keys+"] "+d.tagName+(d.id?"["+d.id+"]":"");};};var b=YAHOO.util.KeyListener;b.KEYDOWN="keydown";b.KEYUP="keyup";b.KEY={ALT:18,BACK_SPACE:8,CAPS_LOCK:20,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,META:224,NUM_LOCK:144,PAGE_DOWN:34,PAGE_UP:33,PAUSE:19,PRINTSCREEN:44,RIGHT:39,SCROLL_LOCK:145,SHIFT:16,SPACE:32,TAB:9,UP:38};})();YAHOO.register("event",YAHOO.util.Event,{version:"2.9.0",build:"2800"});/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
(function(){var A=YAHOO.util.Event,C=YAHOO.lang,B=[],D=function(H,E,F){var G;if(!H||H===F){G=false;}else{G=YAHOO.util.Selector.test(H,E)?H:D(H.parentNode,E,F);}return G;};C.augmentObject(A,{_createDelegate:function(F,E,G,H){return function(I){var J=this,N=A.getTarget(I),L=E,P=(J.nodeType===9),Q,K,O,M;if(C.isFunction(E)){Q=E(N);}else{if(C.isString(E)){if(!P){O=J.id;if(!O){O=A.generateId(J);}M=("#"+O+" ");L=(M+E).replace(/,/gi,(","+M));}if(YAHOO.util.Selector.test(N,L)){Q=N;}else{if(YAHOO.util.Selector.test(N,((L.replace(/,/gi," *,"))+" *"))){Q=D(N,L,J);}}}}if(Q){K=Q;if(H){if(H===true){K=G;}else{K=H;}}return F.call(K,I,Q,J,G);}};},delegate:function(F,J,L,G,H,I){var E=J,K,M;if(C.isString(G)&&!YAHOO.util.Selector){return false;}if(J=="mouseenter"||J=="mouseleave"){if(!A._createMouseDelegate){return false;}E=A._getType(J);K=A._createMouseDelegate(L,H,I);M=A._createDelegate(function(P,O,N){return K.call(O,P,N);},G,H,I);}else{M=A._createDelegate(L,G,H,I);}B.push([F,E,L,M]);return A.on(F,E,M);},removeDelegate:function(F,J,I){var K=J,H=false,G,E;if(J=="mouseenter"||J=="mouseleave"){K=A._getType(J);}G=A._getCacheIndex(B,F,K,I);if(G>=0){E=B[G];}if(F&&E){H=A.removeListener(E[0],E[1],E[3]);if(H){delete B[G][2];delete B[G][3];B.splice(G,1);}}return H;}});}());YAHOO.register("event-delegate",YAHOO.util.Event,{version:"2.9.0",build:"2800"});/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
(function(){var b=YAHOO.util;var a=function(d,c,e,f){if(!d){}this.init(d,c,e,f);};a.NAME="Anim";a.prototype={toString:function(){var c=this.getEl()||{};var d=c.id||c.tagName;return(this.constructor.NAME+": "+d);},patterns:{noNegatives:/width|height|opacity|padding/i,offsetAttribute:/^((width|height)|(top|left))$/,defaultUnit:/width|height|top$|bottom$|left$|right$/i,offsetUnit:/\d+(em|%|en|ex|pt|in|cm|mm|pc)$/i},doMethod:function(c,e,d){return this.method(this.currentFrame,e,d-e,this.totalFrames);},setAttribute:function(c,f,e){var d=this.getEl();if(this.patterns.noNegatives.test(c)){f=(f>0)?f:0;}if(c in d&&!("style" in d&&c in d.style)){d[c]=f;}else{b.Dom.setStyle(d,c,f+e);}},getAttribute:function(c){var e=this.getEl();var g=b.Dom.getStyle(e,c);if(g!=="auto"&&!this.patterns.offsetUnit.test(g)){return parseFloat(g);}var d=this.patterns.offsetAttribute.exec(c)||[];var h=!!(d[3]);var f=!!(d[2]);if("style" in e){if(f||(b.Dom.getStyle(e,"position")=="absolute"&&h)){g=e["offset"+d[0].charAt(0).toUpperCase()+d[0].substr(1)];}else{g=0;}}else{if(c in e){g=e[c];}}return g;},getDefaultUnit:function(c){if(this.patterns.defaultUnit.test(c)){return"px";}return"";},setRuntimeAttribute:function(d){var j;var e;var f=this.attributes;this.runtimeAttributes[d]={};var h=function(i){return(typeof i!=="undefined");};if(!h(f[d]["to"])&&!h(f[d]["by"])){return false;}j=(h(f[d]["from"]))?f[d]["from"]:this.getAttribute(d);if(h(f[d]["to"])){e=f[d]["to"];}else{if(h(f[d]["by"])){if(j.constructor==Array){e=[];for(var g=0,c=j.length;g<c;++g){e[g]=j[g]+f[d]["by"][g]*1;}}else{e=j+f[d]["by"]*1;}}}this.runtimeAttributes[d].start=j;this.runtimeAttributes[d].end=e;this.runtimeAttributes[d].unit=(h(f[d].unit))?f[d]["unit"]:this.getDefaultUnit(d);return true;},init:function(f,c,h,i){var d=false;var e=null;var g=0;f=b.Dom.get(f);this.attributes=c||{};this.duration=!YAHOO.lang.isUndefined(h)?h:1;this.method=i||b.Easing.easeNone;this.useSeconds=true;this.currentFrame=0;this.totalFrames=b.AnimMgr.fps;this.setEl=function(j){f=b.Dom.get(j);};this.getEl=function(){return f;};this.isAnimated=function(){return d;};this.getStartTime=function(){return e;};this.runtimeAttributes={};this.animate=function(){if(this.isAnimated()){return false;}this.currentFrame=0;this.totalFrames=(this.useSeconds)?Math.ceil(b.AnimMgr.fps*this.duration):this.duration;if(this.duration===0&&this.useSeconds){this.totalFrames=1;}b.AnimMgr.registerElement(this);return true;};this.stop=function(j){if(!this.isAnimated()){return false;}if(j){this.currentFrame=this.totalFrames;this._onTween.fire();}b.AnimMgr.stop(this);};this._handleStart=function(){this.onStart.fire();this.runtimeAttributes={};for(var j in this.attributes){if(this.attributes.hasOwnProperty(j)){this.setRuntimeAttribute(j);}}d=true;g=0;e=new Date();};this._handleTween=function(){var l={duration:new Date()-this.getStartTime(),currentFrame:this.currentFrame};l.toString=function(){return("duration: "+l.duration+", currentFrame: "+l.currentFrame);};this.onTween.fire(l);var k=this.runtimeAttributes;for(var j in k){if(k.hasOwnProperty(j)){this.setAttribute(j,this.doMethod(j,k[j].start,k[j].end),k[j].unit);}}this.afterTween.fire(l);g+=1;};this._handleComplete=function(){var j=(new Date()-e)/1000;var k={duration:j,frames:g,fps:g/j};k.toString=function(){return("duration: "+k.duration+", frames: "+k.frames+", fps: "+k.fps);};d=false;g=0;this.onComplete.fire(k);};this._onStart=new b.CustomEvent("_start",this,true);this.onStart=new b.CustomEvent("start",this);this.onTween=new b.CustomEvent("tween",this);this.afterTween=new b.CustomEvent("afterTween",this);this._onTween=new b.CustomEvent("_tween",this,true);this.onComplete=new b.CustomEvent("complete",this);this._onComplete=new b.CustomEvent("_complete",this,true);this._onStart.subscribe(this._handleStart);this._onTween.subscribe(this._handleTween);this._onComplete.subscribe(this._handleComplete);}};b.Anim=a;})();YAHOO.util.AnimMgr=new function(){var e=null;var c=[];var g=0;this.fps=1000;this.delay=20;this.registerElement=function(j){c[c.length]=j;g+=1;j._onStart.fire();this.start();};var f=[];var d=false;var h=function(){var j=f.shift();b.apply(YAHOO.util.AnimMgr,j);if(f.length){arguments.callee();}};var b=function(k,j){j=j||a(k);if(!k.isAnimated()||j===-1){return false;}k._onComplete.fire();c.splice(j,1);g-=1;if(g<=0){this.stop();}return true;};this.unRegister=function(){f.push(arguments);if(!d){d=true;h();d=false;}};this.start=function(){if(e===null){e=setInterval(this.run,this.delay);}};this.stop=function(l){if(!l){clearInterval(e);for(var k=0,j=c.length;k<j;++k){this.unRegister(c[0],0);}c=[];e=null;g=0;}else{this.unRegister(l);}};this.run=function(){for(var l=0,j=c.length;l<j;++l){var k=c[l];if(!k||!k.isAnimated()){continue;}if(k.currentFrame<k.totalFrames||k.totalFrames===null){k.currentFrame+=1;if(k.useSeconds){i(k);}k._onTween.fire();}else{YAHOO.util.AnimMgr.stop(k,l);}}};var a=function(l){for(var k=0,j=c.length;k<j;++k){if(c[k]===l){return k;}}return -1;};var i=function(k){var n=k.totalFrames;var m=k.currentFrame;var l=(k.currentFrame*k.duration*1000/k.totalFrames);var j=(new Date()-k.getStartTime());var o=0;if(j<k.duration*1000){o=Math.round((j/l-1)*k.currentFrame);}else{o=n-(m+1);}if(o>0&&isFinite(o)){if(k.currentFrame+o>=n){o=n-(m+1);}k.currentFrame+=o;}};this._queue=c;this._getIndex=a;};YAHOO.util.Bezier=new function(){this.getPosition=function(e,d){var f=e.length;var c=[];for(var b=0;b<f;++b){c[b]=[e[b][0],e[b][1]];}for(var a=1;a<f;++a){for(b=0;b<f-a;++b){c[b][0]=(1-d)*c[b][0]+d*c[parseInt(b+1,10)][0];c[b][1]=(1-d)*c[b][1]+d*c[parseInt(b+1,10)][1];}}return[c[0][0],c[0][1]];};};(function(){var a=function(f,e,g,h){a.superclass.constructor.call(this,f,e,g,h);};a.NAME="ColorAnim";a.DEFAULT_BGCOLOR="#fff";var c=YAHOO.util;YAHOO.extend(a,c.Anim);var d=a.superclass;var b=a.prototype;b.patterns.color=/color$/i;b.patterns.rgb=/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i;b.patterns.hex=/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;b.patterns.hex3=/^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i;
b.patterns.transparent=/^transparent|rgba\(0, 0, 0, 0\)$/;b.parseColor=function(e){if(e.length==3){return e;}var f=this.patterns.hex.exec(e);if(f&&f.length==4){return[parseInt(f[1],16),parseInt(f[2],16),parseInt(f[3],16)];}f=this.patterns.rgb.exec(e);if(f&&f.length==4){return[parseInt(f[1],10),parseInt(f[2],10),parseInt(f[3],10)];}f=this.patterns.hex3.exec(e);if(f&&f.length==4){return[parseInt(f[1]+f[1],16),parseInt(f[2]+f[2],16),parseInt(f[3]+f[3],16)];}return null;};b.getAttribute=function(e){var g=this.getEl();if(this.patterns.color.test(e)){var i=YAHOO.util.Dom.getStyle(g,e);var h=this;if(this.patterns.transparent.test(i)){var f=YAHOO.util.Dom.getAncestorBy(g,function(j){return !h.patterns.transparent.test(i);});if(f){i=c.Dom.getStyle(f,e);}else{i=a.DEFAULT_BGCOLOR;}}}else{i=d.getAttribute.call(this,e);}return i;};b.doMethod=function(f,k,g){var j;if(this.patterns.color.test(f)){j=[];for(var h=0,e=k.length;h<e;++h){j[h]=d.doMethod.call(this,f,k[h],g[h]);}j="rgb("+Math.floor(j[0])+","+Math.floor(j[1])+","+Math.floor(j[2])+")";}else{j=d.doMethod.call(this,f,k,g);}return j;};b.setRuntimeAttribute=function(f){d.setRuntimeAttribute.call(this,f);if(this.patterns.color.test(f)){var h=this.attributes;var k=this.parseColor(this.runtimeAttributes[f].start);var g=this.parseColor(this.runtimeAttributes[f].end);if(typeof h[f]["to"]==="undefined"&&typeof h[f]["by"]!=="undefined"){g=this.parseColor(h[f].by);for(var j=0,e=k.length;j<e;++j){g[j]=k[j]+g[j];}}this.runtimeAttributes[f].start=k;this.runtimeAttributes[f].end=g;}};c.ColorAnim=a;})();
/*!
TERMS OF USE - EASING EQUATIONS
Open source under the BSD License.
Copyright 2001 Robert Penner All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * Neither the name of the author nor the names of contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
YAHOO.util.Easing={easeNone:function(e,a,g,f){return g*e/f+a;},easeIn:function(e,a,g,f){return g*(e/=f)*e+a;},easeOut:function(e,a,g,f){return -g*(e/=f)*(e-2)+a;},easeBoth:function(e,a,g,f){if((e/=f/2)<1){return g/2*e*e+a;}return -g/2*((--e)*(e-2)-1)+a;},easeInStrong:function(e,a,g,f){return g*(e/=f)*e*e*e+a;},easeOutStrong:function(e,a,g,f){return -g*((e=e/f-1)*e*e*e-1)+a;},easeBothStrong:function(e,a,g,f){if((e/=f/2)<1){return g/2*e*e*e*e+a;}return -g/2*((e-=2)*e*e*e-2)+a;},elasticIn:function(g,e,k,j,f,i){if(g==0){return e;}if((g/=j)==1){return e+k;}if(!i){i=j*0.3;}if(!f||f<Math.abs(k)){f=k;var h=i/4;}else{var h=i/(2*Math.PI)*Math.asin(k/f);}return -(f*Math.pow(2,10*(g-=1))*Math.sin((g*j-h)*(2*Math.PI)/i))+e;},elasticOut:function(g,e,k,j,f,i){if(g==0){return e;}if((g/=j)==1){return e+k;}if(!i){i=j*0.3;}if(!f||f<Math.abs(k)){f=k;var h=i/4;}else{var h=i/(2*Math.PI)*Math.asin(k/f);}return f*Math.pow(2,-10*g)*Math.sin((g*j-h)*(2*Math.PI)/i)+k+e;},elasticBoth:function(g,e,k,j,f,i){if(g==0){return e;}if((g/=j/2)==2){return e+k;}if(!i){i=j*(0.3*1.5);}if(!f||f<Math.abs(k)){f=k;var h=i/4;}else{var h=i/(2*Math.PI)*Math.asin(k/f);}if(g<1){return -0.5*(f*Math.pow(2,10*(g-=1))*Math.sin((g*j-h)*(2*Math.PI)/i))+e;}return f*Math.pow(2,-10*(g-=1))*Math.sin((g*j-h)*(2*Math.PI)/i)*0.5+k+e;},backIn:function(e,a,h,g,f){if(typeof f=="undefined"){f=1.70158;}return h*(e/=g)*e*((f+1)*e-f)+a;},backOut:function(e,a,h,g,f){if(typeof f=="undefined"){f=1.70158;}return h*((e=e/g-1)*e*((f+1)*e+f)+1)+a;},backBoth:function(e,a,h,g,f){if(typeof f=="undefined"){f=1.70158;}if((e/=g/2)<1){return h/2*(e*e*(((f*=(1.525))+1)*e-f))+a;}return h/2*((e-=2)*e*(((f*=(1.525))+1)*e+f)+2)+a;},bounceIn:function(e,a,g,f){return g-YAHOO.util.Easing.bounceOut(f-e,0,g,f)+a;},bounceOut:function(e,a,g,f){if((e/=f)<(1/2.75)){return g*(7.5625*e*e)+a;}else{if(e<(2/2.75)){return g*(7.5625*(e-=(1.5/2.75))*e+0.75)+a;}else{if(e<(2.5/2.75)){return g*(7.5625*(e-=(2.25/2.75))*e+0.9375)+a;}}}return g*(7.5625*(e-=(2.625/2.75))*e+0.984375)+a;},bounceBoth:function(e,a,g,f){if(e<f/2){return YAHOO.util.Easing.bounceIn(e*2,0,g,f)*0.5+a;}return YAHOO.util.Easing.bounceOut(e*2-f,0,g,f)*0.5+g*0.5+a;}};(function(){var a=function(h,g,i,j){if(h){a.superclass.constructor.call(this,h,g,i,j);}};a.NAME="Motion";var e=YAHOO.util;YAHOO.extend(a,e.ColorAnim);var f=a.superclass;var c=a.prototype;c.patterns.points=/^points$/i;c.setAttribute=function(g,i,h){if(this.patterns.points.test(g)){h=h||"px";f.setAttribute.call(this,"left",i[0],h);f.setAttribute.call(this,"top",i[1],h);}else{f.setAttribute.call(this,g,i,h);}};c.getAttribute=function(g){if(this.patterns.points.test(g)){var h=[f.getAttribute.call(this,"left"),f.getAttribute.call(this,"top")];}else{h=f.getAttribute.call(this,g);}return h;};c.doMethod=function(g,k,h){var j=null;if(this.patterns.points.test(g)){var i=this.method(this.currentFrame,0,100,this.totalFrames)/100;j=e.Bezier.getPosition(this.runtimeAttributes[g],i);
}else{j=f.doMethod.call(this,g,k,h);}return j;};c.setRuntimeAttribute=function(q){if(this.patterns.points.test(q)){var h=this.getEl();var k=this.attributes;var g;var m=k["points"]["control"]||[];var j;var n,p;if(m.length>0&&!(m[0] instanceof Array)){m=[m];}else{var l=[];for(n=0,p=m.length;n<p;++n){l[n]=m[n];}m=l;}if(e.Dom.getStyle(h,"position")=="static"){e.Dom.setStyle(h,"position","relative");}if(d(k["points"]["from"])){e.Dom.setXY(h,k["points"]["from"]);}else{e.Dom.setXY(h,e.Dom.getXY(h));}g=this.getAttribute("points");if(d(k["points"]["to"])){j=b.call(this,k["points"]["to"],g);var o=e.Dom.getXY(this.getEl());for(n=0,p=m.length;n<p;++n){m[n]=b.call(this,m[n],g);}}else{if(d(k["points"]["by"])){j=[g[0]+k["points"]["by"][0],g[1]+k["points"]["by"][1]];for(n=0,p=m.length;n<p;++n){m[n]=[g[0]+m[n][0],g[1]+m[n][1]];}}}this.runtimeAttributes[q]=[g];if(m.length>0){this.runtimeAttributes[q]=this.runtimeAttributes[q].concat(m);}this.runtimeAttributes[q][this.runtimeAttributes[q].length]=j;}else{f.setRuntimeAttribute.call(this,q);}};var b=function(g,i){var h=e.Dom.getXY(this.getEl());g=[g[0]-h[0]+i[0],g[1]-h[1]+i[1]];return g;};var d=function(g){return(typeof g!=="undefined");};e.Motion=a;})();(function(){var d=function(f,e,g,h){if(f){d.superclass.constructor.call(this,f,e,g,h);}};d.NAME="Scroll";var b=YAHOO.util;YAHOO.extend(d,b.ColorAnim);var c=d.superclass;var a=d.prototype;a.doMethod=function(e,h,f){var g=null;if(e=="scroll"){g=[this.method(this.currentFrame,h[0],f[0]-h[0],this.totalFrames),this.method(this.currentFrame,h[1],f[1]-h[1],this.totalFrames)];}else{g=c.doMethod.call(this,e,h,f);}return g;};a.getAttribute=function(e){var g=null;var f=this.getEl();if(e=="scroll"){g=[f.scrollLeft,f.scrollTop];}else{g=c.getAttribute.call(this,e);}return g;};a.setAttribute=function(e,h,g){var f=this.getEl();if(e=="scroll"){f.scrollLeft=h[0];f.scrollTop=h[1];}else{c.setAttribute.call(this,e,h,g);}};b.Scroll=d;})();YAHOO.register("animation",YAHOO.util.Anim,{version:"2.9.0",build:"2800"});/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
(function(){var l=YAHOO.lang,isFunction=l.isFunction,isObject=l.isObject,isArray=l.isArray,_toStr=Object.prototype.toString,Native=(YAHOO.env.ua.caja?window:this).JSON,_UNICODE_EXCEPTIONS=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,_ESCAPES=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,_VALUES=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,_BRACKETS=/(?:^|:|,)(?:\s*\[)+/g,_UNSAFE=/[^\],:{}\s]/,_SPECIAL_CHARS=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,_CHARS={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},UNDEFINED="undefined",OBJECT="object",NULL="null",STRING="string",NUMBER="number",BOOLEAN="boolean",DATE="date",_allowable={"undefined":UNDEFINED,"string":STRING,"[object String]":STRING,"number":NUMBER,"[object Number]":NUMBER,"boolean":BOOLEAN,"[object Boolean]":BOOLEAN,"[object Date]":DATE,"[object RegExp]":OBJECT},EMPTY="",OPEN_O="{",CLOSE_O="}",OPEN_A="[",CLOSE_A="]",COMMA=",",COMMA_CR=",\n",CR="\n",COLON=":",COLON_SP=": ",QUOTE='"';Native=_toStr.call(Native)==="[object JSON]"&&Native;function _char(c){if(!_CHARS[c]){_CHARS[c]="\\u"+("0000"+(+(c.charCodeAt(0))).toString(16)).slice(-4);}return _CHARS[c];}function _revive(data,reviver){var walk=function(o,key){var k,v,value=o[key];if(value&&typeof value==="object"){for(k in value){if(l.hasOwnProperty(value,k)){v=walk(value,k);if(v===undefined){delete value[k];}else{value[k]=v;}}}}return reviver.call(o,key,value);};return typeof reviver==="function"?walk({"":data},""):data;}function _prepare(s){return s.replace(_UNICODE_EXCEPTIONS,_char);}function _isSafe(str){return l.isString(str)&&!_UNSAFE.test(str.replace(_ESCAPES,"@").replace(_VALUES,"]").replace(_BRACKETS,""));}function _parse(s,reviver){s=_prepare(s);if(_isSafe(s)){return _revive(eval("("+s+")"),reviver);}throw new SyntaxError("JSON.parse");}function _type(o){var t=typeof o;return _allowable[t]||_allowable[_toStr.call(o)]||(t===OBJECT?(o?OBJECT:NULL):UNDEFINED);}function _string(s){return QUOTE+s.replace(_SPECIAL_CHARS,_char)+QUOTE;}function _indent(s,space){return s.replace(/^/gm,space);}function _stringify(o,w,space){if(o===undefined){return undefined;}var replacer=isFunction(w)?w:null,format=_toStr.call(space).match(/String|Number/)||[],_date=YAHOO.lang.JSON.dateToString,stack=[],tmp,i,len;if(replacer||!isArray(w)){w=undefined;}if(w){tmp={};for(i=0,len=w.length;i<len;++i){tmp[w[i]]=true;}w=tmp;}space=format[0]==="Number"?new Array(Math.min(Math.max(0,space),10)+1).join(" "):(space||EMPTY).slice(0,10);function _serialize(h,key){var value=h[key],t=_type(value),a=[],colon=space?COLON_SP:COLON,arr,i,keys,k,v;if(isObject(value)&&isFunction(value.toJSON)){value=value.toJSON(key);}else{if(t===DATE){value=_date(value);}}if(isFunction(replacer)){value=replacer.call(h,key,value);}if(value!==h[key]){t=_type(value);}switch(t){case DATE:case OBJECT:break;case STRING:return _string(value);case NUMBER:return isFinite(value)?value+EMPTY:NULL;case BOOLEAN:return value+EMPTY;case NULL:return NULL;default:return undefined;}for(i=stack.length-1;i>=0;--i){if(stack[i]===value){throw new Error("JSON.stringify. Cyclical reference");}}arr=isArray(value);stack.push(value);if(arr){for(i=value.length-1;i>=0;--i){a[i]=_serialize(value,i)||NULL;}}else{keys=w||value;i=0;for(k in keys){if(l.hasOwnProperty(keys,k)){v=_serialize(value,k);if(v){a[i++]=_string(k)+colon+v;}}}}stack.pop();if(space&&a.length){return arr?OPEN_A+CR+_indent(a.join(COMMA_CR),space)+CR+CLOSE_A:OPEN_O+CR+_indent(a.join(COMMA_CR),space)+CR+CLOSE_O;}else{return arr?OPEN_A+a.join(COMMA)+CLOSE_A:OPEN_O+a.join(COMMA)+CLOSE_O;}}return _serialize({"":o},"");}YAHOO.lang.JSON={useNativeParse:!!Native,useNativeStringify:!!Native,isSafe:function(s){return _isSafe(_prepare(s));},parse:function(s,reviver){if(typeof s!=="string"){s+="";}return Native&&YAHOO.lang.JSON.useNativeParse?Native.parse(s,reviver):_parse(s,reviver);},stringify:function(o,w,space){return Native&&YAHOO.lang.JSON.useNativeStringify?Native.stringify(o,w,space):_stringify(o,w,space);},dateToString:function(d){function _zeroPad(v){return v<10?"0"+v:v;}return d.getUTCFullYear()+"-"+_zeroPad(d.getUTCMonth()+1)+"-"+_zeroPad(d.getUTCDate())+"T"+_zeroPad(d.getUTCHours())+COLON+_zeroPad(d.getUTCMinutes())+COLON+_zeroPad(d.getUTCSeconds())+"Z";},stringToDate:function(str){var m=str.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3}))?Z$/);if(m){var d=new Date();d.setUTCFullYear(m[1],m[2]-1,m[3]);d.setUTCHours(m[4],m[5],m[6],(m[7]||0));return d;}return str;}};YAHOO.lang.JSON.isValid=YAHOO.lang.JSON.isSafe;})();YAHOO.register("json",YAHOO.lang.JSON,{version:"2.9.0",build:"2800"});var YU = YAHOO.util;
var YL = YAHOO.lang;

var globalRun = 0;
var x=new NM114CHESS();
function NM114CHESS(){
    if(globalRun == 0){globalRun++;return new construct();}
    function construct(){
    
        this.init = function(){
        	var model = new Model();
        	
            var view = new ChessView(model, new ChessController(model));
            view.show();
        };
    };
}

//******************************************************************************
function Model() {
	
	//this.chessTypeId= '{"w_hoo":1,"w_hasag":2,"w_mori":3,"w_teme":4,"w_bers":5,"w_han":6,"b_hoo":7,"b_hasag":8,"b_mori":9,"b_teme":10,"b_bers":11,"b_han":12}';
	
	this._chessStandardManual= '{"c0":2,"c7":2,"c1":3,"c6":3,"c2":4,"c5":4,"c3":5,"c4":6,"c8":1,"c9":1,"c10":1,"c11":1,"c12":1,"c13":1,"c14":1,"c15":1,"c48":7,"c49":7,"c50":7,"c51":7,"c52":7,"c53":7,"c54":7,"c55":7,"c56":8,"c63":8,"c57":9,"c62":9,"c58":10,"c61":10,"c59":11,"c60":12}';
	//[[58,40],[45,-4],[10,-100]] ; move from 58 to 40,add chess 4 to 45,remove chess from 10
    this._cellName = 'c';
    this._cellInBoxName = 'cb';
    this._chessName = 'ch';
    this._chessInBoxName = 'chb';
    this._numName = "num";
    this._numsBoardName = "nums";
    this._numInBoxName = "numib";
    
    this._bodyContainerName = "bodyContainer";
    this._chessBoxName = "chessBox";
    this._chessBoardName = "chessBoard";
    
    this._chessSelectedName = "selectedChess"; //Don't begin with "cell name" or "chess name"
    this._eventChessInBoardSelectedName = "chessInBoardSelected";
    this._eventChessInBoxSelectedName = "chessInBoxSelected";
    this._eventRepaintName = "repaint";
    
    this._black_color = "#83726a";
    this._white_color = "#e3cdaa";
    this._over_color =  "#63ad9a";
    this._click_color = "#f36d6a";
    
    this._rcNum = 8; //row & col num
    this._chessTypeTotal = 12;
    this._cellsTotal = 64;
    this._dropChessSymbol = -100;
    
	this._manual = this._chessStandardManual;//null;
    			
	this.chessBoardClicked = function(event, matchedEl, container){
		this._controller.eventRepaint.fire();
	};

}

//******************************************************************************
function CustomEvents(model,name) {
	this.model = model;
	this.eventName = name;
	this.eventObject = new YU.CustomEvent(name,this,true);
    
    this.subscribe = function(handler){
    	this.eventObject.subscribe(handler);
    };

    this.fire = function(args){
    	this.eventObject.fire(args);
    };
}

//******************************************************************************
function ChessView(model, controller, elements) {
	this._model = model;
    this._controller = controller;
 
    var _this = this;

    //fire when chess in chessboard selected.
    this._controller.eventChessInBoardSelected.subscribe(function (type, args) {
    	_this._controller.chessBox.unselected();
    });
    
    //fire when chess in chessbox selected.
    this._controller.eventChessInBoxSelected.subscribe(function (type, args) {
    	_this._controller.chessBoard.unselected();
    });
    
    //
    this._controller.eventRepaint.subscribe(function (type, args) {
        _this.rebuild();
    });
        
    this.show = function(){//alert("chessView show!");
    	_this.rebuild();
        //_this._model.eventChessMoved.subscribe(function () {
        //    _this.rebuild();
        //});
    };
    
    this.rebuild = function(){
    	//alert("view rebuild!");
    	_this._controller.chessBoard.show();
    	_this._controller.chessBox.show();
    };
}

//******************************************************************************
function ChessController(model) {
	this._model = model;
	
    this.bodyContainer = new BodyContainer(this);
    this.chessBoard = new ChessBoard(this);
    this.chessBox = new ChessBox(this);
	
    this.eventChessInBoardSelected= new CustomEvents(this,this._model._eventChessInBoardSelectedName);
    this.eventChessInBoxSelected  = new CustomEvents(this,this._model._eventChessInBoxSelectedName);
    this.eventRepaint             = new CustomEvents(this,this._model._eventRepaintName);
     
	this.getObjectOfElement = function(El){ //El = html element
		
	};

	this.showChessSelected = function(){
		this.bodyContainer.addMouseEvent();
	};
	
	this.hideChessSelected = function(){
		this.bodyContainer.removeMouseEvent();
	};

	this.originalBackgroundColor = "";
	this.setMouseOverBackgroundColor = function(matchedEl,change){
		var c = 'transparent';
		if(change){
			this.originalBackgroundColor = YU.Dom.getStyle(matchedEl, 'background-color');
			c = this._model._over_color;
		}else{
			c = this.originalBackgroundColor;
		}
		YU.Dom.setStyle(matchedEl, 'background-color', c);
	};
	
	this.chessInBoardSelected = function(){
		var selected = -1;
		if(this.chessBoard.chessInBoardSelected._id != null){
				selected = this.chessBoard.chessInBoardSelected._id;
		}
		return selected;
	};
	
	this.chessInBoxSelected = function(){
		var selected = -1;
		if(this.chessBox.chessInBoxSelected._chessID != null){
				selected = this.chessBox.chessInBoxSelected._chessID;
		}
		return selected;
	};
	
	this.ifChessSelected = function(){
		var selected = false;
		if((this.chessInBoardSelected() != -1) || (this.chessInBoxSelected() != -1)){
			selected = true;
		}
		return selected;
	};
		
	this.chessUnselected = function(){
		this.chessBox.unselected();
		this.chessBoard.unselected();
		
		this.eventRepaint.fire();
	};

	this.bodyOnMouseMove = function(e){
		this.chessBoard.chessInBoardSelected.setXY(e);
		this.chessBox.chessInBoxSelected.setXY(e);
	};
		
}

//******************************************************************************
function BodyContainer(controller){
	this._controller = controller;
	this._html = document;
	
	this.bodyOnMouseClick = function(e){
		if(this._controller.chessInBoardSelected() != -1){
			this._controller.chessBoard.dropChess(null,true);
		}
		
		if(this._controller.chessInBoxSelected() != -1){
			this._controller.chessUnselected(e);
		}
	};
	
	this.bodyOnMouseMove = function(e){
		this._controller.bodyOnMouseMove(e);
	};
	
	this.addMouseEvent = function(){
		YU.Event.addListener(this._html, "mousemove", this.bodyOnMouseMove,this, true);
		YU.Event.addListener(this._html, "click", this.bodyOnMouseClick,this, true);
	};
	
	this.removeMouseEvent = function(){
		YU.Event.removeListener(this._html);
		
	};
	
	
}

//******************************************************************************
function ChessBoard(controller){
	this._controller = controller;
	this._html = YU.Dom.get(this._controller._model._chessBoardName);

	this.cells = [];
	this.chesses = [];
	
	this._originSteps = [];
	this._currentSteps = [];
	
	this._stepsExecuted = false;

	this.chessInBoardSelected = new chessInBoardSelected(this._controller);
	
	this.show = function(){
		if(!this._stepsExecuted){
			this._stepsExecuted = true;
			this.setCellsChesses();
			//this.setManual();
			//this.setCurrentSteps([[5,28],[58,40],[45,-4],[10,-100]]);
		}
		
		YU.Dom.get(this._controller._model._numsBoardName).innerHTML = '',
		this._html.innerHTML = '';
		
		this.showCells();
		this.showChesses();
		this.chessInBoardSelected.show();
		//this.test();
	};
	
	this.test = function(){ //just for data test
		alert("cells number : " + this.cells.length);
		for(var i=0;i<this.cells.length;i++){
			alert("cell._id : " + this.cells[i]._id + " ; cell.chess.id : " + this.cells[i].chess._id
					 								+ " ; cell.chess._chessID : " + this.cells[i].chess._chessID);
		}
	};

	this.unselected = function(){
		//alert("chess board unselect!");
		this.chessInBoardSelected.unselected();
	};
	
	this.getChessTotalInBoard = function(chessTypeId){
		var chessesInBoard = 0;
		for(var i=0;i<this.chesses.length;i++){
			if(this.chesses[i]._chessID == chessTypeId){
				++chessesInBoard;
			}
		}
		return chessesInBoard;
	};
	
    this.setCellsChesses = function(){
        for(var i=0;i<this._controller._model._cellsTotal;i++){
        	this.cells[i] = new Cell(this._controller,this._html, i);
        	this.chesses[i] = new Chess(this._controller,this.cells[i],i);
        };
    };
    
	this.setManual = function(){
		var CeCh = YL.JSON.parse(this._controller._model._manual);
				
		var ceId;
				
		try {
			for(var i=0;i<this._controller._model._cellsTotal;i++){
				ceId = this.cells[i].getID();
				if(CeCh[ceId] != undefined){
		            this.chesses[i].setChessTypeId(CeCh[ceId]);
				}
		    };
	    }catch (e) {}
	};
	
	this.setCurrentSteps = function(steps){
		var end = false;
		for(var i=0;i<steps.length;i++){
			if(i == (steps.length - 1)){
				end = true;
			}
			if(steps[i][1] < 0){
				if(steps[i][1] == this._controller._model._dropChessSymbol){
					this.dropChess(steps[i][0],end);
				}else{
					this.addChess([steps[i][0],steps[i][1]],end);
				}
			}else{
				this.addStep([steps[i][0],steps[i][1]],end);
			}
	    };
	};
		
	this.addStep = function(step,fireE){ //[c0,c9]; fireE = false or true
		this._currentSteps.push(step);

		var tch0 = this.cells[step[0]].chess;
		var tch1 = this.cells[step[1]].chess;

		tch1.setChessTypeId(tch0._chessID);
		tch0.disable();
    	
		this.chessInBoardSelected.unselected();
		
		if(fireE == true){
			this._controller.eventRepaint.fire();
		};
	};
	
	this.addChess = function(cellchess,fireE){
		if(cellchess[1] == null){
			cellchess[1] = -this._controller.chessBox.chessInBoxSelected._chessID;
		}
		
		this._currentSteps.push(cellchess);
		
		var tch = this.cells[cellchess[0]].chess;
		if(tch._chessID == null){
			tch.setChessTypeId(-cellchess[1]);
			
			if(this.getChessTotalInBoard(-cellchess[1]) == this._controller._model._cellsTotal){
				this._controller.chessBox.unselected();
			}
			
			
			if(fireE == true){
				this._controller.eventRepaint.fire();
			};
    	}
	};
	
	this.dropChess = function(cellid,fireE){
		if(cellid == null){
			cellid = this.chessInBoardSelected._id;
		}
		this._currentSteps.push([cellid,this._controller._model._dropChessSymbol]);
		
		this.cells[cellid].chess.disable();
		
		this.chessInBoardSelected.unselected();
		
		if(fireE == true){
			this._controller.eventRepaint.fire();
		};
	};
	
	this.showCells = function(){
		for(var i=0;i<this.cells.length;i++){
			this.cells[i].setHTML();
		}
	};
	
	this.showChesses = function(){
		for(var i=0;i<this.chesses.length;i++){
			this.chesses[i].setHTML();
		}
	};
	
	this.isChessInBoard = function(el){
		if(el.id.indexOf(this._controller._model._chessName) != -1){
			return true;
		}
		return false;
	};
	
	this.isCellInBoard = function(el){
		if(!this.isChessInBoard(el) && 
		  (el.id.indexOf(this._controller._model._cellName) != -1)){
			return true;
		}

		return false;
	};
	
	this.isSameColorChess = function(chessid1,chessid2){
		var same = false;
		if((this.chesses[chessid1]._chessID > 6)){
			if(this.chesses[chessid2]._chessID > 6){
				same = true;
			}
		}else{
			if((this.chesses[chessid2]._chessID <= 6)){
				same = true;
			}
		}
		return same;
	};
	
    this.boxOnMouseCommon = function(matchedEl, MouseOver){
    	if(this.isChessInBoard(matchedEl)){
    		var id =  matchedEl.id.substring(this._controller._model._chessName.length);
    		if(this._controller.chessInBoxSelected() == -1){
    			if((this.chessInBoardSelected._id == -1) ||
    				((this.chessInBoardSelected._id != -1) &&
    				  !this.isSameColorChess(this.chessInBoardSelected._id,id))){
    				this._controller.setMouseOverBackgroundColor(matchedEl,MouseOver);
    			}
    		}
    	}
    	if(this.isCellInBoard(matchedEl) &&
    	   this._controller.ifChessSelected()){
  			this._controller.setMouseOverBackgroundColor(matchedEl,MouseOver);
    	}
	};
	
    this.boardOnMouseOver = function(event, matchedEl, container){
    	this.boxOnMouseCommon(matchedEl, true);
	};
    
	this.boardOnMouseOut = function(event, matchedEl, container){
		this.boxOnMouseCommon(matchedEl, false);
	};

	this.boardOnMouseClick = function(event, matchedEl, container){
		if(this.isChessInBoard(matchedEl)){
			var id =  matchedEl.id.substring(this._controller._model._chessName.length);
			
    		if(this._controller.chessInBoxSelected() != -1){
    			this.addChess([id,null],true);
    		}else{
    			if(this.chessInBoardSelected._id == -1){
    				this.chessInBoardSelected.setId(event,id);
    			}else{
    				if(this.isSameColorChess(this.chessInBoardSelected._id,id)){
    					this._controller.chessUnselected();
    				}else{
    					this.addStep([this.chessInBoardSelected._id,id],true);
    				}
    				
    			}
    		}
		}
		
    	if(this.isCellInBoard(matchedEl)){
    		var id =  matchedEl.id.substring(this._controller._model._cellName.length);
    		
    		if(this._controller.chessInBoxSelected() != -1){
    			this._controller.chessBox.chessInBoxSelected.selectMeEvent = event;
    			this.addChess([id,null],true);
    		}else{
    			if(this.chessInBoardSelected._id != -1){
        			if(this.chessInBoardSelected._id ==  id){ //select same cell with previous selected chess
        				this._controller.chessUnselected();
        			}else{
        				this.addStep([this.chessInBoardSelected._id,id],true);
        			}
        		}
    		}
    	}
		
		YU.Event.stopEvent(event);
	};
	
    YU.Event.delegate(this._controller._model._chessBoardName,'mouseover',this.boardOnMouseOver,"div",this, true);
    YU.Event.delegate(this._controller._model._chessBoardName,'mouseout',this.boardOnMouseOut,"div",this, true);
    YU.Event.delegate(this._controller._model._chessBoardName,'click',this.boardOnMouseClick,"div",this, true);
}

//******************************************************************************
function Cell(controller,container, tid){
    this._controller = controller;
    this._id = tid;
    this.x = (tid%this._controller._model._rcNum);
    this.y = (tid - this.x)/this._controller._model._rcNum;
    this.chess = null; //fixed
    
    this.html = null;
    
    this.getID = function(){
        return (this._controller._model._cellName+this._id);
    };
    
    this.setHTML = function(){
       
        var ids = this.getID();

        if(this.x == 0){
            this.setNums(this.y);
        }
        try {
            this.html = container.appendChild(document.createElement('<div id="' + ids + '"></div>'));
        }catch (e) {
            this.html = container.appendChild(document.createElement("div"));
            this.html.setAttribute("id", ids);
        }

        this.setInitStyle();
    };
    
    this.setInitStyle = function(){
        var c = this._controller._model._white_color;
        if((this.x + this.y)%2 == 1){
            c = this._controller._model._black_color;
        }
    	if(this._controller.chessInBoardSelected() == this._id){
    		c = this._controller._model._click_color;
    	}
        YU.Dom.setStyle(this.html,'background-color',c);
    };
    
    this.setNums = function(y){ //y = y coordinate
        var container = YU.Dom.get(this._controller._model._numsBoardName);
        var num = null;
        try {
            num = container.appendChild(document.createElement('<div class="num"></div>'));
        }catch (e) {
            num = container.appendChild(document.createElement("div"));
            num.setAttribute("class","num");
        }
        num.innerHTML=(this._controller._model._rcNum - y);
    };
    
    this.setChess = function(chess){ //chess objects
        this.chess = chess;
    };
}

//******************************************************************************
function Chess(controller,cell,id){ //model, cell object, chess type ID, id of chess
	this._controller = controller;
    this.cell = cell; //fixed
    this._id = id;    //fixed
    cell.setChess(this);
    this._enable = false;
    
    this._chessID = null;//chessTypeID;
    
    this.html = null;
    
    this.getName = function(){
        return (this._controller._model._chessName+this._chessID);
    };
    
    this.getID = function(){
        return (this._controller._model._chessName+this._id);
    };
    
    this.disable = function(){
    	this._chessID = null;
    	this.html = null;
    	this._enable = false;
    };
    
    this.setChessTypeId = function(chessTypeID){
    	if(chessTypeID != null){
    		this._chessID = chessTypeID;
        	this._enable = true;
    	}else{
    		alert("Can't set 'null' value to 'Chess._chessID'!");
    	}
    };
    
    this.setHTML = function(){
    	if((this._enable == true) && (this._controller.chessInBoardSelected() != this._id)){
	    	var container = YU.Dom.get(this.cell.html);
	    	container.innerHTML = '';
	    	
	    	try {
	            this.html = container.appendChild(document.createElement('<div id="' + this.getID() + '" class="' + this.getName() + '"></div>'));
	        }
	        catch (e) {
	            this.html = container.appendChild(document.createElement("div"));
	            this.html.setAttribute("id", this.getID());
	            this.html.setAttribute("class", this.getName());
	        }
    	}
    };
}

//******************************************************************************
function ChessBox(controller){
	this._controller = controller;
	this.html = YU.Dom.get(this._controller._model._chessBoxName);
	
	this.chessInBoxSelected = new chessInBoxSelected(this._controller);
	
	this.chesses = [];
	
	this.show = function(){
	    this.setCells();
	    this.chessInBoxSelected.show();
	};

	this.unselected = function(){
		//alert("chess board unselect!");
		this.chessInBoxSelected.unselected();
	};
	
	this.getChessName = function(type_id){
	    return (this._controller._model._chessName+type_id);
	};
	    
    this.getChessID = function(id){
    	return (this._controller._model._chessInBoxName+id);
    };
	
    this.getCellID = function(id){
    	return (this._controller._model._cellInBoxName+id);
    };
    
    this.isChessOrNumInBox = function(matchedEl){
    	if((matchedEl.id.search(this._controller._model._chessInBoxName) != -1) ||
    	   (matchedEl.id.search(this._controller._model._numInBoxName) != -1)){
    		return true;
    	}else{
    		return false;
    	}
    };
	    
    this.setCells = function(){
    	this.html.innerHTML = '';
    	
	    var container = YU.Dom.get(this.html);
	    	
	    var cell;
	    for(var i=0;i<(this._controller._model._chessTypeTotal/2);i++){
	    	try {
	    		cell = container.appendChild(document.createElement('<div id="' + this.getCellID(i+1) + '"></div>'));
		    }
		    catch (e) {
		      	cell = container.appendChild(document.createElement("div"));
		       	cell.setAttribute("id", this.getCellID(i+1));
		    }
		    
		    this.setCellStyle(cell,i+1);
		    
		    this.setChess(i+1,cell);
		        
		    try {
		    	cell = container.appendChild(document.createElement('<div id="' + this.getCellID(i+7) + '"></div>'));
		    }
		    catch (e) {
		      	cell = container.appendChild(document.createElement("div"));
		       	cell.setAttribute("id", this.getCellID(i+7));
		    }
		    
		    this.setCellStyle(cell,i+7);
		    
		    this.setChess(i+7,cell);
	    }
    };
    
    this.setCellStyle = function(cell,chessTypeId){
    	if(chessTypeId == this.chessInBoxSelected._chessID){
    		YU.Dom.setStyle(cell,'background-color',this._controller._model._click_color);
    	}
    };
    
    this.setChess = function(id,cell){
    	if(cell.innerHTML == ''){
	    	var container = cell;
	    	
	    	var chess;
    		try {
    			chess = container.appendChild(document.createElement('<div id="' + this.getChessID(id) + '" class="' + this.getChessName(id) + '"></div>'));
	        }
	        catch (e) {
	        	chess = container.appendChild(document.createElement("div"));
	        	chess.setAttribute("id", this.getChessID(id));
	        	chess.setAttribute("class", this.getChessName(id));
	        }
    	}
    	this.setChessNum(id,cell);
    };
    
    this.setChessNum = function(id,cell){
    	var container = cell;
    	
        var num = null;
        try {
            num = container.appendChild(document.createElement('<div id="' + this.model._numInBoxName + id + '" class="' + this.model._numInBoxName + '"></div>'));
        }
        catch (e) {
            num = container.appendChild(document.createElement("div"));
            num.setAttribute("id",this._controller._model._numInBoxName + id);
            num.setAttribute("class",this._controller._model._numInBoxName);
        }
        
        var n = this._controller._model._cellsTotal - this._controller.chessBoard.getChessTotalInBoard(id);
        if(n == 0){
        	YU.Dom.setStyle(num,"color","#900");
        }
        num.innerHTML = n;
    };
    
    this.boxOnMouseCommon = function(matchedEl, MouseOver){
    	if(this.isChessOrNumInBox(matchedEl)){
    		var parentDom = YU.Dom.getAncestorBy(matchedEl);
    		this._controller.setMouseOverBackgroundColor(parentDom,MouseOver);
    	}
	};
    
    this.boxOnMouseOver = function(event, matchedEl, container){
    	var chessTypeId = YU.Dom.getAncestorBy(matchedEl).id.substring(this._controller._model._cellInBoxName.length);
    	if(this._controller.chessBoard.getChessTotalInBoard(chessTypeId) < this._controller._model._cellsTotal){
    		this.boxOnMouseCommon(matchedEl, true);
    	}
	};
    
	this.boxOnMouseOut = function(event, matchedEl, container){
		this.boxOnMouseCommon(matchedEl, false);
	};

	this.boxOnMouseClick = function(event, matchedEl, container){
		if(this._controller.chessInBoardSelected() != -1){
			this._controller.chessBoard.dropChess(null,true);
			return;
		}
		
		if(this.isChessOrNumInBox(matchedEl)){
			var chessTypeId = YU.Dom.getAncestorBy(matchedEl).id.substring(this._controller._model._cellInBoxName.length);
			if((chessTypeId != this.chessInBoxSelected._chessID) &&
			   (this._controller.chessBoard.getChessTotalInBoard(chessTypeId) < this._controller._model._cellsTotal)){
				this.chessInBoxSelected.setChessTypeId(event,chessTypeId);
			}else{
				this._controller.chessUnselected();
			}
		}
		YU.Event.stopEvent(event);
	};
	
    YU.Event.delegate(this._controller._model._chessBoxName,'mouseover',this.boxOnMouseOver,"div",this, true);
    YU.Event.delegate(this._controller._model._chessBoxName,'mouseout',this.boxOnMouseOut,"div",this, true);
    YU.Event.delegate(this._controller._model._chessBoxName,'click',this.boxOnMouseClick,"div",this, true);
}

//******************************************************************************
function chessSelected(){
    this._html = null;
    this._chessID = null;

    this.selectMeEvent = null;
        
    this.show = function(args){
    	this.setHTML();
    };
        
    this.setHTML = function(){
    	var th = YU.Dom.get(this._controller._model._chessSelectedName);
    	if(th == null){
        	var container = YU.Dom.get(this._controller.chessBoard._html);
        	
	        try {
	        	this._html = container.appendChild(document.createElement('<div id="' + this._controller._model._chessSelectedName + '"></div>'));
	        }
	        catch (e) {
	          	this._html = container.appendChild(document.createElement("div"));
	          	this._html.setAttribute("id", this._controller._model._chessSelectedName);
	        }
    	}else{
    		this._html = th;
    	}
    	
        var clas = "";
    	if(this._chessID != null){
    		clas = this._controller._model._chessName + this._chessID;
    		YU.Dom.setAttribute(this._html,"class",clas);
    		YU.Dom.setStyle(this._html,"display","");
    		this.setXY(this.selectMeEvent);
    		this._controller.showChessSelected();
    	}else{
    		if(!this._controller.ifChessSelected()){
    			YU.Dom.setStyle(this._html,"display","none");
           		this._controller.hideChessSelected();
    		}
   			
    	}
    };
    
    this.setXY = function(e){
    	try{
    		var X = YU.Event.getPageX(e); 
        	var Y = YU.Event.getPageY(e);

        	var H = "" + YU.Dom.getStyle(this._html,'width');
        	H = H.replace('px','');
        	YU.Dom.setXY(this._html,[X-(++H+1),Y-(++H+1)]);
    	}catch(e){}
    	
    };
}

//******************************************************************************
function chessInBoardSelected(controller){
	chessSelected.call(this);

	this._controller = controller;
	
	this._id = -1;
		
    this.setId = function(event,id){
    	this.selectMeEvent = event;
    	this._id = id;
    	this._chessID = this._controller.chessBoard.chesses[id]._chessID;
    	this._controller.eventChessInBoardSelected.fire();
    	this._controller.eventRepaint.fire();
    };
    
    this.unselected = function(){
    	this.selectMeEvent = null;
    	this._id = -1;
    	this._chessID = null;
    };
}

//******************************************************************************
function chessInBoxSelected(controller){
	chessSelected.call(this);

	this._controller = controller;
	
    this.setChessTypeId = function(event,chessTypeId){
    	this.selectMeEvent = event;
    	this._chessID = chessTypeId;
    	this._controller.eventChessInBoxSelected.fire();
    	this._controller.eventRepaint.fire();
    };
    
    this.unselected = function(){
    	this.selectMeEvent = null;
    	this._chessID = null;
    };
}