var fs=require('fs');
var data = fs.readFileSync('csv/production.csv', {encoding:'utf8'}).toString();
var lines=data.split("\r\n");
var j=0;
var sum=0,sum1=0,sum2=0,sum3=0;
var str="";
var temp={};
var result=[];


j=0;
for(var i=0;i<lines.length-1;i++)
{
 var line=lines[i].split(",");
 
 if(line[0].includes("Agricultural Production Foodgrains Volume Karnataka"))
 {
 	for(var k=14;k<=24;k++)
	{
		if(line[k]=='NA')
		{
			line[k]=0;
		}
		sum=sum+parseFloat(line[k]);

		console.log("Sum:"+sum);
	}	
 }
 if(line[0].includes("Agricultural Production Foodgrains Rice Volume Kerala"))
 {
 	for(var p=14;p<=24;p++)
	{
		if(line[p]=='NA')
		{
			line[p]=0;
		}
		sum1=sum1+parseFloat(line[p]);

		console.log("Sum1:"+sum1);
	}	
 }
 if(line[0].includes("Agricultural Production Foodgrains Rice Volume Andhra Pradesh"))
 {
 	for(var q=14;q<=24;q++)
	{
		if(line[q]=='NA')
		{
			line[q]=0;
		}
		sum2=sum2+parseFloat(line[q]);

		console.log("Sum2:"+sum2);
	}	
 }
 if(line[0].includes("Agricultural Production Foodgrains Rice Volume Tamil Nadu"))
 {
 	for(var e=14;e<=24;e++)
	{
		if(line[e]=='NA')
		{
			line[e]=0;
		}
		sum3=sum3+parseFloat(line[e]);

		console.log("Sum3:"+sum3);
	}	
 }

var value=[sum,sum1,sum2,sum3];
var str=["Agricultural Production Foodgrains Volume Karnataka","Agricultural Production Foodgrains Rice Volume Kerala","Agricultural Production Foodgrains Rice Volume Andhra Pradesh","Agricultural Production Foodgrains Rice Volume Tamil Nadu"];
}
for(var v=0;v<4;v++)
{
temp["Sum"]=value[v];
temp["Southernstate"]=str[v];
result.push(temp);
temp={};
}




fs.writeFileSync("json/southernstate.json",JSON.stringify(result),encoding="utf8");
