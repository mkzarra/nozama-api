# Nozama API

## Overview
Group project to create a website for Nozama, an e-commerce company that sells OGEL mini figures.

## Related Links

## Technologies
- Node
- Express
- MongoDB
- Mongoose 
- Javascript

## Group Culture
### R.E.A.L <br>

Relax atmosphere and made the process fun  <br>
Everyone is involve and participate <br>
Attentive to all details and got the job done <br>
Love to explore creative solutions when problem solving 

## Back End Plan
-Handle the user routes, order routes and item routes. <br>

-Then input items schema <br>

 -After we decided that orders was going to be the on the relationship  between items and users.  set up.<br>

 -Lastly, integrate Stripe

 <img src='./IMG/20180807_140703.jpg'>


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

## Success
Ability to get Stripe to listen regardless of 401 response - communication <br>

Express was easy to set up - confident booster <br>

<img src='./IMG/20180808_155916.jpg'>


## Blockers
Stripe! The entire process was confusing. The testing process and getting stripe to work with orders.

## Teamwork Tips
-Communication <br>
-WHITE BOARD! WHITE BOARD! WHITE BOARD!<br>

<img src='./IMG/20180808_165018.jpg'>
<img src='./IMG/20180809_131440.jpg'>


-Assign roles ot tasks base of strength<br>
-Be flexible and accept change of plan <br>
