# Grocers Bay - Scalable MERN stack Ecommerce website


Welcome to Grocers Bay, an online grocery application designed to provide users with a seamless and efficient shopping experience. The project leverages a microservices architecture, utilizing **React.js** for the frontend, **Node.js** for the backend, and **PostgreSQL** and **MongoDB** as the database. This comprehensive setup demonstrates a diverse range of skills in **MERN Stack**, **Microservices**, and **Database management**. The backend was hosted On **Google Cloud Platform** (till free credits last) and then on Render free tier.

  

The frontend has a separate repo at https://github.com/soham04/grocers-bay-frontend

  

##  Table of Contents

  
1. [Load testing results](#load-testing-results)
  
2. [Status](#status)

3. [Key Features](#key-features)

4. [Backend Architecture](#backend-architecture)

5. [Technologies Used](#technologies-used)

6. [API Reference](#api-reference)

  ## Load testing results
  Tool used : [Grafana K6](https://k6.io/) 
  Platform : [GKE (Google Kubernetes Engine)](https://cloud.google.com/kubernetes-engine?hl=en) 
  Service involved: *Product service*

|  | MIN REPLICA | MAX REPLICA |CPU UTILIZATION|
|--|--|--|--|
|TEST 1  |1| 1| 80%|
|TEST 2  |1| 10| 80%|
|TEST 3  |2| 12| 50%|

* Nodes used (E2 Small instances)
![enter image description here](https://i.postimg.cc/0QBTWWYZ/g1.png)
![enter image description here](https://i.postimg.cc/G90Zr4Sy/g2.png)

## Key Metrics Comparison

 | Metric | Initial Test (1-80% CPU) | After Scaling (1-10 Replicas) | After Adding 4th Node (2-12 Replicas) | Change from Initial to Latest |
  |--------------------------------|-------------------------|------------------------------|--------------------------------------|-------------------------------|
   | **Requests per Second (RPS)** | 17.01 req/s | 33.00 req/s | 38.23 req/s | **+124%** (More Throughput ✅) | 
   | **Total Requests Processed** | 4,309 | 8,104 | 12,100 | **+181%** (Significant Improvement ✅) |
   | **Failure Rate (%)** | 23.3% | 0.0% | 0.0% | **Eliminated** (Stable ✅) | 
   | **Median Response Time (s)** | 3.78s | 2.6s | 2.01s | **↓47%** (Faster Responses ✅) | 
   | **p90 Response Time (s)** | 13.51s | 8.34s | 7.91s | **↓41%** (Better ✅) | 
   | **p95 Response Time (s)** | 15.52s | 9.48s | 9.59s | **↓38%** (Slight Improvement ✅) | 
   | **Max Response Time (s)** | 26.32s | 17.16s | 28.52s | **↑8%** (Regression ❌) |


## User Capacity Metrics

| Metric                                      | Initial Test (1-80% CPU) | After Scaling (1-10 Replicas) | After Adding 4th Node (2-12 Replicas) | Change from Initial to Latest |
|---------------------------------------------|--------------------------|------------------------------|--------------------------------------|--------------------------------|
| 👥 **Max Concurrent Users (~1 req/5s)**      | 85 users                 | 165 users                    | 190 users                            | **+123% 🚀** (More users handled at once!) |
| 👥 **Max Concurrent Users (~1 req/2s)**      | 34 users                 | 66 users                     | 76 users                             | **+123% 🚀** (Double the capacity!) |
| ⏳ **Total Users per Hour (5-min sessions)** | 1,000 users/hour         | 3,000 users/hour             | 4,500 users/hour                     | **+350% 🔥** (Massive scaling improvement!) |



## How Many Users Can the System Handle?

### 🚦 Initial Test (1-80% CPU, No Scaling)
- **The backend struggled under load**, handling only **85 concurrent users**.
- With a **23.3% failure rate**, actual usable capacity was even lower (**~50 users at best**).
- The system could serve **1,000 users per hour**, but with **many delays and failures**.

### ⚡ After Scaling (1-10 Replicas)
- **User capacity nearly doubled!** 🎉
- Now handling **165 concurrent users** and **3,000 users per hour**.
- **Failure rate dropped to 0%**, meaning all users received responses (**though 60% were slow**).
- **p90 and p95 response times** still needed improvement.

### 🚀 After Adding a 4th Node (2-12 Replicas)
- **User handling improved again!** 🚀
- Max concurrent users **increased to 190** and **4,500 users per hour**.
- **Throughput is now 38 requests per second** (vs. **17 at the start**).
- **Still, 49% of requests take >2s**, meaning **further backend optimizations are needed**.

  
 ## Status
 
 Backend successfully hosted on [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine)  and the frontend of render.com

### Remaining Tasks  
- [ ] Add SSL certificate for HTTPS support 
- [ ] Integrate with the frontend (Waiting for SSL support)
- [ ] Add Horizontal scalling to the pods
- [ ] Integrate Kafka for inter service communication
- [ ] Write unit tests
- [ ] Improve error handling
- [ ] Make the frontend responsive



  

##  Key Features

  

-  **User Authentication:** [JWT](https://jwt.io/) token login sessions with the help of cookies.

-  **Product Catalog:** Browse and search for a wide range of grocery items.

-  **Shopping Cart:** Add and manage products in the cart before checkout.

-  **Order Processing:** Streamlined order placement, payment processing, and order history.

-  **Payment Gateway** - Secure payment possible powered by [Stripe](https://stripe.com/).

-  **Microservices Architecture:** Modular and scalable backend services.

-  **Responsive Design:** Ensures a consistent user experience across various devices.

  
  
  

##  Backend Architecture

![/docs/architecture.drawio.png](/docs/architecture.drawio.png)

  

1.  **User Service:** Responsible for user authentication and token generation and validation. The user database is accessible from this service. It's also responsible for all user management.

2.  **Product Service:** Manages product information and inventory. Also handles validation of the cart for the order service.

3.  **Order Service:** Handles order processing, payment, and order history.

4.  **Database:** PostgreSQL database for data storage for Users and Orders since they have a definite structure. MongoDB for storing product details since their structure might change depending upon the product.

5.  **Communication:** RESTful APIs for communication between microservices via API's.

6.  **API Gateway:** Still in development

  
  

##  Technologies Used

  

This project showcases proficiency in a variety of technologies and tools, including:

  

-  **Frontend:**

	- React.js for building dynamic and interactive user interfaces.

	- [React Context](https://react.dev/reference/react/createContext) for state management.

-  **Backend:**

	- Node.js for microservices.

	- Express.js for building RESTful APIs.

	- [Microservices](https://microservices.io/) architecture for scalability.

  

-  **Database:**

	- [PostgreSQL](https://www.postgresql.org/) and [MongoDB](https://www.mongodb.com/) for data storage hosted on [Render](https://render.com/) and [Supabase](https://supabase.com/)

	- Database normalization for efficient data management

	- [Mongoose](https://mongoosejs.com/docs/) and [Sequelize](https://sequelize.org/) ORMs.

	- [node cron](https://www.npmjs.com/package/node-cron) to delete the unpaid orders which are older than 5 minutes 

-  **Authentication:**

	- [JWT (JSON Web Tokens](https://jwt.io/)) for secure authentication

-  **Deployment:**

	- [Docker](https://www.docker.com/) for containerization

	- [Microservices](https://kubernetes.io/) deployment and orchestration

	-   [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine) for deployment of the backend.

	-   Render.com for hosting the frontend.
	
	- Ingress Controller for load balancing and routing
  
  

##  API Reference

  

1. **Product service**

	-  **GET**  `/product` - Get all the products

	-  **GET**  `/product/search` - Search product with given keyword in title or description.

	-  **GET**  `/product/:id` - Get details of the proudct with given product ID.

	-  **POST**  `/cart/total` - Get subtotal, tax and total of the cart items.

2. **Users service**

	-  **POST**  `/customer/register` - Register a new user and send email with verification link.

	-  **POST**  `/customer/login` - Authenticate the user with given login id and password, if the credentials match generate a token and set the cookies.

	-  **GET**  `/customer/logout` - Delete the cookies making the user logout of the frontend.

	-  **GET**  `/customer` - Authorize the user user via cookies and send the user details.

	-  **GET**  `/verify/email/:uid/:otp` - Verify the user and OTP(One time password) sent to the user while registering. If values match, the user is marked as verified.

	-  **GET**  `/verify/loggedin` - Authorize the user user via cookies and send the user certain details if the token is valid and the user is authenticated.

	-  **GET**  `/verify/token` - Authorize the user user via the token and respond if the user is authenticated or not. This route is used by other services to authenticate the user request.

  

3. **Order service**

	-  **POST**  `order/` - Create order, authenticated via cookies.

	-  **GET**  `order/` - Get all the orders, authenticated via cookies.

	-  **GET**  `order/:id` - Get details of a particular order.

	-  **POST**  `payment/` - Initialise payment intent for the given order via [Stripe](https://stripe.com/) and return the secret key for the transaction to the frontend.

	-  **POST**  `webhook/` - **(Webhook)** webhook called by [Stripe](https://stripe.com/) upon completion of the payment.
