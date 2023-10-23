# Welcome to the FitQuest Repository

## Table of Contents
[Project Description](#project-description)<br>
[Development Guidelines](#development-guidelines)<br>
[Installation](#installation)<br>
[Usage](#usage)<br>
[Configuration](#configuration)<br>

## Project Description


## Development Guidelines
- Always create a new branch for any feature not matter the size.
- To merge the changes create a pull request that will be verified by the team leader and other members.
- Create pull requests merging to the beta branch.
- Use descriptive titles for the commits and PRs. Write brief descriptions on the PRs of the changes made.
- **Never commit changes directly to main.**

## Installation
If you want to contribute to FitQuest's development this section is for you. Here we will walk you through how you can initialize the FitQuest repository on your local machine. If you haven't already, remember to clone our repository.

### Developing on FitQuest Front End using React-Native
First you will need to make sure you have `cd` into FitQuest's `Front End` folder located at the root directory. Afterwards, run the following command to install all dependencies listed on the project's `package.json` folder. This are necessary for the project to work correctly.

```
npm i
```

After `npm i` command runs, in order to run the FitQuest app locally, run the following command.

```
npm start
```

This command will run Expo locally. With Expo, developers are able to develop and deploy apps natively on all devices. For our current case, we will use Expo to run a live environment locally on our mobile device or on web for FirQuest app to run.

**Running Expo on our Mobile Device**
1. Download Expo Go app on Google Play Store or App Store.
2. Once Expo Go app has downloaded, scan the QR code displayed on the terminal you ran `npm start` on with your phone's camera.
3. This should redirect you to the Expo Go app which should load the FitQuest app. Any changes made on the code should update automatically.

**Running Expo on our Web Browser**
To run FitQuest directly on your computer's web browser, press 'w' after `npm start` command executes. Wait some seconds and you will be redirected to your web browser.

