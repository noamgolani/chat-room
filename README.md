# Chat room app

## API Routes

### Events

- `EventSource api/events` <- must provide header: `auth: [accessToken]`

### Chat

- `GET api/chat/message`

```
    request
    headers: {
        auth: accessToken
    }

    response
    body: {
        messages: [{
        }]
    }
```

- `POST api/chat/message`

```
    request
    headers: {
        auth: accessToken
    }
    body: {
        message: string
    }

    response
    body: "Message Sent"
```

### Auth

- `POST api/auth/login`

```
    request
    body: {
        username: string,
        password: string
    }

    response
    body: {
        accessToken,
        refreshToken
    }
```

- `POST api/auth/token`

```
    request
    body: {
        refreshToken
    }

    response
    body: {
        accessToken,
        username,
        userId
    }
```

- `POST api/auth/register`

```
    request
    body: {
        username: string,
        email: string,
        password: string
    }

    response
    body: "Registered"
```

- `POST api/auth/logout`

```
    request
    headers: {
        auth: accessToken
    }

    response
    status: 200
```
