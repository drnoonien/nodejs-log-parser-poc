## What?
Work in progress warcraft combatlog parser. Exports all events per
encounter as JSON.

## How?

1) Run `npm i` to install all the dependencies.

2) Run `npm start "path-to-log-file"`. This will process the log file
   and save a JSON file per encounter to the `./parsed` folder.