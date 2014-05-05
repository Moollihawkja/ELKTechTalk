var $ = function ( selector, context ) {
        context = context || document;
        return context.querySelector(selector);
};

var editor = ace.edit($('.ace'));
editor.setTheme("ace/theme/clouds");

var Range = ace.require('ace/range').Range;
var Marker = ace.require('ace/layer/marker').Marker;
var Selection = ace.require('ace/selection').Selection;

var Steps = {
	onStepEnter: function(step) { 
		var method = step.id + 'Action'.replace('-','');
		if (window[method] !== undefined) window[method](step); 
		this.onSubStepEnter(step, 1, true);
	},
	onSubStepEnter: function(step, substepIndex, forward) { 
		var method = (step.id + 'ActionSub' + substepIndex).replace('-','');
		if (window[method] !== undefined) window[method](step, substepIndex, forward);
	},
	onStepLeave: function(step) {
		var method = step.id + 'Leave'.replace('-','');
		if (window[method] !== undefined) window[method](step); 
	},
	showNotes: window.location.href.indexOf('notes') > -1
};

impress(undefined, Steps).init();

function toggleNotes() {
	if ($("body").classList.contains('note-display')) hideNotes();
	else displayNotes();
}

function displayNotes() {
	var active = $(".active").id;
	var notes = $('#' + active + ' .notes');
	if (notes) {
		$('#notes').innerHTML = notes.innerHTML;
		$('body').classList.add("note-display");
	}
}

function hideNotes() {
	$('body').classList.remove("note-display");
}

var AceEditors = {};
var AceSessions = {};
var AceMarkers = {};

function clearMarkers(session, markers) {
	if (typeof(markers) === 'undefined') return;
	while (markers.length > 0) {
		session.removeMarker(markers.shift());
	}
}

function renderMarker16px(stringBuilder, range, left, top, layerConfig) {
	/*
	if (!layerConfig.adjusted) {
		console.log('start ' + layerConfig.characterWidth);
		layerConfig.characterWidth *= 1.25;
		layerConfig.adjusted = true;
		console.log('ended up ' + layerConfig.characterWidth);
	}*/
	renderMarker(stringBuilder, range, left, top, layerConfig, this.clazz);
}
function renderMarker12px(stringBuilder, range, left, top, layerConfig) {
	/*
	//console.log('14 from ' + layerConfig.characterWidth);
	layerConfig.characterWidth *= 1.25; */
	renderMarker(stringBuilder, range, left, top, layerConfig, this.clazz);
}
function renderMarker(stringBuilder, range, left, top, layerConfig) {
	if (!layerConfig.origCharWidth) {
		layerConfig.origCharWidth = layerConfig.characterWidth;
		
		var scale = computeWindowScale();
		if (scale.scale < 1) {
			console.log('start ' + layerConfig.origCharWidth);
			layerConfig.characterWidth = Math.ceil(layerConfig.characterWidth * (1 + (1 - scale.scale)));
			console.log('ended up ' + layerConfig.characterWidth);
		}
	}
	
	drawSingleLineMarker(
		stringBuilder, 
		range,
		this.clazz,
		layerConfig, 
		0.5, 
		top
	);
}

function drawSingleLineMarker (stringBuilder, range, clazz, config, extraLength, top) {
	var height = config.lineHeight;
	//console.log('in row ' + range.start.row + ' from ' + range.start.column + ' to ' + range.end.column);
	var width = (range.end.column + (extraLength || 0) - range.start.column) * config.characterWidth;

	top = (range.start.row - config.firstRowScreen) * config.lineHeight;
	var left =  (range.start.column * config.characterWidth); //this.$padding;

	stringBuilder.push(
		"<div class='", clazz, "' style='",
		"height:", height, "px;",
		"width:", width, "px;",
		"top:", top, "px;",
		"left:", left,"px;'></div>"
	);
};

var closure1Action = closure2Action = closure4Action =
async2Action = async3Action =
module2Action = module5Action = module6Action = module7Action = module8Action =
function(step, index, forward) {
	initAce(
		step,
		"async3 closure4 module2 module6 module8".indexOf(step.id) > -1 ? '20px' : '24px',
		"module7 module8".indexOf(step.id) > -1 ? 3 : null
	);
}


