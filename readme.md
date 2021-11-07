# Myntra Ambassador Program - our submission for Myntra HackerRamp 2021

### Introduction

### Requirements:
1. NodeJs [Install NodeJs](https://nodejs.org/en/download/)
2. Docker [Install Docker](https://docs.docker.com/desktop/windows/install/)
   <br/>compile the `docker-compose.yml` file by running `$ docker-compose up` in a linux terminal or Windows subsystem for linux 2 `WSL2`.
3. Setup Windows subsystem for linux [WSL2](https://docs.microsoft.com/en-gb/windows/wsl/install-win10)

#### Note:<br/> if your system has `redis` or `postgres` already installed then you do not require to add the docker images.

### Dotenv File and Firebase Service Account Key
1. .env structure :-<br/>
   `PORT = "<port address>"`<br/>
    `secret = "<any string>"`<br/>
    `POSTGRES_USER = "<postgres user name>"`<br/>
    `POSTGRES_PASSWORD = "<postgres password>"`<br/>
    `POSTGRES_HOST = "<host name>"`<br/>
    `POSTGRES_PORT = <postgres port>`<br/>
    `POSTGRES_DATABASE = "<databaase name>"`<br/>
    `domainURL = "http://localhost:8000"`<br/>
2. firebase service account key :- [help link](https://stackoverflow.com/questions/40799258/where-can-i-get-serviceaccountcredentials-json-for-firebase-admin) <br/>
   `{`<br/>
   `"type": "",`<br/>
   `"project_id": "",`<br/>
   `"private_key_id": "",`<br/>
   `"private_key": "",`<br/>
   `"client_email": "",`<br/>
   `"client_id": "",`<br/>
   `"auth_uri": "",`<br/>
   `"token_uri": "",`<br/>
   `"auth_provider_x509_cert_url": "",`<br/>
   `"client_x509_cert_url": ""`<br/>
   `}`<br/>

### Now,
1. clone the repo.
2. Open the project folder.
3. run `$ npm start`

### Contributors:
1. Manit Mittal [Github](https://github.com/manitmittal) [LinkedIn](https://www.linkedin.com/in/manit-mittal-870035159/)
2. Viraj Gupta [Github](https://github.com/Viraj24Gupta) [LinkedIn](https://www.linkedin.com/in/viraj24gupta/)
3. Sahil Tiwari [Github](https://github.com/sahil-9898) [LinkedIn](https://www.linkedin.com/in/sahil-tiwari-307a61166/)