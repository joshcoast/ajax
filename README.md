Using the giffy API to get practice with ajax.

** Note: Setting up this particular project with scss and gulp is a HUGE overkill. I'm only doing it for experimental purposes.**

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

Workflow
-----------

- run `gulp`
- make changes in `app` changes will be reflected in your default browser automatically. (edit only scss files for styles)
- When ready to push, stop the gulp watch possess and run `gulp build`. This will optimize the site and build the dist directory. Production will read from the dist directory. 