function initAce(step, fontSize, tabSize) {
	var stepId = step.id;
	var substeps = parseInt(step.getAttribute('data-substeps'));
	var el = $('#' + stepId + ' .ace');
	var editor = AceEditors[step.id] = ace.edit(el);
	
	editor.setTheme("ace/theme/clouds");
	el.style.fontSize=fontSize;
	editor.setReadOnly(true);
	editor.setHighlightActiveLine(false);
	if (typeof(tabSize) === "number") editor.getSession().setTabSize(tabSize);
	el.style.opacity = null;
	AceSessions[stepId] = editor.getSession();
	AceMarkers[stepId] = {};
	if (!isNaN(substeps)) {
		for (var i=1; i<=substeps; i++) AceMarkers[stepId]['ss' + i] = [];
	}
	//editor.renderer.setShowGutter(false); 
}

var async2ActionSub2 = function(step, index, forward) {
	var cls = 'gmc-highlight-async';
	var ms = AceMarkers.async2.ss3;
	var sn = AceSessions.async2;
	
	clearMarkers(sn, ms);
	ms.push(sn.addMarker(new Range(4, 5, 4, 30),cls, renderMarker));
	ms.push(sn.addMarker(new Range(5, 6, 5, 30),cls, renderMarker));
	ms.push(sn.addMarker(new Range(6, 7, 6, 30),cls, renderMarker));
	ms.push(sn.addMarker(new Range(7, 8, 7, 30),cls, renderMarker));
	ms.push(sn.addMarker(new Range(8, 8, 8, 30),cls, renderMarker));
	ms.push(sn.addMarker(new Range(9, 9, 9, 30),cls, renderMarker));
}

var async2ActionSub3 = function(step, index, forward) {
	var cls = 'gmc-highlight-async';
	var ms = AceMarkers.async2.ss3;
	var sn = AceSessions.async2;
	var i = 10;

	clearMarkers(sn, ms);
	ms.push(sn.addMarker(new Range(i, 8, i++, 30),cls, renderMarker));
	ms.push(sn.addMarker(new Range(i, 7, i++, 30),cls, renderMarker));
	ms.push(sn.addMarker(new Range(i, 6, i++, 30),cls, renderMarker));
	ms.push(sn.addMarker(new Range(i, 5, i++, 30),cls, renderMarker));
}

var async3ActionSub2 = function(step, index, forward) {
	var cls = 'gmc-highlight-async';
	var cls1 = 'gmc-highlight-asyncOther';
	var ms = AceMarkers.async3.ss3;
	var sn = AceSessions.async3;
	var i = 16;
	
	clearMarkers(sn, ms);
	ms.push(sn.addMarker(new Range(1, 0, 1, 4),cls, renderMarker));
	ms.push(sn.addMarker(new Range(5, 7, 5, 11),cls, renderMarker));
	ms.push(sn.addMarker(new Range(6, 18, 6, 22),cls, renderMarker));
	ms.push(sn.addMarker(new Range(12, 14, 12, 18),cls, renderMarker));

	ms.push(sn.addMarker(new Range(i, 0, i++, 50),cls1, renderMarker));
	ms.push(sn.addMarker(new Range(i, 0, i++, 50),cls1, renderMarker));
	ms.push(sn.addMarker(new Range(i, 0, i++, 50),cls1, renderMarker));
	ms.push(sn.addMarker(new Range(i, 0, i++, 50),cls1, renderMarker));
}

var async3ActionSub3 = function(step, index, forward) {
	var cls = 'gmc-highlight-async';
	var ms = AceMarkers.async3.ss3;
	var sn = AceSessions.async3;
	var i = 16;

	clearMarkers(sn, ms);
	ms.push(sn.addMarker(new Range(i, 0, i++, 50),cls, renderMarker));
	ms.push(sn.addMarker(new Range(i, 0, i++, 50),cls, renderMarker));
	ms.push(sn.addMarker(new Range(i, 0, i++, 50),cls, renderMarker));
	ms.push(sn.addMarker(new Range(i, 0, i++, 50),cls, renderMarker));
}

