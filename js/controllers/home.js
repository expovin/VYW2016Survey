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

		var cont = 0, coppia=0, SelezioneFiltro = 0;
		$scope.chart={};
	   //Put in interval, first trigger after 10 seconds 


		var chartsLibrary = {
			"appId": "b74e2ae5-4cda-402d-bccc-55b2e162cb6c",
			"chart" : {
				
				"type" : ["piechart","barchart"],
				"dimensioni" : ["JobLevel","JobFunction"],
				"misure" : "Count({<text={'$CAMPO$'}>}text)",
				"title" :  "Chi preferisce il ",
				"filtro" : [
							 ["PC","Chi preferisce i PC?"],
							 ["Mac","Chi invece è dovoto a Cupertino?"],
							 ["MP3","Chi sono quelli che preferiscono gli MP3?"],
							 ["Vinile","Chi piu' tradizionalmente preferisce il vinile?"],
							 ["Ibiza","Chi preferisce Ibiza?"],
							 ["Pantelleria","Chi sceglie Pantelleria?"],
							 ["Apericena","Ecco a chi piace l'apericena..."],
							 ["Lume di Candela","I romamtici che preferiscono il lume di candela"],
							 ["Uber","Uber su tutto!"],
							 ["Taxi","Meglio il buon vechio taxi"],
							 ["Quotidiano","Chi preferisce leggere le notizie sulla carta"],
							 ["News on Line","Chi invece preferisce leggere le notizie ON-LINE"],
							 ["Kindle","Tanti libri in poco spazio e poco peso, ecco chi preferisce il Kindle"],
							 ["Libro","Non rinuncio ad un buon libro stampato"],
							 ["Concerto live","Concerto live for ever!"],
							 ["Youtube","Preferisco la musica via Youtube"],
							 ["Cinema","Non rinunciano al grande schermo"],
							 ["Streaming","Meglio un buon film in streaming sul da gustare sul proprio divano"],
							 ["Riunione","Meglio le riunioni live"],
							 ["Conf call","Sfruttiamo la tecnologia ed evitiamo movimenti, meglio le conf call"],
							 ["Vela","Meglio la vela"],
							 ["Yacht","Meglio lo Yacht"]
							]
			}

		};

	   var theInterval = $interval(function(){
	    	
	      	cont += 1;
	      	coppia = cont % chartsLibrary.chart.type.length;
	      	SelezioneFiltro = cont % chartsLibrary.chart.filtro.length;
	      	$scope.chart.titolo = chartsLibrary.chart.filtro[SelezioneFiltro][1];

	      	$scope.chart.appId = chartsLibrary.appId;
	      	$scope.chart.Type= chartsLibrary.chart.type[coppia];
	      	$scope.chart.dimensione = chartsLibrary.chart.dimensioni[coppia];
	      	var str = chartsLibrary.chart.misure
	      	$scope.chart.misura = str.replace("$CAMPO$",chartsLibrary.chart.filtro[SelezioneFiltro][0]);
	      	
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
