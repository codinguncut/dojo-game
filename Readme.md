# About

Game starter pack for Coder Dojo using the [Phaser](phaser.io) game engine. Phaser engine supports all modern browser as well as mobile devices.

The starter pack allows children of all ages to build a physics-based game in less than 100 lines of code.

Using the free "Visual Studio Code" tool (Mac, Linux, Windows) full autocomplete and syntax checking support are available.
The setup below is leveraging TypeScript to support better IDE support, but for all practical purposes the game is written in Javascript.

[Game Demo](http://codinguncut.github.io/dojo-game/) (assets need a moment to load)


# Getting Started
* Software
	* install [Visual Studio Code](https://code.visualstudio.com/) (free)
	* install [nodejs](https://nodejs.org/en/)
	* install [livepage](https://chrome.google.com/webstore/detail/livepage/pilnojpmdoofaelbinaeodfpjheijkbh?hl=en) for Chrome
* Project
	* download project [zip file](https://github.com/codinguncut/dojo-game/archive/master.zip)
	* unzip master.zip (double-click, extract, choose folder)
	* open project folder
	* in "scripts" folder double-click "install dependencies.bat"
* Serving
	* in "scripts" folder double-click on "start web server.bat"
	* minimize the terminal window
	* enable "live page" in Chrome
* Editing
	* launch Visual Studio Code (i.e. by clicking on "scripts\\VSCode" shortcut)
		* on Windows this takes very long to load
	* drag project folder to Visual Studio Code
	* Run "build task" once (Ctrl-Shift-B)
		* you will see a little spinner in the bottom left corner
		* From then on build task will run automatically with each "Save" 


# MacOS, Linux
* please run `npm install -g typescript http-server`
* to run the local web server, run `http-server . -s -o`
* open browser to "http://localhost:8080"


# Getting (transparent) images from the internet
* for best results images need a transparent background
* google search i.e. "penguin"
	* Images
		* Search tools
			* Color -> Transparent
	* Click on the image
		* View image
			* Right-click - "Save Image as"


# Creating own content
* take pictures in front of a greenscreen
* draw figures on paper


# "Easy" Activities
* Display Text (add.text)
	* font
* Display Image/Sprite (add.image)
	* angle
	* scale
* Background Image
* Play a sound
* Basic Input
	* dragging (enableDrag)
	* click (inputEnabled, events.onInputDown)
* Constant movement
	* rotation
	* translation
* Button
* Use existing sprite animation (load.atlas, load.atlasXML, add, play)
* Spritesheet (load.spritesheet)
* Grouping
* Find/draw own sprite to add


# Advanced Activities
* Advanced input
	* keyboard events
	* keyboard.addKeys (i.e. naming keys for actions)
	* pointer click/tap events
* Set sprite anchor
* Physics
	* collisions handling
	* bounce
	* drag/friction
	* immovable
* Debug
* Callbacks
* Dynamically spawning objects
* Tilemaps
* Camera follow
* Timer
* Virtual joystick
	* http://phaser.io/examples/v2/virtualjoystick/arcade-joystick


# License
* Licensed under MIT license
