Using the giffy API to get practice with ajax. Also a side effort of testing out the tailwind css framework https://tailwindcss.com/docs/.

** Note: Setting up this particular project with scss, gulp, and tailwind is HUGE overkill. I'm only doing it for experimental purposes.**

File structure:
 |- app/ --> the dev site
      |- css/
      |- fonts/
      |- images/ 
      |- index.html
      |- js/ 
      |- scss/
  |- dist/ --> the production site
  |- gulpfile.js
  |- node_modules/
  |- package.json

** tailwind need node -v6 **
Install and use node -v6 using nvm:
nvm install 6
nvm use 6

To install nvm if you don't already have it. http://michael-kuehnel.de/node.js/2015/09/08/using-vm-to-switch-node-versions.html

tailwind settings
-----------------

/tailwind.js has all the settings and defaults for the project. Use it to make global css changes for your project.
https://tailwindcss.com/docs/configuration 

