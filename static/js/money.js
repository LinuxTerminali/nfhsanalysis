function removeCommas(e){for(;e.search(",")>=0;)e=(e+"").replace(",","");return e}function ready(e,t){if(e)throw e;var o=topojson.feature(t,{type:"GeometryCollection",geometries:t.objects.Dist.geometries}),n=d3version3.geo.mercator().center([98,27]).scale(800),r=d3version3.geo.path().projection(n),a=d3version3.select("body").append("div").attr("class","tooltip").style("opacity",0);d3version3.select("svg.money").selectAll("path").data(o.features).enter().append("path").attr("d",r).attr("fill",function(e){var t=moneyData.get(e.properties.DISTRICT);return 0!=t?money_color(t):"lightblue"}).on("mouseover",function(e){d3version3.select(this).transition().duration(300).style("opacity",1),a.transition().duration(300).style("opacity",1),a.text(e.properties.DISTRICT+" District in "+e.properties.ST_NM+"  "+moneyData.get(e.properties.DISTRICT)).style("left",d3version3.event.pageX+"px").style("top",d3version3.event.pageY-30+"px")});var i=d3version3.select("svg.money").selectAll("g.legend").data(ext_moneycolor_domain).enter().append("g").attr("class","legend"),s=20,l=20;i.append("rect").attr("x",20).attr("y",function(e,t){return height-t*l-2*l}).attr("width",s).attr("height",l).style("fill",function(e,t){return moneycolor(e)}).style("opacity",.8),i.append("text").attr("x",50).attr("y",function(e,t){return height-t*l-l-4}).text(function(e,t){return moneylegend_labels[t]})}var moneycolor_domain=[50,150,350,750,1500],ext_moneycolor_domain=[0,50,150,350,750,1500],moneylegend_labels=["> 2000"," > 8000","> 16000","> 24000","> 32000","N/A"],moneycolor=d3version3.scale.threshold().domain(moneycolor_domain).range(["#386cb0","#ffff99","#fdc086","#beaed4","#7fc97f"]),width=960,height=500,money_domain=[2e3,8e3,16e3,24e3,32e4],money_color=d3version3.scale.threshold().domain(money_domain).range(["#386cb0","#ffff99","#fdc086","#beaed4","#7fc97f"]),moneyData=d3version3.map();queue().defer(d3version3.json,"static/data/india-districts.json").defer(d3version3.csv,"static/data/nfhs_37.csv",function(e){isNaN(removeCommas(e.total))?(console.log(removeCommas(e.total),e.district),moneyData.set(removeCommas(e.total),0)):moneyData.set(e.district,+removeCommas(e.total))}).await(ready);