var closure1ActionSub3 = 
function(step, index, forward) {
	//console.log(session.getTextRange(new Range(1, 0, 1, 16)));
	//clearMarkers(AceSessions.closure1, AceMarkers.closure1);
	var cls = 'gmc-highlight-global';
	var ms = AceMarkers.closure1.ss3;
	var sn = AceSessions.closure1;
	
	ms.push(sn.addMarker(new Range(0, 4, 0, 5),cls, renderMarker));
	ms.push(sn.addMarker(new Range(1, 4, 1, 5),cls, renderMarker));
	ms.push(sn.addMarker(new Range(5, 1, 5, 2),cls, renderMarker));
	ms.push(sn.addMarker(new Range(9, 2, 9, 3),cls, renderMarker));
	ms.push(sn.addMarker(new Range(17, 0, 17, 1),cls, renderMarker));
	ms.push(sn.addMarker(new Range(17, 4, 17, 5),cls, renderMarker));
	ms.push(sn.addMarker(new Range(19, 0, 19, 1),cls, renderMarker));
	ms.push(sn.addMarker(new Range(20, 0, 20, 1),cls, renderMarker));
}

var closure1ActionSub4 = 
function(step, index, forward) {
	//clearMarkers(AceSessions.closure1, AceMarkers.closure1);
	var cls = 'gmc-highlight-function';
	var ms = AceMarkers.closure1.ss4;
	var sn = AceSessions.closure1;
	
	ms.push(sn.addMarker(new Range(4, 5, 4, 6),cls, renderMarker));
	ms.push(sn.addMarker(new Range(14, 8, 14, 9),cls, renderMarker));
}

var closure1ActionSub5 = 
function(step, index, forward) {
	//clearMarkers(AceSessions.closure1, AceMarkers.closure1);
	var cls = 'gmc-highlight-subfunction';
	var ms = AceMarkers.closure1.ss5;
	var sn = AceSessions.closure1;
	
	ms.push(sn.addMarker(new Range(8, 6, 4, 7),cls, renderMarker));
	ms.push(sn.addMarker(new Range(11, 9, 11, 10),cls, renderMarker));
}

var closure1ActionSub6 = 
function(step, index, forward) {
	//clearMarkers(AceSessions.closure1, AceMarkers.closure1);
	var cls = 'gmc-highlight-executeActive';
	AceMarkers.closure1.ss6.push(AceSessions.closure1.addMarker(new Range(17, 8, 17, 15), cls, renderMarker));
}

var closure1ActionSub7 = 
function(step, index, forward) {
	clearMarkers(AceSessions.closure1, AceMarkers.closure1.ss6);
	var cls = 'gmc-highlight-executeActive';
	var ms = AceMarkers.closure1.ss7;
	var sn = AceSessions.closure1;
	
	ms.push(sn.addMarker(new Range(17, 8, 17, 15), 'gmc-highlight-executeInactive', renderMarker));
	
	ms.push(sn.addMarker(new Range(3, 0, 15, 0), cls, 'fullLine'));
	$('#closure1 .global .y').innerText = 'y=5';
}

var closure1ActionSub8 = 
function(step, index, forward) {
	clearMarkers(AceSessions.closure1, AceMarkers.closure1.ss7);
	var cls = 'gmc-highlight-executeActive';
	var ms = AceMarkers.closure1.ss8;
	var sn = AceSessions.closure1;
	
	ms.push(sn.addMarker(new Range(17, 8, 17, 15), 'gmc-highlight-executeInactive', renderMarker));
	ms.push(sn.addMarker(new Range(3, 0, 15, 0), 'gmc-highlight-executeInactive', 'fullLine'));
	
	ms.push(sn.addMarker(new Range(14, 12, 14, 17), cls, renderMarker));
}

var closure1ActionSub9 = 
function(step, index, forward) {
	clearMarkers(AceSessions.closure1, AceMarkers.closure1.ss8);
	var cls = 'gmc-highlight-executeActive';
	var ms = AceMarkers.closure1.ss9;
	var sn = AceSessions.closure1;
	
	ms.push(sn.addMarker(new Range(17, 8, 17, 15), 'gmc-highlight-executeInactive', renderMarker));
	ms.push(sn.addMarker(new Range(3, 0, 15, 0), 'gmc-highlight-executeInactive', 'fullLine'));
	ms.push(sn.addMarker(new Range(14, 12, 14, 17), 'gmc-highlight-executeInactive', renderMarker));
	
	ms.push(sn.addMarker(new Range(7, 0, 12, 0), cls, 'fullLine'));
	$('#closure1 .global .y').innerText = 'y=1';
}

