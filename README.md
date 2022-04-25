# 🤖 step-url

Script to fast open url with [raycast](https://www.raycast.com/) based on a registered steps routes

![image](images/screenshots/step-url.png)

## How to use it

- Dowload the `step-url.zip` from the [latest release](https://github.com/Danak-UY/step-url/releases/latest) and place files and place `step-url.js` and `step-url.config.json` **on the same folder**
- Configure the new script in [Raycast config](https://developer.mozilla.org/search)
- Edit `step-url.config.json` to your needs adding nested steps or combos

## Config File

The config file contains all the urls accesible for the script and different dividers or wildcards to search for

### Attributes

- `$configs`
  - `$dividers` -> Array of chars that may split the differents steps
  - `$wildcard` -> Wildcard to be replacefor for the provided query
  - `$comboWildcard` -> Wildcard to indicate the steps correspond to a combo
- `$combos` -> Steps resulting in an array of steped routes
  - `_name` -> Name to be displayed when oppening the urls
  - `_routes` -> Array with the different routes to open
- `$routes` -> Steps resulting in an url to be opened
  - `_name` -> Name to be displayed when oppening the url
  - `_url` -> The url for that step
  - `_search` -> Url with the query wildcard to be replaced

> You may validate the config file with [`step-url.schema.json`](src/step-url.schema.json)
