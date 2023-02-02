@ECHO off

ng build --output-path docs --base-href ./ && node verify-build.js
