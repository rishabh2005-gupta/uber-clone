# Uber Clone Backend API

## Register a user

Creates a new user account, hashes the supplied password, stores the user in the database, and returns a JWT authentication token with the created user.

### Endpoint

```http
POST /users/register
```

### Headers

```http
Content-Type: application/json
```

### How to send the request

Send a `POST` request to `/users/register` with the `Content-Type` header set to `application/json`. Include the user's name, email address, and password in the JSON request body.

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `FullName` | Object | Yes | Contains the user's name fields. |
| `FullName.FirstName` | String | Yes | Must contain at least 3 characters after trimming. |
| `FullName.LastName` | String | No | If supplied, must contain at least 3 characters after trimming. An empty value is ignored. |
| `email` | String | Yes | Must be a valid email address. |
| `password` | String | Yes | Must contain at least 6 characters. |

Example request body:

```json
{
  "FullName": {
    "FirstName":,
    "LastName"
  },
  "email":,
  "password":
}
```
### How the response is returned

#### `201 Created`

When registration succeeds, the API returns HTTP status `201 Created`. The JSON response contains:

- `token`: a JWT that can be used to authenticate the user.
- `user`: the newly created user's information.

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<user-id>",
    "FullName": {
      "FirstName": "rishabh",
      "LastName": "gupta"
    },
    "email": "rishabh@example.com",
    "createdAt": "<timestamp>",
    "updatedAt": "<timestamp>"
  }
}
```

If the submitted data is invalid, the API returns HTTP status `400 Bad Request`. The `errors` array describes every field that failed validation.

### Error responses

#### `400 Bad Request`

Returned when one or more request fields fail validation.

Replace `3000` with the port configured for the backend server if it uses a different port.
