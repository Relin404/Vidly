### Controllers
- [x] Separate the logic of route handlers from `routes` into `controllers`
- [ ] Successively, separate the business logic from `controllers' into 'services'
- [ ] Factory for controllers



### App & Server
- [x] Create `api.js` in routes
  - [x] Put `./startup/routes.js` into it


### Logger
- [x] Make it work


### Validation
- [x] Add each model validator to `validate` middleware as an argument

### Views
- [ ] ~~Add simple Ejs pages to display content~~




---

# NEW TO-DO

## Services
- [x] Customer
- [x] Genre
- [x] Movie
- [x] Rental
- [x] Return
- [x] User

## Controllers
- [x] Auth
- [x] Customer
- [x] Genre
- [x] Movie
- [x] Rental
- [x] Return
- [x] User

## Models
- [x] Customer
- [x] Genre
- [x] Movie
- [x] Rental
- [x] User

## Routes
- [x] API
- [x] Auth
- [x] Customer
- [x] Genre
- [x] Movie
- [x] Rental
- [x] Return
- [x] User

## Config
- [ ] Set all the environment variables in an `index.js` file in `config` directory

## Logging
- [x] Refactor logger
  - [ ] Check if it works fine
  - [ ] Check if both `json` and `prettyPrint` work seamlessly

## Security
- [ ] Understand where to place all security middlewares in the code 
  - [ ] Understand how `cors` work and how to configure it in the right way
  - [ ] Understand how to configure `Compression`

## Design Patterns
- [ ] Service as a singleton
- [ ] Controller as a singleton


## Issues
- [ ] Nested objects validation in `Rental` model using Joi
- [ ] Fix `sortOptions` issue in all services 