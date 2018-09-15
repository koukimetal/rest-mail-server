# REST Server to send emails (Currently it supports only Gmail API)

## How to set up
Get gmail API token.
https://developers.google.com/gmail/api/quickstart/nodejs
Download `credentials.json` put it under `secret`.
Run `npm run setup`
You are given a URL. Go there copy a value and paste to console.
You will get `secret/token.json`

## Send email
Run `npm start` to start a server.

```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"from":"youremail", "to":"toemail", "subject":"example", "text": "hello world"}' \
  http://localhost:18184/sendEmail
```
