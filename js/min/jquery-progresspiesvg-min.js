/**
 * @license 
 * Copyright (c) 2015, Immo Schulz-Gerlach, www.isg-software.de 
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
!function($){"use strict";var e="$.fn.setupProgressPie";$.fn.setupProgressPie=function(t){var n=$(this).data(e);if("object"!=typeof n){var r=$.extend({},$.fn.progressPie.defaults,{update:!0},t);$(this).data(e,r)}else $.extend(n,t);return this},$.fn.progressPie=function(t){function n(e){return.02*Math.PI*e}function r(e,t){var n=eval,r=n(e);if("function"==typeof r)return r(t);throw"The value of the colorFunctionAttr attribute is NOT a function: "+e}function o(e){var t=eval,n=t(p+"."+e);if("function"==typeof n)return n;throw e+" is not the name of a function in namespace "+p+"!"}function i(e,t,r,o,i,a,u,s,l){"number"==typeof r&&(r=Math.min(r,t)),"number"==typeof i&&(i=Math.min(i,t));var f;if((100>u||i&&i>0&&r>i)&&(f=document.createElementNS(d,"circle"),f.setAttribute("cx",0),f.setAttribute("cy",0),f.setAttribute("r",t-r/2),f.style.stroke="string"==typeof o?o:s,f.style.strokeWidth=r,f.style.fill="none",e.appendChild(f)),100===u){f=document.createElementNS(d,"circle"),f.setAttribute("cx",0),f.setAttribute("cy",0);var c=i?i:r;f.setAttribute("r",t-c/2),f.style.stroke=s,f.style.strokeWidth=c,f.style.fill=i?"none":s,e.appendChild(f)}if(u>0&&100>u){var p=document.createElementNS(d,"path"),v=n(u),h=Math.sin(v)*t,g=Math.cos(v-Math.PI)*t,y=u>50?"1":"0",m="1",A=i?t-i:0,b=-A,P="M0,"+b,E;if(i&&a?(E=i/2,P+="a"+E+","+E+" 0 0,"+m+" 0,-"+i):P+=" v-"+(i?i:t),P+=" A"+t+","+t+" 0 "+y+","+m+" "+h+","+g,i){var R=Math.sin(v)*A,S=Math.cos(v-Math.PI)*A,C="0";P+=a?" A"+E+","+E+" 0 0,"+m+" "+R+","+S:" L"+R+","+S,P+=" A"+A+","+A+" 0 "+y+","+C+" 0,-"+A}else P+=" Z";if(p.setAttribute("d",P),p.style.fill=s,p.style.stroke="none",l){var M=l.clockwise===!1,O="string"==typeof l?l:"string"==typeof l.duration?l.duration:"1s",N=document.createElementNS(d,"animateTransform");N.setAttribute("attributeName","transform"),N.setAttribute("attributeType","XML"),N.setAttribute("type","rotate"),N.setAttribute("from","0"),N.setAttribute("to",M?"-360":"360"),N.setAttribute("dur",O),N.setAttribute("repeatDur","indefinite"),p.appendChild(N)}e.appendChild(p)}}function a(e,t){var n;if("string"==typeof t.valueData){if(n=e.data(t.valueData),"undefined"!=typeof t.valueAttr||"undefined"!=typeof t.valueSelector)throw"options 'valueData', 'valueAttr' and 'valueSelector' are mutually exclusive, i.e. at least two must be undefined!"}else{if("undefined"!=typeof t.valueData)throw"option 'valueData' is not of type 'string'!";if("string"==typeof t.valueAttr){if(n=e.attr(t.valueAttr),"undefined"!=typeof t.valueSelector)throw"options 'valueAttr' and 'valueSelector' are mutually exclusive, i.e. at least one must be undefined!"}else{if("undefined"!=typeof t.valueAttr)throw"option 'valueAttr' is not of type 'string'!";"undefined"!=typeof t.valueSelector&&(n=$(t.valueSelector,e).text())}}return"undefined"==typeof n&&(n=e.text()),n}function u(e,t){return Math.max(0,Math.min(100,t.valueAdapter(e)))}function s(e,t){var n=t.mode,r=t.color,o=typeof r;if("undefined"!==o&&"string"!==o&&"function"!==o)throw"option 'color' has to be either a function or a string, but is of type '"+o+"'!";return"function"===o?n=h.USER_COLOR_FUNC:("undefined"===o&&"string"==typeof t.colorAttr&&(r=e.attr(t.colorAttr)),"string"==typeof r?n=h.USER_COLOR_CONST:"string"==typeof t.colorFunctionAttr&&(r=e.attr(t.colorFunctionAttr),"string"==typeof r&&(n=h.DATA_ATTR_FUNC))),{mode:n,color:r}}function l(e,t,n){return e===h.GREY?h.GREY.color:e===h.GREEN?v.colorByPercent(100):e===h.RED?v.colorByPercent(0):e===h.COLOR||void 0===t?v.colorByPercent(n):e===h.USER_COLOR_CONST?t:e===h.USER_COLOR_FUNC?t(n):e===h.DATA_ATTR_FUNC?r(t,n):"black"}var f=$.extend({},$.fn.progressPie.defaults,t),c="undefined"==typeof t,d="http://www.w3.org/2000/svg",p="jQuery.fn.progressPie.contentPlugin",v=$.fn.progressPie,h=$.extend({USER_COLOR_CONST:{},USER_COLOR_FUNC:{},DATA_ATTR_FUNC:{}},v.Mode);return $(this).each(function(){var t=$(this),n=f;if(c){var r=$(this).data(e);"object"==typeof r&&(n=r)}var v=$("svg",t);if(!v.length||n.update){v.length&&n.update&&(v.remove(),n.separator="");var h=a(t,n),g=u(h,n),y=s(t,n),m=Math.ceil("number"==typeof n.size?n.size:t.height());0===m&&(m=20),m*=n.sizeFactor;var A=Math.floor(m/2),b=A,P=document.createElementNS(d,"svg"),E=m;"number"==typeof n.scale&&(E*=n.scale),P.setAttribute("width",E),P.setAttribute("height",E),P.setAttribute("viewBox","-"+b+" -"+b+" "+m+" "+m),P.style.verticalAlign=n.verticalAlign,n.prepend?t.prepend(P,n.separator):t.append(n.separator,P);var R=l(y.mode,y.color,g);i(P,b,n.strokeWidth,n.strokeColor,n.ringWidth,n.ringEndsRounded,g,R,n.rotation);var S="number"==typeof n.ringWidth?n.ringWidth:"number"==typeof n.strokeWidth?n.strokeWidth:0;if("object"==typeof n.inner&&("undefined"==typeof n.inner.valueAdapter&&(n.inner.valueAdapter=$.fn.progressPie.defaults.valueAdapter),h=a(t,n.inner),g=u(h,n.inner),y=s(t,n.inner),b=Math.floor("number"==typeof n.inner.size?n.inner.size*n.sizeFactor/2:.6*b),R=l(y.mode,y.color,g),i(P,b,0,void 0,n.inner.ringWidth,n.inner.ringEndsRounded,g,R),S="number"==typeof n.inner.ringWidth?n.inner.ringWidth:0),n.contentPlugin){var C;if("function"==typeof n.contentPlugin)C=n.contentPlugin;else{if("string"!=typeof n.contentPlugin)throw"contentPlugin option must either be a function or the name of a function in the namespace "+p+"!";C=o(n.contentPlugin)}var M=b;b>S&&(M-=S);var O={newSvgElement:function(e){var t=document.createElementNS(d,e);return P.appendChild(t),t},newSvgSubelement:function(e,t){var n=document.createElementNS(d,t);return e.appendChild(n),n},radius:M,color:R,percentValue:g,rawValue:h,pieOpts:n};"object"==typeof n.contentPluginOptions&&$.extend(O,n.contentPluginOptions),C(O)}}}),this},$.fn.progressPie.Mode={GREY:{color:"#888"},RED:{value:200},GREEN:{value:200},COLOR:{}},$.fn.progressPie.colorByPercent=function(e){var t=$.fn.progressPie.Mode.GREEN.value,n=$.fn.progressPie.Mode.RED.value,r=e>50?t:Math.floor(t*e/50),o=50>e?n:Math.floor(n*(100-e)/50);return"rgb("+o+","+r+",0)"},$.fn.progressPie.defaults={mode:$.fn.progressPie.Mode.GREY,strokeWidth:2,prepend:!0,separator:"&nbsp;",verticalAlign:"bottom",update:!1,valueAdapter:function(e){return"string"==typeof e?parseInt(e):"number"==typeof e?e:0},ringEndsRounded:!1,sizeFactor:1,scale:1},$.fn.progressPie.contentPlugin={}}(jQuery);