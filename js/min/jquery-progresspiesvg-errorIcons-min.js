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
!function($){function t(t){if("undefined"==typeof t.pieOpts.ringWidth||t.fullSize)return t.totalRadius;var e=t.radius;return t.backgroundColor&&(e-=t.gapToRing),e}function e(t,e){if(t.backgroundColor){var n=t.newSvgElement("circle");n.setAttribute("cx","0"),n.setAttribute("cy","0"),n.setAttribute("r",e),n.setAttribute("fill",t.backgroundColor)}}function n(t,e){var n=t.newSvgElement("polygon"),r=t.borderRadius;"number"!=typeof r&&(r=0);var i=e-r,o=i*Math.sin(Math.PI/3),s=i*Math.cos(Math.PI/3);return n.setAttribute("points","0,-"+i+" "+o+","+s+" -"+o+","+s),n.setAttribute("fill",t.backgroundColor),r>0&&(n.setAttribute("stroke-width",2*r),n.setAttribute("stroke",t.backgroundColor),n.setAttribute("stroke-linejoin","round")),s+r}function r(t,e,n){var r=t.newSvgElement("path"),i=t.strokeWidth<2?1:0,o=t.strokeWidth+i,s=t.strokeWidth<2?1:.5*t.strokeWidth,a=e+n-o-s,u=a>o,l="M0,-"+e+" ",c="L0, "+(n-(u?1+o+s:0)),g="M0,"+n+" ",d="L0,"+(n-i);if(r.setAttribute("d",l+c+(u?g+d:"")),r.setAttribute("style","stroke-width: "+t.strokeWidth+"; stroke-linecap: "+t.lineCap+"; stroke: "+t.iconColor+"; fill: none"),t.animate){var b=t.newSvgSubelement(r,"animate");b.setAttribute("attributeName","d"),b.setAttribute("dur","string"==typeof t.animate?t.animate:"1s"),b.setAttribute("repeatCount","1"),b.setAttribute("values",l+"l0,0 "+l+"l0,0 ; "+l+c+l+c+"; "+l+c+g+" l0,0; "+l+c+g+d),b.setAttribute("calcMode","spline"),b.setAttribute("keyTimes","0; .6; .8; 1"),b.setAttribute("keySplines",".5 0 .3 1; 1 0 0 1; .3 0 0 1")}}$.fn.progressPie.contentPlugin.cross=function(n){var r=$.extend({},$.fn.progressPie.contentPlugin.crossDefaults,n),i=t(r);e(r,i);var o=n.newSvgElement("path"),s=i/2.5,a="M-"+s+",-"+s+" ",u="L"+s+","+s+" ",l="M-"+s+","+s+" ",c="L"+s+",-"+s;if(o.setAttribute("d",a+u+l+c),o.setAttribute("style","stroke-width: "+r.strokeWidth+"; stroke-linecap: "+r.lineCap+"; stroke: "+r.iconColor+"; fill: none"),r.animate){var g=n.newSvgSubelement(o,"animate");g.setAttribute("attributeName","d"),g.setAttribute("dur","string"==typeof r.animate?r.animate:"1s"),g.setAttribute("repeatCount","1"),g.setAttribute("values",a+"l0,0 m0,0 l0,0; "+a+u+"m0,0 l0,0; "+a+u+l+" l0,0; "+a+u+l+c),g.setAttribute("calcMode","spline"),g.setAttribute("keyTimes","0; .45; .55; 1"),g.setAttribute("keySplines",".5 0 .3 1; 1 0 0 1; .3 0 0 1")}},$.fn.progressPie.contentPlugin.exclamationMark=function(n){var i=$.extend({},$.fn.progressPie.contentPlugin.exclamationMarkDefaults,n),o=t(i);e(i,o);var s=o/2;r(i,s,s)},$.fn.progressPie.contentPlugin.warning=function(e){var i=$.extend({},$.fn.progressPie.contentPlugin.exclamationMarkDefaults,e),o=t(i),s=o/2,a=n(i,o)-Math.min(1.5*i.strokeWidth,s);r(i,s,a)},$.fn.progressPie.contentPlugin.crossDefaults={iconColor:"white",backgroundColor:"red",strokeWidth:2,lineCap:"round",gapToRing:1},$.fn.progressPie.contentPlugin.exclamationMarkDefaults={iconColor:"white",backgroundColor:"#ea0",strokeWidth:2,lineCap:"round",gapToRing:1},$.fn.progressPie.contentPlugin.warnigDefaults={iconColor:"white",backgroundColor:"#ea0",strokeWidth:2,lineCap:"round",gapToRing:1}}(jQuery);