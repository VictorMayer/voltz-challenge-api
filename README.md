# Tools API

This API allows you to list a variety of usefull tools, that can be sourced by a specific tag or not. 

If your loved tool isn't listed there, you can always register a new tool since you are an authenticated user.

To get authorization just create a user then sign-in. Now you have your own Bearer token!

If you registered a tool by mistake, you can delete it at any time.

<br/>

## The fastet way to test the API is through the deployed link here: 

        https://voltz-challenge.herokuapp.com/

### You can test the routes using [Postman](https://www.postman.com/downloads/) or [Thunder Client](https://www.thunderclient.com/)

<br>
<br>

## Possible Routes

    Create User:
                POST /users/sign-up
    Create Login:
                POST /users/sign-in

    Create Tool:
                POST /tools

    List all Tools:
                GET /tools

    List all Tools with given Tag:
                GET /tools?tag={yourTag}

    Remove Tool:
                DELETE /tools/:id


    *all /tools must be authenticated through Bearer token
<br>

## If you want to run the API on your machine follow the tutorial bellow

<br>

# Installation (Linux)

### 1. Download the repository

        git clone git@github.com:VictorMayer/voltz-challenge-api.git

### 2. Install the dependencies

        npm i

### 3. If you don't have PostgreSQL installed. If you do, skip this one

        sudo apt install postgresql postgresql-contrib

### 4. Connect to postgres via terminal

        sudo su postgres

        psql
    
### 5.  Create the database

        CREATE DATABASE <database_name>;

Replace <database_name> with the name you want to give to your database

Now you can close this terminal.

<br/>

### 6. Run the dump sql

<br>

For this next step, open a new terminal and change the directory to the project root folder.

Then switch to user postgres running the first command on **step 4.**

After that run the command bellow

        psql database_name < voltz_dump.sql

Again, make sure the terminal directory has the same path to the project

<br/>

### 7. Create a env file inside the project folder

        touch .env.dev

Follow the .env.example

<br/>

### 8. On the .env.dev file, fill in the **DATABASE_URL** following the example bellow:

        'postgres://user@host:port/database'

You should replace the values in the command:

- user : postgres (<-- it is the default user)
- host : localhost
- port : 5432
- database : The name you gave to your database on the **step 5.** 

<br>

# Run the app

        npm run dev

<br>

# Run the tests

        npm run test-once


<br>