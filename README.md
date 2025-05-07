# Voice Navigation for Blind

A voice navigation system designed to assist blind and visually impaired users in navigating nearby places using speech synthesis. This web application uses the user's location to provide auditory directions and nearby place names, making it easier for visually impaired individuals to identify their surroundings.

## Features

- **Voice-Based Navigation**: The system reads out the names of nearby places based on the user's current location.
- **Touch Gesture Support**: A simple double-tap gesture triggers the location fetch and voice output.
- **Real-time Nearby Place Search**: Uses the browser's geolocation to find places within a defined radius around the user.
- **Speech Synthesis**: Converts text to speech to communicate information audibly.

## Technologies Used

- **HTML**: For the basic structure of the web application.
- **CSS**: For styling the web page.
- **JavaScript**: For implementing functionality such as geolocation, speech synthesis, and fetching nearby places.
- **SpeechSynthesis API**: To read out place names and other information.

## How to Use

1. Open the web application on a mobile device or desktop browser.
2. Double-tap on the designated area to trigger the location fetch.
3. The system will fetch nearby places and read out their names aloud.
4. The application will continue reading out nearby places until all places are listed.

## Installation

This project doesn't require installation. Simply clone or download the repository and open the `index.html` file in any modern web browser.

```bash
git clone https://github.com/ozerkavi-dev/voice-navigation-blind.git
cd voice-navigation-blind
open index.html
