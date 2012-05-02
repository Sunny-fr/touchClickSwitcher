
//Settting default to mouse
var eventMode = "mouse"

//Listing touch devices user agents
var UA_touchDevices = ["iPhone","iPod","iPad","Android"] ;

// trigger events 
var events = {
        touch : {
                start : "touchstart",
                move : "touchmove",
                end : "touchend",
                pageX : function(e){ return e.originalEvent.touches[0].pageX ;},
                pageY : function(e){ return e.originalEvent.touches[0].pageY ;}
        },
        mouse : {
                start : "mousedown",
                move : "mousemove",
                end : "mouseup",
                pageX : function(e){ return e.pageX ;},
                pageY : function(e){ return e.pageY ;}
        }
};

//Don't forget, only on dom ready !
var setEventMode = function (){
	for (var i = 0; i < UA_touchDevices.length; i++) {
		if(navigator.userAgent.indexOf(UA_touchDevices[i]) != -1) eventMode = "touch";
	};
}

$(function(){
	//Don't forget, only on dom ready !
	setEventMode();


	// Now events[eventMode].start will trigger the right event ;-)

	// Example for fun ;-)

	var $currentObject ;

	var mnmsColors = ["#d72e2e","#3978e0","#7ed85e","#feab1a","#b7dd43","#dd2b2b"]


	for (var i = 0; i < 24; i++) {
		$("<div class='ball'><strong>m</strong></div>")
		.css({
			"left": Math.round(Math.random()*500),
			"top": Math.round(Math.random()*200),
			"background-color" : mnmsColors[Math.round(Math.random()* (mnmsColors.length-1))]
		})
		.appendTo(".viewport") ;
	};

	var tempEvents = {
		"prevX" : 0 ,
		"prevY" : 0 ,
		"ballX" : 0 ,
		"ballY" : 0

	}


	var onMove = function(e){
		$currentObject.css({
			"left": 	tempEvents.ballX - ( tempEvents.prevX - events[eventMode].pageX(e)  ) , 
			"top":  	tempEvents.ballY - ( tempEvents.prevY - events[eventMode].pageY(e)  ) 
		}) ;

		e.preventDefault();
	}

	var onStart = function(e){
		$currentObject = $(this) ;
		tempEvents.prevX = events[eventMode].pageX(e) ;
		tempEvents.prevY = events[eventMode].pageY(e) ;
		tempEvents.ballX = $currentObject.position().left;
		tempEvents.ballY = $currentObject.position().top ;
		$currentObject.on(events[eventMode].move, onMove);

		//
		$(".ball").css({"z-index":1}) ;
		$currentObject.css({"z-index":10}) ;

	}

	var onEnd = function(e){
		
		$currentObject.off(events[eventMode].move, onMove);
	}


	$(".ball").on(events[eventMode].end, onEnd );
	$(".ball").on(events[eventMode].start, onStart);



})

