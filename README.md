# mfe-user-management-system
React Microfrontend User Management System - GIC assignment

----------------------------------------------------------------------------------------------------------

1.
created a main project folder -> git init
under it created 3 folders

updated node.js

inside each ran 
npm init -y
npm create vite@latest . -- --template react-ts
npm install sass
npm install antd
npm install @ant-design/icons
npm install -D @originjs/vite-plugin-federation  ( to check version - npm list @originjs/vite-plugin-federation)


----------------------------------------------
2. 
add tsconfig.app.json and tsconfig.node.json "incremental": true,
------------------------------------------------

3.
remove the line from tsconfig.app.json and tsconfig.node.json => erasableSyntaxOnly 

remove the line from tsconfig.app.json and tsconfig.node.json => noUncheckedSideEffectImports

change tsconfig.node.json => "target": "esnext"

------------------------------------------------


4. cd user-list-micro-frontend
   npm run build

5. npx serve dist -l 5001

6. npm install -g http-server
   http-server dist -p 5001 -c-1 --cors

7. Restart shell-dashboard after remote is running

------------------------------------------------
UserList - 
npm run build , 
npx serve dist -l 5001 , 
http-server dist -p 5001 -c-1 --cors

shell - dashboard = npm run dev

-------------------------------------------------------------------------------------



