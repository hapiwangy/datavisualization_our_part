const parseNA = string => (string === '' ? undefined : string);
const parseDate = string => d3.timeParse('%Y-%m-%d')(string);
function formatTicks(d){ 
    
    return d3.format('~s')(d) 
        .replace('M','mil') 
        .replace('G','bil') 
        .replace('T','tri')
}

// export function setBarChartCanvas(data, region) {
//   const svgWidth = 700;
//   const svgHeight = 500;
//   const margin = { top: 80, right: 40, bottom: 40, left: 150 };
//   const chartWidth = svgWidth - margin.left - margin.right;
//   const chartHeight = svgHeight - margin.top - margin.bottom;

//   // 移除舊的圖表元素
//   d3.select('#bar-chart-container svg').remove();

//   const filteredData = data.filter(d => d[region] > 0)
//     .sort((a, b) => b[region] - a[region])
//     .slice(0, 20);

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
//     .tickFormat(d => `${d }k`);
//     // .tickFormat(formatTicks);
  
//   chart.append('g')
//     .attr('transform', `translate(0,${chartHeight})`)
//     .call(xAxis);

//   const yAxis = d3.axisLeft(yScale);
//   chart.append('g')
//     .call(yAxis);

//   // 設定顏色比例尺
//   const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

//   const bars = chart.selectAll('.bar')
//     .data(filteredData)
//     .enter()
//     .append('rect')
//     .attr('class', 'bar')
//     .attr('x', 0)
//     .attr('y', d => yScale(d.publisher))
//     .attr('width', d => xScale(d[region]))
//     .attr('height', yScale.bandwidth())
//     .attr('fill', d => colorScale(d.publisher));

//   // 添加圖表標題
//   svg.append('text')
//     .attr('class', 'chart-title')
//     .attr('x', svgWidth / 2)
//     .attr('y', margin.top / 2)
//     .attr('text-anchor', 'middle')
//     .text(`Top 20 Publishers for ${region}`);

// // 添加 x 軸標籤
// chart.append('text')
//   .attr('class', 'unit-label')
//   .attr('x', chartWidth -50 )
//   .attr('y', chartHeight - margin.top +65 )
//   .attr('text-anchor', 'middle')
//   .text('Sales (in thousands)');

// // 添加 y 軸標籤
// chart.append('text')
//   .attr('class', 'unit-label')
//   .attr('x', -margin.left+85)
//   .attr('y', -margin.top / 3)
//   .attr('text-anchor', 'start')
//   .text('Publisher');

// // 調整 x 軸位置
// chart.append('g')
//   .attr('transform', `translate(0, ${chartHeight})`)
//   .call(xAxis);

// // 調整 y 軸位置
// chart.append('g')
//   .call(yAxis);

//   // 更新下拉式選單的事件處理程序
//   d3.select('#region-select').on('change', function() {
//     const selectedRegion = this.value;
//     const filteredData = data.filter(d => d[selectedRegion] > 0)
//                              .sort((a, b) => b[selectedRegion] - a[selectedRegion])
//                              .slice(0, 20);
//     setBarChartCanvas(filteredData, selectedRegion); // 重新呼叫繪圖函式
//    // 選取 SVG 元素
//    const svg = d3.select('#bar-chart-container').select('svg');
  
//    // 選取矩形元素
//    const bars = svg.selectAll('.bar')
//      .data(filteredData);
   
//    // 離開過渡效果
//    bars.exit()
//      .transition()
//      .duration(500)
//      .attr('height', 0)
//      .remove();
   
//    // 更新過渡效果
//    bars.transition()
//      .duration(500)
//      .attr('y', d => yScale(d.publisher))
//      .attr('height', d => chartHeight - yScale(d[region]));
   
//    // 進入過渡效果
//    bars.enter()
//      .append('rect')
//      .attr('class', 'bar')
//      .attr('x', d => xScale(d[region]))
//      .attr('y', d => yScale(d.publisher))
//      .attr('width', xScale.bandwidth())
//      .attr('height', 0)
//      .transition()
//      .duration(500)
//      .attr('height', d => chartHeight - yScale(d[region]));
//  });
// }


export function setBarChartCanvas(data, region) {
  const svgWidth = 700;
  const svgHeight = 500;
  const margin = { top: 80, right: 40, bottom: 40, left: 150 };
  const chartWidth = svgWidth - margin.left - margin.right;
  const chartHeight = svgHeight - margin.top - margin.bottom;

  // 移除舊的圖表元素
  d3.select('#bar-chart-container svg').remove();

  const filteredData = data.filter(d => d[region] > 0)
    .sort((a, b) => b[region] - a[region])
    .slice(0, 20);

  const svg = d3.select('#bar-chart-container')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

  const chart = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(filteredData, d => d[region])])
    .range([0, chartWidth]);

  const yScale = d3.scaleBand()
    .domain(filteredData.map(d => d.publisher))
    .range([0, chartHeight])
    .paddingInner(0.1);

  const xAxis = d3.axisBottom(xScale)
    .tickFormat(d => `${d}k`);

  chart.append('g')
    .attr('transform', `translate(0,${chartHeight})`)
    .call(xAxis);

  const yAxis = d3.axisLeft(yScale);
  chart.append('g')
    .call(yAxis);

  // 設定顏色比例尺
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  const bars = chart.selectAll('.bar')
    .data(filteredData);

  bars.exit()
    .transition()
    .duration(1000)
    .attr('opacity', 0)
    .remove();

  bars.enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', 0)
    .attr('y', d => yScale(d.publisher))
    .attr('width', 0)
    .attr('height', yScale.bandwidth())
    .attr('fill', d => colorScale(d.publisher))
    .merge(bars)
    .transition()
    .duration(800)
    .attr('width', d => xScale(d[region]))
    .attr('y', d => yScale(d.publisher))
    .attr('opacity', 1);

  // 添加圖表標題
  svg.append('text')
    .attr('class', 'chart-title')
    .attr('x', svgWidth / 2)
    .attr('y', margin.top / 2)
    .attr('text-anchor', 'middle')
    .text(`Top 20 Publishers for ${region}`);

  // 添加 x 軸標籤
  chart.append('text')
    .attr('class', 'unit-label')
    .attr('x', chartWidth -70)
    .attr('y', chartHeight - margin.top + 65)
    .attr('text-anchor', 'middle')
    .text('Average Sales (in thousands)');

  // 添加 y 軸標籤
  chart.append('text')
    .attr('class', 'unit-label')
    .attr('x', -margin.left + 85)
    .attr('y', -margin.top / 3)
    .attr('text-anchor', 'start')
    .text('Publisher');

  // 更新下拉式選單的事件處理程序
  d3.select('#region-select').on('change', function() {
    const selectedRegion = this.value;
    const filteredData = data.filter(d => d[selectedRegion] > 0)
      .sort((a, b) => b[selectedRegion] - a[selectedRegion])
      .slice(0, 20);
    setBarChartCanvas(filteredData, selectedRegion);
  });
}


