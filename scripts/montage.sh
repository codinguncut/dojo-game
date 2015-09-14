#!/bin/bash
# convert animated gif to png spritesheet
montage "$1" -tile x1 -geometry +0+0 -alpha On -background "rgba(0,0,0,0.0)" -quality 100 "$(basename "$1" .gif).png"
