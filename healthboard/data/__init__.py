
import os, inspect
import pandas as pd

# get project root dir
CURR_DIR = os.path.dirname(inspect.getabsfile(inspect.currentframe()))
ROOT_DIR = os.path.dirname(CURR_DIR)


fname = os.path.join(CURR_DIR, "raw", "data.csv")
data_df = pd.read_csv(fname)
data_df = data_df[data_df.columns[:-2]]
