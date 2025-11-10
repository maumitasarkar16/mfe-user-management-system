# mfe-user-management-system
React Microfrontend User Management System - GIC assignment

---------------------------------------------------------------------------------------------------------
This repository demonstrates a Micro-Frontend (MFE) architecture using Vite + React 18 + Module Federation. The project includes three micro apps:

Shell: Main container with navigation. The main host application.
UserList MFE: Displays paginated user list with search.
UserDetails MFE: Displays selected user details. Shows detailed information of a selected user.
--------------------------------------------------------------------------------------------

**Tech Stack**
Frontend Framework: React 18 + TypeScript
Bundler: Vite
Module Federation Plugin: @originjs/vite-plugin-federation
Routing: React Router v6
Styling: SCSS Modules
State Management: React hooks and props drilling (lightweight communication)
Inter-app Communication: Local Storage + Custom Events
Tooling: ESLint + Prettier for code quality

---------------------------------------------------------------------------------------

Shell Loads UserList MFE and UserDetails MFE dynamically
Listens for userSelected event from UserList to render UserDetails
Provides common navigation

----------------------------------------------------------------------------------------
**UserList MFE Fetches users from API**
Supports search and debounced filtering
Implements pagination
Dispatches userSelected event on user click

---------------------------------------------------------------------------------------------

**UserDetails MFE Listens for userSelected event**
Fetches user details by ID
Displays detailed information
edit Form
Save in localstorage

-------------------------------------------------------------------------------------------------

Deployment to Vercel: https://mfe-user-management-system-erwz8peji-maumita-sarkars-projects.vercel.app/

========================================= **To run the servers**=======================================
For UserList MFE- 
   1.npm run build , 
   2.npx serve dist -l 5001 , 
   3.http-server dist -p 5001 -c-1 --cors

For UserDetails MFE- 
   1.npm run build , 
   2.npx serve dist -l 5002 , 
   3.http-server dist -p 5002 -c-1 --cors   

shell - dashboard 
   1.npm run dev

------------------------------------------------------------------------------------------------------
 **INSTALLATION PROCESS**


created a main project folder then ran git init
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
add tsconfig.app.json and tsconfig.node.json "incremental": true, 

remove the line from tsconfig.app.json and tsconfig.node.json => erasableSyntaxOnly 

remove the line from tsconfig.app.json and tsconfig.node.json => noUncheckedSideEffectImports

change tsconfig.node.json => "target": "esnext"

------------------------------------------------


//dashboard-shell vite.config.ts:

federation({
  remotes: {
    remoteUserList: 'http://localhost:5001/assets/remoteEntry.js',
    remoteUserDetails: 'http://localhost:5002/assets/remoteEntry.js',
  },
})

====================================

Remote 1 — User List App

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: remoteUserList: 
      filename: 'remoteEntry.js',
      exposes: {
        './UserList': './src/components/UserList.tsx',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
server: {
    port: 5001,
  },
});

==========================================

Remote 2 — User Details App

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remoteUserDetails', 
      filename: 'remoteEntry.js',
      exposes: {
        './UserDetails': './src/components/UserDetails.tsx',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
server: {
    port: 5002,
  },
});

=============================================

//dashboard-shell/src/App.tsx
const UserList = React.lazy(() => import('remoteUserList/UserList'));
const UserDetails = React.lazy(() => import('remoteUserDetails/UserDetails'));
From the remote app named remoteUserList (running on port 5001), import the exposed module ./UserList.


========================================

dashboard-shell/src/vite-env.d.ts, add:

declare module 'remoteUserList/UserList';
declare module 'remoteUserDetails/UserDetails';

------------------------------------------------------------------------------

npm install react-router-dom
npm install --save-dev @types/react-router-dom  
in all 3 folders

---------------------------------------------

 make sure
 remoteUserList: 'http://localhost:5001/assets/remoteEntry.js' in vite-onfig.json in shell-dashboard
 server: {
  port: 5001,
  cors: true
} in remote app


------------------------------------------------------------------------------------------------------------

Communication

UserList dispatches a custom event:
window.dispatchEvent(new CustomEvent("userSelected", { detail: userId }));


Shell listens to the event:
useEffect(() => {
        const handleUserSelected = (event: CustomEvent) => {
            const userId  = event.detail;
            navigate(`/users/${userId }`);
        }
        window.addEventListener("userSelected", handleUserSelected as EventListener)
        return () => {
            window.removeEventListener("userSelected", handleUserSelected as EventListener)
        }
    }, [navigate])


  ---------------------------------------------------------------------------------
**Test Library**

npm install --save-dev @types/jest
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install --save-dev ts-jest jest-environment-jsdom