var closure1ActionSub10 = 
function(step, index, forward) {
	clearMarkers(AceSessions.closure1, AceMarkers.closure1.ss9);
	var cls = 'gmc-highlight-executeActive';
	var ms = AceMarkers.closure1.ss10;
	var sn = AceSessions.closure1;
	
	ms.push(sn.addMarker(new Range(17, 0, 17, 15), cls, renderMarker));
	$('#closure1 .global .x').innerText = 'x=3';
}

var closure1ActionSub11 = 
function(step, index, forward) {
	clearMarkers(AceSessions.closure1, AceMarkers.closure1.ss10);
	var cls = 'gmc-highlight-executeActive';
	var ms = AceMarkers.closure1.ss11;
	var sn = AceSessions.closure1;
	
	ms.push(sn.addMarker(new Range(19, 0, 19, 7), cls, renderMarker));
	ms.push(sn.addMarker(new Range(20, 0, 19, 8), cls, renderMarker));
}

var closure2ActionSub3 = 
function(step, index, forward) {
	//clearMarkers(AceSessions.closure1, AceMarkers.closure1);
	var cls = 'gmc-highlight-global';
	var ms = AceMarkers.closure2.ss3;
	var sn = AceSessions.closure2;
	
	ms.push(sn.addMarker(new Range(0, 4, 0, 5),cls, renderMarker));
	ms.push(sn.addMarker(new Range(1, 4, 1, 5),cls, renderMarker));
	ms.push(sn.addMarker(new Range(7, 2, 7, 3),cls, renderMarker));
	ms.push(sn.addMarker(new Range(16, 4, 16, 9),cls, renderMarker));
	ms.push(sn.addMarker(new Range(18, 0, 18, 1),cls, renderMarker));
	ms.push(sn.addMarker(new Range(18, 4, 18, 5),cls, renderMarker));
	ms.push(sn.addMarker(new Range(19, 0, 19, 1),cls, renderMarker));
	// put this one last because it will need to be switched later
	ms.push(sn.addMarker(new Range(18, 8, 18, 13),cls, renderMarker));
}

var closure2ActionSub4 = 
function(step, index, forward) {
	//clearMarkers(AceSessions.closure1, AceMarkers.closure1);
	var cls = 'gmc-highlight-function';
	var ms = AceMarkers.closure2.ss4;
	var sn = AceSessions.closure2;
	
	ms.push(sn.addMarker(new Range(3, 14, 3, 15),cls, renderMarker));
	ms.push(sn.addMarker(new Range(4, 5, 4, 6),cls, renderMarker));
	ms.push(sn.addMarker(new Range(7, 6, 7, 7),cls, renderMarker));
	ms.push(sn.addMarker(new Range(8, 2, 8, 3),cls, renderMarker));
	ms.push(sn.addMarker(new Range(10, 9, 10, 10),cls, renderMarker));
	ms.push(sn.addMarker(new Range(10, 13, 10, 14),cls, renderMarker));
	ms.push(sn.addMarker(new Range(13, 8, 13, 11),cls, renderMarker));
}

var closure2ActionSub6 = 
function(step, index, forward) {
	var cls = 'gmc-highlight-executeActive';
	AceMarkers.closure2.ss6.push(AceSessions.closure2.addMarker(new Range(16, 12, 16, 19), cls, renderMarker));
}

var closure2ActionSub7 = 
function(step, index, forward) {
	clearMarkers(AceSessions.closure2, AceMarkers.closure2.ss6);
	var cls = 'gmc-highlight-executeActive';
	var ms = AceMarkers.closure2.ss7;
	var sn = AceSessions.closure2;
	
	ms.push(sn.addMarker(new Range(16, 12, 16, 19), 'gmc-highlight-executeInactive', renderMarker));
	
	ms.push(sn.addMarker(new Range(3, 0, 14, 0), cls, 'fullLine'));

    $('#closure2 .function .z').innerText = 'z=5';
}

