import { 
    type, 
    filterData,
} from './utilities.js';
import {
    SetHappyPieChart,
    setHappyFirstCanvas,
    setHappyLineChart,
    setBarChartCanvas,
    barcharttooltip,
    linecharttooltip
} from './happy_canvas/set_canvas.js'
import {
    prepareHappyFirstBarChartData,
    prepareHappyLineChartData,
    prepareHappyPieChart,
    calculatePublisherSales
} from './happy_canvas/prepare_data.js'
import  {
    divideintofive,
    addSelect,
    addSelectGenre
} from "./happy_canvas/others.js"


function ready(videoGameData) {
    const videoGameClean = filterData(videoGameData);
    // 讀取資料
    const DataIntoFive = divideintofive(videoGameClean); // array[obj]，其中content的部分是放分類過的資料。
    
    // 完成圖表一
    // 建立select
    // 自己的其中作業形式
    // 綁訂到bardiv
    let bardiv = document.querySelector('#first-chart'); 
    bardiv.innerHTML = `${barcharttooltip}`;
    let returnData = prepareHappyFirstBarChartData(DataIntoFive[0].content); 
    let HappyData = returnData[0];
    let maxObj = returnData[1];
    setHappyFirstCanvas(DataIntoFive[0].content, HappyData,maxObj);
    
    // 獲得設定好選項的select
    let barchartSelect = addSelect(DataIntoFive);
    let barwhere = document.body.querySelector(".PutSelectHere");
    barwhere.appendChild(barchartSelect);
    // 選定特定的class
    // 綁定事件
    barchartSelect.addEventListener("change", function(event){
        let getValue = event.target.value;
        bardiv.innerHTML = `${barcharttooltip}`;
    	let returnData = prepareHappyFirstBarChartData(DataIntoFive[getValue].content); 
    	let HappyData = returnData[0];
    	let maxObj = returnData[1];
    	setHappyFirstCanvas(DataIntoFive[getValue].content, HappyData,maxObj);
    })
    // 結束添加
    // 第一種方法結尾
    // 圖表一結尾

    // 圖表二 分析不同種類的遊戲在不同間段出現的遊戲
    let genres = ['Sports','Platform','Racing','Role-Playing','Puzzle','Misc','Shooter','Simulation','Action','Fighting','Adventure','Strategy'];
    // 綁訂到特定div
    let linediv = document.querySelector('#line-chart');    
    linediv.innerHTML = `${linecharttooltip}`;
    let HappyLineChartData = prepareHappyLineChartData(DataIntoFive)[0];
    console.log(HappyLineChartData);
    let maxSaleGameInthisFive = prepareHappyLineChartData(DataIntoFive)[1];
    setHappyLineChart(HappyLineChartData, genres[0],maxSaleGameInthisFive);
    // 獲得設定好選項的select
    let linechartselect = addSelectGenre(genres);
    // 選定特定的class
    let linewhere = document.body.querySelector(".PutSelectHere");
    linewhere.appendChild(linechartselect);
    // 綁定事件
    linechartselect.addEventListener("change", function(event){
        let getValue = event.target.value;
        linediv.innerHTML = `${linecharttooltip}`;
        let HappyLineChartData = prepareHappyLineChartData(DataIntoFive)[0];
        let maxSaleGameInthisFive = prepareHappyLineChartData(DataIntoFive)[1];
        console.log(genres[getValue]);
        setHappyLineChart(HappyLineChartData, genres[getValue],maxSaleGameInthisFive);
    })
    // 圖表三 圓餅圖
    let piechartData = prepareHappyPieChart(videoGameClean);
    SetHappyPieChart(piechartData, 0);
    // 獲得設定好選項的select
    let piechartselect = addSelectGenre(genres);
    // 綁訂到特定div
    let piediv = document.querySelector('#pie-chart');
    // 選定特定的class
    let piewhere = document.body.querySelector(".PutSelectHere");
    piewhere.appendChild(piechartselect);
    // 綁定事件
    piechartselect.addEventListener("change", function(event){
        let getValue = event.target.value;
        piediv.innerHTML = "";
        // console.log(getValue)
        let HappypieChartData = piechartData;
        SetHappyPieChart(HappypieChartData, getValue);
    })

    // eric update
    // 取得各發行商在不同地區的銷售量
    const publisherSalesData = calculatePublisherSales(videoGameClean);
  
    const select = d3.select('#region-select');
    const regions = ['NA_Sales', 'EU_Sales', 'JP_Sales', 'Other_Sales'];
    
    select
        .selectAll('option')
        .data(regions)
        .enter()
        .append('option')
        .text(d => d);

  select.on('change', function() {
    const selectedRegion = d3.select(this).property('value');
    setBarChartCanvas(publisherSalesData, selectedRegion);
  });
    // 建立長條圖的 canvas
    setBarChartCanvas(publisherSalesData, regions[0]);
  }
// 資料讀取和entry point和data cleaning
d3.csv('./data/Video_Games_Sales_as_at_22_Dec_2016.csv', type).then(
    result => {
        ready(result)
    }
  )
  

