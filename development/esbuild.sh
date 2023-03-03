#!/bin/bash
# run from repo root
grep '<script .*src="\./' app/popup.html  | sed 's/^.*src=".\/\([^"{]*\)".*/\1/' | xargs -I{} bash -c 'find -name {} | grep -Ev "/node_modules/|/dist/"' | xargs -I {}
bash -c 'yarn dlx -q esbuild --bundle --platform=browser --external:crypto --target=chrome80,firefox80 {} > esout/dist.$(basename {})'

