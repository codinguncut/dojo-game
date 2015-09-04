# Getting Started
* Software
	* install [Visual Studio Code](https://code.visualstudio.com/)
	* install [nodejs](https://nodejs.org/en/)
	* install [livepage](https://chrome.google.com/webstore/detail/livepage/pilnojpmdoofaelbinaeodfpjheijkbh?hl=en) for Chrome
* Project
	* download project [zip file](https://github.com/codinguncut/dojo-game/archive/master.zip)
	* unzip master.zip (double-click, extract, choose folder)
	* open project folder
	* double-click on "install dependencies.bat"
* Serving
	* double-click on "start web server.bat"
	* minimize the terminal window
	* enable "live page" in Chrome
* Editing
	* launch Visual Studio Code
	* drag project folder to Visual Studio Code
	* Run "build task" once (Ctrl-Shift-B)
		* you will see a little spinner in the bottom left corner
		* From then on build task will run automatically with each "Save" 

# Getting Started (non-Windows)
* please run `npm install -g typescript http-server`
* to run the local web server, run `npm start`

# Getting images from the internet
* for best results images need a transparent background
* google search i.e. "penguin"
	* images
		* Search tools
			* Color -> Transparent
	* click on image
		* View image
			* right-click - "Save Image as"


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
* draw own sprite

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
* Camera (follow, zoom, cull(?))
* Timer


# Create own sprites
* http://www.piskelapp.com/ (save as png)