var closure2ActionSub8 = 
function(step, index, forward) {
	clearMarkers(AceSessions.closure2, AceMarkers.closure2.ss7);
	var cls = 'gmc-highlight-executeActive';
	var ms = AceMarkers.closure2.ss8;
	var sn = AceSessions.closure2;
	
	AceSessions.closure2.removeMarker(AceMarkers.closure2.ss3.pop());
	ms.push(sn.addMarker(new Range(18, 8, 18, 15), cls, renderMarker));
}

var closure2ActionSub9 = 
function(step, index, forward) {
	clearMarkers(AceSessions.closure2, AceMarkers.closure2.ss8);
	var cls = 'gmc-highlight-executeActive';
	var ms = AceMarkers.closure2.ss9;
	var sn = AceSessions.closure2;
	
	ms.push(sn.addMarker(new Range(18, 8, 18, 15), 'gmc-highlight-executeInactive', renderMarker));
	
	ms.push(sn.addMarker(new Range(6, 0, 11, 0), cls, 'fullLine'));
	$('#closure2 .global .y').innerText = 'y=5';
	$('#closure2 .function .x').innerText = 'x=2';
}

var closure2ActionSub10 = 
function(step, index, forward) {
	clearMarkers(AceSessions.closure2, AceMarkers.closure2.ss9);
	var cls = 'gmc-highlight-executeActive';
	var ms = AceMarkers.closure2.ss10;
	var sn = AceSessions.closure2;
	
	AceMarkers.closure2.ss3.push(sn.addMarker(new Range(18, 8, 18, 13), 'gmc-highlight-global', renderMarker));
	ms.push(sn.addMarker(new Range(18, 0, 18, 15), cls, renderMarker));
	
	$('#closure2 .global .x').innerText = 'x=8';
}

var closure2ActionSub11 = 
function(step, index, forward) {
	clearMarkers(AceSessions.closure2, AceMarkers.closure2.ss10);
	var cls = 'gmc-highlight-executeActive';
	var ms = AceMarkers.closure2.ss11;
	var sn = AceSessions.closure2;
	
	ms.push(sn.addMarker(new Range(19, 0, 19, 7), cls, renderMarker));
}

var closure2ActionSub12 = 
function(step, index, forward) {
	clearMarkers(AceSessions.closure2, AceMarkers.closure2.ss3);
	clearMarkers(AceSessions.closure2, AceMarkers.closure2.ss11);
	
	AceSessions.closure2.removeMarker(AceMarkers.closure2.ss4.pop());
}

function initClosure4(index) {
	AceEditors.closure4.setValue($('#closure4 li.step' + index + ' .code').innerHTML);
	AceEditors.closure4.clearSelection();
}

var closure4ActionSub1 =
function(step, index, forward) {
	initClosure4(1);
	if (!forward) clearMarkers(AceSessions.closure4, AceMarkers.closure4.ss2);
	var cls = 'gmc-highlight-function';
	var ms = AceMarkers.closure4.ss1;
	var sn = AceSessions.closure4;

    ms.push(sn.addMarker(new Range(0, 22, 0, 27), cls, renderMarker));
	ms.push(sn.addMarker(new Range(1, 5, 1, 12), cls, renderMarker));
	ms.push(sn.addMarker(new Range(9, 17, 9, 22), cls, renderMarker));
	ms.push(sn.addMarker(new Range(10, 11, 10, 18), cls, renderMarker));
	ms.push(sn.addMarker(new Range(13, 17, 13, 22), cls, renderMarker));
}

var closure4ActionSub2 =
function(step, index, forward) {
	initClosure4(2);
	if (forward) clearMarkers(AceSessions.closure4, AceMarkers.closure4.ss1);
	else clearMarkers(AceSessions.closure4, AceMarkers.closure4.ss3);
	var cls = 'gmc-highlight-function';
	var ms = AceMarkers.closure4.ss2;
	var sn = AceSessions.closure4;

    ms.push(sn.addMarker(new Range(0, 31, 0, 38), cls, renderMarker));
	ms.push(sn.addMarker(new Range(1, 5, 1, 11), cls, renderMarker));
	ms.push(sn.addMarker(new Range(9, 4, 9, 10), cls, renderMarker));
	ms.push(sn.addMarker(new Range(10, 4, 10, 11), cls, renderMarker));
	ms.push(sn.addMarker(new Range(17, 10, 17, 16), cls, renderMarker));
}

