# Using Cypress

Installation:

```
npm install cypress --save-dev
```

## Start Cypress:

Option 1:
```
./node_modules/.bin/cypress open
```

Option 2:
```
$(npm bin)/cypress open
```
> Note: This option is available if your command prompt accepts bash language.

## Run and record tests

Option 1:
```
./node_modules/.bin/cypress run
```

Option 2:
```
$(npm bin)/cypress run
```

> Note: This option is available if your command prompt accepts bash language.

## Run, record tests and published them on Cypress Dashboard

Option 1:
```
./node_modules/.bin/cypress run --record --key [key_value]
```

Option 2:
```
$(npm bin)/cypress run --record --key [key_value]
```
> Note: This option is available if your command prompt accepts bash language.

You cant get "key_value" from Cypress dashboard: https://dashboard.cypress.io. Steps:
 1. Go to dashboard page and log in with your GitHub credentials.
 2. You will see your repo name on the dashboard and a table of running tests. Click on the botton "Settings"
 3. You will find a section called "Keys", copy "Record Key".
 4. Once you get "Record Key", paste it on command after option "--key".
 5. Press "Enter" in order to start execution.


