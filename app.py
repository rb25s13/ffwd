# import necessary libraries
# from models import create_classes
# import os
# import sqlalchemy
import data_info
import pandas as pd
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine, inspect, join, outerjoin, MetaData, Table
from flask import (
    Flask,
    render_template,
    jsonify)


#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

from flask_sqlalchemy import SQLAlchemy
# from connection import connect_string

   
    
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/texas")
def tex():
    return render_template("texas.html")

@app.route("/california")
def cali():
    return render_template("california.html")

@app.route("/colorado")
def colo():
    return render_template("colorado.html")

@app.route("/api/fire_causes")
def causes():
    results = pd.read_csv('./data/fire_causes.csv')
    results = results.to_json(orient = "records")
    return results

@app.route("/api/year_list")
def year_list():
    yrResults = pd.read_csv('./data/year_list.csv')
    yrResults = yrResults.to_json(orient = "records")
    return yrResults

@app.route("/api/texas_fires")
def texas_fires():
    TF_results =  pd.read_csv('./data/Fires.csv')
    TF_results = TF_results[TF_results["STATE"] == "TX"]
    TF_results = TF_results.to_json(orient = "records")
    return TF_results

@app.route("/api/cali_fires")
def cali_fires():
    CaF_results =  pd.read_csv('./data/Fires.csv')
    CaF_results = CaF_results[CaF_results["STATE"] == "CA"]
    CaF_results = CaF_results.to_json(orient = "records")
    return CaF_results

@app.route("/api/colo_fires")
def colo_fires():
    CoF_results = pd.read_csv('./data/Fires.csv')
    CoF_results = CoF_results[CoF_results["STATE"] == "CO"]
    CoF_results = CoF_results.to_json(orient = "records")
    return CoF_results

@app.route("/api/texas_fires/<option>")
def selected_texas_fires(option):
    TFo_results =  pd.read_csv('./data/Fires.csv')
    TFo_results = TFo_results[TFo_results["STATE"] == "TX"]
    if str(option).isnumeric():
        ouput = TFo_results[TFo_results["FIRE_YEAR"] == int(option)]
    else:
        ouput = TFo_results[TFo_results["STAT_CAUSE_DESCR"] == option]
    ouput = ouput.to_json(orient = "records")
    return ouput

@app.route("/api/cali_fires/<option>")
def selected_cali_fires(option):
    CaFo_results =  pd.read_csv('./data/Fires.csv')
    CaFo_results = CaFo_results[CaFo_results["STATE"] == "CA"]
    if str(option).isnumeric():
        ouput = CaFo_results[CaFo_results["FIRE_YEAR"] == int(option)]
    else:
        ouput = CaFo_results[CaFo_results["STAT_CAUSE_DESCR"] == option]
    ouput = ouput.to_json(orient = "records")
    return ouput

@app.route("/api/colo_fires/<option>")
def selected_colo_fires(option):
    CoFo_results = pd.read_csv('./data/Fires.csv')
    CoFo_results = CoFo_results[CoFo_results["STATE"] == "CO"]
    if str(option).isnumeric():
        ouput = CoFo_results[CoFo_results["FIRE_YEAR"] == int(option)]
    else:
        ouput = CoFo_results[CoFo_results["STAT_CAUSE_DESCR"] == option]
    ouput = ouput.to_json(orient = "records")
    return ouput


if __name__ == "__main__":
    app.run()