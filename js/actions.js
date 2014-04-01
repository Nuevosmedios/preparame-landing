var GET_CAREERS = "http://app.preparame.co/preparame/fetch_careers/";
var GET_UNIVERSITIES = "http://app.preparame.co/preparame/fetch_institute/";
var SEND_DREAM = "http://app.preparame.co/preparame/json_save_goal/";

function days_to_test(){
	var d1 = new Date(); //"now"
<<<<<<< Updated upstream
	var d2 = new Date("2013/08/25");  // some date
=======
	var d2 = new Date("2014/08/03");  // some date
>>>>>>> Stashed changes
	var diff = Math.abs(d1-d2); 
	var one_day = 1000*60*60*24;
	var days_left = Math.round(diff/one_day);
	$("#days_left").text(days_left);
	$("#goldenModal").find(".days-left").text(days_left);
	$("#silverModal").find(".days-left").text(days_left);
}

function get_universities(){
	$.ajax({
		url: GET_UNIVERSITIES,
		type: "GET",
		async: true,
		dataType: 'jsonp',
		success: function(data){
			$('#inputUniversity').typeahead({ source: function(query,process){
				var s = [];
				$.each(data, function(k, v) {
					s.push(v.fields.name);
				});
				process(s);
			}});
			$('#inputUniversity').toggleClass('loading enable');
		},
		error:function(){
			console.log(error);
		}
	});
}

function get_careers(){
	$.ajax({
		url: GET_CAREERS,
		type: "GET",
		async: true,
		dataType: 'jsonp',
		success: function(data){
			$('#inputCareer').typeahead({ source: function(query,process){
				var c = [];
				$.each(data, function(k, v) {
					c.push(v.fields.name);
				});
				process(c);
			}});
			$('#inputCareer').toggleClass('loading enable');
		},
		error:function(){
			console.log(error);
		}
	});
}

function send_dream(dream, career, institute, parentE){
	$.ajax({
		url: SEND_DREAM,
		type: "GET",
		async: true,
		dataType: 'jsonp',
		data: {
			goal_description: dream,
			another_career: career,
			abroad_institute: institute
		},
		success: function(data){
			if(data["temp_goal"]){
				window.location = "http://app.preparame.co/preparame/goal_signup/?external=1&parent_email="+parentE;
			}
		},
		error:function(){
			console.log(error);
		}
	});
}

function getQueryParams(qs) {
	qs = qs.split("+").join(" ");
	var params = {},
		tokens,
		re = /[?&]?([^=]+)=([^&]*)/g;

	while (tokens = re.exec(qs)) {
		params[decodeURIComponent(tokens[1])]
			= decodeURIComponent(tokens[2]);
	}

	return params;
}

$(document).on("ready", function(){
	var dream = "", career = "", institute = "";
	days_to_test();
	get_universities();
	get_careers();
	
	var params = getQueryParams(document.location.search);

	$("#send-dream").on("click", function(e){
		e.preventDefault();
		dream = $("#inputDream").val();
		career = $("#inputCareer").val();
		institute = $("#inputUniversity").val();
		send_dream(dream, career, institute, params["parent_email"]);
	});
	$("#diagnosticModal").on("hidden", function(){
		var iframe = '<iframe width="100%" height="315" src="//www.youtube.com/embed/ksjwpdvs0A8" frameborder="0" allowfullscreen></iframe>';
		var videoContainer = $(this).find("#diagnosticIC");
		videoContainer.empty();
		videoContainer.append(iframe);
	});
	$("#resultsModal").on("hidden", function(){
		var iframe = '<iframe width="100%" height="315" src="//www.youtube.com/embed/7ZOWnkOREqs" frameborder="0" allowfullscreen></iframe>';
		var videoContainer = $(this).find("#resultsIC");
		videoContainer.empty();
		videoContainer.append(iframe);
	});
});