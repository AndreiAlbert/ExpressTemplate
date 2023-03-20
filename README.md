# ExpressTemplate
<h1>What is this </h1>
  This is a cli tool built to help setting up expressjs projects faster
  It will create a src file with a index.js file in init. The index.js contains the basic structure to run an expressjs server
  Alongside creating the index.js file, it will also automatically install expressjs using npm and add a npm run script in the package.json file
  
<h1> Technologies used </h1>
  <ul> 
    <li>NodeJs</li>
    <li>npm package yargs(https://www.npmjs.com/package/yargs)</li>
    <li>npm package shelljs(https://www.npmjs.com/package/shelljs)</li>
  </ul>
  
<h1>Flags available </h1>
 <ul> 
  <li> --port=number - specify the port on which the server will run. If it is not specified, the default is 5000 </li>
  <li> --path=path/to/the/project - specify the path in which the program will create a src file. If no path is specified, the current directory is default. </li>
  <li> -g. Init a local git repository. Also creates a .gitignore file for node_modules </li>
</ul>
    
