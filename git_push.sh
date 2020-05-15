#!/usr/bin/env bash

git add .
git commit --allow-empty -m "--story="$1" --user=吴龙永"
git push origin iteration-one
