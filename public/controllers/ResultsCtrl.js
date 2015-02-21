(function() {

angular
	.module('polls')
	.controller('ResultsCtrl', ResultsCtrl);

function ResultsCtrl ($location, mainService) {

	var vm = this;
	vm.legendHtml = '';

	var colors = [
	    {
	        color:"#F7464A",
	        highlight: "#FF5A5E"
	    },
	    {
	        color: "#46BFBD",
	        highlight: "#5AD3D1"
	    },
	    {
	        color: "#FDB45C",
	        highlight: "#FFC870"
	    },
	    {
	    	color: '#3498db',
	    	highlight: '#57a6db'
	    }
	]

	vm.getResults = function() {
		var data = [];
		var options = {legendTemplate : "<div class=\"<%=name.toLowerCase()%>-legend legend\"><% for (var i=0; i<segments.length; i++){%><span class=\"custom-bullet<%=i%> inline\" style=\"background-color:<%=segments[i].fillColor%>\"><%if(segments[i].label){%><%=segments[i].label%></span><%}%><br class=\"clear\" /><%}%></div>",
			animateScale : true}

		vm.results = mainService.getCurrentResults();
		console.log(vm.results);
		for (var i = 0; i < vm.results.choices.length; i++) {
			console.log(i);
			data[i] = {
				value: vm.results.choices[i].timeschosen,
				color: colors[i].color,
				highlight: colors[i].color,
				label: vm.results.choices[i].answer
			}
		}
		console.log(data);
		var ctx = document.getElementById("myChart").getContext("2d");
		var myDoughnutChart = new Chart(ctx).Doughnut(data, options);
		vm.legendHtml = myDoughnutChart.generateLegend();
		console.log(vm.legendHtml);
	}

	vm.nextQuestion = function() {
		$location.path('/question');
	}

	vm.getResults();
}

})();
