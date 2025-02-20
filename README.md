# Medium - A blog website like [Medium](https://medium.com/)

It's under development...

## Backend API
Using [Honor](https://hono.dev/)'s Cloudflare Worker to build the backend API.

### User

- [x] Singup - `POST /api/v1/user/signup`
- [x] Signin - `POST /api/v1/user/signin`

### Blog

- [ ] Create - `POST /api/v1/blog`
- [ ] Read - `GET /api/v1/blog/:id`
- [ ] Update - `PUT /api/v1/blog/:id`
- [ ] Read All - `GET /api/v1/blog/bulk`

### Authincated Routes

- [x] Middleware use JWT to authenticate user - `/api/v1/blog/*`