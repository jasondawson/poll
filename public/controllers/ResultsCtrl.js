(function() {

angular
	.module('polls')
	.controller('ResultsCtrl', ResultsCtrl);

function ResultsCtrl ($location, mainService) {

	var vm = this;
	vm.legendHtml = '';

	var colors = [
	    {
	        color:"#4527A0", //material ui purple 900
	        highlight: "#4527A0"
	    },
	    {
	        color: "#0D47A1", //material ui blue 900
	        highlight: "#5AD3D1"
	    },
	    {
	        color: "#c62828", //red 800
	        highlight: "#FFC870"
	    },
	    {
	    	color: '#006064', // cyan 900
	    	highlight: '#57a6db'
	    }
	]

	vm.getResults = function() {
		var data = [];
		var options = {
				legendTemplate : "<div class=\"<%=name.toLowerCase()%>-legend legend\"><% for (var i=0; i<segments.length; i++){%><div class=\"legend-flex\"><div class=\"custom-bullet custom-bullet<%=i%>\" style=\"background-color:<%=segments[i].fillColor%>\"></div><%if(segments[i].label){%><p class=\"legend-text\"><%=segments[i].label%></p></div><%}%><%}%></div>",
				animateScale : true,
				percentageInnerCutout : 35,
				animationEasing : "easeOutQuint",
				animateRotate : true,
				showTooltips: true,
				responsive: true,
				tooltipTemplate: "<%= value %>"}

		vm.results = mainService.getCurrentResults();
		for (var i = 0; i < vm.results.choices.length; i++) {
			data[i] = {
				value: vm.results.choices[i].timeschosen,
				color: colors[i].color,
				highlight: colors[i].color,
				label: vm.results.choices[i].answer
			}
		}
		var ctx = document.getElementById("myChart").getContext("2d");
		var myDoughnutChart = new Chart(ctx).Doughnut(data, options);
		vm.legendHtml = myDoughnutChart.generateLegend();
	}

	vm.nextQuestion = function() {
		$location.path('/question');
	}

	vm.getResults();
}

})();


/*

 <div class="doughnut-legend legend">
 	<div class="legend-flex">
 		<div class="custom-bullet0 pull-left" style="background-color:#F7464A">
 		</div>
 		<p class="legend-text pull-right">
 		Android
 		</p>
 		</div>
 		<hr class="hr-legend clear">
 		<div class="legend-flex"><div class="custom-bullet1 pull-left" style="background-color:#46BFBD"></div><p class="legend-text pull-right">iOS</p></div><hr class="hr-legend clear"></div>
 </div>

*/
