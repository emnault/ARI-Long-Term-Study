import * as RRLIB from '../../js/modules/rrlib.js'


// RRLIB speech for the games

class DefaultWeb {
    constructor() {
        this.ros = new RRLIB.Ros({
            host: 'http://' + window.location.hostname
        });
        this.tts_action = new RRLIB.ActionClient({
            ros: this.ros,
            name: 'tts'
        });
    }

    init() {
        let param = new RRLIB.Param({
            ros: this.ros,
            name: 'robot_info'
        });
    }
    async firstFrase() {
        let goal_id = '';                       
        // Respond
        this.tts_action.sendGoal({
            rawtext: {
                text: "<mark name='doTrick trickName=open_hands_out'/>Here is an overview of your performance up to this point in our journey. Great work!<mark name='doTrick trickName=alive_3'/>", 
                lang_id: "en_GB"
            }
        }, (response) => {
            goal_id = response.goal_id;
        });

        return;
    }

    
}

let default_web = new DefaultWeb();

$(document).ready(function() {

    default_web.firstFrase();

    google.charts.load('current', {'packages':['line', 'corechart']});
    google.charts.setOnLoadCallback(drawCMChart);
    function drawCMChart() {

      var chartDiv = document.getElementById('chart_div');

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Attempts');
      data.addColumn('number', 'Duration');
      data.addColumn('number', '# Pairs (out of 10)');
      data.addColumn('number', 'Reaction Time');

      //Attempt #, duration, #pairs, RT

      // //1. 974
      // data.addRows([
      //   [1, 2.7, 6, 5.44], // 2:42
      //   [2, 2.68, 6, 4.83], // 2:41
      //   [3, 2.05, 7, 3.66], // 2:03
      //   [4, 1.55, 8, 3.90], // 1:33
      //   [5, 1.98, 8, 5.72], //1:59
      //   [6, 2.75, 5, 5.97], //2:45
      //   [7, 1.98, 7, 3.89], //1:59
      //   [8, 2.28, 6, 3.98] //2:17
      // ]);

      // //2. 248
      // data.addRows([
      //   [1, 2.60, 7, 6.25], //2:36
      //   [2, 2.48, 7, 5.82], //2:29
      //   [3, 2.50, 7, 5.26], //2:30
      //   [4, 1.92, 8, 5.46], //1:55
      //   [5, 2.67, 7, 6.47], //2:40
      //   [6, 1.73, 7, 5.07], //1:44
      //   [7, 2.72, 6, 5.50], //2:43
      //   [8, 2.08, 6, 5.29] //2:05
      // ]);

      //3. 826
      data.addRows([
        [1, 2.35, 7, 5.27], //2:21
        [2, 2.67, 7, 5.23], //2:40
        [3, 2.32, 5, 4.41], //2:19
        [4, 2.30, 6, 4.06], //2:18
        [5, 2.25, 7, 4.89], //2:15
        [6, 1.78, 8, 4.27], //1:47
        [7, , , ], //
        [8, , , ] //
      ]);


      // //4. 314
      // data.addRows([
      //   [1, 3.03, 6, 6.61], //3:02
      //   [2, 3.08, 7, 8.07], //3:05
      //   [3, 2.58, 7, 6.18], //2:35
      //   [4, 2.13, 8, 6.39], //2:08
      //   [5, 2.42, 7, 4.94], //2:25
      //   [6, 2.22, 6, 5.17], //2:13
      //   [7, 2.30, 6, 6.21], //2:18
      //   [8, 2.97, 7, 6.87] //2:58
      // ]);

      // //5. 573
      // data.addRows([
      //   [1, 3.63, 6, 8.00], //3:38
      //   [2, 2.95, 5, 6.76], //2:57
      //   [3, 1.60, 8, 3.49], //1:36
      //   [4, 2.32, 6, 3.63], //2:19
      //   [5, 2.23, 7, 4.87], //2:14
      //   [6, 1.87, 8, 4.60], //1:52
      //   [7, 1.93, 7, 3.76], //1:56
      //   [8, 1.72, 8, 3.48] //1:43
      // ]);

      // //6. 480
      // data.addRows([
      //   [1, 1.53, 7, 3.23], //1:32
      //   [2, 2.18, 6, 4.53], //2:11
      //   [3, 2.78, 6, 4.67], //2:47
      //   [4, 1.68, 6, 3.57], //1:41
      //   [5, 1.50, 8, 3.69], //1:30
      //   [6, 1.58, 8, 4.04], //1:35
      //   [7, 2.12, 7, 3.90], //2:07
      //   [8, 2.22, 7, 4.25] //2:13
      // ]);

      // //7. 924 
      // data.addRows([
      //   [1, 3.78, 7, 11.69], //3:47
      //   [2, 3.93, 7, 11.26], //3:56
      //   [3, 5.22, 8, 19.60], //5:13
      //   [4, 3.97, 8, 12.95], //3:58
      //   [5, 4.43, 7, 12.04], //4:26
      //   [6, 4.12, 7, 13.04], //4:07
      //   [7, 4.00, 7, 11.46], //4:00
      //   [8, 3.45, 7, 9.40] //3:27
      // ]);

      // //8. 500
      // data.addRows([
      //   [1, 2.48, 6, 4.19], //2:29
      //   [2, 2.52, 4, 4.03], //2:31
      //   [3, 1.95, 7, 3.28], //1:57
      //   [4, 2.67, 4, 3.02], //2:40
      //   [5, 2.13, 6, 3.00], //2:08
      //   [6, 1.75, 7, 3.06], //1:45
      //   [7, 2.00, 7, 3.46], //2:00
      //   [8, 2.38, 6, 3.83] //2:23
      // ]);

      // //9. 200
      // data.addRows([
      //   [1, 2.03, 7, 4.11], //2:02
      //   [2, 2.05, 7, 3.67], //2:03
      //   [3, 2.07, 7, 4.20], //2:04
      //   [4, 2.28, 7, 4.50], //2:17
      //   [5, 1.70, 8, 3.92], //1:42
      //   [6, 1.70, 8, 3.40], //1:42
      //   [7, 1.95, 7, 3.81], //1:57
      //   [8, 1.90, 8, 4.70] //1:54
      // ]);

      // //10. 600
      // data.addRows([
      //   [1, 3.33, 5, 8.22], //3:20
      //   [2, 2.47, 5, 5.60], //2:28
      //   [3, 2.60, 6, 5.06], //2:36
      //   [4, 1.60, 8, 4.10], //1:36
      //   [5, 2.10, 6, 5.32], //2:06
      //   [6, 1.88, 7, 4.21], //1:53
      //   [7, 3.25, 7, 7.87], //3:15
      //   [8, 2.60, 7, 5.01] //2:36
      // ]);

      // //11.676
      // data.addRows([
      //   [1, 3.23, 7, 7.84], //3:14
      //   [2, 2.07, 7, 4.84], //2:04
      //   [3, 1.98, 7, 4.47], //1:59
      //   [4, 2.07, 7, 4.22], //2:04
      //   [5, 3.05, 6, 5.52], //3:03
      //   [6, 2.68, 5, 5.73], //2:41
      //   [7, , , ], //
      //   [8, , , ] //
      // ]);


      var classicOptions = {
        title: 'Card Matching Feedback',
        width: 1100,
        height: 600,

        titleTextStyle: {
          fontSize: 40
        },
        // Gives each series an axis that matches the vAxes number below.
        series: {
          0: {targetAxisIndex: 0},
          1: {targetAxisIndex: 1},
          2: {targetAxisIndex: 1}
        },
        vAxes: {
          // Adds titles to each axis.
          0: {title: 'Duration (mins)'},
          1: {title: 'Number of Pairs / \nReaction Time (secs)'}
          
        },
        hAxis: {
          textStyle : {
            fontSize: 24 
          },
          titleTextStyle: {
            fontSize: 24 
          },
          title: 'Attempts',
          ticks: [1, 2, 3, 4, 5, 6, 7, 8]
        },
        vAxis: {
          // viewWindow: {
          //   max: 8
          // },
          textStyle : {
            fontSize: 24 
          },
          titleTextStyle: {
            fontSize: 24 
          }
        },

        legend: {
          textStyle: {
            fontSize: 24
          }
        },
        lineWidth: 7,
      };

      var classicChart = new google.visualization.LineChart(chartDiv);
      classicChart.draw(data, classicOptions);
    }
    

    function drawCCChart() {

      var chartDiv = document.getElementById('chart_div');

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Attempts');
      data.addColumn('number', 'Duration');
      data.addColumn('number', 'Errors');
      data.addColumn('number', 'Reaction Time');

      //Attempt #, duration, num errors, RT

      // //1. 974
      // data.addRows([
      //   [1, 3.83, 1, 2.34], // 3:50 
      //   [2, 2.65, 0, 1.63], // 2:39
      //   [3, 2.82, 0, 1.24], //2:49
      //   [4, 2.75, 1, 1.19], //2:45
      //   [5, 2.80, 0, 1.24], //2:48
      //   [6, 2.65, 1, 1.15], //2:39
      //   [7, 2.70, 0, 1.66], //2:42
      //   [8, 2.87, 0, 1.77] //2:52
      // ]);

      // //2. 248
      // data.addRows([
      //   [1, 2.75, 0, 1.69], //2:45
      //   [2, 2.85, 0, 1.76], //2:51
      //   [3, 2.97, 0, 1.33], //2:58
      //   [4, 2.98, 0, 1.35], //2:59
      //   [5, 2.82, 0, 1.25], //2:49
      //   [6, 2.58, 0, 1.10], //2:35
      //   [7, 2.32, 0, 1.42], //2:19
      //   [8, 2.32, 0, 1.42] //2:19
      // ]);

      //3. 826
      data.addRows([
        [1, 3.25, 0, 1.52], // 3:15
        [2, 3.15, 1, 1.44], // 3:09
        [3, 3.17, 0, 1.94], // 3:10
        [4, 2.88, 1, 1.78], // 2:53
        [5, 3.50, 0, 2.16], //3:30
        [6, 3.58, 0, 2.20], //3:35
        [7, 3.00, 1, 1.36], //3:00
        [8, 2.82, 0, 1.25] //2:49
      ]);

      // //4. 314
      // data.addRows([
      //   [1, 3.47, 0, 2.13], //3:28
      //   [2, 3.22, 1, 1.98], //3:13
      //   [3, 3.47, 0, 1.65], //3:28
      //   [4, 3.03, 0, 1.38], //3:02
      //   [5, 3.38, 1, 2.08], //3:23
      //   [6, 3.88, 1, 2.39], //3:53
      //   [7, 2.92, 0, 1.30], //2:55
      //   [8, 3.07, 2, 1.40] //3:04
      // ]);

      // //5. 573
      // data.addRows([
      //   [1, 2.62, 0, 1.12], //2:37
      //   [2, 2.20, 1, 0.86], //2:12
      //   [3, 2.40, 1, 1.46], //2:24
      //   [4, 2.10, 1, 1.29], //2:06
      //   [5, 2.33, 1, 0.95], //2:20
      //   [6, 2.47, 0, 1.03], //2:28
      //   [7, 2.65, 0, 1.63], //2:39
      //   [8, 2.35, 0, 1.45] //2:21
      // ]);

      // //6. 480
      // data.addRows([
      //   [1,  3.02, 2, 1.85], //3:01
      //   [2,  2.85, 2, 1.75], //2:51
      //   [3,  3.23, 2, 1.51], //3:14
      //   [4,  2.75, 0, 1.20], //2:45
      //   [5,  2.60, 0, 1.60], //2:36
      //   [6,  2.60, 3, 1.60], //2:36
      //   [7, 2.72, 2, 1.18], //2:43
      //   [8, 2.47, 2, 1.03] //2:28
      // ]);

      // //7. 924
      // data.addRows([
      //   [1, 6.25, 1, 3.35], //6:15
      //   [2, 2.93, 0, 1.32], //2:56
      //   [3, 3.10, 0, 1.90], //3:06
      //   [4, 3.20, 0, 1.97], //3:12
      //   [5, 3.22, 0, 1.49], //3:13
      //   [6, 2.97, 0, 1.34], //2:58
      //   [7, 3.43, 0, 2.11], //03:26
      //   [8, 3.00, 0, 1.85] //03:00
      // ]);

      // //8. 500
      // data.addRows([
      //   [1, 2.78, 0, 1.22], //2:47
      //   [2, 2.63, 2, 1.11], //2:38
      //   [3, 2.58, 1, 1.58], //2:35
      //   [4, 2.47, 1, 1.51], //2:28
      //   [5, 2.43, 0, 1.49], //2:26
      //   [6, 2.25, 0, 1.39], //2:15
      //   [7, 2.50, 1, 1.05], //2:30
      //   [8, 2.55, 2, 1.08] //2:33
      // ]);

      // //9. 200
      // data.addRows([
      //   [1, 3.38, 2, 2.06], //3:23
      //   [2, 2.52, 1, 1.54], //2:31
      //   [3, 2.45, 1, 1.02],//2:27
      //   [4, 2.42, 1, 1.00], //2:25
      //   [5, 2.52, 0, 1.07], //2:31
      //   [6, 2.42, 0, 1.00], //2:25
      //   [7, 2.62, 1, 1.61], //2:37
      //   [8, 2.32, 2, 1.41] //2:19
      // ]);

      // //10. 600
      // data.addRows([
      //   [1, 2.97, 2, 1.82], //2:58
      //   [2, 4.28, 0, 2.64], //4:17
      //   [3, 2.88, 0, 1.28], //2:53
      //   [4, 3.02, 0, 1.37], //3:01
      //   [5, 3.17, 0, 1.46], //3:10
      //   [6, 2.90, 3, 1.28], //2:54
      //   [7, 3.20, 0, 1.97], //3:12
      //   [8, 3.28, 2, 2.05] //3:17
      // ]);

      // //11. 676
      // data.addRows([
      //   [1, 3.95, 0, 2.44],//3:57
      //   [2, 2.90, 0, 1.78], //2:54
      //   [3, 2.65, 0, 1.14], // 2:09
      //   [4, 2.53, 0, 1.07], // 2:32
      //   [5, 2.78, 0, 1.23], //2:47
      //   [6, 2.92, 0, 1.30], //2:55
      //   [7, 2.83, 0, 1.74], //2:50
      //   [8, 2.87, 1, 1.81] //2:52
      // ]);


      var classicOptions = {
        title: 'Category Checker Feedback',
        width: 1100,
        height: 600,

        titleTextStyle: {
          fontSize: 40
        },
        // Gives each series an axis that matches the vAxes number below.
        series: {
          0: {targetAxisIndex: 0},
          1: {targetAxisIndex: 1},
          2: {targetAxisIndex: 1}
        },
        vAxes: {
          // Adds titles to each axis.
          0: {title: 'Duration (mins)'},
          1: {title: 'Number of Errors / \nReaction Time (secs)'}
          
        },
        hAxis: {
          textStyle : {
            fontSize: 24 
          },
          titleTextStyle: {
            fontSize: 24 
          },
          title: 'Attempts',
          ticks: [1, 2, 3, 4, 5, 6, 7, 8]
        },
        vAxis: {
          // viewWindow: {
          //   max: 8
          // },
          textStyle : {
            fontSize: 24 
          },
          titleTextStyle: {
            fontSize: 24 
          },
        },

        legend: {
          textStyle: {
            fontSize: 24
          }
        },
        lineWidth: 7,
      };

      var classicChart = new google.visualization.LineChart(chartDiv);
      classicChart.draw(data, classicOptions);
    }

    function drawSTChart() {

      var chartDiv = document.getElementById('chart_div');

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Attempts');
      data.addColumn('number', '# Correct (out of 6)');
      data.addColumn('number', 'Errors');
      data.addColumn('number', 'Reaction Time');

      //Attempt #, num correct, num errors, RT
      // //1. 974
      // data.addRows([
      //   [1, 5, 3, 2.11], 
      //   [2, 6, 2, 1.86],
      //   [3, 5, 1, 1.65], 
      //   [4, 6, 0, 1.69], 
      //   [5, 6, 0, 1.95], 
      //   [6, 6, 0, 1.72], 
      //   [7, 6, 1, 1.42], 
      //   [8, 6, 1, 1.59] 
      // ]);

      // //2. 248
      // data.addRows([
      //   [1, 3, 0, 1.90], 
      //   [2, 6, 0, 1.62],
      //   [3, 6, 0, 1.74],
      //   [4, 5, 0, 1.73], 
      //   [5, 6, 0, 1.90], 
      //   [6, 5, 0, 1.64], 
      //   [7, 6, 1, 1.60], 
      //   [8, 6, 0, 2.52]
      // ]);

      // //3. 826
      // data.addRows([
      //   [1, 4, 6, 2.22], 
      //   [2, 6, 3, 2.27], 
      //   [3, 6, 1, 2.34],
      //   [4, 6, 1, 1.87],
      //   [5, 6, 2, 1.69], 
      //   [6, 6, 0, 1.81], 
      //   [7, , , ], 
      //   [8, , , ]
      // ]);

      // 4. 314
      data.addRows([
        [1, 6, 0, 1.45], 
        [2, 6, 1, 1.61], 
        [3, 6, 2, 1.73], 
        [4, 6, 2, 2.64], 
        [5, 6, 2, 1.67], 
        [6, 5, 3, 1.53], 
        [7, 6, 1, 1.59], 
        [8, 6, 0, 2.15]
      ]);

      // //5. 573
      // data.addRows([
      //   [1, 6, 0, 1.49], 
      //   [2, 6, 0, 1.92], 
      //   [3, 5, 2, 1.54], 
      //   [4, 5, 1, 1.42],
      //   [5, 6, 0, 1.66], 
      //   [6, 6, 0, 1.42], 
      //   [7, 5, 1, 1.03], 
      //   [8, 6, 0, 1.71]
      // ]);

      // //6. 480
      // data.addRows([
      //   [1,  3, 0, 1.97],
      //   [2,  6, 3, 2.71],
      //   [3,  4, 7, 1.63],
      //   [4,  5, 5, 1.84],
      //   [5,  6, 3, 1.71],
      //   [6,  5, 2, 2.24],
      //   [7, 6, 1, 1.46], 
      //   [8, 4, 0, 1.57]
      // ]);

      // //7. 924
      // data.addRows([
      //   [1, 6, 0, 1.74], 
      //   [2, 5, 3, 2.35], 
      //   [3, 6, 0, 1.72], 
      //   [4, 5, 1, 1.46], 
      //   [5, 6, 1, 1.75], 
      //   [6, 6, 0, 1.50],
      //   [7, 6, 4, 2.00], 
      //   [8, 6, 2, 2.34] 
      // ]);

      // //8. 500
      // data.addRows([
      //   [1, 5, 5, 1.53], 
      //   [2, 6, 0, 1.59],
      //   [3, 6, 0, 1.60], 
      //   [4, 6, 0, 1.43],
      //   [5, 6, 0, 1.14], 
      //   [6, 6, 0, 1.18], 
      //   [7, 6, 0, 1.21], 
      //   [8, 6, 0, 1.14]
      // ]);

      // //9. 200
      // data.addRows([
      //   [1, 6, 2, 1.56], 
      //   [2, 6, 0, 1.85],
      //   [3, 5, 0, 1.46], 
      //   [4, 6, 0, 1.33], 
      //   [5, 4, 1, 1.32], 
      //   [6, 6, 0, 1.25], 
      //   [7, 6, 0, 1.58], 
      //   [8, 6, 0, 1.12] 
      // ]);
 
      // //10. 600
      // data.addRows([
      //   [1, 5, 0, 1.80], 
      //   [2, 5, 2, 1.75], 
      //   [3, 6, 0, 1.43], 
      //   [4, 6, 0, 1.82],
      //   [5, 6, 0, 1.31], 
      //   [6, 6, 0, 1.42], 
      //   [7, 6, 0, 1.39], 
      //   [8, 6, 0, 1.47]
      // ]);

      // //11. 676
      // data.addRows([
      //   [1,  5, 2, 1.99],
      //   [2,  6, 3, 2.26],
      //   [3,  6, 0, 1.68],
      //   [4,  6, 1, 1.83],
      //   [5, 6, 1, 1.74], 
      //   [6, 6, 0, 1.57], 
      //   [7, , , ], 
      //   [8, , , ]
      // ]);

      var classicOptions = {
        title: 'Sound Targeting Feedback',
        width: 1100,
        height: 600,

        titleTextStyle: {
          fontSize: 40
        },
        // Gives each series an axis that matches the vAxes number below.
        series: {
          0: {targetAxisIndex: 0},
          1: {targetAxisIndex: 0},
          2: {targetAxisIndex: 1}
        },
        vAxes: {
          // Adds titles to each axis.
          0: {title: 'Number Correct/Number of Errors'},
          1: {title: 'Reaction Time (secs)'}
          
        },
        hAxis: {
          textStyle : {
            fontSize: 24 
          },
          titleTextStyle: {
            fontSize: 24 
          },
          title: 'Attempts',
          ticks: [1, 2, 3, 4, 5, 6, 7, 8]
        },
        vAxis: {
          viewWindow: {
            max: 8
          },
          textStyle : {
            fontSize: 24 
          },
          titleTextStyle: {
            fontSize: 24 
          }
        },

        legend: {
          textStyle: {
            fontSize: 24
          }
        },
        lineWidth: 7,
      };

      var classicChart = new google.visualization.LineChart(chartDiv);
      classicChart.draw(data, classicOptions);
    }
    
  // Add event listeners
    $("#cmbutton").on("touchend", function(){
        google.charts.load('current', {'packages':['line', 'corechart']});
        google.charts.setOnLoadCallback(drawCMChart);
        document.getElementById("stbutton").className = "big-green-btn";
        document.getElementById("cmbutton").className = "disabled-btn";
        document.getElementById("ccbutton").className = "big-green-btn";
  });
    $("#ccbutton").on("touchend", function(){
        google.charts.load('current', {'packages':['line', 'corechart']});
        google.charts.setOnLoadCallback(drawCCChart);
        document.getElementById("stbutton").className = "big-green-btn";
        document.getElementById("cmbutton").className = "big-green-btn";
        document.getElementById("ccbutton").className = "disabled-btn";
  });
    
    $("#stbutton").on("touchend", function(){
        google.charts.load('current', {'packages':['line', 'corechart']});
        google.charts.setOnLoadCallback(drawSTChart);
        document.getElementById("stbutton").className = "disabled-btn";
        document.getElementById("cmbutton").className = "big-green-btn";
        document.getElementById("ccbutton").className = "big-green-btn";
  });
});

