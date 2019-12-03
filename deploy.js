/**
 * Helper script for building and deploying
 * Deploys out of /dist/
 *
 * - Deploys to package.json.deploy.repo
 * - Domain is set to package.json.deploy.url
 */

// build
const pkg = require('./package.json')
const gitRepo = pkg.deploy.repo
const domainName = pkg.deploy.domain
const shell = require('shelljs')

// navigate into the build output directory
shell.cd('dist/demos')

// if you are deploying to a custom domain
shell.exec(`echo ${domainName} > CNAME`)

shell.exec('git init')
shell.exec('git add -A')
shell.exec(`git commit -m "deploy docs for ${pkg.version}"`)

// if you are deploying to https://<USERNAME>.github.io
// git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

// if you are deploying to https://<USERNAME>.github.io/<REPO>
shell.exec(`git remote add origin ${gitRepo}`)
shell.exec('git push origin master:gh-pages -f')

shell.cd('-')
