import { 
    type, 
    filterData,
} from '../utilities.js';
import {
    setHappyFirstCanvas,
    setHappyLineChart
} from '../happy_canvas/set_canvas.js'
import {
    prepareHappyFirstBarChartData,
    prepareHappyLineChartData
} from '../happy_canvas/prepare_data.js'
import  {
    divideintofive,
    addSelect,
    addSelectGenre
} from "../happy_canvas/others.js"

function ready(videoGameData) {
    const videoGameClean = filterData(videoGameData);
    // 讀取資料
    const DataIntoFive = divideintofive(videoGameClean); // array[obj]，其中content的部分是放分類過的資料。
    // 完成圖表一
    // 建立select
    // 自己的其中作業形式
    let returnData = prepareHappyFirstBarChartData(DataIntoFive[0].content); 
    let HappyData = returnData[0];
    let maxObj = returnData[1];
    setHappyFirstCanvas(DataIntoFive[0].content, HappyData,maxObj);
    
    // 獲得設定好選項的select
    let barchartSelect = addSelect(DataIntoFive);
    // // 綁訂到特定div
    let bardiv = document.querySelector('#first-chart'); 
    // 選定特定的class
    document.body.appendChild(barchartSelect); // V
    // 綁定事件
    barchartSelect.addEventListener("change", function(event){
        let getValue = event.target.value;
        bardiv.innerHTML = `
        <div class = "tooltip">
            <div class = "tip-header">
                <h3></h3>
                <h4></h4>
                <h5></h5>
            </div>
            <div class = "tip-body"></div>
        </div>
        `
    		let returnData = prepareHappyFirstBarChartData(DataIntoFive[getValue].content); 
    		let HappyData = returnData[0];
    		let maxObj = returnData[1];
    		setHappyFirstCanvas(DataIntoFive[getValue].content, HappyData,maxObj);
    })
    // 結束添加
    // 第一種方法結尾
    // 圖表一結尾

    // 圖表二 分析不同種類的遊戲在不同間段出現的遊戲
    let genres = ['Shooter','Puzzle','Platform','Racing','Sports','Misc','Fighting','Action','Simulation','Adventure'];
    let HappyLineChartData = prepareHappyLineChartData(DataIntoFive)[0];
    let maxSaleGameInthisFive = prepareHappyLineChartData(DataIntoFive)[1];
    setHappyLineChart(HappyLineChartData, genres[0],maxSaleGameInthisFive);
    // 獲得設定好選項的select
    let linechartselect = addSelectGenre(genres);
    // 綁訂到特定div
    let linediv = document.querySelector('#line-chart');
    // 選定特定的class
    document.body.appendChild(linechartselect);
    // 綁定事件
    linechartselect.addEventListener("change", function(event){
        let getValue = event.target.value;
        linediv.innerHTML = `
        <div class = "tooltip1">
            <div class = "tip-header1">
                <h1></h1>
                <h2></h2>
            </div>
            <div class = "tip-body1"></div>
        </div>
        `;
        let HappyLineChartData = prepareHappyLineChartData(DataIntoFive)[0];
        let maxSaleGameInthisFive = prepareHappyLineChartData(DataIntoFive)[1]
        setHappyLineChart(HappyLineChartData, genres[getValue],maxSaleGameInthisFive);
    })
  }
// 資料讀取和entry point和data cleaning
d3.csv('../data/Video_Games_Sales_as_at_22_Dec_2016.csv', type).then(
    result => {
        ready(result)
    }
  )
  

