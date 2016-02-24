/*
 * Project: appversion
 * Version: 1.2.0
 * Author: delvedor
 * Twitter: @delvedor
 * License: GNU GPLv2
 * GitHub: https://github.com/delvedor/appversion
 */

'use strict'

const fs = require('fs')
const path = require('path')
const directory = require('app-root-path').path
const JSON_FILE = 'appversion.json'

function getAppVersionSync () {
  try {
    let obj = JSON.parse(fs.readFileSync(path.join(directory, JSON_FILE)))
    delete obj.json
    return obj
  } catch (err) {
    throw new Error(`${JSON_FILE} not found.`)
  }
}

function getAppVersion (callback) {
  fs.readFile(path.join(directory, JSON_FILE), (err, data) => {
    data = JSON.parse(data)
    if (data) delete data.json
    callback(err, data)
  })
}

// pattern:
// M : version.major
// m : version.minor
// p : version.patch
// S : status.stage
// s : status.number
// n : build.number
// t : build.total
// d : build.date
// c : commit
// . : separator
// - : separator
function composePatternSync (pattern) {
  if (typeof pattern !== 'string') throw new Error('compose() -> pattern is not a string')
  pattern = pattern.split('')
  let obj = getAppVersionSync()
  let ptt = ''
  for (let i = 0; i < pattern.length; i++) {
    let ele = pattern[i]
    if (ele === 'M') {
      ptt += obj.version.major
    } else if (ele === 'm') {
      ptt += obj.version.minor
    } else if (ele === 'p') {
      ptt += obj.version.patch
    } else if (ele === 'S') {
      ptt += obj.status.stage
    } else if (ele === 's') {
      ptt += obj.status.number
    } else if (ele === 'n') {
      ptt += obj.build.number
    } else if (ele === 't') {
      ptt += obj.build.total
    } else if (ele === 'd') {
      ptt += obj.build.date
    } else if (ele === 'c') {
      ptt += obj.commit
    } else {
      ptt += ele
    }
  }
  return ptt
}

function composePattern (pattern, callback) {
  if (typeof pattern !== 'string') throw new Error('compose() -> pattern is not a string')
  pattern = pattern.split('')
  getAppVersion((err, obj) => {
    if (err) console.log(err)
    let ptt = ''
    for (let i = 0; i < pattern.length; i++) {
      let ele = pattern[i]
      if (ele === 'M') {
        ptt += obj.version.major
      } else if (ele === 'm') {
        ptt += obj.version.minor
      } else if (ele === 'p') {
        ptt += obj.version.patch
      } else if (ele === 'S') {
        ptt += obj.status.stage
      } else if (ele === 's') {
        ptt += obj.status.number
      } else if (ele === 'n') {
        ptt += obj.build.number
      } else if (ele === 't') {
        ptt += obj.build.total
      } else if (ele === 'd') {
        ptt += obj.build.date
      } else if (ele === 'c') {
        ptt += obj.commit
      } else {
        ptt += ele
      }
    }
    callback(ptt)
  })
}

exports.getAppVersionSync = getAppVersionSync
exports.getAppVersion = getAppVersion
exports.composePatternSync = composePatternSync
exports.composePattern = composePattern