# Nozama API

## Overview
Group project to create a website for Nozama, an e-commerce company

## Related Links

## Technologies
- Node
- Express
- MongoDB
- Mongoose 
- Javascript

## API ENDPOINTS
### USERS
- POST /sign-up
- POST /sign-in
- PATCH /change-password/:id
- DELETE /sign-out/:id

### ORDERS
- GET /orders
- POST /orders
- PATCH /orders/:id
- DELETE /orders/:id

## Third Party API
- Stripe: Payment processing platform

### Items
- GET /items


## ERD
![Nozama](https://i.imgur.com/vp66y8Q.jpg)

## Bonus Feature
- Security Feature: We were able to validate orders to prevent extra parameters from being added. In adddition it checks if all the parameters are up to the required amount requested. 
