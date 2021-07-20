
 if(window.location.pathname=="/mytestsite/highchart-test/" || window.location.pathname=="/mytestsite/highchart-test-2/"){
                    /* Angular Example */
                        var myApp = angular.module('myApp', []);
                        myApp.controller('GreetingController', ['$scope', function ($scope) {
                                $scope.hello = 'Hello World';
                    }]);

                        angular.element(document).ready(function() {
                          angular.bootstrap(document, ['myApp']);
                        });
                
                        /* highcharts example */
                        jQuery(function($){
                                $(document).ready(function() {

                                        if($("#containerChart").length){
                                                var chart = new Highcharts.Chart({
                                                  chart: {
                                                        renderTo: 'containerChart',
                                                        marginBottom: 80
                                                  },
                                                  xAxis: {
                                                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                                                        labels: {
                                                          rotation: 90
                                                        }
                                                  },

                                                  series: [{
                                                        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]        
                                                  }]
                                                });

                                        }
                                });
                        });             
                
                /* Highcharts map example https://codepen.io/mithunpk/pen/XgzNYM */
                
                        jQuery(function($){
                                $(document).ready(function() {
                                        if($("#containerMap").length){          
                                        // Prepare demo data
                                        // Data is joined to map using value of 'hc-key' property by default.
                                        // See API docs for 'joinBy' for more info on linking data and map.
                                        var data = [
                                                ['ca-5682', 0],
                                                ['ca-bc', 1],
                                                ['ca-nu', 2],
                                                ['ca-nt', 3],
                                                ['ca-ab', 4],
                                                ['ca-nl', 5],
                                                ['ca-sk', 6],
                                                ['ca-mb', 7],
                                                ['ca-qc', 8],
                                                ['ca-on', 9],
                                                ['ca-nb', 10],
                                                ['ca-ns', 11],
                                                ['ca-pe', 12],
                                                ['ca-yt', 13]
                                        ];
                                        var codeColors = {
                                        'ON':'#58A4D0',
                                        'QC':'#A4DF63',
                                        'BC':'#7A9E50',
                                        'AB':'#F5C181',
                                        'MB':'#EEA099',
                                        'SK':'#DEF4A6',
                                        'NU':'#92FAFD',
                                        'NT':'#FF6682',
                                        'YT':'#FFD239',
                                        'NL':'#B1070F',
                                        'PE':'#84C0C1',
                                        'NS':'#5ED16A',
                                        'NB':'#959CCA'
                                        }
                                        // Create the chart
                                        Highcharts.mapChart('containerMap', { 
                                                chart: {
                                                map: 'countries/ca/ca-all',
                                                },
                                        legend: {
                                                                enabled: false
                                                        },  
                                                title: {text: ''},
                                                credits: {enabled: false},
                                                mapNavigation: {
                                                        enabled: true,
                                                        enableButtons: false,
                                                        enableMouseWheelZoom: false
                                                },
                                                exporting: {
                                                        enabled: false
                                                },
                                                series: [{
                                                        data: data,
                                                        name: 'Calls by State',
                                                        color:'#f7f7f7',
                                                        borderColor:'#ccc',
                                                point:{       
                                                        events: {
                                                                mouseOver: function() {
                                                                        switch(this.name){
                                                                        case 'Ontario':this.graphic.attr({fill: '#58A4D0'});
                                                                        break;
                                                                        case 'British Columbia':this.graphic.attr({fill: '#7A9E50'});
                                                                        break;
                                                                        case 'Alberta':this.graphic.attr({fill: '#F5C181'});
                                                                        break; 
                                                                        case 'Québec':this.graphic.attr({fill: '#A4DF63'});
                                                                        break; 
                                                                        case 'Manitoba':this.graphic.attr({fill: '#EEA099'});
                                                                        break; 
                                                                        case 'Saskatchewan':this.graphic.attr({fill: '#DEF4A6'});
                                                                        break; 
                                                                        case 'Nunavut':this.graphic.attr({fill: '#92FAFD'});
                                                                        break; 
                                                                        case 'Yukon':this.graphic.attr({fill: '#FFD239'});
                                                                        break; 
                                                                        case 'Northwest Territories':this.graphic.attr({fill: '#FF6682'});
                                                                        break; 
                                                                        case 'Newfoundland and Labrador':this.graphic.attr({fill: '#B1070F'});
                                                                        break; 
                                                                        case 'Prince Edward Island':this.graphic.attr({fill: '#84C0C1'});
                                                                        break; 
                                                                        case 'Nova Scotia':this.graphic.attr({fill: '#5ED16A'});
                                                                        break; 
                                                                        case 'New Brunswick':this.graphic.attr({fill: '#959CCA'});
                                                                        break;
                                                                        default:this.graphic.attr({fill: '#EFEFEF'});                     
                                                                        }
                                                                },//end of mouseOver
                                                                mouseOut: function () {
                                                                                this.graphic.attr({fill: '#f7f7f7'});
                                                                        }//end of mouseOut             
                                                                }
                                                                },      
                                                        states: { 
                                                                hover: {color: '#ccc'}          
                                                        },      
                                                        dataLabels: {
                                                                enabled: true,
                                                                format: '{point.properties.postal-code}'
                                                        },
                                                tooltip: {
                                                        // pointFormat: '{point.properties.name}: {point.value}'
                                                        shared: true,
                                                        useHTML: true,
                                                        headerFormat: '<small><b>{point.key}<\/b><\/small><br><table>',
                                                        pointFormat: '<tr><td>Calls: <\/td>' +
                                                                '<td style="text-align: left"><span style="color:#225699;font-weight:bold;">{point.value}<\/span> (30.34%)<\/td><\/tr>',
                                                        footerFormat: '<\/table>',
                                                        valueDecimals: 2
                                                                }
                                                }]    
                                        });     

                                }
                        });
                });                                                             
                                                
        }
 