var closure4ActionSub3 =
function(step, index, forward) {
	initClosure4(3);
	if (forward) clearMarkers(AceSessions.closure4, AceMarkers.closure4.ss2);
	var cls = 'gmc-highlight-function';
	var ms = AceMarkers.closure4.ss3;
	var sn = AceSessions.closure4;

    ms.push(sn.addMarker(new Range(1, 24, 1, 31), cls, renderMarker));
	ms.push(sn.addMarker(new Range(2, 5, 2, 11), cls, renderMarker));
	ms.push(sn.addMarker(new Range(10, 4, 10, 10), cls, renderMarker));
	ms.push(sn.addMarker(new Range(11, 4, 11, 11), cls, renderMarker));
	ms.push(sn.addMarker(new Range(18, 10, 18, 16), cls, renderMarker));
}

var module2ActionSub1 =
function(step, index, forward) {
    AceEditors.module2.setValue($('#module2 .code1').innerHTML);
    AceEditors.module2.clearSelection();

    var cls = 'gmc-highlight-function';
    var ms = AceMarkers.module2.ss1;
    var sn = AceSessions.module2;

    ms.push(sn.addMarker(new Range(0, 15, 0, 16), cls, renderMarker));
    ms.push(sn.addMarker(new Range(23, 1, 23, 19), cls, renderMarker));
}

var module2ActionSub2 =
function(step, index, forward) {
    if (forward) clearMarkers(AceSessions.module2, AceMarkers.module2.ss1);
    else clearMarkers(AceSessions.module2, AceMarkers.module2.ss3);
    var cls = 'gmc-highlight-function';
    var ms = AceMarkers.module2.ss2;
    var sn = AceSessions.module2;

    ms.push(sn.addMarker(new Range(0, 25, 0, 35), cls, renderMarker));
    ms.push(sn.addMarker(new Range(23, 3, 23, 18), cls, renderMarker));
}

var module2ActionSub3 =
function(step, index, forward) {
    if (forward) clearMarkers(AceSessions.module2, AceMarkers.module2.ss2);
    else clearMarkers(AceSessions.module2, AceMarkers.module2.ss4);
    var cls = 'gmc-highlight-function';
    var ms = AceMarkers.module2.ss3;
    var sn = AceSessions.module2;

    ms.push(sn.addMarker(new Range(18, 1, 22, 1), cls, 'fullLine'));
}

var module2ActionSub4 =
function(step, index, forward) {
    if (forward) clearMarkers(AceSessions.module2, AceMarkers.module2.ss3);
    else clearMarkers(AceSessions.module2, AceMarkers.module2.ss5);
    var cls = 'gmc-highlight-function';
    var ms = AceMarkers.module2.ss4;
    var sn = AceSessions.module2;

    ms.push(sn.addMarker(new Range(1, 1, 3, 1), cls, 'fullLine'));
}

var module2ActionSub5 =
function(step, index, forward) {
    if (forward) clearMarkers(AceSessions.module2, AceMarkers.module2.ss4);
    else clearMarkers(AceSessions.module2, AceMarkers.module2.ss6);
    var cls = 'gmc-highlight-function';
    var ms = AceMarkers.module2.ss5;
    var sn = AceSessions.module2;

    ms.push(sn.addMarker(new Range(0, 1, 0, 12), cls, renderMarker));
}

var module2ActionSub6 =
function(step, index, forward) {
    if (forward) clearMarkers(AceSessions.module2, AceMarkers.module2.ss5);
    else clearMarkers(AceSessions.module2, AceMarkers.module2.ss7);
    var cls = 'gmc-highlight-function';
    var ms = AceMarkers.module2.ss6;
    var sn = AceSessions.module2;

    ms.push(sn.addMarker(new Range(19, 8, 19, 29), cls, renderMarker));
    ms.push(sn.addMarker(new Range(20, 8, 20, 24), cls, renderMarker));
    ms.push(sn.addMarker(new Range(21, 8, 21, 48), cls, renderMarker));
    ms.push(sn.addMarker(new Range(23, 3, 23, 18), cls, renderMarker));
}

var module2ActionSub7 =
    function(step, index, forward) {
        if (forward) clearMarkers(AceSessions.module2, AceMarkers.module2.ss6);
    }

