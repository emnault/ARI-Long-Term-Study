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
      //   [4, 1.55, 8, 3.90] // 1:33
      // ]);

      // //2. 248
      // data.addRows([
      //   [1, 2.60, 7, 6.25], //2:36
      //   [2, 2.48, 7, 5.82] //2:29
      // ]);

      // //3. 826
      // data.addRows([
      //   [1, 2.35, 7, 5.27], //2:21
      //   [2, 2.67, 7, 5.23], //2:40
      //   [3, 2.32, 5, 4.41], //2:19
      //   [4, 2.30, 6, 4.06] //2:18
      // ]);


      // //4. 314
      // data.addRows([
      //   [1, 3.03, 6, 6.61], //3:02
      //   [2, 3.08, 7, 8.07], //3:05
      //   [3, 2.58, 7, 6.18], //2:35
      //   [4, 2.13, 8, 6.39] //2:08
      // ]);

      // //5. 573
      // data.addRows([
      //   [1, 3.63, 6, 8.00], //3:38
      //   [2, 2.95, 5, 6.76] //2:57
      // ]);

      // //6. 480
      // data.addRows([
      //   [1, 1.53, 7, 3.23], //1:32
      //   [2, 2.18, 6, 4.53], //2:11
      //   [3,  2.78, 6, 4.67], //2:47
      //   [4,  1.68, 6, 3.57] //1:41
      // ]);

      // //7. 924 
      // data.addRows([
      //   [1, 3.78, 7, 11.69], //3:47
      //   [2, 3.93, 7, 11.26], //3:56
      //   [3, 5.22, 8, 19.60], //5:13
      //   [4, 3.97, 8, 12.95] //3:58
      // ]);

      // //8. 500
      // data.addRows([
      //   [1, 2.48, 6, 4.19], //2:29
      //   [2, 2.52, 4, 4.03], //2:31
      //   [3, 1.95, 7, 3.28], //1:57
      //   [4, 2.67, 4, 3.02] //2:40
      // ]);

      // //9. 200
      // data.addRows([
      //   [1, 2.03, 7, 4.11], //2:02
      //   [2, 2.05, 7, 3.67] //2:03
      // ]);

      // //10. 600
      // data.addRows([
      //   [1, 3.33, 5, 8.22], //3:20
      //   [2, 2.47, 5, 5.60], //2:28
      //   [3, 2.60, 6, 5.06], //2:36
      //   [4, 1.60, 8, 4.10] //1:36
      // ]);

      // //11.676
      // data.addRows([
      //   [1, 3.23, 7, 7.84], //3:14
      //   [2, 2.07, 7, 4.84], //2:04
      //   [3, 1.98, 7, 4.47], //1:59
      //   [4, 2.07, 7, 4.22] //2:04
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
      //   [2, 2.65, 0, 1.63] // 2:39
      // ]);

      //2. 248
      data.addRows([
        [1, 2.75, 0, 1.69], //2:45
        [2, 2.85, 0, 1.76], //2:51
        [3, 2.97, 0, 1.33], //2:58
        [4, 2.98, 0, 1.35] //2:59
      ]);

      // //3. 826
      // data.addRows([
      //   [1, 3.25, 0, 1.52], // 3:15
      //   [2, 3.15, 1, 1.44], // 3:09
      //   [3, 3.17, 0, 1.94], // 3:10
      //   [4, 2.88, 1, 1.78] // 2:53
      // ]);

      // //4. 314
      // data.addRows([
      //   [1, 3.47, 0, 2.13], //3:28
      //   [2, 3.22, 1, 1.98] //3:13
      // ]);

      //5. 573
      // data.addRows([
      //   [1, 2.62, 0, 1.12], //2:37
      //   [2, 2.20, 1, 0.86] //2:12
      // ]);

      // //6. 480
      // data.addRows([
      //   [1,  3.02, 2, 1.85], //3:01
      //   [2,  2.85, 2, 1.75], //2:51
      //   [3,  3.23, 2, 1.51], //3:14
      //   [4,  2.75, 0, 1.20], //2:45
      // ]);

      // //7. 924
      // data.addRows([
      //   [1, 6.25, 1, 3.35], //6:15
      //   [2, 2.93, 0, 1.32], //2:56
      //   [3, 3.10, 0, 1.90], //3:06
      //   [4, 3.20, 0, 1.97] //3:12
      // ]);

      // //8. 500
      // data.addRows([
      //   [1, 2.78, 0, 1.22], //2:47
      //   [2, 2.63, 2, 1.11] //2:38
      // ]);

      // //9. 200
      // data.addRows([
      //   [1, 3.38, 2, 2.06], //3:23
      //   [2, 2.52, 1, 1.54], //2:31
      //   [3, , , ],//
      //   [4, , , ] //
      // ]);

      // //10. 600
      // data.addRows([
      //   [1, 2.97, 2, 1.82], //2:58
      //   [2, 4.28, 0, 2.64] //4:17
      // ]);

      // //11. 676
      // data.addRows([
      //   [1,  3.95, 0, 2.44],//3:57
      //   [2,  2.90, 0, 1.78], //2:54
      //   [3, 2.65, 0, 1.14], // 2:09
      //   [4, 2.53, 0, 1.07] // 2:32
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
      // ]);

      //2. 248
      data.addRows([
        [1, 3, 0, 1.90], 
        [2, 6, 0, 1.62] 
      ]);

      // //3. 826
      // data.addRows([
      //   [1,  4, 6, 2.22], 
      //   [2,  6, 3, 2.27], 
      //   [3,  6, 1, 2.34],
      //   [4,  6, 1, 1.87]
      // ]);

      //4. 314
      // data.addRows([
      //   [1, 6, 0, 1.45], 
      //   [2, 6, 1, 1.61] 
      // ]);

      // //5. 573
      // data.addRows([
      //   [1, 6, 0, 1.49], 
      //   [2, 6, 0, 1.92], 
      //   [3, 5, 2, 1.54], 
      //   [4, 5, 1, 1.42]
      // ]);

      // //6. 480
      // data.addRows([
      //   [1,  3, 0, 1.97],
      //   [2,  6, 3, 2.71],
      //   [3,  4, 7, 1.63],
      //   [4,  5, 5, 1.84]
      // ]);

      // //7. 924
      // data.addRows([
      //   [1, 6, 0, 1.74], 
      //   [2, 5, 3, 2.35], 
      //   [3, 6, 0, 1.72], 
      //   [4, 5, 1, 1.46] 
      // ]);

      // //8. 500
      // data.addRows([
      //   [1, 5, 5, 1.53], 
      //   [2, 6, 0, 1.59]
      // ]);

      // //9. 200
      // data.addRows([
      //   [1, 6, 2, 1.56], 
      //   [2, 6, 0, 1.85],
      //   [3, 5, 0, 1.46], 
      //   [4, 6, 0, 1.33]  
      // ]);
 
      // //10. 600
      // data.addRows([
      //   [1, 5, 0, 1.80], 
      //   [2, 5, 2, 1.75] 
      // ]);

      // //11. 676
      // data.addRows([
      //   [1,  5, 2, 1.99],
      //   [2,  6, 3, 2.26],
      //   [3,  6, 0, 1.68],
      //   [4,  6, 1, 1.83]
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

