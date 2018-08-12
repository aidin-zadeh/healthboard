
# healthboard

```diff
- **This rpository is currently under construction and is continuously filled with content.**
```

## Background

## Methodology

## Data

## Report

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
- [ ] TBA

## License
MIT License

