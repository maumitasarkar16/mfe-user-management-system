# mfe-user-management-system
React Microfrontend User Management System - GIC assignment

---------------------------------------------------------------------------------------------------------

This repository demonstrates a Micro-Frontend (MFE) architecture using Vite + React 18 + Module Federation. The project includes:

Shell: Main container with navigation
UserList MFE: Displays paginated user list with search
UserDetails MFE: Displays selected user details
--------------------------------------------------------------------------------------------
 
Shell Loads UserList MFE and UserDetails MFE dynamically
Listens for userSelected event from UserList to render UserDetails
Provides common navigation
----------------------------------------------------------------------------------------
UserList MFE Fetches users from API
Supports search and debounced filtering
Implements pagination
Dispatches userSelected event on user click
---------------------------------------------------------------------------------------------

UserDetails MFE Listens for userSelected event
Fetches user details by ID
Displays detailed information
edit Form
Save in localstorage
-------------------------------------------------------------------------------------------------

 ===================================================To run the servers~~~~~~~
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



