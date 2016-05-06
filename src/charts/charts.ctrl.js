export default function ChartsCtrl($scope, $q, $timeout, dataservice, busyservice) {
  const vm = this;
  
  function createCharts() {
    vm.charts = [];
    
    var dailyChartData  =  {
      "type": "AreaChart",
      "displayed": true,
      "data": {
        "cols": [
          { "id": "time", "label": "Time", "type": "string","p": {} },
          { "id": "projected", "label": "Projected", "type": "number","p": {} },
          { "id": "actual", "label": "Actual", "type": "number","p": {} }
        ]
      },
      "options": {
        "title": "Daily Projected vs. Actual (kWh)",
        'width':550,
        'height':300,
        'chartArea':{'left':40,'top':30,'width':'70%','height':'75%'},
        "isStacked": "false",
        "fill": 20,
        "displayExactValues": true,
        "vAxis": {
          "gridlines": {
            "count": 10
          }
        }
      },
      "formatters": {},
      "view": {
        "columns": [
          0,
          1,
          2
        ]
      }
    } 
    dailyChartData.data.rows = [];
    addMockedDailyData("",dailyChartData.data.rows);
    
    var futureDailyChartData  =  {
      "type": "AreaChart",
      "displayed": true,
      "data": {
        "cols": [
          { "id": "time", "label": "Time", "type": "string","p": {} },
          { "id": "projected", "label": "Projected", "type": "number","p": {} }

        ]
      },
      "options": {
        "title": "Tomorrow's Daily Projected (kWh)",
        'width':550,
        'height':300,
        'chartArea':{'left':40,'top':30,'width':'70%','height':'75%'},
        "isStacked": "false",
        "fill": 20,
        "displayExactValues": true,
        "vAxis": {
          "gridlines": {
            "count": 10
          }
        }
      },
      "formatters": {},
      "view": {
        "columns": [
          0,
          1
        ]
      }
    } 
    
    futureDailyChartData.data.rows = [];
    addMockedDailyData("",futureDailyChartData.data.rows);
    
    var weeklyChartData  =  {
      "type": "AreaChart",
      "displayed": true,
      "data": {
        "cols": [
          { "id": "time", "label": "Day", "type": "string","p": {} },
          { "id": "projected", "label": "Projected", "type": "number","p": {} },
          { "id": "actual", "label": "Actual", "type": "number","p": {} }
        ]
      },
      "options": {
        "title": "Weekly Projected vs. Actual (kWh)",
        'width':550,
        'height':300,
        'chartArea':{'left':40,'top':30,'width':'70%','height':'75%'},
        "isStacked": "false",
        "fill": 20,
        "displayExactValues": true,
        "vAxis": {
          "gridlines": {
            "count": 10
          }
        }
      },
      "formatters": {},
      "view": {
        "columns": [
          0,
          1,
          2
        ]
      }
    } 
    
    weeklyChartData.data.rows = [];
    addMockedDailyData("Thurs ",weeklyChartData.data.rows);
    addMockedDailyData("Fri ",weeklyChartData.data.rows);
    addMockedDailyData("Sat ",weeklyChartData.data.rows);
    addMockedDailyData("Sun ",weeklyChartData.data.rows);
    addMockedDailyData("Mon ",weeklyChartData.data.rows);
    addMockedDailyData("Tues ",weeklyChartData.data.rows);
    addMockedDailyData("Wed ",weeklyChartData.data.rows);
    
    
    var futureWeeklyChartData  =  {
      "type": "AreaChart",
      "displayed": true,
      "data": {
        "cols": [
          { "id": "time", "label": "Day", "type": "string","p": {} },
          { "id": "projected", "label": "Projected", "type": "number","p": {} },
          { "id": "actual", "label": "Actual", "type": "number","p": {} }
        ]
      },
      "options": {
        "title": "Next Week Projected (kWh)",
        'legend':'right',
        'width':550,
        'height':300,
        'chartArea':{'left':40,'top':30,'width':'70%','height':'75%'},
        "isStacked": "false",
        "fill": 20,
        "displayExactValues": true,
        "vAxis": {
          "gridlines": {
            "count": 10
          }
        }
      },
      "formatters": {},
      "view": {
        "columns": [
          0,
          1
        ]
      }
    } 
    
    futureWeeklyChartData.data.rows = [];
    addMockedDailyData("Thurs ",futureWeeklyChartData.data.rows);
    addMockedDailyData("Fri ",futureWeeklyChartData.data.rows);
    addMockedDailyData("Sat ",futureWeeklyChartData.data.rows);
    addMockedDailyData("Sun ",futureWeeklyChartData.data.rows);
    addMockedDailyData("Mon ",futureWeeklyChartData.data.rows);
    addMockedDailyData("Tues ",futureWeeklyChartData.data.rows);
    addMockedDailyData("Wed ",futureWeeklyChartData.data.rows);
    
    var chart1   =  {
      name: "Daily Projected vs Actual",
      data: dailyChartData  
    }
    var chart2   =  {
      name: "chart 2",
      data: weeklyChartData  
    }
    var chart3   =  {
      name: "Future Daily Projected",
      data: futureDailyChartData  
    }
    
    var chart4 = {
      name: "Future Weekly Projected",
      data: futureWeeklyChartData
    }
    
    vm.charts.push(chart1);
    vm.charts.push(chart2);
    vm.charts.push(chart3);
    vm.charts.push(chart4);
  }
     
  function addMockedDailyData(dayPrefix, rows) {
    function nextRand(){return (Math.random()*0.4)+0.8;}
    rows.push(  
      {c: [ {"v": dayPrefix + "2:00"},{"v": 20*nextRand()}, {"v": 20*nextRand()}]},
      {c: [ {"v": dayPrefix + "5:00"},{"v": 80*nextRand()}, {"v": 80*nextRand()}]},
      {c: [ {"v": dayPrefix + "8:00"},{"v": 850*nextRand()}, {"v": 800*nextRand()}]},
      {c: [ {"v": dayPrefix +"11:00"},{"v": 1300*nextRand()},{"v": 1200*nextRand()}]},
      {c: [ {"v": dayPrefix +"14:00"},{"v": 1250*nextRand()},{"v": 1350*nextRand()}]},
      {c: [ {"v": dayPrefix +"17:00"},{"v": 900*nextRand()},{"v": 850*nextRand()}]},
      {c: [ {"v": dayPrefix +"20:00"},{"v": 200*nextRand()},{"v": 250*nextRand()}]},
      {c: [ {"v": dayPrefix +"23:00"},{"v": 20*nextRand()},{"v": 20*nextRand()}]},
    );
  }
  createCharts();   
  
  return vm; 
}