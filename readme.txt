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
