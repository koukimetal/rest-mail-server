# REST Server to send emails (Currently it supports only Gmail API)

## How to set up

1. Get gmail API token.
    1. Go to https://developers.google.com/gmail/api/quickstart/nodejs
    2. Download `credentials.json`
    3. Create `./secret` and put it under the directory.
2. Set up node environment
    1. Run `npm install`
    2. Create `.env` here with `PROJECT_ROOT` and `SERVER_PORT`. For example,
        ```
            echo "PROJECT_ROOT=`pwd`" >> ".env" && echo "SERVER_PORT=18184" >> ".env"
        ```
3. Set up credential
    1. Run `npm run setup`
    2. You are given a URL. Go there and copy a value and paste it to a terminal.
    3. You will get `secret/token.json`

## Send email

1. Run `npm start` to start a server.
2. Send POST request to the server. For example,
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"from":"youremail", "to":"toemail", "subject":"example", "text": "hello world"}' \
  http://localhost:18184/sendEmail
```
