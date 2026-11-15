#!/bin/bash
# Turns the Higgsfield clips into web files. Clips that follow the scroll get a keyframe every 4 frames so they can be
# stepped backwards and forwards smoothly; clips that simply loop are encoded the ordinary way.
#   bash web_enc.sh        (run from the repository root, after tools/hf_batch.mjs has filled art/; needs ffmpeg)
W=assets/video
for id in ship_far ship_ref ship_journey moon_flyover mars_travel mars_landing final_wide rego_cockpit rego_moon rego_mars rego_farewell; do [ -f art/${id}_v.mp4 ] && [ ! -f $W/$id.mp4 ] && ffmpeg -v error -y -i art/${id}_v.mp4 -an -vf "scale=1280:720,fps=24" -c:v libx264 -g 4 -bf 0 -crf 25 -preset slow -pix_fmt yuv420p -movflags +faststart $W/$id.mp4 && echo "scroll clip $id $(du -k $W/$id.mp4 | cut -f1) kB"; done
for id in earth_arrival moon_impact; do [ -f art/${id}_v.mp4 ] && [ ! -f $W/$id.mp4 ] && ffmpeg -v error -y -i art/${id}_v.mp4 -an -vf "scale=1280:720" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart $W/$id.mp4 && echo "loop clip $id $(du -k $W/$id.mp4 | cut -f1) kB"; done
for id in ship_far ship_ref ship_journey earth_arrival moon_flyover mars_travel mars_landing final_wide rego_cockpit rego_moon rego_mars rego_farewell; do [ -f art/$id.png ] && [ ! -f $W/$id.jpg ] && ffmpeg -v error -y -i art/$id.png -vf "scale=1280:720" -q:v 4 $W/$id.jpg; done
[ -f $W/moon_impact.mp4 ] && [ ! -f $W/moon_impact.jpg ] && ffmpeg -v error -y -i $W/moon_impact.mp4 -frames:v 1 -q:v 4 $W/moon_impact.jpg
ls $W | tr '\n' ' '
