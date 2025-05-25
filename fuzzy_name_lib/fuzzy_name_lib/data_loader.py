import pandas as pd
from sqlalchemy import create_engine

def load_and_preprocess_data(db_url, table_name):
    engine = create_engine(db_url)
    query = f'SELECT * FROM "{table_name}";'
    df = pd.read_sql(query, engine)
    
    # Normalize column names
    df.columns = df.columns.str.strip().str.lower()
    df['names'] = df['names'].astype(str)
    return df
