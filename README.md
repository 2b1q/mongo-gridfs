# Simple file > mongoDB uploader (using mongoGridFS)

## Run gridUploader

- clone repo

```sh
git clone https://github.com/2b1q/mongo-gridfs.git
cd mongo-gridfs
```

- run mongo stack (DB + MongoExpressWeb UI)

```sh
docker-compose -f mongo-stack.yml up
```

- run app passing the file

```sh
node app.js <filename>
```

## Stop docker-composer

```sh
docker-compose -f mongo-stack.yml down
```
