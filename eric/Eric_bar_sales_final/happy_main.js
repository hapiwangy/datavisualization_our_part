import { 
    type, 
    filterData,
} from './utilities.js';
import {
    setEricBarChartCanvas,
    
} from './happy_canvas/set_canvas.js'
import {
    calculatePublisherSales
} from './happy_canvas/prepare_data.js'

// function ready(videoGameData) {
//     const videoGameClean = filterData(videoGameData);
  
//     // 取得各發行商在不同地區的銷售量
//     const publisherSalesData = calculatePublisherSales(videoGameClean);
  
//     const select = d3.select('#region-select');
//     const regions = ['NA_Sales', 'EU_Sales', 'JP_Sales', 'Other_Sales'];
    
//     select
//         .selectAll('option')
//         .data(regions)
//         .enter()
//         .append('option')
//         .text(d => d);
// }
// // 建立長條圖的 canvas
//         setEricBarChartCanvas(publisherSalesData, regions[0]);
// // 資料讀取和entry point和data cleaning
// d3.csv('./data/Video_Games_Sales_as_at_22_Dec_2016.csv', type).then(
//     result => {
//         ready(result)
//     }
//   )

  function ready(videoGameData) {
    const videoGameClean = filterData(videoGameData);
  
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

//   select.on('change', function() {
//     const selectedRegion = d3.select(this).property('value');
//     setEricBarChartCanvas(publisherSalesData, selectedRegion);
//   });
    // 建立長條圖的 canvas
    setEricBarChartCanvas(publisherSalesData, regions[0]);
  }
  
// 資料讀取和entry point和data cleaning
d3.csv('./data/Video_Games_Sales_as_at_22_Dec_2016.csv', type).then(
    result => {
        ready(result)
    }
  )
