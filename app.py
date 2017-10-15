from flask import Flask, render_template, request

import json
import plotly

import pandas as pd
import numpy as np
import plotly.graph_objs as go

app = Flask(__name__,)
app.debug = True



@app.route('/')
def index():
    #reading data for state fertility chart
    df = pd.read_csv("static/data/fertility.csv")
    #remove the states without last time data
    df = df.loc[df.ne(0).all(axis=1)]
    #creating a bar chart
    trace1 = go.Bar(
        x=df.state,
        y=df.total,
        name='2015-16')
    trace2 = go.Bar(
        x=df.state,
        y=df["total_2005-06"],
        name='2005-06')
    data = [trace1, trace2]

    layout = go.Layout(title="Total fertility rate (children per woman)",barmode='group')


    #fig = go.Figure(data=data, layout=layout)
    #hellp =plotly.offline.plot(fig, output_type="div", show_link="False",include_plotlyjs="Flase",link_text="")
    #print(type(fig))
    graph = dict(data=data,layout=layout)


    # Converting data to json
    graphJSON = json.dumps(graph, cls=plotly.utils.PlotlyJSONEncoder)

    
    return render_template('layouts/index.html', graphJSON=graphJSON, groupgr =preventation())




#function to create a pie chart and return data to index route for display
def preventation():
    #20015-16 NFHS data
    df = pd.read_csv("static/data/methods.csv")
    #2005-06 NFHS data
    df2 = pd.read_csv("static/data/methods20.csv")
    fig = {
     "data": [
     {
      "values": df2.total,
      "labels": df2.type,
      "domain": {"x": [0, .48]},
      "name": "2005-06",
      "hoverinfo":"label+percent+name",
      "hole": .4,
      "type": "pie"
      },     
      {"values": df.total,
      "labels": df.type,
      "textposition":"inside",
      "domain": {"x": [.52, 1]},
      "name": "2015-16",
      "hoverinfo":"label+percent+name",
      "hole": .4,
      "type": "pie"}],
     "layout": {
        "title":"Use of Family Planning Methods",
        "annotations": [
        {
        "font": {
                    "size": 15
                },
                "showarrow": False,
                "text": "2005-06",
                "x": 0.2,
                "y": 0.5
            },
            {
                "font": {
                    "size": 15
                },
                "showarrow": False,
                "text": "2015-16",
                "x": 0.8,
                "y": 0.5
            } ]}}
    graph = dict(fig)
    #print(graph)
    # Converting data to appropriate json format
    graphJSON = json.dumps(graph, cls=plotly.utils.PlotlyJSONEncoder)

    return graphJSON




if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8000)