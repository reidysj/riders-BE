# Cherry Valley Legion Riders Backend
*Currently In Progress*

## Getting Started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npm run test** to start server using testing environment

## Endpoints

#### Monitoring
| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/`                     | All            | Returns a message indicating server is up.   |

#### Contacts Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/contacts/`            | Admin          | Returns all contact records.                 |
| POST   | `/contacts/`            | All            | Adds a new contact record.                   |
| DELETE | `/contacts/:id`         | Admin          | Deletes the specified contact record.        |

#### Authentication Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| POST    | `/auth/register`       | All            | Creates a new registered user.               |
| POST    | `/auth/login`          | All            | Logs the user in.                            |