var module2ActionSub8 =
    function(step, index, forward) {
        if (!forward) clearMarkers(AceSessions.module2, AceMarkers.module2.ss9);
    }

var module2ActionSub9 =
    function(step, index, forward) {
        if (!forward) {
            AceEditors.module2.setValue($('#module2 .code1').innerHTML);
            AceEditors.module2.clearSelection();
        }

        var cls = 'gmc-highlight-function';
        var ms = AceMarkers.module2.ss9;
        var sn = AceSessions.module2;

        ms.push(sn.addMarker(new Range(23, 3, 23, 18), cls, renderMarker));

    }

var module2ActionSub10 =
    function(step, index, forward) {
        if (forward) {
            AceEditors.module2.setValue($('#module2 .code2').innerHTML);
            AceEditors.module2.clearSelection();

            clearMarkers(AceSessions.module2, AceMarkers.module2.ss9);
        }
    }

var module8ActionSub1 =
    function(step, index, forward) {
        AceEditors.module8.setValue($('#module8 .code1').innerHTML);
        AceEditors.module8.clearSelection();

        if (!forward) clearMarkers(AceSessions.module8, AceMarkers.module8.ss2);
        var cls = 'gmc-highlight-function';
        var ms = AceMarkers.module8.ss1;
        var sn = AceSessions.module8;

        ms.push(sn.addMarker(new Range(0, 26, 0, 36), cls, renderMarker));
        ms.push(sn.addMarker(new Range(1, 14, 1, 22), cls, renderMarker));
        ms.push(sn.addMarker(new Range(2, 25, 2, 33), cls, renderMarker));
        ms.push(sn.addMarker(new Range(11, 13, 11, 21), cls, renderMarker));
        ms.push(sn.addMarker(new Range(18, 18, 18, 26), cls, renderMarker));

        ms.push(sn.addMarker(new Range(0, 9, 0, 24), 'gmc-highlight-subfunction', renderMarker));
        ms.push(sn.addMarker(new Range(1, 11, 1, 12), 'gmc-highlight-subfunction', renderMarker));
        ms.push(sn.addMarker(new Range(4, 4, 4, 5), 'gmc-highlight-subfunction', renderMarker));
        ms.push(sn.addMarker(new Range(13, 4, 13, 5), 'gmc-highlight-subfunction', renderMarker));
        ms.push(sn.addMarker(new Range(20, 4, 20, 5), 'gmc-highlight-subfunction', renderMarker));
    }

var module8ActionSub2 =
    function(step, index, forward) {
        if (forward) {
            clearMarkers(AceSessions.module8, AceMarkers.module8.ss1);
            AceEditors.module8.setValue($('#module8 .code2').innerHTML);
            AceEditors.module8.clearSelection();
        }
        else clearMarkers(AceSessions.module8, AceMarkers.module8.ss3);
}

var module8ActionSub3 =
    function(step, index, forward) {
        var cls = 'gmc-highlight-function';
        var ms = AceMarkers.module8.ss3;
        var sn = AceSessions.module8;

        ms.push(sn.addMarker(new Range(0, 16, 0, 25), cls, renderMarker));
        ms.push(sn.addMarker(new Range(4, 14, 4, 23), cls, renderMarker));
        ms.push(sn.addMarker(new Range(13, 0, 13, 9), cls, renderMarker));
        ms.push(sn.addMarker(new Range(17, 14, 17, 23), cls, renderMarker));
    }

// `arraify` takes an array-like object and turns it into real Array
// to make all the Array.prototype goodness available.
var arrayify = function ( a ) {
	return [].slice.call( a );
};

// `$$` return an array of elements for given CSS `selector` in the `context` of
// the given element or whole document.
var $$ = function ( selector, context ) {
	context = context || document;
	return arrayify( context.querySelectorAll(selector) );
}

var computeWindowScale = function ( config ) {
	var hScale = window.innerHeight / 768,
		wScale = window.innerWidth / 1024,
		scale = hScale > wScale ? wScale : hScale;
	
	if (scale > 1) {
		scale = 1;
	}
	
	if (scale < 0) {
		scale = 0;
	}
	console.log("window scale = " + scale + " hscale = " + hScale + " wscale = " + wScale);
	return { scale: scale, hScale: hScale, wScale: wScale };
};


