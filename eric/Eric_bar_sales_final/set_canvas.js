const parseNA = string => (string === '' ? undefined : string);
const parseDate = string => d3.timeParse('%Y-%m-%d')(string);
function formatTicks(d){ 
    
    return d3.format('~s')(d) 
        .replace('M','mil') 
        .replace('G','bil') 
        .replace('T','tri')
}
export function setEricBarChartCanvas(data, region) {
  const svgWidth = 700;
  const svgHeight = 500;
  const margin = { top: 80, right: 40, bottom: 40, left: 190 };
  const chartWidth = svgWidth - margin.left - margin.right;
  const chartHeight = svgHeight - margin.top - margin.bottom;

  // 移除舊的圖表元素
  d3.select('#bar-chart-container svg').remove();

  const filteredData = data.filter(d => d[region] > 0)
    .sort((a, b) => b[region] - a[region])
    .slice(0, 20);

const svg = d3
  .select('#bar-chart-container')
  .append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight);

const chart = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(filteredData, d => d[region])])
  .range([0, chartWidth]);

const yScale = d3
  .scaleBand()
  .domain(filteredData.map(d => d.publisher))
  .range([0, chartHeight])
  .paddingInner(0.1);

const xAxis = d3.axisBottom(xScale).ticks(10).tickFormat(d => `${d}M`);

chart.append('g').attr('transform', `translate(0,${chartHeight})`).call(xAxis);

const yAxis = d3.axisLeft(yScale);
chart.append('g').call(yAxis);

// 設定顏色比例尺
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

// 更新圖表元素之前的動畫處理
chart
  .selectAll('.bar')
  .data(filteredData, d => d.publisher)
  .join(
    enter =>
      enter
        .append('rect')
        .attr('class', 'bar')
        .attr('x', 0)
        .attr('y', d => yScale(d.publisher))
        .attr('width', 0)
        .attr('height', yScale.bandwidth())
        .attr('fill', d => colorScale(d.publisher)),
    update => update,
    exit =>
      exit
        .transition()
        .duration(1000)
        .attr('opacity', 0)
        .remove()
  )
  .transition()
  .duration(800)
  .attr('width', d => xScale(d[region]))
  .attr('y', d => yScale(d.publisher))
  .attr('opacity', 1);

// 添加圖表標題
svg
  .append('text')
  .attr('class', 'chart-title')
  .attr('x', svgWidth / 2)
  .attr('y', margin.top / 2)
  .attr('text-anchor', 'middle')
  .style('font-weight', 'bold')
  .text(`Top 20 Publishers for ${region}`);
  
// 添加副標題
svg
  .append('text')
  .attr('class', 'sub-title')
  .attr('x', svgWidth / 2)
  .attr('y', margin.top / 2 + 20) // 調整 y 座標位置以避免重疊
  .attr('text-anchor', 'middle')
  .style('fill', 'rgba(0, 0, 0, 0.7)')
  .text('Years: 1980~2010s');

// 添加 x 軸標籤
chart
  .append('text')
  .attr('class', 'unit-label')
  .attr('x', chartWidth - 70)
  .attr('y', chartHeight - margin.top + 65)
  .attr('text-anchor', 'middle')
  .style('font-weight', 'bold') // 加粗字體
  .text('Average Sales (in millions)');

// 添加 y 軸標籤
chart
  .append('text')
  .attr('class', 'unit-label')
  .attr('x', -margin.left + 85)
  .attr('y', -margin.top / 4)
  .attr('text-anchor', 'start')
  .style('fill', 'rgba(220, 20, 20, 1)')
  .text('Publisher');

  // 更新下拉式選單的事件處理程序
  d3.select('#region-select').on('change', function() {
    const selectedRegion = this.value;
    const filteredData = data.filter(d => d[selectedRegion] >= 0)
      .sort((a, b) => b[selectedRegion] - a[selectedRegion])
      .slice(0, 20);
    setEricBarChartCanvas(filteredData, selectedRegion);
  });


//interactive 互動處理
const tip = d3.select('.tooltip');

function mouseover(e) {
  //get data
  const thisBarData = d3.select(this).data()[0];
  // 輸出數據到控制台
  // debugger;
  tip
    .style('left', e.clientX + 15 + 'px')
    .style('top', e.clientY + 'px')
    .transition()
    .style('opacity', 0.98);

  tip.select('h3').html(`${thisBarData.publisher}`);
  tip.select('h4').html(
    `<strong>Sales:</strong><br>NA: ${thisBarData.NA_Sales.toFixed(3)}M<br>EU: ${thisBarData.EU_Sales.toFixed(3)}M<br>
    JP: ${thisBarData.JP_Sales.toFixed(3)}M<br>Other: ${thisBarData.Other_Sales.toFixed(3)}M`
  );
}

function mousemove(e) {
  tip.style('left', e.clientX + 15 + 'px').style('top', e.clientY + 'px');
}
function mouseout(e) {
  tip.transition()
    .style('opacity', 0);
}

//interactive 新增監聽
chart
  .selectAll('.bar')
  .on('mouseover', mouseover)
  .on('mousemove', mousemove)
  .on('mouseout', mouseout);

}

