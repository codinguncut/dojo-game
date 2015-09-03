# Getting Started
* Software
	* install [Visual Studio Code](https://code.visualstudio.com/)
	* install [nodejs](https://nodejs.org/en/)
	* install [livepage](https://chrome.google.com/webstore/detail/livepage/pilnojpmdoofaelbinaeodfpjheijkbh?hl=en) for Chrome
	* in project folder: `npm install` (for "tsc")
* Serving
    * Option 1 - local web server
        * `npm start`
        * open browser to: "http://localhost:8080", enable "live page"
    * Option 2 - Chrome - open files locally
        * set flag "--allow-file-access-from-files" for Chrome
        * open index.html in browser, enable "live page"
    * Option 3 - Firefox - open files locally
        * open "about:config"
        * set "security.fileuri.strict_origin_policy" to "false"
        * no good "live page" alternative for firefox
* Editing
	* open project folder in Visual Studio Code
	* Run "build task" once (on Mac: Command-Shift-B)
	* From then on build task will run automatically with each "Save" 


# "Easy" Activities
* Display Text (add.text)
	* font
* Display Image/Sprite (add.image)
	* angle
	* scale
* Background Image
* Primitives
	* Graphics (drawCircle, lineTo, drawRect)
		* beginFill, endFill?
* Play a sound
* Basic Input
	* dragging (enableDrag)
	* click (inputEnabled, events.onInputDown)
* Constant movement
	* rotation
	* translation
* Use existing sprite animation (load.atlas, load.atlasXML, add, play)
* Spritesheet (load.spritesheet)


## Advanced
* Draw interactive polygon
* Tweening
* Advanced input
	* keyboard events
	* keyboard.addKeys (i.e. naming keys for actions)
	* pointer click/tap events
* Sprite anchor
* Grouping
* Button triggers event (add.button + callback)
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
* box2d
* Timer


# Phaser Resources
* http://gamemechanicexplorer.com/
* http://mightyfingers.com/
* http://phaser.io/sandbox
* https://koding.com/ has a dedicated phaser environment


# Game Art Resources
* kenney.nl/assets
* open bundle cc0
* opengameart.org
* reddit link for free game art
* spritelib
* phaser-examples/assets/


# TODO
* integrate web server into VSCode (either via `npm start` or a `gulp watch serve`)
* scale canvas to screen
* create git snapshots for incremental tasks
* consider "npm livereload" instead of "chrome live page"
