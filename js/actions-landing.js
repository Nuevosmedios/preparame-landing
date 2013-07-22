var GET_CAREERS = "http://app.preparame.co/preparame/fetch_careers/";
var GET_UNIVERSITIES = "http://app.preparame.co/preparame/fetch_institute/";
var SEND_DREAM = "http://app.preparame.co/preparame/json_save_goal/";

function days_to_test(){
	var d1 = new Date(); //"now"
	var d2 = new Date("2013/08/25");  // some date
	var diff = Math.abs(d1-d2); 
	var one_day = 1000*60*60*24;
	var days_left = Math.round(diff/one_day);
	$("#days_left").text(days_left);
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

function send_dream(dream, career, institute){
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
				window.location = "http://app.preparame.co/preparame/goal_signup/?external=1";
			}
		},
		error:function(){
			console.log(error);
		}
	});
}

$(document).on("ready", function(){
	var dream = "", career = "", institute = "";
	days_to_test();
	get_universities();
	get_careers();
	$("#send-dream").on("click", function(e){
		e.preventDefault();
		dream = $("#inputDream").val();
		career = $("#inputCareer").val();
		institute = $("#inputUniversity").val();
		send_dream(dream, career, institute);
	});
});
