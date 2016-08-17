const readline = require('readline');
const fs = require('fs');
var i=0;
var header =[];
var jsonData=[];
var tempData={};
var isHeader=true;
var indexparticulars;
var indexYear13;
var particulars;
var year13;
var oilseed=[];
var Foodgrains;
var foodgrain=[];

const rl = readline.createInterface({
 input: fs.createReadStream('csv/production.csv')
});


function populationChart(particulars,year13)
{    

    this.particulars=particulars;
    this.year13=year13;
};
function AgricultureChart(Foodgrains,year13)
{    

    this.Foodgrains=Foodgrains;
    this.year13=year13;
};




rl.on('line', function(line) {
var lineRecords= line.trim().split(',');;

    if(i<1)
{
        indexparticulars=lineRecords.indexOf('Particulars');
            console.log(indexparticulars);

        indexYear13=lineRecords.indexOf(' 3-2013');
 
            console.log(indexYear13);

           i++;
}
else
{
        particulars=lineRecords[indexparticulars];
        year13=lineRecords[(indexYear13+1)];
        

      if(particulars.includes("Oilseeds"))
       {
        oilseed.push( new populationChart(particulars,year13));

        oilseed.sort(function(a, b)
          {
            if(b.year13==='NA')
            {
              b.year13=0;
            }
            return parseFloat(b.year13)-parseFloat(a.year13)});
        
       }
       if(particulars.includes("Foodgrains"))
       {
        foodgrain.push(new AgricultureChart(particulars,year13));
        foodgrain.sort(function(a, b)
        {
          if(b.year13==='NA')
            {
              b.year13=0;
            }
          return parseFloat(b.year13)-parseFloat(a.year13)});
       }
      
        //console.log(sum93);
       //console.log(oilseed);
       //console.log(foodgrain);
       
       fs.writeFileSync("json/oilseed.json",JSON.stringify(oilseed),encoding="utf8");
       fs.writeFileSync("json/foodgrain.json",JSON.stringify(foodgrain),encoding="utf8");
       //fs.writeFileSync("Purchasingpower.json",JSON.stringify(purchasingPowerByCountryArray),encoding="utf8");
       //fs.writeFileSync("GrowthChart.json",JSON.stringify(GrowthArray),encoding="utf8");
   
    }
});