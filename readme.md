# Myntra Ambassador Program - our submission for Myntra HackerRamp 2021

### Introduction 
This is our solution to the Myntra's HackerRamp 2021 Challenge to Enhance the User Experience and to improve inclusion of potential cutomer base from Tier-2 and Tier-3 Indian Cities through a Unique Ambassador Program while empowering the small business owners from those cities.

### Requirements:
1. NodeJs [Install NodeJs](https://nodejs.org/en/download/)
2. Docker [Install Docker](https://docs.docker.com/desktop/windows/install/)
   <br/>compile the `docker-compose.yml` file by running `$ docker-compose up` in a linux terminal or Windows subsystem for linux 2 `WSL2`.
3. Setup Windows subsystem for linux [WSL2](https://docs.microsoft.com/en-gb/windows/wsl/install-win10)

#### Note:<br/> if your system has `redis` or `postgres` already installed then you do not require to add the docker images.

### Dotenv File and Firebase Service Account Key
1. .env structure :-
   ```
   PORT = "<port address>"
   secret = "<any string>"
   POSTGRES_USER = "<postgres user name>"
   POSTGRES_PASSWORD = "<postgres password>"
   POSTGRES_HOST = "<host name>"
   POSTGRES_PORT = <postgres port>
   POSTGRES_DATABASE = "<databaase name>"
   domainURL = "http://localhost:8000"
   ```
   
2. firebase service account key :- [help link](https://stackoverflow.com/questions/40799258/where-can-i-get-serviceaccountcredentials-json-for-firebase-admin)
   ```
   {
   "type": "",
   "project_id": "",
   "private_key_id": "",
   "private_key": "",
   "client_email": "",
   "client_id": "",
   "auth_uri": "",
   "token_uri": "",
   "auth_provider_x509_cert_url": "",
   "client_x509_cert_url": ""
   }
   ```

### Now,
1. clone the repo.
2. Open the project folder.
3. run `$ npm start`

### Contributors:
1. Viraj Gupta [Github](https://github.com/Viraj24Gupta) [LinkedIn](https://www.linkedin.com/in/viraj24gupta/)
2. Manit Mittal [Github](https://github.com/manitmittal) [LinkedIn](https://www.linkedin.com/in/manit-mittal-870035159/)
3. Sahil Tiwari [Github](https://github.com/sahil-9898) [LinkedIn](https://www.linkedin.com/in/sahil-tiwari-307a61166/)
