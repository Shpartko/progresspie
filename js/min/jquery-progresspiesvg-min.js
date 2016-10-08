/**
 * @license 
 * Copyright (c) 2016, Immo Schulz-Gerlach, www.isg-software.de 
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are 
 * permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED 
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY
 * WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
!function($){"use strict";var e="$.fn.setupProgressPie",t={};$.fn.setupProgressPie=function(t){return $(this).each(function(){var r=$(this).data(e);if("object"!=typeof r){var n=$.extend({},$.fn.progressPie.defaults,{update:!0},t);$(this).data(e,n)}else $.extend(r,t)}),this},$.fn.progressPie=function(r){function n(e){return"undefined"==typeof t[e]&&(t[e]=0),e+ ++t[e]}function o(e){return.02*Math.PI*e}function i(e,t){var r=eval,n=r(e);if("function"==typeof n)return n(t);throw"The value of the colorFunctionAttr attribute is NOT a function: "+e}function a(e){var t=eval,r=t(M+"."+e);if("function"==typeof r||"object"==typeof r&&"function"==typeof r.draw)return r;throw e+" is not the name of a function or object in namespace "+M+"!"}function s(e){var t;if("function"==typeof e||"object"==typeof e&&"function"==typeof e.draw)t=e;else{if("string"!=typeof e)throw"contentPlugin option must either be a function or an object with method named 'draw' or the name of such a function or object in the namespace "+M+"!";t=a(e)}return t}function u(e){return Array.isArray(e)?$.map(e,s):[s(e)]}function l(e,t){return null===e?null:Array.isArray(e)?e[t]:0===t&&"object"==typeof e?e:null}function d(e,t){return.02*Math.PI*e*t}function f(e,t,r,n,o,i){var a=document.createElementNS(k,"animate");a.setAttribute("attributeName",t),a.setAttribute("attributeType",r),a.setAttribute("from",n),a.setAttribute("to",o),a.setAttribute("fill","freeze");for(var s in i)a.setAttribute(s,i[s]);e.appendChild(a)}function p(e,t,r){var n,o;if("number"==typeof t)n=t;else{if("object"!=typeof t)throw"illegal option: 'strokeDashes' is neither number (count) nor object!";n=t.count,o=t.length}if("undefined"==typeof n)throw"illegal option: 'strokeDashes' does not specify the 'count' property!";if("undefined"==typeof o)o=r/n/2;else if("string"==typeof o){o=o.trim();var i="%"===o.substring(o.length-1);o=Number.parseInt(o,10),i&&(o=r*o/100)}if(o*n>=r)throw"Illegal options: strokeDashCount * strokeDashLength >= circumference, can't set stroke-dasharray!";var a=(r-o*n)/n,s="object"==typeof t&&t.centered?1*o/2:0;"object"==typeof t&&t.inverted?(e.style.strokeDasharray=""+a+"px, "+o+"px",e.style.strokeDashoffset=""+(a+s)+"px"):(e.style.strokeDasharray=""+o+"px, "+a+"px",0!==s&&(e.style.strokeDashoffset=""+s+"px"))}function c(e,t,r,n,i,a,s,u,l,c,g,m,y,h,b,v,A){"number"==typeof r&&(r=Math.min(r,t)),"number"==typeof u&&(u=Math.min(u,t));var S,C,M=!1;if("number"==typeof r){C=document.createElementNS(k,"circle"),C.setAttribute("cx",0),C.setAttribute("cy",0),S=t-r/2,C.setAttribute("r",S),C.setAttribute("transform","rotate(-90)"),i&&p(C,i,2*Math.PI*S),M="string"==typeof n;var P=M?n:h;"string"==typeof P&&(C.style.stroke=P),"string"==typeof a&&(C.style.fill=a),C.style.strokeWidth=r,C.setAttribute("class",c),e.appendChild(C)}var E=u?u:s||"number"!=typeof r?t:t-r;if(S=t-E/2,s||"number"!=typeof r||(S-=r),100!==m||v||"string"!=typeof h){if(m>0&&m<100||(v||"undefined"==typeof h)&&(0===m||100===m)){var w=document.createElementNS(k,"path"),N,R=m;if(v){var x=m-y,O=d(S,x),D=x<0,F,I;D?(R=y,F="0px",I=-O+"px"):(F=O+"px",I="0px");var _=d(S,R);w.setAttribute("stroke-dasharray",_+"px "+_+"px"),w.setAttribute("stroke-dashoffset",F),f(w,"stroke-dashoffset","CSS",F,I,v),l&&0===m&&f(w,"stroke-linecap","CSS","round","butt",v),b&&b!==h&&(f(w,"stroke","CSS",b,h,v),M||(C.style.stroke=b,f(C,"stroke","CSS",b,h,v)))}var j=o(R),B=100===R?-1e-5:Math.sin(j)*S,T=Math.cos(j-Math.PI)*S,z=R>50?"1":"0",K="1",W=-S,V="M0,"+W;if(V+=" A"+S+","+S+" 0 "+z+","+K+" "+B+","+T,w.setAttribute("d",V),w.style.fill="none","string"==typeof h&&(w.style.stroke=h),w.style.strokeWidth=E,w.style.strokeLinecap=l&&m>0?"round":"butt",A){var U=A.clockwise===!1,L="string"==typeof A?A:"string"==typeof A.duration?A.duration:"1s";N=document.createElementNS(k,"animateTransform"),N.setAttribute("attributeName","transform"),N.setAttribute("attributeType","XML"),N.setAttribute("type","rotate"),N.setAttribute("from","0"),N.setAttribute("to",U?"-360":"360"),N.setAttribute("dur",L),N.setAttribute("repeatDur","indefinite"),w.appendChild(N)}w.setAttribute("class",g),e.appendChild(w)}}else{var G=document.createElementNS(k,"circle");G.setAttribute("cx",0),G.setAttribute("cy",0),G.setAttribute("r",S),G.style.stroke=h,G.style.strokeWidth=E,G.style.fill="none",G.setAttribute("class",g),e.appendChild(G)}}function g(e,t){var r;if("string"==typeof t.valueData){if(r=e.data(t.valueData),"undefined"!=typeof t.valueAttr||"undefined"!=typeof t.valueSelector)throw"options 'valueData', 'valueAttr' and 'valueSelector' are mutually exclusive, i.e. at least two must be undefined!"}else{if("undefined"!=typeof t.valueData)throw"option 'valueData' is not of type 'string'!";if("string"==typeof t.valueAttr){if(r=e.attr(t.valueAttr),"undefined"!=typeof t.valueSelector)throw"options 'valueAttr' and 'valueSelector' are mutually exclusive, i.e. at least one must be undefined!"}else{if("undefined"!=typeof t.valueAttr)throw"option 'valueAttr' is not of type 'string'!";"undefined"!=typeof t.valueSelector&&(r=$(t.valueSelector,e).text())}}return"undefined"==typeof r&&(r=e.text()),r}function m(e,t){return Math.max(0,Math.min(100,t.valueAdapter(e)))}function y(e,t){var r=t.mode,n=t.color,o=typeof n;if("undefined"!==o&&"string"!==o&&"function"!==o)throw"option 'color' has to be either a function or a string, but is of type '"+o+"'!";return"function"===o?r=E.USER_COLOR_FUNC:("undefined"===o&&"string"==typeof t.colorAttr&&(n=e.attr(t.colorAttr)),"string"==typeof n?r=E.USER_COLOR_CONST:"string"==typeof t.colorFunctionAttr&&(n=e.attr(t.colorFunctionAttr),"string"==typeof n&&(r=E.DATA_ATTR_FUNC))),{mode:r,color:n}}function h(e,t,r){return e===E.CSS?void 0:e===E.MASK?E.MASK.color:e===E.IMASK?E.IMASK.color:e===E.GREY?E.GREY.color:e===E.GREEN?P.colorByPercent(100):e===E.RED?P.colorByPercent(0):e===E.COLOR||void 0===t?P.colorByPercent(r):e===E.USER_COLOR_CONST?t:e===E.USER_COLOR_FUNC?t(r):e===E.DATA_ATTR_FUNC?i(t,r):"black"}function b(e,t,r){return e===E.CSS?void 0:e===E.IMASK?E.MASK.color:"string"==typeof t.backgroundColor?t.backgroundColor:"function"==typeof t.backgroundColor?t.backgroundColor(r):"none"}function v(e,t){return"undefined"==typeof e.ringWidth||t&&t.fullSize}function A(e,t,r,n,o){var i=document.createElementNS(k,"rect");e.append(i);var a=t+r,s=2*a;i.setAttribute("x","-"+a),i.setAttribute("y","-"+a),i.setAttribute("width",s),i.setAttribute("height",s),i.setAttribute("stroke",n),i.setAttribute("fill",o)}var S=$.extend({},$.fn.progressPie.defaults,r),C="undefined"==typeof r,k="http://www.w3.org/2000/svg",M="jQuery.fn.progressPie.contentPlugin",P=$.fn.progressPie,E=$.extend({USER_COLOR_CONST:{},USER_COLOR_FUNC:{},DATA_ATTR_FUNC:{}},P.Mode);return $(this).each(function(){var t=$(this),r=S;if(C){var o=$(this).data(e);"object"==typeof o&&(r=o)}var i=$("svg",t);if(!i.length||r.update){i.length&&r.update&&(i.remove(),r.separator="");var a=g(t,r),d=m(a,r),f=t.data(P.prevValueDataName),p="undefined"==typeof f;if(t.data(P.prevValueDataName,d),"number"!=typeof f&&(f=0),"function"==typeof r.optionsByPercent){var M=r.optionsByPercent(d);"undefined"!=typeof M&&null!==M&&(r=$.extend({},r,M),a=g(t,r),d=m(a,r))}var E=Math.ceil("number"==typeof r.size?r.size:t.height());0===E&&(E=20),E*=r.sizeFactor;var w=E/2,N=w,R=document.createElementNS(k,"svg"),x=document.createElementNS(k,"defs"),O=w+r.margin+r.padding,D=2*O,F=D;"number"==typeof r.scale&&(F*=r.scale),R.setAttribute("width",Math.ceil(F)),R.setAttribute("height",Math.ceil(F)),R.setAttribute("viewBox","-"+O+" -"+O+" "+D+" "+D);var I=y(t,r);I.mode!==P.Mode.CSS&&(R.style.verticalAlign=r.verticalAlign),t.is(":empty")?t.append(R):r.prepend?t.prepend(R,r.separator):t.append(r.separator,R);var _=r.cssClassForegroundPie,j=r.cssClassBackgroundCircle;"object"==typeof r.inner&&(_+=" "+r.cssClassOuter,j+=" "+r.cssClassOuter);var B=h(I.mode,I.color,d),T=b(I.mode,r,d),z;(r.animateColor===!0||"undefined"==typeof r.animateColor&&!p)&&(z=h(I.mode,I.color,f));var K=P.smilSupported()?r.animate===!0?P.defaultAnimationAttributes:"object"==typeof r.animate?$.extend({},P.defaultAnimationAttributes,r.animate):null:null,W=null,V=!1;if(r.contentPlugin){W=u(r.contentPlugin);for(var U={color:B,percentValue:d,rawValue:a,pieOpts:r},L=0;L<W.length;L++){var G=W[L],Y=l(r.contentPluginOptions,L),Q=U;null!==Y&&"object"==typeof Y&&(Q=$.extend({},U,Y)),"object"==typeof G&&"function"==typeof G.hidesChartIfFullSize&&(V=V||I.mode!==P.Mode.MASK&&I.mode!==P.Mode.IMASK&&v(r,Y)&&G.hidesChartIfFullSize(Q))}}var q=null,X=R;if(!V){if(I.mode===P.Mode.MASK||I.mode===P.Mode.IMASK){if(null===W)throw"MASK mode requires content plug-ins (in the background!)";X=document.createElementNS(k,"mask"),x.append(X),q=n("pie"),X.setAttribute("id",q),I.mode===P.Mode.IMASK&&A(X,w,r.padding,"none",P.Mode.MASK.color)}c(X,w,r.strokeWidth,r.strokeColor,r.strokeDashes,T,r.overlap,r.ringWidth,r.ringEndsRounded,j,_,d,f,B,z,K,r.rotation)}for(var H="number"==typeof r.ringWidth?r.ringWidth:"number"==typeof r.strokeWidth?r.strokeWidth:0,J=r.inner,Z=1;"object"==typeof J;){"undefined"==typeof J.valueAdapter&&(J.valueAdapter=P.defaults.valueAdapter),"undefined"==typeof J.overlap&&(J.overlap=P.defaults.overlap),a=g(t,J),d=m(a,J);var ee=P.prevInnerValueDataName,te=r.cssClassInner;Z>1&&(ee+=Z,te+=Z),f=t.data(ee),p="undefined"==typeof f,t.data(ee,d),"number"!=typeof f&&(f=0),I=y(t,J),w="number"==typeof J.size?J.size*r.sizeFactor/2:.6*w,B=h(I.mode,I.color,d),z=null,(J.animateColor===!0||"undefined"==typeof J.animateColor&&(r.animateColor===!0||"undefined"==typeof r.animateColor&&p))&&(z=h(I.mode,I.color,f)),J.animate!==!1&&P.smilSupported()?J.animate===!0&&null===K?K=P.defaultAnimationAttributes:"object"==typeof J.animate&&(K=null===K?$.extend({},P.defaultAnimationAttributes,J.animate):$.extend({},K,J.animate)):K=null,V||c(X,w,J.strokeWidth,J.strokeColor,J.strokeDashes,T,J.overlap,J.ringWidth,J.ringEndsRounded,r.cssClassBackgroundCircle+" "+te,r.cssClassForegroundPie+" "+te,d,f,B,z,K),H="number"==typeof J.ringWidth?J.ringWidth:0,J=J.inner,Z++}if(null!==W){var re=w;H<w&&(re-=H);for(var ne={newSvgElement:function(e){var t=document.createElementNS(k,e);return se.appendChild(t),t},newSvgSubelement:function(e,t){var r=document.createElementNS(k,t);return e.appendChild(r),r},newDefElement:function(e){var t=document.createElementNS(k,e);return x.appendChild(t),t},isFullSize:function(){return v(r,this)},getBackgroundRadius:function(e){var t=this.isFullSize()?this.totalRadius:this.radius;if(!e){var r="number"==typeof this.margin?this.margin:this.isFullSize()?this.pieOpts.defaultContentPluginBackgroundMarginFullSize:this.pieOpts.defaultContentPluginBackgroundMarginInsideRing;t-=r}return t},addBackground:function(e){if(this.backgroundColor){var t=this.newSvgElement("circle");t.setAttribute("cx","0"),t.setAttribute("cy","0"),t.setAttribute("r",e),t.setAttribute("fill",this.backgroundColor)}},addBackgroundRect:function(e,t){A(se,N,r.padding,e,t)},getContentPlugin:s,createId:n,radius:re,totalRadius:N,color:B,percentValue:d,rawValue:a,pieOpts:r},oe=!0,ie=0;ie<W.length;ie++){var ae=W[ie],se=document.createElementNS(k,"g"),ue="function"==typeof ae?ae:ae.draw,le=ne,de=l(r.contentPluginOptions,ie);null!==de&&"object"==typeof de&&(le=$.extend({},ne,de)),ue(le),"boolean"==typeof ae.inBackground&&ae.inBackground||"function"==typeof ae.inBackground&&ae.inBackground(le)?(R.prepend(se),null!==q&&oe&&(se.setAttribute("mask","url(#"+q+")"),oe=!1)):R.append(se),x.hasChildNodes()&&R.prepend(x)}}}}),this},$.fn.progressPie.Mode={GREY:{color:"#888"},RED:{value:200},GREEN:{value:200},COLOR:{},CSS:{},MASK:{color:"white"},IMASK:{color:"black"}},$.fn.progressPie.colorByPercent=function(e,t){var r=$.fn.progressPie.Mode.GREEN.value,n=$.fn.progressPie.Mode.RED.value,o=e>50?r:Math.floor(r*e/50),i=e<50?n:Math.floor(n*(100-e)/50),a=i+","+o+",0";return"number"==typeof t?"rgba("+a+","+t+")":"rgb("+a+")"},$.fn.progressPie.smilSupported=function(){return"undefined"==typeof $.fn.progressPie.smilSupported.cache&&($.fn.progressPie.smilSupported.cache=/SVGAnimate/.test(document.createElementNS("http://www.w3.org/2000/svg","animate").toString())),$.fn.progressPie.smilSupported.cache},$.fn.progressPie.defaults={mode:$.fn.progressPie.Mode.GREY,margin:0,padding:0,strokeWidth:2,overlap:!0,prepend:!0,separator:"&nbsp;",verticalAlign:"bottom",update:!1,valueAdapter:function(e){return"string"==typeof e?parseFloat(e):"number"==typeof e?e:0},ringEndsRounded:!1,sizeFactor:1,scale:1,defaultContentPluginBackgroundMarginFullSize:0,defaultContentPluginBackgroundMarginInsideRing:1,cssClassBackgroundCircle:"progresspie-background",cssClassForegroundPie:"progresspie-foreground",cssClassOuter:"progresspie-outer",cssClassInner:"progresspie-inner"},$.fn.progressPie.defaultAnimationAttributes={dur:"1s",calcMode:"spline",keySplines:"0.23 1 0.32 1",keyTimes:"0;1"},$.fn.progressPie.contentPlugin={},$.fn.progressPie.prevValueDataName="_progresspieSVG_prevValue",$.fn.progressPie.prevInnerValueDataName="_progresspieSVG_prevInnerValue"}(jQuery);