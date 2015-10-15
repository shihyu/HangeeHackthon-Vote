require.config({
  paths: {
    echarts: 'http://echarts.baidu.com/build/dist'
  }
});

$.ajax({
  url: 'http://localhost:8080/api/teams',
  type: 'GET',
  success: function(data){

    //console.log('data', data);
    //console.log('count', data.length);

    require(
      [
        'echarts',
        'echarts/chart/line',
        'echarts/chart/bar'
      ],
      function(ec) {
        var myChart = ec.init(document.getElementById('main'));
        var option = {
          title: {
            x: 'center',
            text: '投票統計結果',
            subtext: '統計結果',
          },
          tooltip: {
            trigger: 'item'
          },
          toolbox: {
            show: true,
            feature: {
              magicType:{
                show: true,
                type: ['bar', 'line']
              },
              saveAsImage: {
                show: true,
                title: '儲存圖片',
                type: 'png',
                lang: ['點擊儲存']
              }
            }
          },
          grid: {
            borderWidth: 0,
            y: 80,
            y2: 60
          },
          xAxis: [{
            type: 'category',
            show: false,
            data: data.map(function(team){
              return team.projectName;
            })
          }],
          yAxis: [{
            type: 'value',
            show: true
          }],
          series: [{
            name: '票數',
            type: 'bar',
            itemStyle: {
              normal: {
                color: function(params) {
                  // build a color map as your need.
                  var colorList = [
                    '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                    '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                    '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                  ];
                  return colorList[params.dataIndex%15]
                },
                label: {
                  show: true,
                  position: 'top',
                  formatter: '{b}\n{c}'
                }
              }
            },
            data: data.map(function(team){
              return team.vote;
            })
          }]
        };
        myChart.setOption(option);
        window.onresize = myChart.resize;
  });
  }
});