//   // 移除舊的圖表元素
//   d3.select('#bar-chart-container svg').remove();

//   const filteredData = data.filter(d => d[region] > 0)
//     .sort((a, b) => b[region] - a[region])
//     .slice(0, 20);
//   console.log(filteredData)
//   const svg = d3.select('#bar-chart-container')
//     .append('svg')
//     .attr('width', svgWidth)
//     .attr('height', svgHeight);

//   const chart = svg.append('g')
//     .attr('transform', `translate(${margin.left},${margin.top})`);

//   const xScale = d3.scaleLinear()
//     .domain([0, d3.max(filteredData, d => d[region])])
//     .range([0, chartWidth]);

//   const yScale = d3.scaleBand()
//     .domain(filteredData.map(d => d.publisher))
//     .range([0, chartHeight])
//     .paddingInner(0.1);

//   const xAxis = d3.axisBottom(xScale)
//     .ticks(10)
//     .tickFormat(d => `${d}M`);

//   chart.append('g')
//     .attr('transform', `translate(0,${chartHeight})`)
//     .call(xAxis);

//   const yAxis = d3.axisLeft(yScale);
//   chart.append('g')
//     .call(yAxis);

//   // 設定顏色比例尺
//   const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

//   // 更新圖表元素之前的動畫處理
//   chart.selectAll('.bar')
//     .data(filteredData, d => d.publisher)
//     .join(
//       enter => enter.append('rect')
//         .attr('class', 'bar')
//         .attr('x', 0)
//         .attr('y', d => yScale(d.publisher))
//         .attr('width', 0)
//         .attr('height', yScale.bandwidth())
//         .attr('fill', d => colorScale(d.publisher)),
//       update => update,
//       exit => exit.transition()
//         .duration(1000)
//         .attr('opacity', 0)
//         .remove()
//     )
//     .transition()
//     .duration(800)
//     .attr('width', d => xScale(d[region]))
//     .attr('y', d => yScale(d.publisher))
//     .attr('opacity', 1)


//   // 添加圖表標題
//   svg.append('text')
//     .attr('class', 'chart-title')
//     .attr('x', svgWidth / 2)
//     .attr('y', margin.top / 2)
//     .attr('text-anchor', 'middle')
//     .style('font-weight', 'bold')
//     .text(`Top 20 Publishers for ${region}`);
// // 添加副標題
// svg.append('text')
//   .attr('class', 'sub-title')
//   .attr('x', svgWidth / 2)
//   .attr('y', margin.top / 2 + 20)  // 調整 y 座標位置以避免重疊
//   .attr('text-anchor', 'middle')
//   .style('fill', 'rgba(0, 0, 0, 0.7)')
//   .text('Years: 1980~2010s');

//   // 添加 x 軸標籤
//   chart.append('text')
//     .attr('class', 'unit-label')
//     .attr('x', chartWidth - 70)
//     .attr('y', chartHeight - margin.top + 65)
//     .attr('text-anchor', 'middle')
//     .style('font-weight', 'bold') // 加粗字體
//     .text('Average Sales (in millions)');

//   // 添加 y 軸標籤
//   chart.append('text')
//     .attr('class', 'unit-label')
//     .attr('x', -margin.left + 85)
//     .attr('y', -margin.top / 4)
//     .attr('text-anchor', 'start')
//     .style('fill', 'rgba(220, 20, 20, 1)')
//     .text('Publisher');

//   // 更新下拉式選單的事件處理程序
//   d3.select('#region-select').on('change', function () {
//     const selectedRegion = this.value;
//     const filteredData = data.filter(d => d[selectedRegion] >= 0)
//       .sort((a, b) => b[selectedRegion] - a[selectedRegion])
      
//       .slice(0, 20);
//     setEricBarChartCanvas(filteredData, selectedRegion);
//   });

//   //interactive 互動處理
//   const tip = d3.select('.tooltip');

//   function mouseover(e) {
//     //get data
//     const thisBarData = d3.select(this).data()[0];
//      // 輸出數據到控制台
//     // debugger;
//     tip.style('left', (e.clientX + 15) + 'px')
//       .style('top', (e.clientY) + 'px')
//       .transition()
//       .style('opacity', 0.98);

//     tip.select('h3').html(`${thisBarData.publisher}`);
//     tip.select('h4').html(`<strong>Sales:</strong><br>NA: ${thisBarData.NA_Sales.toFixed(3)}M<br>EU: ${thisBarData.EU_Sales.toFixed(3)}M<br>JP: ${thisBarData.JP_Sales.toFixed(3)}M<br>Other: ${thisBarData.Other_Sales.toFixed(3)}M`);
//   }

//   function mousemove(e) {
//     tip.style('left', (e.clientX + 15) + 'px')
//       .style('top', e.clientY + 'px');
//   }

//   function mouseout(e) {
//     tip.transition()
//       .style('opacity', 0);
//   }

//   //interactive 新增監聽
//   chart.selectAll('.bar')
//     .on('mouseover', mouseover)
//     .on('mousemove', mousemove)
//     .on('mouseout', mouseout);
// }



