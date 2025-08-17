# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deploy on AWs

1. Launch New Instance
2. Connect to Instance
3. download secret pem file
4. -> chmod 400 <secreat_file.pem>
5. -> copy the connection url for your instance it will you get there
6. install node
7. exit
8. re-connect with url
9. clone your repo
10. checkout to repo
11. sudo apt ubunto // to update all the dependancy
12. sudo apt install nginx // will deploy on nginx
13. sudo systemctl start nginx
14. sudo systemctl enable nginx
15. create a build of your project with npm run build command
16. Copy code from dist (build files) to /var/www/html
17. CMD TO COPY => "sudo scp -r dist/\* /var/www/html" remove \ before \* after paste
18. Enable Port 80 from instance
    - Go to instance
    - go to security tab
    - click on Security groups link
    - edit bounds
    - add rule
    - http - port 80 - 0.0.0.0/0 // to access from any whare
    - save rule
19. after some time your code is live on your Ipv4 address

Backend

- npm install
- allowed database to connect from the ipv4 // instance IP
- Install pm2 => npm install pm2 -g
- command to run code => pm2 start npm -- start
- again Enable Port where your backend is running
- steps are same which follows for port 80 frontend
- pm2 start npm --name 'weTinder-backend' -- start // now process name will be the weTinder-backend
- pm2 list => to get the list
- pm2 logs => to check logs
- pm2 flush <process_name> => to flush the logs
- pm2 stop <process_name> => will stop the process
- pm2 delete <process_name> => will delete the process
- need to change nginx config for proxy pass
- ex. http://<IPV4_HERE>/ => frontend is running
- backend is running on http://<IPV4_HERE>/<BACKEND_PORT> => http://<IPV4_HERE>/api will map to this
- To go to nginx command sudo nano /etc/nginx/sites-available/default
- Inside that file change the nginx config
- nginx config:
  server_name <your_domain>

  location /api/ {
  proxy_pass http://localhost:<your_backend_port>/;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
  }

- once config change we need to restart nginx
- command => sudo systemctl restart nginx
