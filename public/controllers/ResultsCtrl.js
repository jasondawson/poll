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
				legendTemplate : "<div class=\" legend\"><% for (var i=0; i<segments.length; i++){%><div class=\"legend-flex\"> <%if(segments[i].fillColor){%><div class=\"custom-bullet custom-bullet<%=i%>\" ></div><%}%><%if(segments[i].label){%><p class=\"legend-text\"><%=segments[i].label%></p><%}%></div><%}%><p class=\"center-text\"><strong><%=total%></strong> responses! </p></div>",
				animateScale : true,
				percentageInnerCutout : 40,
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
		vm.myDoughnutChart = new Chart(ctx).Doughnut(data, options);
		vm.legendHtml = vm.myDoughnutChart.generateLegend();
	}

	vm.nextQuestion = function() {
		vm.myDoughnutChart.destroy();
		$location.path('/question');
	}

	vm.getResults();
}

})();
