
import os, inspect
import pandas as pd

# get project root dir
CURR_DIR = os.path.dirname(inspect.getabsfile(inspect.currentframe()))
ROOT_DIR = os.path.dirname(CURR_DIR)


fname = os.path.join(CURR_DIR, "raw", "data.csv")
data = pd.read_csv(fname)
data = data[data.columns[:-2]]
data = data.to_dict(orient="index")
data =[data[key] for key in data.keys()]


