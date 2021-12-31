https://www.ovh.com/manager/#/


contact@focus-formations.com

https://affilae.com/fr/api-v2/

Build de l'appli react (WINDOWS):
---------------------
dans package.json mettre la ligne suivante:
    "proxy": "http://localhost:8686"
    Ce sera le RootURI des requete Backend Node


// Build projet (DOS Windows)
// --------------------------
npm run build

copier le contenu du repertoire build dans:
    pi@raspberrypi:/var/www/html

relancer apache
    ps -ef | grep apache2

    # service apache2 start
    # service apache2 stop

// Dockerisation d'une appli react
// ------------------------------
  https://mherman.org/blog/dockerizing-a-react-app/
  builder un container
  docker build -t sample:dev .

  Lancer un container
  docker run -it --rm  -v ${PWD}:/app -v /app/node_modules -e CHOKIDAR_USEPOLLING=true -p 80:3000 sample:dev

  voir les container qui tournent
  docker ps -a

  curl -s -X GET http://localhost:80


   // comment recuperer un image depuis pi
   docker login docker.io
   docker push  jpldocker/marc_affiliation_ui

// Pour acceder a l'UI
// -------------------

nginx:
    ecoute sur le port 85 et reroute sur le frontend qui ecoute sur le port 80
    normalement idem sur 443
    exemple:

        server {
                listen 85;
                listen 443 ssl;
                #listen [::]:85;

                server_name _;

                root /var/www/example.com;
                index index.html;

                ssl_certificate           /etc/nginx/jpl.cert;
                ssl_certificate_key       /etc/nginx/jpl.key;

                auth_basic           "Administrator’s Area";
                auth_basic_user_file /etc/nginx/.htpasswd;

                #location / {
                #        proxy_pass https://lemonde.fr;
                #}
                location /service/pierre/podo/ {
                        proxy_pass http://86.252.96.127:5002;
                        proxy_set_header X-Forwarded-Host $host:$server_port;
                        proxy_set_header X-Forwarded-Server $host;
                        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                        #proxy_pass http://192.168.0.37:5001/;
                }
                location /service/marc/ {
                        proxy_pass http://192.168.0.37:80/;
                        proxy_set_header X-Forwarded-Host $host:$server_port;
                        proxy_set_header X-Forwarded-Server $host;
                        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

                }

                location /service/backend/ {
                        proxy_pass http://192.168.0.37:8686/service/backend/;
                        proxy_set_header X-Forwarded-Host $host:$server_port;
                        proxy_set_header X-Forwarded-Server $host;
                        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

                }
                location /service/jpl/podo {
                                proxy_pass http://192.168.0.37:5001/;
                }

                location /service/lequipe {
                           proxy_pass https://lequipe.fr/;
                }
                #location / {
                #               proxy_pass http://86.252.96.127:5002;
                #}

                location / {
                        proxy_pass http://192.168.0.37:80;

                }

        }

    Pour lancer le docker nginx :
        sudo docker run -t run -p 85:85 -d name toto -it marcprj-nginx


