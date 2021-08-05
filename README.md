# TaskTimeTrackerAPI

API that allows user to track time regarding of certain named task.

#### Main technologies

- NodeJS
- Express
- Prisma
- TypeScript
- Jest

## Features

The functionality of the API is very limited and simple.

When a new task is created its creation date is assigned to it. From now on this task is being tracked and user can fetch it at any time using a dedicated endpoint. In a situation where a new task is created while other one is still being tracked, the previous task is saved - a finish date is assigned to it and the task itself is moved to the list of finished tasks. All of the finished tasks can also be fetched using a different endpoint.

### Endpoints

##### Fetching finished tasks

```
GET http://[server url]/api/task/finished
```

<sub>
Returns an array of all previously saved tasks. All of the elements hold information of the task name, date of its creation and date of its finish.
</sub>

##### Fetching tracked task

```
GET http://[server url]/api/task/tracked
```

<sub>
Returns the tracked task. The data contains task name, date of its creation and fixed id of 0. 
</sub>

##### Creating new task

```
GET http://[server url]/api/task/stop
```

<sub>
Stops tracking currently tracked task and saves it in the finished tasks. Returns the task that was stopped.
</sub>

##### Stopping tracking of currently running task

```
POST http://[server url]/api/task/create
```

###### Body parameters

- name - string

<sub>
Creates a new task and starts tracking it. If exists, previously tracked task gets saved in the finished tasks. Returns stopped and newly created task.
</sub>

## Getting started

<sub>Do be aware that to work correctly the app requires access the same or identical database as the one used during development. SQL queries used to create database tables can be found further ahead. Database url is taken from the environment variable "DATABASE_URL".</sub>

### Requirements

The project created using using NodeJS version 14.

### Installation and running

After cloning the repository navigate to the project directory and install all dependencies using:

```
npm i
```

### Development run

In order to run the app in development mode you first need to run prisma command in order to generate database client:
<sub>Make sure that you are in the project root directory.</sub>

```
npx prisma generate --schema src/prisma/schema.prisma
```

All you need to do now is run the server using:

```
npm run dev
```

### Production run

In order to run the app in production mode first build the application using:

```
npm run build
```

After that you can run the server using:

```
npm run start
```

Both modes use 9000 as default port - when environment variable PORT is not available.

### Testing

To run automated tests use command:

```
npm run test
```

## Database

In case you need to reproduce the database you can use following SQL queries made in postgres:

```
create table tracked_task (
  id integer not null primary key default 0,
  name varchar(100) not null,
  timestart timestamp not null,
  constraint only_one_row check (id = 0)
);

create table finished_tasks (
  id int not null primary key generated always as identity,
  name varchar(100) not null,
  time_start timestamp not null,
  time_finish timestamp not null
);
```

## Demo

The application hosted from this exact repository can be found [here](http://task-time-tracker-api.herokuapp.com).
<sub>Feel free to make some requests!</sub>
