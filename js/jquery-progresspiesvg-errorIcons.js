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


( function($) {

	function rad(opts) {
		if (typeof opts.pieOpts.ringWidth === "undefined" || opts.fullSize) {
			return opts.totalRadius;
		} else {
			var r = opts.radius;
			if (opts.backgroundColor) {
				r -= opts.gapToRing;
			}
			return r;
		}
	}
	
	function iconRad(opts, contentRad, substractLinecaps) {
		var r = contentRad * opts.iconSizeFactor;
		if (substractLinecaps && opts.lineCap !== "none") {
			r -= opts.strokeWidth / 2; //Radius of lineCap is half the strokeWidth
		}
		return r;
	}

	function addBackground(opts, r) {
		//fill background if set
		if (opts.backgroundColor) {
			var bg = opts.newSvgElement("circle");
			bg.setAttribute("cx", "0");
			bg.setAttribute("cy", "0");
			
			bg.setAttribute("r", r);
			bg.setAttribute("fill", opts.backgroundColor);
		}
	}
	
	function addTriangleGetBottomY(opts, r) {
		var tr = opts.newSvgElement("polygon");
		var br = opts.borderRadius;
		if (typeof br !== "number") {
			br = 0;
		}
		var r2 = r - br;
		var x = r2 * Math.sin(Math.PI / 3);
		var y = r2 * Math.cos(Math.PI / 3);
		tr.setAttribute("points", "0,-" + r2 + " " + x + "," + y + " -" + x + "," + y );
		tr.setAttribute("fill", opts.backgroundColor);
		if (br > 0) {
			tr.setAttribute("stroke-width", 2*br);
			tr.setAttribute("stroke", opts.backgroundColor);
			tr.setAttribute("stroke-linejoin", "round");
		}
		return y + br;
	}
	
	function addExclamationMark(opts, top, bottom) {
		var dash = opts.newSvgElement("line");
		var dotLine = opts.strokeWidth < 2 ? 1 : 0;
		var dotHeight = opts.strokeWidth + dotLine;
		if (opts.lineCap !== "round") {
			dotHeight++;
		}
		var gap = opts.strokeWidth < 2 ? 2 : 0.8 * opts.strokeWidth;
		var dashHeight = top + bottom - dotHeight - gap;
		var drawDot = dashHeight > dotHeight;
		
		var capHeight = opts.lineCap === "none" ? 0 : opts.strokeWidth / 2; 

		
		var dashStart = -top + capHeight;
		var dashEnd = bottom - (drawDot ? dotHeight + gap : 0) - capHeight;
		dash.setAttribute("x1", 0);
		dash.setAttribute("y1", dashStart);
		dash.setAttribute("x2", 0);
		dash.setAttribute("y2", dashEnd);
		dash.setAttribute("style", "stroke-width: " + opts.strokeWidth + "; stroke-linecap: " + opts.lineCap + "; stroke: " + opts.iconColor + "; fill: none");
		
		var animDur;
		
		if (opts.animate) {
			animDur = typeof opts.animate === "string" ? opts.animate : "1s";		
			var dashAnim = opts.newSvgSubelement(dash, "animate");
			dashAnim.setAttribute("attributeName", "y2");
			dashAnim.setAttribute("dur", animDur);
			dashAnim.setAttribute("repeatCount", "1");
			dashAnim.setAttribute("calcMode", "spline");
			dashAnim.setAttribute("values", dashStart + "; " + dashEnd + "; " + dashEnd);
			dashAnim.setAttribute("keyTimes", "0; 0.9; 1");
			dashAnim.setAttribute("keySplines", ".5 0 .3 1; 0 0 0 0");
		}
		
		if (drawDot) {
			var dot;
			if (dotLine === 0) {
				var dotRad = dotHeight / 2;
				dot = opts.newSvgElement("circle");
				dot.setAttribute("cx", 0);
				dot.setAttribute("cy", bottom - dotRad);
				dot.setAttribute("r", dotRad);
				dot.setAttribute("fill", opts.iconColor);
				if (opts.animate) {
					var dotAnim = opts.newSvgSubelement(dot, "animate");
					dotAnim.setAttribute("attributeName", "r");
					dotAnim.setAttribute("dur", animDur);
					dotAnim.setAttribute("repeatCount", 1);
					dotAnim.setAttribute("calcMode", "spline");
					dotAnim.setAttribute("values", "0; 0; " + dotRad);
					dotAnim.setAttribute("keyTimes", "0; 0.4; 1");
					dotAnim.setAttribute("keySplines", "0 0 1 1; .75 0 .25 0");
				} 
			} else {
				dot = opts.newSvgElement("line");
				dot.setAttribute("x1", 0);
				dot.setAttribute("y1", bottom - capHeight - dotLine);
				dot.setAttribute("x2", 0);
				dot.setAttribute("y2", bottom - capHeight);
				dot.setAttribute("style", "stroke-width: " + opts.strokeWidth + "; stroke-linecap: " + opts.lineCap + "; stroke: " + opts.iconColor + "; fill: none");
			}
		}
	}

	/**
	 * SVG Content Plug-in for jquery-progresspiesvg: Draws a cross icon on top of a pie or ring chart. 
	 * <p>By default this is a white cross (X) on red background, an icon commonly used to indicate, that an error occurred.
	 * Therefore, this plug-in is intended to be used whenever a process, whose progress you were monitoring with
	 * a pie or ring chart, terminates abruptly due to an error. </p>
	 * <p>You may choose whether the progress indicator should still remain visible (thus showing an error icon along
	 * with the percentual progress value of the state when the error occurred) or should be completely occluded by the
	 * error icon:</p>
	 * <p>Drawn onto a pie chart, the icon is drawn on top of the whole pie, by default covering the pie completely by
	 * the opaque background color. In order for the progress to remain visible, you may change the background color to
	 * a semi transparent background or turn it off completely, simply drawing a cross on top of the pie.</p>
	 * <p>Drawn onto a ring chart, the icon is by default fitted inside the ring, so the ring itself is not
	 * occluded. You may customize the gap between the error icon and the ring as well as set a fullsize option
	 * in order to completely cover the whole graph, if you prefer to.</p>
	 * <p>See the content plug-in examples page for various demonstrations.</p>
	 * <p>Use this plug-in by adding the option <code>contentPlugin: "cross"</code> (or <code>contentPlugin: $.fn.progressPie.contentPlugin.cross</code>)
	 * to your call of the progresspie plug-in.
	 * <p>Additional arguments may be supplied by adding the option <code>contentPluginOptions</code> to the progressPie plugin options.
	 * This is to be an object which may hold the following properties:</p>
	 * <ul>
	 * <li><code>strokeWidth</code>: number, defaults to 2. Width of the stroke for the cross (not equal to the strokeWidth option of the pie chart (outer circle)</li>
	 * <li><code>lineCap</code>: string, defaults to "round", may take any value allowed for the SVG line-cap style, like "square".</li>
	 * <li><code>iconColor</code>: string, color code, defaults to "white": The stroke color for the actual cross icon.</li>
	 * <li><code>backgroundColor</code>: string, color code, defaults to "red": A circle filled with this color is drawn as a background for the cross icon.
	 * Set to <code>null</code> in order to switch off the background completely.</li>
	 * <li><code>fullSize</code>: boolean, defaults to false. Only affects drawing on a ring chart (i.e. option <code>ringWidth</code> was set): 
	 * In this case, the value true causes the background to cover the whole ring graph and not just the free space inside the ring.</li>
	 * <li><code>gapToRing</code>: number, defaults to 1: Only affects drawing an a ring chart with <code>fullSize</code> set to / remaining false: Defines the size of the gap (in pixels) between the progress ring and the error icon (its filled background).  May be negative, causing the icon to grow and overlap the ring.</li>
	 * <li><code>iconSizeFactor</code>: number, defaults to 0.6. This defines the ratio between the while error icons size (i.e. the
	 * diameter of the circle filled with the <code>backgroundColor</code> and the cross icon itself (i.e. the diameter
	 * of the imaginative circle closest surrounding the X icon). In other words: The closer to 1, the larger the
	 * cross icon will be and the less margin will remain between the cross and the outer edge of the filled background circle.</li>
	 * <li><code>animate</code>: boolean or string with duration (number and time unit): If true or string, an animation drawing the check (from left to right) will be added.
	 * If the value is a string, it has to be a valid duration value defining the speed of the animation. If "true", the default duration (1s) will be applied.</li>
	 * </ul>
	 * <p>Please note: This function is called <em>internally</em> by the progressPie jQuery plug-in! Don't call this function directly,
	 * but use it as desrcibed above!</p>
	 * @function cross
	 * @param {object} args object holding several arguments provided by the progressPie plug-in, including any option you specified in
	 * the object <code>contentPluginOptions</code>.
	 * @memberof jQuery.fn.progressPie.contentPlugin
	 * @requires jquery-progresspiesvg-min.js
	 */
	$.fn.progressPie.contentPlugin.cross = function(args) {
		var opts = $.extend({}, $.fn.progressPie.contentPlugin.crossDefaults, args);
		var r = rad(opts); 
		addBackground(opts, r);	
		var r2 = iconRad(opts, r, true);
		/* calc vertical and horizontal offset for endpoints of cross, angle is 45°
		 * binomial formula: offset^2 + offset^2 = r2^2 <=> 2 * offset^2 = r2^2
		 * => offset = sqrt(r2^2 / 2) = r2 / sqrt(2)
		 */
		var offset = r2 / Math.sqrt(2); 
		var start = "M-" + offset + ",-" + offset + " ";
		var line1 = "L" + offset + "," + offset + " ";
		var move  = "M-" + offset + "," + offset + " ";
		var line2 = "L" + offset + ",-" + offset;
		var icon = args.newSvgElement("path");
		icon.setAttribute("d", start + line1 + move + line2);
		icon.setAttribute("style", "stroke-width: " + opts.strokeWidth + "; stroke-linecap: " + opts.lineCap + "; stroke: " + opts.iconColor + "; fill: none");
		if (opts.animate) {
			var anim = args.newSvgSubelement(icon, "animate");
			anim.setAttribute("attributeName", "d");
			anim.setAttribute("dur", typeof opts.animate === "string" ? opts.animate : "1s");
			anim.setAttribute("repeatCount", "1");
			anim.setAttribute("values", start + "l0,0 m0,0 l0,0; " + start + line1 + "m0,0 l0,0; " + start + line1 + move + " l0,0; " + start + line1 + move + line2);
			anim.setAttribute("calcMode", "spline");
			anim.setAttribute("keyTimes", "0; .45; .55; 1");
			anim.setAttribute("keySplines", ".5 0 .3 1; 1 0 0 1; .3 0 0 1");
		}
	};
	
	/**
	 * SVG Content Plug-in for jquery-progresspiesvg: Draws an exclamation mark icon on top of a pie or ring chart. 
	 * <p>By default this is a white exclamation mark (!) on yellow background, an icon commonly used to indicate
	 * a warning.
	 * <p>Other than drawing an exclamation mark instead of a cross and of using a different default
	 * background color, this plug-in is practically identical to the "cross" plug-in, so
	 * please refer to {@link jQuery.fn.progressPie.contentPlugin.cross} for more documentation.
	 * @function exclamationMark
	 * @param {object} args object holding several arguments provided by the progressPie plug-in, including any option you specified in
	 * the object <code>contentPluginOptions</code>.
	 * @memberof jQuery.fn.progressPie.contentPlugin
	 * @requires jquery-progresspiesvg-min.js
	 */
	$.fn.progressPie.contentPlugin.exclamationMark = function(args) {
		var opts = $.extend({}, $.fn.progressPie.contentPlugin.exclamationMarkDefaults, args);
		var r = rad(opts); 
		addBackground(opts, r);	
		var r2 = iconRad(opts, r, false);
		addExclamationMark(opts, r2, r2);
	};
	
	/**
	 * SVG Content Plug-in for jquery-progresspiesvg: Draws triangular warning sign icon on top of a pie or ring chart. 
	 * <p>This resembles the {@link jQuery.fn.progressPie.contentPlugin.exclamationMark} plug-in, but it does not
	 * fill a complete circle with the background color (by default: yellow), but will fit a triangular sign
	 * (optionally with rounded corners) into the circle and draw an exclamation mark (!) onto that
	 * triangle. (See examples)
	 * <p>The <code>contentPluginOptions</code> supported by this plug-in are largely identical to those
	 * of {@link jQuery.fn.progressPie.contentPlugin.exclamationMark} or {@link jQuery.fn.progressPie.contentPlugin.cross},
	 * only one option specific to this plug-in has been introduced:
	 * <ul>
	 * <li><code>borderRadius</code>: number, defaults to 0. Set to a positive value in order for the triangle
	 * to be drawn with rounded corners.</li>
	 * </ul>
	 * @function warning
	 * @param {object} args object holding several arguments provided by the progressPie plug-in, including any option you specified in
	 * the object <code>contentPluginOptions</code>.
	 * @memberof jQuery.fn.progressPie.contentPlugin
	 * @requires jquery-progresspiesvg-min.js
	 */
	$.fn.progressPie.contentPlugin.warning = function(args) {
		var opts = $.extend({}, $.fn.progressPie.contentPlugin.warningDefaults, args);
		var r = rad(opts);
		var r2 = iconRad(opts, r, false);
		var by = addTriangleGetBottomY(opts, r) - (r * 0.2);
		addExclamationMark(opts, r2, by);
	};
	
	/**
	 * Common default options for all three plug-ins of the <code>errorIcons</code> plug-in package/file, 
	 * i.e. this object defines default options for the plug-ins "cross", "exclamationMark" and "warning",
	 * but only those defaults all three of these plug-ins have in common.
	 * For each plug-in there is a separate defaults object extending this one with further plug-in specific
	 * defaults.
	 * <p>This is a public (static) object in order to allow users to globally modify the common defaults
	 * for all three plug-ins globally.
	 * @member errorIconsCommonDefaults
	 * @memberof jQuery.fn.progressPie.contentPlugin
	 * @property {string} iconColor - stroke color for the main icon (cross or exclamation mark), defaults to "white".
	 * @property {number} strokeWidth - stroke width for the main icon (cross or exclamation mark), defaults to 2.
	 * @property {string} lineCap - value for SVG style property "line-cap" defining the look of the line ends of the cross or exclamation mark. Defaults to "round". The dot/period of the exclamation mark is, by the way, always a circle, except for 
	 * <code>strokeWidth: 1</code>, but if the lineCap is set to "square", the circle's radius gets slightly increased, 
	 * because a circle with diameter equal to the with of the rectangular stroke above, seems to be smaller than the stroke.
	 * @property {boolean} fullSize - when combined with a ring chart (<code>ringWidth</code> option set), the value
	 * true causes the error icon to be drawn full size, i.e. with the outer diameter of the whole ring chart, while
	 * the value false causes a smaller error or warning icon to be drawn inside the ring, 
	 * considering the <code>gapToRing</code> option. Defaults to false.
	 * @property {number} gapToRing - when combined with a ring chart (<code>ringWidth</code> option set) and with
	 * <code>fullsize=false</code>, this defines the gap in pixels left free between the ring and the error icon's
	 * background circle. I.e. the background circle's radius is the total graph's radius 
	 * minus the <code>ringWidth</code> minus <code>gapToRing</code>. May be negative, in which case the icon's background
	 * circle overlaps the ring. Defaults to 1.
	 */
	 $.fn.progressPie.contentPlugin.errorIconsCommonDefaults = {
		iconColor: "white",
		strokeWidth: 2,
		lineCap: "round",
		fullSize: false,
		gapToRing: 1,
		iconSizeFactor: 0.6
	};
	
	/**
	 * Default options for the content plug-in "cross".
	 * Extends the {@link jQuery.fn.progressPie.contentPlugin.errorIconsCommonDefaults} with the following default option:
	 * @member crossDefaults
	 * @memberof jQuery.fn.progressPie.contentPlugin
	 * @property {string} backgroundColor - default color for the background circle of the cross icon, defaults to "red".
	 */
	$.fn.progressPie.contentPlugin.crossDefaults = $.extend({}, $.fn.progressPie.contentPlugin.errorIconsCommonDefaults, {
		backgroundColor: "red",
	});
	
	/**
	 * Default options for the content plug-in "exclamationMark".
	 * Extends the {@link jQuery.fn.progressPie.contentPlugin.errorIconsCommonDefaults} with the following default option:
	 * @member exclamationMarkDefaults
	 * @memberof jQuery.fn.progressPie.contentPlugin
	 * @property {string} backgroundColor - default color for the background circle of the cross icon, defaults to "#ea0".
	 */
	$.fn.progressPie.contentPlugin.exclamationMarkDefaults = $.extend({}, $.fn.progressPie.contentPlugin.errorIconsCommonDefaults, {
		backgroundColor: "#ea0",
	});
	
	/**
	 * Default options for the content plug-in "warning".
	 * Extends the {@link jQuery.fn.progressPie.contentPlugin.exclamationMarkDefaults} with the following default option:
	 * @member warningDefaults
	 * @memberof jQuery.fn.progressPie.contentPlugin
	 * @property {string} borderRadius - radius of rounded corners for the triangular background. Defaults to 0. If set to 0,
	 * the triangle's corners won't be rounded at all. Larger values result in rounded corners as well as an overall slightly
	 * larger triangle icon, since with unchanged size, simply cutting off the sharp corners, a gap/margin would 
	 * remain between the (imaginary) surrounding circle and the triangle's area. This leaves room to increase the
	 * original side length (before clipping the corners).
	 */
	$.fn.progressPie.contentPlugin.warningDefaults = $.extend({}, $.fn.progressPie.contentPlugin.exclamationMarkDefaults, {
		borderRadius: 0
	});

} (jQuery));