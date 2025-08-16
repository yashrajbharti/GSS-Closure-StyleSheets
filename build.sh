#!/usr/bin/env bash
set -e
java -jar closure-stylesheets.jar styles.gss --output-file styles.css --rename none
echo "Built styles.css"