'use strict';

/** 
 * @ngdoc function
 * @name friluftsframjandetApp.controller:controller.dashboard
 * @author yianni.ververis@qlik.com
 * @description
 * # controller.dashboard
 * Controller of the myApp
 */
app.obj.angularApp
	.controller('controller.home', function ($scope, $rootScope, $location, $injector, $interval, api, utility) {

		var cont = 0, pageNum=0;
		$scope.chart={};
	   //Put in interval, first trigger after 10 seconds 


		var chartsLibrary = {
			"appId": "b74e2ae5-4cda-402d-bccc-55b2e162cb6c",
			"chart" : {
				"title" : "Chi preferisce il ",
				"type" : "piechart",
				"dimensioni" : ['JobLevel','JobFunction'],
				"misure" : "Count({<text={'$CAMPO$'}>}text)",
				"filtro" : ["PC","Mac","MP3","Vinile","Ibiza","Pantelleria","Apericena","Lume di Candela","Uber","Taxi","Quotidiano","News on Line",
							"Kindle","Libro","Concerto live","Youtube","Cinema","Streaming","Riunione","Conf call","Vela","Yacht"]
			}

		};

	   var theInterval = $interval(function(){
	    	
	      	cont += 1;

	      	$scope.chart.appId = chartsLibrary.appId;
	      	$scope.chart.Type= chartsLibrary.chart.type;
	      	$scope.chart.dimensione = chartsLibrary.chart.dimensioni[1];
	      	var str = chartsLibrary.chart.misure
	      	$scope.chart.misura = str.replace("$CAMPO$","PC");
	      	
	   }.bind(this), 10000); 




		var me = {};

		me.init = function () {
			me.measures = [
				["Count( {$<Priority={'High'}, Status -={'Closed'} >} Distinct %CaseId )", false]
			];
			$scope.kapi = [];
			me.objects = ['ycppXj'];
		}
		
		me.boot = function () {
			me.init();
			
			me.events();

			me.createKpis();
			me.getObjects();

			// For debugging selections uncommment the line below
			app.obj.app.getObject('CurrentSelections', 'CurrentSelections');
			//utility.log('Page loaded: ', $scope.page);



			//get objects -- inserted here --
			app.obj.app.getObject('CHART1','NrNAR');
			app.obj.app.getObject('CHART2','Fyksmc');
			app.obj.app.getObject('CHART3','ACSSvY');
			app.obj.app.getObject('CHART4','RUHEftG');


			//var prof={};
			
			//callbacks -- inserted here --
			function ProfileRank(reply, app){
				
			    //console.log(reply.qHyperCube.qDataPages[0].qMatrix);
			    $scope.ProfiloVotato = reply.qHyperCube.qDataPages[0].qMatrix[0][0].qText;
			    $scope.ShareProfilo =  reply.qHyperCube.qDataPages[0].qMatrix[0][2].qNum;

			    var profArr= [];
			    jQuery.each(reply.qHyperCube.qDataPages[0].qMatrix, function() {
			    	profArr.push({"Tipo":this[0].qText,"Share":this[2].qNum});
			    });
			    $scope.Profili = profArr;
			}

			app.obj.app.createCube({
			"qInitialDataFetch": [
				{
					"qHeight": 20,
					"qWidth": 4
				}
			],
			"qDimensions": [
				{
					"qDef": {
						"qFieldDefs": [
							"Profile"
						]
					},
					"qNullSuppression": true,
					"qOtherTotalSpec": {
						"qOtherMode": "OTHER_OFF",
						"qSuppressOther": true,
						"qOtherSortMode": "OTHER_SORT_DESCENDING",
						"qOtherCounted": {
							"qv": "5"
						},
						"qOtherLimitMode": "OTHER_GE_LIMIT"
					}
				}
			],
			"qMeasures": [
				{
					"qLabel": "NumeroRisposte",
					"qLibraryId": "gfWtEz",
					"qSortBy": {
						"qSortByState": 0,
						"qSortByFrequency": 0,
						"qSortByNumeric": 0,
						"qSortByAscii": 1,
						"qSortByLoadOrder": 0,
						"qSortByExpression": 0,
						"qExpression": {
							"qv": " "
						}
					}
				},
		{
			"qLabel": "Perc",
			"qLibraryId": "kLBaL",
			"qSortBy": {
				"qSortByState": 0,
				"qSortByFrequency": 0,
				"qSortByNumeric": 0,
				"qSortByAscii": 1,
				"qSortByLoadOrder": 0,
				"qSortByExpression": 0,
				"qExpression": {
					"qv": " "
				}
			}
		},
		{
			"qLabel": "TotVotanti",
			"qLibraryId": "tYDDb",
			"qSortBy": {
				"qSortByState": 0,
				"qSortByFrequency": 0,
				"qSortByNumeric": 0,
				"qSortByAscii": 1,
				"qSortByLoadOrder": 0,
				"qSortByExpression": 0,
				"qExpression": {
					"qv": " "
				}
			}
		}		

			],
			"qSuppressZero": true,
			"qSuppressMissing": true,
			"qMode": "S",
			"qInterColumnSortOrder": [],
			"qStateName": "$"
			},ProfileRank);


		};

		me.events = function () {
			me.getObjects = function () {
				api.destroyObjects().then(function(){
					api.getObjects(me.objects);
				})
			}
			me.createKpis = function() {
				angular.forEach(me.measures, function(value, key) {
					api.getHyperCube([], [value[0]], function(data){
						$scope.kapi[key] = (value[1])?utility.string2thousands(data[0][0].qText):data[0][0].qText;
					});
				});
			}
			$rootScope.clearAll = function () {
				app.obj.app.clearAll();
			}
			$rootScope.goTo = function(page) {
				api.destroyObjects().then(function(){
					$location.url('/' + page);
				});
			}
		}

		me.boot();
	});
