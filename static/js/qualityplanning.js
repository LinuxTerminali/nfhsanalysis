function ready(t,e){if(t)throw t;var a=topojson.feature(e,{type:"GeometryCollection",geometries:e.objects.Dist.geometries}),i=d3version3.geo.mercator().center([98,27]).scale(800),n=d3version3.geo.path().projection(i),o=d3version3.select("body").append("div").attr("class","tooltip").style("opacity",0);d3version3.select("svg.qualityplanning").selectAll("path").data(a.features).enter().append("path").attr("d",n).attr("fill",function(t){var e=qualityplanningData.get(t.properties.DISTRICT);return 0!=e?qualityplanning_color(e):"lightblue"}).on("mouseover",function(t){d3version3.select(this).transition().duration(300).style("opacity",1),o.transition().duration(300).style("opacity",1),o.text(t.properties.DISTRICT+" District in "+t.properties.ST_NM+"  "+qualityplanningData.get(t.properties.DISTRICT)).style("left",d3version3.event.pageX+"px").style("top",d3version3.event.pageY-30+"px")});var l=d3version3.select("svg.qualityplanning").selectAll("g.qualitylegend").data(ext_qualitycolor_domain).enter().append("g").attr("class","qualitylegend"),r=20,s=20;l.append("rect").attr("x",20).attr("y",function(t,e){return height-e*s-2*s}).attr("width",r).attr("height",s).style("fill",function(t,e){return qualitycolor(t)}).style("opacity",.8),l.append("text").attr("x",50).attr("y",function(t,e){return height-e*s-s-4}).text(function(t,e){return qualitylegend_labels[e]})}var qualitycolor_domain=[50,150,350,750,1500],ext_qualitycolor_domain=[0,50,150,350,750,1500],qualitylegend_labels=[" = 0","> 15"," < 15","< 25","< 35","N/A"],qualitycolor=d3version3.scale.threshold().domain(qualitycolor_domain).range(["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3"]),width=960,height=500,qualityplanning_domain=[0,15,25,35,50],qualityplanning_color=d3version3.scale.threshold().domain(qualityplanning_domain).range(["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3"]),qualityplanningData=d3version3.map();queue().defer(d3version3.json,"static/data/india-districts.json").defer(d3version3.csv,"static/data/sorted27.csv",function(t){isNaN(t.total)?(console.log("we have a zero here"),qualityplanningData.set(t.district,0)):qualityplanningData.set(t.district,+t.total)}).await(ready);
