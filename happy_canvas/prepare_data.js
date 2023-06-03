export function prepareHappyFirstBarChartData(videoGameData) {
    // 回傳整個東西
    // console.log(videoGameData);

    let ArrayData = [];
    let dif_genre = [];
    for (let i = 0;i < videoGameData.length; i++){
        let name = videoGameData[i]['Genre'];
        if (dif_genre.includes(name)){
            ArrayData[dif_genre.indexOf(name)]["Count"] += 1;
            ArrayData[dif_genre.indexOf(name)]["Sales"] += videoGameData[i]['Global_Sales'];
            
            
        } else {
            let obj = {"Genre":name, "Count":1, "Sales":0, "Avg":0};
            obj["Count"] = videoGameData[i]['Counting'];
            obj["Sales"] = videoGameData[i]['Global_Sales'];
            ArrayData.push(obj);
            dif_genre.push(name);
        }
    }
    
    // 這裡把銷售額的單位從百萬變成一千(不然平均的時候除不了)
    for (let i = 0; i < ArrayData.length; i++){
        ArrayData[i]["Avg"] = ArrayData[i]["Sales"]  * 1000 / ArrayData[i]["Count"];
    }

    const dataMap = d3.rollup(
        ArrayData,
        v => d3.sum(v, leaf=>leaf.Avg),
        d => d.Genre
    )
    const dataArray = Array.from(
        dataMap,
        d => ({ Genre: d[0], Avg: d[1] })
    ).sort((a, b)=>{
        return d3.descending(a.Avg, b.Avg);
    });

    // 尋找最大值
    let maxobj = 0;
    const maxSaleGenre = dataArray[0].Genre;
    console.log(maxSaleGenre);
    const dA = videoGameData.sort((a, b)=>{
        return d3.descending(a.Global_Sales, b.Global_Sales);
    })
    console.log('consequence');
    for (let i = 0;i < dA.length; i++){
 
        if (dA[i].Genre == maxSaleGenre){
            maxobj = dA[i];
            break;
        }
    }
    // console.log(ArrayData); 
    console.log(maxobj);

    return dataArray;
    
}

export function prepareHappyLineChartData(DataIntoFive) {
    // console.log(DataIntoFive);
    let genres = ['Shooter','Puzzle','Platform','Racing','Sports','Misc','Fighting','Action','Simulation','Adventure'];
    let consequence = {};
    for (let i = 0;i < genres.length; i++){
        let arr = [];
        let currentGenre = genres[i];
        for (let j = 0;j < DataIntoFive.length; j++){
            let count = 0;
            for (let z = 0; z < DataIntoFive[j].content.length; z++){
                if (DataIntoFive[j].content[z]['Genre'] == currentGenre) {
                    count += 1;
                }
            }
            let obj = {year: `${1980+5*j}`, count:count};
            arr.push(obj);
        }
        consequence[currentGenre] = arr;
    }
    console.log('preparelinechart');
    console.log(consequence);
    // 回傳一個[genere:array[8]]的陣列，分別代表每個種類和不同時間段的遊戲數量。
    return consequence;
   
}

export function prepareHappyPieChart(videoGameData){
    // 先用總和的資料來做分布
    let ArrayData = [];
    let dif_genre = [];
    let Sales = ["JP_Sales", "NA_Sales", "EU_Sales", "Other_Sales"];
    for (let i = 0;i < videoGameData.length; i++){
        let name = videoGameData[i]['Genre'];
        if (dif_genre.includes(name)){
            ArrayData[dif_genre.indexOf(name)].SalesNumber[0] += videoGameData[i]['JP_Sales'];
            ArrayData[dif_genre.indexOf(name)].SalesNumber[1] += videoGameData[i]['NA_Sales'];
            ArrayData[dif_genre.indexOf(name)].SalesNumber[2] += videoGameData[i]['EU_Sales'];
            ArrayData[dif_genre.indexOf(name)].SalesNumber[3] += videoGameData[i]['Other_Sales'];
            // ArrayData[dif_genre.indexOf(name)].SalesNumber[4] += videoGameData[i]['Global_Sales'];
            
        } else {
            let obj = {"Genre":name, Sales, SalesNumber:[]};
            obj.SalesNumber.push(videoGameData[i]["EU_Sales"]);
            obj.SalesNumber.push(videoGameData[i]["NA_Sales"]);
            obj.SalesNumber.push(videoGameData[i]["JP_Sales"]);
            obj.SalesNumber.push(videoGameData[i]["Other_Sales"]);
            // obj.SalesNumber.push(videoGameData[i]["Global_Sales"]);
            ArrayData.push(obj);
            dif_genre.push(name);
        }
    }
    for (let i = 0;i < ArrayData.length; i++){
        ArrayData[i].SalesNumber = ArrayData[i].SalesNumber.map((k)=>{return parseInt(k);});
    }
    // 回傳一個 [{種類, 地區銷售額1, 地區銷售額2...}]的資料
    return ArrayData;
}