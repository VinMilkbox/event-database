RUN FOLLOW COMAND
- `npm install --save`

Create a .env file with the follow params:
`NODE_ENV=develop
DB_DATABASE=dbname
DB_HOST=hostname or ipaddress
DB_USER=dbUser
DB_PASSWD=dbPassword
REGION=region
`

Test with jest:
- `npm run test`

Will run the follows test:
- `Passing EventJson return OBJ`
- `Checking createTransaction`
- `Checking findTransaction`