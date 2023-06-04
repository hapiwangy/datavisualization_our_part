import {
    divideintofive
} from "./others.js";

// export function prepareHappyFirstBarChartData(data) {
//     const publishers = Array.from(new Set(data.map(d => d.Publisher)));
//     const salesByPublisher = [];
  
//     publishers.forEach(publisher => {
//       const publisherData = {
//         Publisher: publisher,
//         NA_Sales: 0,
//         EU_Sales: 0,
//         JP_Sales: 0,
//         Other_Sales: 0,
//       };
  
//       data.forEach(d => {
//         if (d.Publisher === publisher) {
//           publisherData.NA_Sales += d.NA_Sales;
//           publisherData.EU_Sales += d.EU_Sales;
//           publisherData.JP_Sales += d.JP_Sales;
//           publisherData.Other_Sales += d.Other_Sales;
//         }
//       });
  
//       salesByPublisher.push(publisherData);
//     });
//     // console.log(salesByPublisher);
//     return salesByPublisher;
//   }
  
// export  function calculatePublisherSales(videoGameClean) {
//     const publisherSalesData = [];
  
//     // 使用 d3.group 依發行商分組
//     const publishers = d3.group(videoGameClean, d => d.Publisher);
  
//     publishers.forEach((games, publisher) => {
//       const sales = {
//         publisher: publisher,
//         NA_Sales: d3.sum(games, d => d.NA_Sales),
//         EU_Sales: d3.sum(games, d => d.EU_Sales),
//         JP_Sales: d3.sum(games, d => d.JP_Sales),
//         Other_Sales: d3.sum(games, d => d.Other_Sales)
//       };
//           // 將銷售額單位從百萬轉換為千
//     for (const key in sales) {
//         if (key !== 'publisher') {
//           sales[key] *= 1000;
//         }
//       }
//       publisherSalesData.push(sales);
//     });
  
//     return publisherSalesData;
//   }

export function calculatePublisherSales(videoGameClean) {
  const publisherSalesData = [];

  // 使用 d3.group 依發行商分組
  const publishers = d3.group(videoGameClean, d => d.Publisher);

  publishers.forEach((games, publisher) => {
    const totalSales = {
      publisher: publisher,
      NA_Sales: d3.sum(games, d => d.NA_Sales),
      EU_Sales: d3.sum(games, d => d.EU_Sales),
      JP_Sales: d3.sum(games, d => d.JP_Sales),
      Other_Sales: d3.sum(games, d => d.Other_Sales)
    };

    // 統計遊戲款數
    const gameCount = games.length;

    // 計算平均銷售量
    const averageSales = {
      publisher: publisher,
      NA_Sales: totalSales.NA_Sales / gameCount,
      EU_Sales: totalSales.EU_Sales / gameCount,
      JP_Sales: totalSales.JP_Sales / gameCount,
      Other_Sales: totalSales.Other_Sales / gameCount
    };

    // 將銷售額單位從百萬轉換為千
    for (const key in averageSales) {
      if (key !== 'publisher') {
        averageSales[key] *= 1000;
      }
    }

    publisherSalesData.push(averageSales);
  });

  // 根據平均銷售量排序
  publisherSalesData.sort((a, b) => b.NA_Sales - a.NA_Sales);

  // 只保留前20名發行商
  const top20Publishers = publisherSalesData.slice(0, 20);

  return top20Publishers;
}
