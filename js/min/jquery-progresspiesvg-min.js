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
!function($){"use strict";var e="$.fn.setupProgressPie";$.fn.setupProgressPie=function(t){return $(this).each(function(){var n=$(this).data(e);if("object"!=typeof n){var r=$.extend({},$.fn.progressPie.defaults,{update:!0},t);$(this).data(e,r)}else $.extend(n,t)}),this},$.fn.progressPie=function(t){function n(e){return.02*Math.PI*e}function r(e,t){var n=eval,r=n(e);if("function"==typeof r)return r(t);throw"The value of the colorFunctionAttr attribute is NOT a function: "+e}function i(e){var t=eval,n=t(h+"."+e);if("function"==typeof n)return n;throw e+" is not the name of a function in namespace "+h+"!"}function o(e){var t;if("function"==typeof e)t=e;else{if("string"!=typeof e)throw"contentPlugin option must either be a function or the name of a function in the namespace "+h+"!";t=i(e)}return t}function a(e,t){return.02*Math.PI*e*t}function u(e,t,r,i,o,u,s,l,f,d,p){"number"==typeof i&&(i=Math.min(i,r)),"number"==typeof u&&(u=Math.min(u,r));var c;(100>l||u&&u>0&&i>u||d)&&(c=document.createElementNS(g,"circle"),c.setAttribute("cx",0),c.setAttribute("cy",0),c.setAttribute("r",r-i/2),c.style.stroke="string"==typeof o?o:f,c.style.strokeWidth=i,c.style.fill="none",t.appendChild(c));var h=u?u:r,v=r-h/2;if(100!==l||d){if(l>0&&100>l||d&&(0===l||100===l)){var y=document.createElementNS(g,"path"),m,A=l;if(d){var b=e.data($.fn.progressPie.prevValueDataName);e.data($.fn.progressPie.prevValueDataName,l),"number"!=typeof b&&(b=0);var P=l-b,R=a(v,P),C=0>P,E,S;C?(A=b,E="0px",S=-R+"px"):(E=R+"px",S="0px");var k=a(v,A);y.setAttribute("stroke-dasharray",k+"px "+k+"px"),y.setAttribute("stroke-dashoffset",S),m=document.createElementNS(g,"animate"),m.setAttribute("attributeName","stroke-dashoffset"),m.setAttribute("from",E),m.setAttribute("to",S);for(var M in d)m.setAttribute(M,d[M]);y.appendChild(m)}var N=n(A),O=100===A?-1e-5:Math.sin(N)*v,x=Math.cos(N-Math.PI)*v,w=A>50?"1":"0",_="1",T=-v,D="M0,"+T;if(D+=" A"+v+","+v+" 0 "+w+","+_+" "+O+","+x,y.setAttribute("d",D),y.style.fill="none",y.style.stroke=f,y.style.strokeWidth=h,y.style.strokeLinecap=s?"round":"none",p){var F=p.clockwise===!1,W="string"==typeof p?p:"string"==typeof p.duration?p.duration:"1s";m=document.createElementNS(g,"animateTransform"),m.setAttribute("attributeName","transform"),m.setAttribute("attributeType","XML"),m.setAttribute("type","rotate"),m.setAttribute("from","0"),m.setAttribute("to",F?"-360":"360"),m.setAttribute("dur",W),m.setAttribute("repeatDur","indefinite"),y.appendChild(m)}t.appendChild(y)}}else c=document.createElementNS(g,"circle"),c.setAttribute("cx",0),c.setAttribute("cy",0),c.setAttribute("r",v),c.style.stroke=f,c.style.strokeWidth=h,c.style.fill=u?"none":f,t.appendChild(c)}function s(e,t){var n;if("string"==typeof t.valueData){if(n=e.data(t.valueData),"undefined"!=typeof t.valueAttr||"undefined"!=typeof t.valueSelector)throw"options 'valueData', 'valueAttr' and 'valueSelector' are mutually exclusive, i.e. at least two must be undefined!"}else{if("undefined"!=typeof t.valueData)throw"option 'valueData' is not of type 'string'!";if("string"==typeof t.valueAttr){if(n=e.attr(t.valueAttr),"undefined"!=typeof t.valueSelector)throw"options 'valueAttr' and 'valueSelector' are mutually exclusive, i.e. at least one must be undefined!"}else{if("undefined"!=typeof t.valueAttr)throw"option 'valueAttr' is not of type 'string'!";"undefined"!=typeof t.valueSelector&&(n=$(t.valueSelector,e).text())}}return"undefined"==typeof n&&(n=e.text()),n}function l(e,t){return Math.max(0,Math.min(100,t.valueAdapter(e)))}function f(e,t){var n=t.mode,r=t.color,i=typeof r;if("undefined"!==i&&"string"!==i&&"function"!==i)throw"option 'color' has to be either a function or a string, but is of type '"+i+"'!";return"function"===i?n=y.USER_COLOR_FUNC:("undefined"===i&&"string"==typeof t.colorAttr&&(r=e.attr(t.colorAttr)),"string"==typeof r?n=y.USER_COLOR_CONST:"string"==typeof t.colorFunctionAttr&&(r=e.attr(t.colorFunctionAttr),"string"==typeof r&&(n=y.DATA_ATTR_FUNC))),{mode:n,color:r}}function d(e,t,n){return e===y.GREY?y.GREY.color:e===y.GREEN?v.colorByPercent(100):e===y.RED?v.colorByPercent(0):e===y.COLOR||void 0===t?v.colorByPercent(n):e===y.USER_COLOR_CONST?t:e===y.USER_COLOR_FUNC?t(n):e===y.DATA_ATTR_FUNC?r(t,n):"black"}var p=$.extend({},$.fn.progressPie.defaults,t),c="undefined"==typeof t,g="http://www.w3.org/2000/svg",h="jQuery.fn.progressPie.contentPlugin",v=$.fn.progressPie,y=$.extend({USER_COLOR_CONST:{},USER_COLOR_FUNC:{},DATA_ATTR_FUNC:{}},v.Mode);return $(this).each(function(){var t=$(this),n=p;if(c){var r=$(this).data(e);"object"==typeof r&&(n=r)}var i=$("svg",t);if(!i.length||n.update){i.length&&n.update&&(i.remove(),n.separator="");var a=s(t,n),h=l(a,n);if("function"==typeof n.optionsByPercent){var v=n.optionsByPercent(h);"undefined"!=typeof v&&null!==v&&(n=$.extend({},n,v),a=s(t,n),h=l(a,n))}var y=f(t,n),m=Math.ceil("number"==typeof n.size?n.size:t.height());0===m&&(m=20),m*=n.sizeFactor;var A=Math.floor(m/2),b=A,P=b,R=document.createElementNS(g,"svg"),C=m;"number"==typeof n.scale&&(C*=n.scale),R.setAttribute("width",C),R.setAttribute("height",C),R.setAttribute("viewBox","-"+b+" -"+b+" "+m+" "+m),R.style.verticalAlign=n.verticalAlign,n.prepend?t.prepend(R,n.separator):t.append(n.separator,R);var E=d(y.mode,y.color,h),S=n.animate===!0?$.fn.progressPie.defaultAnimationAttributes:"object"==typeof n.animate?$.extend({},$.fn.progressPie.defaultAnimationAttributes,n.animate):null;u(t,R,b,n.strokeWidth,n.strokeColor,n.ringWidth,n.ringEndsRounded,h,E,S,n.rotation);var k="number"==typeof n.ringWidth?n.ringWidth:"number"==typeof n.strokeWidth?n.strokeWidth:0;if("object"==typeof n.inner&&("undefined"==typeof n.inner.valueAdapter&&(n.inner.valueAdapter=$.fn.progressPie.defaults.valueAdapter),a=s(t,n.inner),h=l(a,n.inner),y=f(t,n.inner),b=Math.floor("number"==typeof n.inner.size?n.inner.size*n.sizeFactor/2:.6*b),E=d(y.mode,y.color,h),u(t,R,b,0,void 0,n.inner.ringWidth,n.inner.ringEndsRounded,h,E,S),k="number"==typeof n.inner.ringWidth?n.inner.ringWidth:0),n.contentPlugin){var M=o(n.contentPlugin),N=b;b>k&&(N-=k);var O={newSvgElement:function(e){var t=document.createElementNS(g,e);return R.appendChild(t),t},newSvgSubelement:function(e,t){var n=document.createElementNS(g,t);return e.appendChild(n),n},getBackgroundRadius:function(e){var t="undefined"==typeof this.pieOpts.ringWidth||this.fullSize,n=t?this.totalRadius:this.radius;if(!e){var r="number"==typeof this.margin?this.margin:t?this.pieOpts.defaultContentPluginBackgroundMarginFullSize:this.pieOpts.defaultContentPluginBackgroundMarginInsideRing;n-=r}return n},addBackground:function(e){if(this.backgroundColor){var t=this.newSvgElement("circle");t.setAttribute("cx","0"),t.setAttribute("cy","0"),t.setAttribute("r",e),t.setAttribute("fill",this.backgroundColor)}},getContentPlugin:o,radius:N,totalRadius:P,color:E,percentValue:h,rawValue:a,pieOpts:n};"object"==typeof n.contentPluginOptions&&$.extend(O,n.contentPluginOptions),M(O)}}}),this},$.fn.progressPie.Mode={GREY:{color:"#888"},RED:{value:200},GREEN:{value:200},COLOR:{}},$.fn.progressPie.colorByPercent=function(e){var t=$.fn.progressPie.Mode.GREEN.value,n=$.fn.progressPie.Mode.RED.value,r=e>50?t:Math.floor(t*e/50),i=50>e?n:Math.floor(n*(100-e)/50);return"rgb("+i+","+r+",0)"},$.fn.progressPie.defaults={mode:$.fn.progressPie.Mode.GREY,strokeWidth:2,prepend:!0,separator:"&nbsp;",verticalAlign:"bottom",update:!1,valueAdapter:function(e){return"string"==typeof e?parseInt(e):"number"==typeof e?e:0},ringEndsRounded:!1,sizeFactor:1,scale:1,defaultContentPluginBackgroundMarginFullSize:0,defaultContentPluginBackgroundMarginInsideRing:1},$.fn.progressPie.defaultAnimationAttributes={dur:"1s",calcMode:"spline",keySplines:"0.23 1 0.32 1",keyTimes:"0;1"},$.fn.progressPie.contentPlugin={},$.fn.progressPie.prevValueDataName="_progresspieSVG_prevValue"}(jQuery);