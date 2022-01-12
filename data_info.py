from sqlalchemy import create_engine
# import os 
import pandas as pd

# connect_string = os.getenv('DATABASE_URL2', '')
# print("conn string", connect_string)
engine = create_engine("sqlite:///data/fires_data.db")

def get_spi():
    sql = """
    Select * from SPI
    """
    results_df = pd.read_csv('./data/SPI-tx.csv')
    results = results_df.to_dict(orient='records')
    return results

def get_paleo():
    sql = """
    Select * from PALEO
    """

    results_df = pd.read_sql(sql, con=engine)
    p_results = results_df.to_dict(orient='records')
    return p_results

def get_acres_cause():
    sql = """
    SELECT stat_cause_descr, sum(fire_size)
    FROM Fires
    GROUP BY stat_cause_descr
    ORDER BY stat_cause_descr ASC;      
    """

    results_df = pd.read_sql(sql, con=engine)
    AC_results = results_df.to_dict(orient='records')
    return AC_results

def get_acres_class():
    sql = """
    SELECT fire_size_class, sum(fire_size)
    FROM Fires
    GROUP BY fire_size_class
    ORDER BY fire_size_class ASC;  
    """

    results_df = pd.read_sql(sql, con=engine)
    AClass_results = results_df.to_dict(orient='records')
    return AClass_results

def get_acres_year():
    sql = """
    SELECT fire_year, sum(fire_size)
    FROM Fires
    GROUP BY fire_year
    ORDER BY fire_year ASC;    
    """

    results_df = pd.read_sql(sql, con=engine)
    AY_results = results_df.to_dict(orient='records')
    return AY_results

def get_texas_fires():
    sql = """
    Select * from Fires
    WHERE STATE = 'TX';
    """

    results_df = pd.read_sql(sql, con=engine)
    TF_results = results_df.to_dict(orient='records')
    return TF_results

def get_cali_fires():
    sql = """
    Select * from Fires
    WHERE STATE = 'CA';
    """

    results_df = pd.read_sql(sql, con=engine)
    TF_results = results_df.to_dict(orient='records')
    return TF_results

def get_fires_by_year():
    sql = """
    SELECT COUNT(fire_year), fire_year
    FROM Fires
    WHERE STATE = 'TX'
    GROUP BY fire_year
    ORDER BY fire_year ASC;
    """

    results_df = pd.read_sql(sql, con=engine)
    fby_results = results_df.to_dict(orient='records')
    return fby_results

def get_causes_by_year():
    sql = """
    SELECT COUNT(stat_cause_descr), fire_year, stat_cause_descr
    FROM Fires
    WHERE STATE = 'TX'
    GROUP BY fire_year, stat_cause_descr
    ORDER BY fire_year ASC;
    """

    results_df = pd.read_sql(sql, con=engine)
    cby_results = results_df.to_dict(orient='records')
    return cby_results

def get_selected_colo_fires(option):
    if str(option).isnumeric():
        sql = f"""
        Select fire_size, fire_size_class,
        fire_year, latitude, longitude,
        stat_cause_descr
        from fires
        WHERE STATE = 'CO'
        AND FIRE_YEAR = {option}
        """
    else:
        sql = f"""
        Select fire_size, fire_size_class,
        fire_year, latitude, longitude,
        stat_cause_descr
        from fires
        WHERE STATE = 'CO'
        AND stat_cause_descr = '{option}'
        """            

    results_df = pd.read_sql(sql, con=engine)
    # code uses upper case so we have to change this
    results_df.columns = [
        'FIRE_SIZE',
        'FIRE_SIZE_CLASS',
        'FIRE_YEAR',
        'LATITUDE',
        'LONGITUDE',
        'STAT_CAUSE_DESCR'
    ]
    TF_results = results_df.to_dict(orient='records')
    return TF_results

def get_selected_cali_fires(option):
    if str(option).isnumeric():
        sql = f"""
        Select fire_size, fire_size_class,
        fire_year, latitude, longitude,
        stat_cause_descr
        from fires
        WHERE STATE = 'CA'
        AND FIRE_YEAR = {option}
        """
    else:
        sql = f"""
        Select fire_size, fire_size_class,
        fire_year, latitude, longitude,
        stat_cause_descr
        from fires
        WHERE STATE = 'CA'
        AND stat_cause_descr = '{option}'
        """            

    results_df = pd.read_sql(sql, con=engine)
    # code uses upper case so we have to change this
    results_df.columns = [
        'FIRE_SIZE',
        'FIRE_SIZE_CLASS',
        'FIRE_YEAR',
        'LATITUDE',
        'LONGITUDE',
        'STAT_CAUSE_DESCR'
    ]
    TF_results = results_df.to_dict(orient='records')
    return TF_results

def get_selected_texas_fires(option):
    if str(option).isnumeric():
        sql = f"""
        Select fire_size, fire_size_class,
        fire_year, latitude, longitude,
        stat_cause_descr
        from fires
        WHERE STATE = 'TX'
        AND FIRE_YEAR = {option}
        """
    else:
        sql = f"""
        Select fire_size, fire_size_class,
        fire_year, latitude, longitude,
        stat_cause_descr
        from fires
        WHERE STATE = 'TX'
        AND stat_cause_descr = '{option}'
        """            

    results_df = pd.read_sql(sql, con=engine)
    # code uses upper case so we have to change this
    results_df.columns = [
        'FIRE_SIZE',
        'FIRE_SIZE_CLASS',
        'FIRE_YEAR',
        'LATITUDE',
        'LONGITUDE',
        'STAT_CAUSE_DESCR'
    ]
    TF_results = results_df.to_dict(orient='records')
    return TF_results

def get_years():
    sql = """
    Select * from year_list
    """

    results_df = pd.read_sql(sql, con=engine)
    year_results = results_df.to_dict(orient='records')
    return year_results

if __name__ == '__main__':
    info = get_spi()
    print(info)