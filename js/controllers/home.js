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

		var contFamily = [-1,-1,-1], Family=0, count=-1,
		    rDim1=0, rDim2=0, 
		    rFiltro = 0, rType=0,
		    rOraria=0, lOraria=3;
		$scope.chart={};
	   //Put in interval, first trigger after 10 seconds 


		var chartsLibrary = {
			"appId": "b74e2ae5-4cda-402d-bccc-55b2e162cb6c",
			"chartFamily" : [{
				"type" : ["barchart"],
				"dimensioni" : ["JobLevel","JobFunction","Lead.Industry"],
				"misure" : "Count({<text={'$CAMPO$'}>}text)/Count({<Profilo={'MILLENNIAL','HIPPIE','SNOB','NERD'}>}Profile) * 100",
				"title" :  "Chi preferisce il ",
				"filtro" : [
							 ["PC","Chi preferisce i PC?"],
							 ["Mac","Chi invece è dovoto a Cupertino?"],
							 ["MP3","Chi sono quelli che preferiscono gli MP3?"],
							 ["Vinile","Chi piu' tradizionalmente preferisce il vinile?"],
							 ["Ibiza","Chi preferisce Ibiza?"],
							 ["Pantelleria","Chi sceglie Pantelleria?"],
							 ["Apericena","Ecco a chi piace l'apericena..."],
							 ["LumeCandela","I romamtici che preferiscono il lume di candela"],
							 ["Uber","Uber su tutto!"],
							 ["Taxi","Meglio il buon vechio taxi"],
							 ["Quotidiano","Chi preferisce leggere le notizie sulla carta"],
							 ["NewsOnLine","Chi invece preferisce leggere le notizie ON-LINE"],
							 ["Kindle","Tanti libri in poco spazio e poco peso, ecco chi preferisce il Kindle"],
							 ["Libro","Non rinuncio ad un buon libro stampato"],
							 ["Concerto","Concerto live for ever!"],
							 ["Youtube","Preferisco la musica via Youtube"],
							 ["Cinema","Non rinunciano al grande schermo"],
							 ["Streaming","Meglio un buon film in streaming sul da gustare sul proprio divano"],
							 ["Riunione","Meglio le riunioni live"],
							 ["ConfCall","Sfruttiamo la tecnologia ed evitiamo movimenti, meglio le conf call"],
							 ["Vela","Meglio la vela"],
							 ["Yacht","Meglio lo Yacht"]
							],
				"options": {
								"orientation" : "horizontal",
								"dataPoint": {"showLabels": true } ,
								"dimensionAxis": {"show": "all" } ,
								"measureAxis": {"show": "none" } ,
								"color": {"auto": false , "mode": "byMeasure" }
							}
			},
			{
				"type" : ["piechart"],
				"dimensioni" : ["JobLevel","JobFunction","Lead.Industry"],
				"misure" : "Count({<Profile={'$CAMPO$'}>}Profile)",
				"title" :  "Chi preferisce il ",
				"filtro" : [
					["HIPPIE","Come sono distribuiti gli Hippie?"],
					["MILLENNIAL","Dove sono i Millennial"],
					["NERD","Scopriamo chi è Nerd"],
					["SNOB","Ecco gli Snob"]
				],
				"options": {
								"donut": {"showAsDonut": true } ,
								"dataPoint": {"showLabels": true } ,
								"dimensionAxis": {"show": "all" } ,
								"measureAxis": {"show": "none" } ,
								"color": {"auto": false , "mode": "byMeasure" }
							}
			},
			{
				"type" : ["barchart"],
				"dimensioni" : ["ora"],
				"misure" : "Count({<Profile={'MILLENNIAL','SNOB','HIPPIE','NERD'}>}Profile)",
				"title" :  "Chi preferisce il ",
				"filtro" : [
					["Falso","Distribuzione oraria"]
				],
				"options": {
								"orientation" : "vertical",
								"dimensionAxis": {"show": "all" } ,
								"measureAxis": {"show": "none" } ,
								"color": {"auto": false , "singleColor": 5 }
							}
			},
			]

		};


	   var theInterval = $interval(function(){
	    	$scope.chart={}

	    	count +=1;
	    	Family = count % chartsLibrary.chartFamily.length;
	      	contFamily[Family] += 1;
	      	rOraria = count % lOraria;
	      	if(rOraria)
	      	    $scope.chart.Loop = false;
	      	else
	      		$scope.chart.Loop = true;

	      	rDim1 = contFamily[Family] % chartsLibrary.chartFamily[Family].dimensioni.length;
	      	rDim2 = (contFamily[Family]+1) % chartsLibrary.chartFamily[Family].dimensioni.length;
	      	rFiltro = contFamily[Family] % chartsLibrary.chartFamily[Family].filtro.length;
	      	rType = contFamily[Family] % chartsLibrary.chartFamily[Family].type.length;
	      	$scope.chart.titolo = chartsLibrary.chartFamily[Family].filtro[rFiltro][1];

	      	$scope.chart.appId = chartsLibrary.appId;
	      	$scope.chart.Type= chartsLibrary.chartFamily[Family].type[rType];
	      	$scope.chart.dimensione1 = chartsLibrary.chartFamily[Family].dimensioni[rDim1];
	      	$scope.chart.dimensione2 = chartsLibrary.chartFamily[Family].dimensioni[rDim2];
	      	var str = chartsLibrary.chartFamily[Family].misure
	      	$scope.chart.misura = str.replace("$CAMPO$",chartsLibrary.chartFamily[Family].filtro[rFiltro][0]);
	      	$scope.chart.options = chartsLibrary.chartFamily[Family].options;

	      	

	      	console.log($scope.chart);

	      	
	   }.bind(this), 15000); 



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
			
			app.obj.app.getObject('CHART1_ORARIO','EmatcB');
			/*
			app.obj.app.getObject('CHART2','Fyksmc');

			app.obj.app.getObject('CHART3','ACSSvY');
			app.obj.app.getObject('CHART4','RUHEftG');
*/

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
