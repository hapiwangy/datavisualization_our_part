const parseNA = string => (string === '' ? undefined : string);
const parseDate = string => d3.timeParse('%Y-%m-%d')(string);
function formatTicks(d){ 
    
    return d3.format('~s')(d) 
        .replace('M','mil') 
        .replace('G','bil') 
        .replace('T','tri')
}
export function setHappyFirstCanvas(originData,barChartData) {
    // 需要originData裡面的年份資訊
    const svg_width = 550;
    const svg_height = 600;
    const chart_margin = {
        top: 80,
        right: 40,
        bottom: 40,
        left: 80
    };
    const chart_width = svg_width - (chart_margin.left + chart_margin.right);
    const chart_height = svg_height - (chart_margin.top + chart_margin.bottom);
    const this_svg = d3.select('.happy-chart-container')
        .append('svg')
        .attr('width', svg_width)
        .attr('height', svg_height)
        .append('g')
        .attr('transform', `translate(${chart_margin.left},${chart_margin.top})`);
    //scale
    //V1.d3.extent find the max & min in Global_Sales
    const xExtent = d3.extent(barChartData, d => d.Avg);
  
    const xMax = d3.max(barChartData, d => d.Avg);
    const xScale = d3.scaleLinear([0, xMax], [0, chart_width]);
    const yScale = d3.scaleBand()
        .domain(barChartData.map(d => d.Genre))
        .rangeRound([0, chart_height])
        .paddingInner(0.25);
  
    const bars = this_svg.selectAll('.bar')
        .data(barChartData)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', 0)
        .attr('y', d => yScale(d.Genre))
        .attr('width', d => xScale(d.Avg))
        .attr('height', yScale.bandwidth())
        .style('fill', 'LightSteelBlue');
  
    //Draw header
    const header = this_svg.append('g')
        .attr('class', 'bar-header')
        .attr('transform', `translate(0,${-chart_margin.top / 2})`)
        .append('text');
    header.append('tspan')
        .text(`Avg global_Sales by Genre`)
        .style('font-weight', 'bold');
    header.append('tspan')
        .text('(every Thousand in US$)')
        .attr('x', 0)
        .attr('y', 20)
        .style('font-size', '0.8em')
        .style('fill', '#555');
    header.append('tspan')
        .text(`(from ${originData['start']} to ${originData.end})`)
        .attr('x', 150)
        .attr('y', 20)
        .style('font-size', '0.8em')
        .style('fill', '#555');
  
    const xAxis = d3.axisTop(xScale)
        .tickFormat(formatTicks)
        .tickSizeInner(-chart_height)
        .tickSizeOuter(0);
    const xAxisDraw = this_svg.append('g')
        .attr('class', 'x axis')
        .call(xAxis);
    const yAxis = d3.axisLeft(yScale)
        .tickSize(0);
    const yAxisDraw = this_svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis);
    yAxisDraw.selectAll('text')
        .attr('dx', '-0.6em');
}

export function setHappyLineChart(LineChartData, current) {
    // input資料是一個[genere:array[8]]的陣列，分別代表每個種類和不同時間段的遊戲數量。    

    let xData = [];
    let yData = [];
    for (let x = 0; x < LineChartData[current].length; x++){
        xData.push(parseInt(LineChartData[current][x].year));
        yData.push(parseInt(LineChartData[current][x].count));
    }
    console.log(xData);
    console.log(yData);

    const width = 1000;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 30, left: 30 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    // 創建SVG元素
    const svg = d3.select(".happy-linechart-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    // 創建圖表標題
    svg.append("text")
      .attr("class", "chart-title")
      .attr("x", width / 2 - 150    )
      .attr("y", margin.top)
      .text(`numbers of ${current} games in different times`);
    // 創建內部容器
    const g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    // 定義x軸的比例尺
    const xScale = d3.scaleLinear()
      .domain([d3.min(xData)-5, d3.max(xData) + 5])
      .range([0, innerWidth]);
    
    // 定義y軸的比例尺
    const yScale = d3.scaleLinear()
      .domain([d3.min(yData), d3.max(yData) + 50])
      .range([innerHeight, 0]);

    
    // 繪製散點
    g.selectAll("circle")
      .data(xData)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => xScale(d))
      .attr("cy", (d, i) => yScale(yData[i]))
      .attr("r", 5)
      .attr("fill", "steelblue");
    
    // 添加x軸
    g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + innerHeight + ")")
      .call(d3.axisBottom(xScale));
    
    // 添加y軸
    g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(yScale));
    
    // 添加標點
    g.selectAll(".dot")
      .data(xData)
      .enter()
      .append("text")
      .attr("class", "dot")
      .attr("x", (d, i) => xScale(d))
      .attr("y", (d, i) => yScale(yData[i]) - 20)
      .text((d, i) => "(" + d + ", " + yData[i] + ")");
// 連接點與點的線段
const line = d3.line()
  .x((d, i) => xScale(xData[i]))
  .y((d, i) => yScale(yData[i]));

// 繪製連接線
g.append("path")
  .datum(xData)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 2)
  .attr("d", line);
}