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
                text: "<mark name='doTrick trickName=alive_6'/>Here is your data", 
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

    google.charts.load('current', {'packages':['line', 'corechart']});
    google.charts.setOnLoadCallback(drawCMChart);

    function drawSTChart() {

      var chartDiv = document.getElementById('chart_div');

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Attempts');
      data.addColumn('number', '# Correct (out of #)');
      data.addColumn('number', 'Errors');
      data.addColumn('number', 'Reaction Time');

      //Attempt #, num correct, num errors, RT
      data.addRows([
        [1,  5, 8, 2],

        // [6,  3, 1, 1.5]
      ]);

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
          ticks: [1, 2, 3, 4, 5, 6]
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

    function drawCCChart() {

      var chartDiv = document.getElementById('chart_div');

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Attempts');
      data.addColumn('number', 'Duration');
      data.addColumn('number', 'Errors');
      data.addColumn('number', 'Reaction Time');

      //Attempt #, num correct, num errors, RT
      data.addRows([
        [1,  3, 1.6, 1.5]
        // [6,  3, 1, 1.5]
      ]);

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
          0: {title: 'Number of Errors'},
          1: {title: 'Duration (mins) / \nReaction Time (secs)'}
          
        },
        hAxis: {
          textStyle : {
            fontSize: 24 
          },
          titleTextStyle: {
            fontSize: 24 
          },
          title: 'Attempts',
          ticks: [1, 2, 3, 4, 5, 6]
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

    function drawCMChart() {

      var chartDiv = document.getElementById('chart_div');

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Attempts');
      data.addColumn('number', '# Pairs');
      data.addColumn('number', 'Duration');
      data.addColumn('number', 'Reaction Time');

      //Attempt #, num correct, num errors, RT
      data.addRows([
        [1,  8, 0.8, 1.5],
        [2,  6, 1.5, 1.5],
        [3,  7, 0.9, 1.5],
        [4,  8, 1.8, 1.5],
        [5,  6, 1.3, 1.8]
        // [6,  3, 1, 1.5]
      ]);

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
          0: {title: 'Number of Pairs'},
          1: {title: 'Duration (mins) / \nReaction Time (secs)'}
          
        },
        hAxis: {
          textStyle : {
            fontSize: 24 
          },
          titleTextStyle: {
            fontSize: 24 
          },
          title: 'Attempts',
          ticks: [1, 2, 3, 4, 5, 6]
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

