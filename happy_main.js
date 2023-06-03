import { 
    type, 
    filterData,
} from './utilities.js';
import {
    SetHappyPieChart,
    setHappyFirstCanvas,
    setHappyLineChart,

} from './happy_canvas/set_canvas.js'
import {
    prepareHappyFirstBarChartData,
    prepareHappyLineChartData,
    prepareHappyPieChart
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
    let HappyData = prepareHappyFirstBarChartData(DataIntoFive[0].content);
    setHappyFirstCanvas(DataIntoFive[0].content, HappyData);
    // 獲得設定好選項的select
    let barchartSelect = addSelect(DataIntoFive);
    // // 綁訂到特定div
    let bardiv = document.querySelector('#first-chart'); 
    // 選定特定的class
    document.body.appendChild(barchartSelect); // V
    // 綁定事件
    barchartSelect.addEventListener("change", function(event){
        let getValue = event.target.value;
        bardiv.innerHTML = "";
        let HappyData = prepareHappyFirstBarChartData(DataIntoFive[getValue].content);
        setHappyFirstCanvas(DataIntoFive[getValue], HappyData);
    })
    // 結束添加
    // 第一種方法結尾
    // 圖表一結尾

    // 圖表二 分析不同種類的遊戲在不同間段出現的遊戲
    let genres = ['Shooter','Puzzle','Platform','Racing','Sports','Misc','Fighting','Action','Simulation','Adventure'];
    let HappyLineChartData = prepareHappyLineChartData(DataIntoFive);
    setHappyLineChart(HappyLineChartData, genres[0]);
    // 獲得設定好選項的select
    let linechartselect = addSelectGenre(genres);
    // 綁訂到特定div
    let linediv = document.querySelector('#line-chart');
    // 選定特定的class
    document.body.appendChild(linechartselect);
    // 綁定事件
    linechartselect.addEventListener("change", function(event){
        let getValue = event.target.value;
        linediv.innerHTML = "";
        let HappyLineChartData = prepareHappyLineChartData(DataIntoFive);
        setHappyLineChart(HappyLineChartData, genres[getValue]);
    })

    // 圖表三 圓餅圖
    let piechartData = prepareHappyPieChart(videoGameClean);
    SetHappyPieChart(piechartData, 0);
    // 獲得設定好選項的select
    let piechartselect = addSelectGenre(genres);
    // 綁訂到特定div
    let piediv = document.querySelector('#pie-chart');
    // 選定特定的class
    document.body.appendChild(piechartselect);
    // 綁定事件
    piechartselect.addEventListener("change", function(event){
        let getValue = event.target.value;
        piediv.innerHTML = "";
        // console.log(getValue)
        let HappypieChartData = piechartData;
        SetHappyPieChart(HappypieChartData, getValue);
    })


  }
// 資料讀取和entry point和data cleaning
d3.csv('./data/Video_Games_Sales_as_at_22_Dec_2016.csv', type).then(
    result => {
        ready(result)
    }
  )
  

