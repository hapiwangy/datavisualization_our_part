import {
    divideintofive
} from "./others.js";

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
    const dA = videoGameData.sort((a,b)=>{
        return d3.descending(a.Global_Sales,b.Global_Sales);
    });
    let maxObj = [];
    let genres = [];
    // dA = []
    for (let i = 0;i < dA.length; i++){
    	if (genres.includes(dA[i].Genre)) {
      		if (maxObj[genres.indexOf(dA[i].Genre)].Global_Sales < dA[i].Global_Sales){
          	maxObj[genres.indexOf(dA[i].Genre)].Global_Sales = dA[i].Global_Sales;
            maxObj[genres.indexOf(dA[i].Genre)].which = dA[i];
          }
      } else {
      	let obj = {Genre:dA[i].Genre, Global_Sales:dA[i].Global_Sales, which:dA[i]};
        genres.push(dA[i].Genre);
        maxObj.push(obj);
      }
    }

    return [dataArray,maxObj];
    
}

export function prepareHappyLineChartData(DataIntoFive) {
    // console.log(DataIntoFive);
    let genres = ['Shooter','Puzzle','Platform','Racing','Sports','Misc','Fighting','Action','Simulation','Adventure'];
    let consequence = {};
    var maxSaleGameInthisFive =[];
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
    for(let i = 0 ; i <DataIntoFive.length; i++)
    {
        const dB = DataIntoFive[i].content.sort((a,b)=>{
            return d3.descending (a.Global_Sales,b.Global_Sales);
        }) //五年內最賺錢的遊戲排行
        maxSaleGameInthisFive.push(dB[0]);
    }
    //console.log(maxSaleGameInthisFive)
    // console.log('preparelinechart');
    // console.log(consequence);
    // console.log('duringfive')
    //console.log(maxSaleGameInthisFive);
    // 回傳一個[genere:array[8]]的陣列，分別代表每個種類和不同時間段的遊戲數量。
    return [consequence,maxSaleGameInthisFive];
}