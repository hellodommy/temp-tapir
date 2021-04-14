# 🌡 Temperature Tapir

Temperature Tapir is a Room Temperature Monitoring Dashboard web app made with MeteorJS.

**Features supported:**
- Adjust timeframe using inputs
- Visualise temperature data
  - On a time series graph
  - On a floorplan, indicating average temperature
- Panning on time series using *shift + click + drag*
- Zooming on time series using *click + drag* or *mousewheel*
- Share app settings with a URL

[GitHub Repository](https://github.com/hellodommy/temp-tapir) | [Video Demo](https://youtu.be/4inohiuuZ-U)

## Brief description of files and folders

- `imports`
  - `api`
    - `floorplan.js`: Assigns colour to each room
    - `handleTimeframe.js`: Handles all operations related to time and date formatting (eg. from int to HH:MM string) and retrieves data
    - `linkability.js`: Provides functions to supports linkability (PWA) implementation
    - `sample.js`: Provides functions to manipulate data based on sample set
    - `tempPublications.js`: Publishes data collection
  - `db`
    - `TempCollection.js`: Creates collection to store temperature data
  - `ui`
    - `App.jsx`: Contains overall app structure and state
    - `Floorplan.jsx`: Contains Floorplan component (eg. each room SVG and onClick listener)
    - `TimeSeries.jsx`: Contains TimeSeries component (using Plotly)
- `private`
  - `room-temperatures.csv`: Given dataset
- `server`
  - `main.js`: Initialises dataset
  - `schema.json`: Data schema defined with JSON Schema
- `README.md`: Brief project introduction, credits and references

## Installation

1. Clone this repository.
2. Install Meteor [here](https://guide.meteor.com/v1.3/).
3. Run `meteor npm install` to download dependencies.
4. Run `meteor run` to start using 🌡 Temperature Tapir!

## References

- Get dates between range of dates: [miguelmota on Github](https://gist.github.com/miguelmota/7905510)
- Format Date object to yyyy-mm-dd: [user3470953 on Stack Overflow](https://stackoverflow.com/a/23593099)
- Regex for yyyy-mm-dd (use in schema): [Hamid Shatu on Stackoverflow](https://stackoverflow.com/a/22061799)
- Using images with SVG shapes: [Responsive SVG Image Overlays - Jess Damerst](https://dev.to/damjess/responsive-svg-image-overlays-4bni)
- Sorting object by value: [Nosredna on Stackoverflow](https://stackoverflow.com/a/1069840)
- React routing with URL: [An alternative to handle state in React: the URL !](https://dev.to/gaels/an-alternative-to-handle-global-state-in-react-the-url--3753)
- Getting window size for responsive design: [useWindowSize from useHooks](https://usehooks.com/useWindowSize/)

## Credits

- Inputs and slider: [Material UI](https://material-ui.com/)
- Time series: [plotly for React](https://plotly.com/javascript/react/)
- Colour palette: [Seaborn (HLS)](https://seaborn.pydata.org/tutorial/color_palettes.html)
- Adjusting sample size of data: [janjakubnanista/downsample](https://github.com/janjakubnanista/downsample)
