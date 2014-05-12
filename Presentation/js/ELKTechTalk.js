var $ = function ( selector, context ) {
        context = context || document;
        return context.querySelector(selector);
};


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


