
# Health Risk Dashboard

<p>This repository contains a Python project that implements a Flask based dashboard to explore different health risk factors in connection with different demographics.
The current implementation implements the following objectives:</p>

- USe Python and Pandas to perform data exploration and data data retrieval.
- Implement a Flask Web application.
- Build interactive data visualization by pure D3.js.
- Deploy the webapp to Heroku.

The current implementation of this project is [here](https://healthboard-heroku.herokuapp.com/).

## Data
[Data sampled from the U.S. Census Bureau and the Behavioral Risk Factor Surveillance System](https://github.com/aidinhass/healthboard/blob/master/healthboard/data/raw/data.csv)

## Requirements
- flask         1.0.2
- numpy         1.15.0
- pandas        0.23.4
- jupyter       1.0.0
- nb_conda      2.2.1

## Directory Structure
```
.
├── docs                <- Documents related to this project
├── images              <- Images for README.md files
├── notebooks           <- Ipythoon Notebook files
├── reports             <- Generated analysis as HTML, PDF, Latex, etc.
│   ├── figures         <- Generated graphics and figures used in reporting
│   └── logs            <- Generated log files  
└── healthboard
    ├── conf
    ├── data            <- data utilized in this project
    │   ├── ext
    │   ├── int
    │   └── raw
    ├── src             <- Source files used in this project
    ├── static          <- CSS/SCSS/JS/Vedoer source files
    └── templates       <- Flask templates 
```
## Installation
Install python dependencies from  `requirements.txt` using conda.
```bash
conda install --yes --file conda-requirements.txt
```

Or create a new conda environment `<new-env-name>` by importing a copy of a working conda environment at the project root directory :`conda-healthboard.yml`.
```bash
conda env create --name <new-env-name> -f conda-healthboard.yml
```
## Usage
```bash
python run.py
```
## References

## To Do
- [ ] Add meta statistic side card
- [ ] Add table

## License
MIT License

