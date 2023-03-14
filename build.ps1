# build step for github pages
ng build --output-path docs --base-href ./

# replace type=module in script
$path = "./docs/index.html";
(Get-Content -path ./docs/index.html) -replace 'type="module"','type="text/javascript"' | Out-File -encoding utf8 $path
