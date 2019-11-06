<div align="center">
  <p>With support from <a href="https://glitch.com/@handsfreejs">Glitch.com</a>, the <a href="https://www.cmu.edu/cfa/studio/index.html">STUDIO at CMU</a>, the <a href="https://youtu.be/CJDpF4xUieY?t=58">School of AI</a> and you!</p>
  <img src="https://media.giphy.com/media/3Z15Ve7WEQGkLa1FwC/giphy.gif" alt="handsfree.js">
  <h1>Handsfree.js</h1>
  <p>A wrapper library around web-based computer vision models for the purpose of interacting with the web handsfree</p>
  <p>Powered by <a href="https://github.com/jeeliz/jeelizWeboji">Jeeliz Weboji</a></p>
<p>
  <img class="mr-1" src="https://img.shields.io/github/release-pre/handsfreejs/handsfree.svg"> <img class="mr-1" src="https://img.shields.io/github/last-commit/handsfreejs/handsfree.svg"> <img class="mr-1" src="https://img.shields.io/github/commits-since/handsfreejs/handsfree/4.0.1.svg">
  <img src="https://img.shields.io/github/repo-size/handsfreejs/handsfree.svg">
</p>
<p>
  <img class="mr-1" src="https://img.shields.io/github/issues-raw/handsfreejs/handsfree.svg"> <img class="mr-1" src="https://img.shields.io/github/issues/handsfreejs/handsfree/✨ enhancement.svg"> <img src="https://img.shields.io/github/issues-pr-raw/handsfreejs/handsfree.svg">
</p>
<p>
  <img class="mr-1" src="https://img.shields.io/github/issues/handsfreejs/handsfree/🐞 bug.svg"> <img src="https://img.shields.io/github/issues/handsfreejs/handsfree/👷 help wanted.svg">
</p>
<p>
  <img src="https://img.shields.io/circleci/project/github/handsfreejs/handsfree/master.svg">
  <img src="https://img.shields.io/codecov/c/github/handsfreejs/handsfree/master.svg?style=flat">
</p>
</div>

---

## Local Development

This project contains the Handsfree.js library (see `/src/handsfree`) and a development environment with sample code and demos. To run these, you'll need [NodeJS](https://nodejs.org/en/download/) and the [Yarn package manager](https://yarnpkg.com/en/docs/install#windows-stable).

After downloading this project repo, you'll then need to install dependencies by running `yarn` in the project's root directory. Then you'll have the following commands available:

```bash
# Start a local dev environment on localhost:8080
yarn start

# Build for production into /dist/
yarn build

# Deploy to handsfree.js.org
yarn deploy
```

### Deploy Script

Running `yarn deploy` will deploy
