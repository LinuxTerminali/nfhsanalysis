function ready(e,t){if(e)throw e;var r=topojson.feature(t,{type:"GeometryCollection",geometries:t.objects.Dist.geometries}),a=d3version3.geo.mercator().center([98,27]).scale(800),o=d3version3.geo.path().projection(a),i=d3version3.select("body").append("div").attr("class","tooltip").style("opacity",0);d3version3.select("svg.preg").selectAll("path").data(r.features).enter().append("path").attr("d",o).attr("fill",function(e){var t=pregData.get(e.properties.DISTRICT);return 0!=t?preg_color(t):"lightblue"}).on("mouseover",function(e){d3version3.select(this).transition().duration(300).style("opacity",1),i.transition().duration(300).style("opacity",1),i.text(e.properties.DISTRICT+" District in "+e.properties.ST_NM+"  "+pregData.get(e.properties.DISTRICT)).style("left",d3version3.event.pageX+"px").style("top",d3version3.event.pageY-30+"px")});var n=d3version3.select("svg.preg").selectAll("g.preglegend").data(ext_pregcolor_domain).enter().append("g").attr("class","preglegend"),s=20,p=20;n.append("rect").attr("x",20).attr("y",function(e,t){return height-t*p-2*p}).attr("width",s).attr("height",p).style("fill",function(e,t){return pregcolor(e)}).style("opacity",.8),n.append("text").attr("x",50).attr("y",function(e,t){return height-t*p-p-4}).text(function(e,t){return preglegend_labels[t]})}var pregcolor_domain=[50,150,350,750,1500],ext_pregcolor_domain=[0,50,150,350,750,1500],preglegend_labels=[" = 0","> 5"," < 5"," < 10","< 20","N/A"],pregcolor=d3version3.scale.threshold().domain(pregcolor_domain).range(["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99"]),width=960,height=500,preg_domain=[0,5,10,20,30],preg_color=d3version3.scale.threshold().domain(preg_domain).range(["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99"]),pregData=d3version3.map();queue().defer(d3version3.json,"static/data/india-districts.json").defer(d3version3.csv,"static/data/sorted17.csv",function(e){isNaN(e.total)?(console.log("we have a zero here"),pregData.set(e.district,0)):pregData.set(e.district,+e.total)}).await(ready);