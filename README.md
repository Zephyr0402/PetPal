# PetPal
*CPSC 455 Group Project: 2021 Summer* 

PetPal is an online trading platform that is specifically designed for animal lovers. If you are interested in
 adopting or buying a new pet, you can use this app to search for animals being sold in your local area, make
  credit card payment for your purchase, create personalized wishlist and share your comments. If you are selling
   your pets, you can simply make your post on PetPal, and then wait for a good match!  



## Project task requirements


|              | Tasks                                                                                                 | Completed |
|--------------|-------------------------------------------------------------------------------------------------------|-----------|
| **Minimum**  | User is allowed to post animal information                                                            |     ✅      |
|              | All available animals are displayed in a list/on a map with their information                         |      ✅     |
|              | User can view individual animal by clicking the option in the list/map                                |    ✅       |
| **Standard** | User registration, login and logout                                                                   |     ✅      |
|              | User can filter the animal information by various conditions (eg. city, age, category, etc)           |     ✅      |
|              | User can search for the animal                                                                        |      ✅    |
|              | User can make a payment for adopting or purchasing an animal                                          |    ✅       |
|              | User can cancel the payment within 2 hours after submitting the order                                 |      ✅    |
|              | Send verification email to verify the user's email address is valid when one tries to sign up         |     ✅      |
|              | User can submit documentation to confirm his/her identity                                             |     ❌      |
|              | User can see his/her profiles (including basic information, recent transactions, wish lists, comments)|     ✅     |
|              | User can see other users profiles (including basic information, rating and comments)			|     ✅     |
|              | User can make a comment on other users 								|    ✅     |
|              | Buyer can leave comments on each animal info                            				|     ✅    |
| **Stretch**  | Chatroom(between buyer and seller)                                           | Already works on localhost, but still not compatible with heroku  |
|              | User can create a personal wish list to store the animals they are interested in                      |   ✅      |
|              | Buyers can confirm the payment after receiving the animal                                 |     ❌       |
|              | Seller will get a notification when a buyer submits an order             | Backend is implemented. Frontend UI to be developed in the next step |

Note: Originally one of our requirements is "Administrator actions (add/delete users, manage transactions, verify user identity)", but it seems less important as we move on.

## Tech Stack
### Unit 1: HTML, CSS, Javascript
Like most websites, HTML is used to create PetPal's structure and UI elements, and CSS is used to achieve the aesthetic purpose and enhance the user experience. Whereas, JavaScript is used to add interactivity and dynamicity to our site. Most importantly, it allows the client side to communicate with the server side.

### Unit2: React
With React, we can organize our UI elements in multiple smaller components. This allows us to reuse the components, and manage the states of their data by using hooks. We also integrate Ant Design, a comprehensive React UI library, to build our UI elements. Using their production-ready and responsive components enables us to have extra time to work on our app's functionalities and backend development. To create the customized look and feel, we simply override their styles, and add our own codes on top of it.

### Unit 3: Node & Express
Express is a simple and flexible node.js web application framework, providing a series of powerful features to help you create various web applications, and rich HTTP tools. Using Express, we can quickly build a fully functional website with core features of Express framework:
1. We can set up middleware to respond to HTTP requests.
2. The routing table is defined to perform different HTTP request actions.
3. We can dynamically render HTML pages by passing parameters to the template.

### Unit 4: NoSQL with MongoDB
Compared to relational databases, NoSQL performs better on scalability with large volumes of data, supports flexible schemas which provide convenience to adapt the database to different data formats, and enables easy updates to schemas for developers. In our project, MongoDB Atlas is adopted as the NoSQL backend database to store and manage our data. There are 11 collections in total including AnimalInfo, Transaction, UserInfo, etc. To query our collections from the backend, we mainly use generated UUIDs.

### Unit 5: Release Engineering
With GitHub Action and Heroku, we are able to deploy our app when there is a new push to the repo. We set up a branch called “release” and a GitHub Action that will trigger the Heroku deployment once there is a push on this branch. Release branch uses Heroku project domain name as backend URL, while the main branch still uses localhost. This allows us to do local testing on the main branch and merge the code to release if there is no issue found on the main, which makes sure that the release branch has the most stable version of our app.

## Above and Beyond
### User authentication
In user registration, any new user will be required to verify if he/she owns the email address provided to us. We will send an email to the address containing a code which users should submit during registration. 

### Cookies
We store user information in Cookies so that we do not have to include user certificate in HTTP requests, which prevents impersonation.

### Dynamically display the animals on map and list view
The map will only display the markers of the animal if the animal’s address is inside the bound of the current map view. If the user drags or zooms in or out of the map view, the marker and animal list view will be dynamically changed to reflect the latest information. This allows users to get a more concise view of how many animals are in the area that he/she is interested in.

## Next Steps
* Currently, our app allows users to post and delete an animal. To enhance the functionality, we would like to add a feature that allows users to edit the posted animal.
* To protect the privacy:
	1. Mask location: Our app currently directly places markers on the map based on animal address, but it would be better to group animal info in one area(e.g. Same intersection, neighborhood) and display them as how many posting is in this area, like what craigslist does.
	2. Mask user contact info: We currently use the user phone numbers as contact info, but it’s dangerous to show your phone number in the real world(spam call, etc). We are planning to replace the phone number with an email address as contact info. But this is a randomly generated email address that can forward the email to your real email account.
* We plan to implement the notification feature to automatically inform the user when other users make comments or purchase his/her animal, cancel the transaction, and like the comments that he/she made. We already have backend implemented including setting up the schema in the database, creating API for getting and adding notification. Our next step is to build the user interfaces for complete functionality.
* Chatroom has already worked successfully on localhost, but due to the fact that heroku can only host one server at a time, we cannot deploy this feature on heroku. We plan to deploy it on popular web services in the future.

## List of Contributions
### Shijun Shen (k6j0n)
On the frontend, Shijun is responsible for the workflow of users posting new animals to the online marketplace, displaying the animal information on the animal list sidebar, dynamically changing markers on the Map when there is a drag or zoom operation, searching & filtering animal lists, and showing information window on the map marker. On the backend, he also has done the post/get animal information APIs and the comment notification APIs. Shijun also set up the GitHub Action and Heroku account to deploy our app automatically when there is a push on the release branch. 

### Runze Wang (q2w3n)
Runze designed and implemented user management, including the basic functionalities of register, login, and log out, as well as email verification and password reset. He also introduced comments into our app.

### Li Ju (o0l6t)
Julia implemented the entire user profile page including Basic Information, Posted Animals, Wish List and Transaction History tabs from backend APIs to frontend UI components design. Users are allowed to view their own profile page and edit personal information. Also, for the purpose of privacy, users could view others’ profile pages with certain restrictions. In the final stage of the project, she has done responsive layout design for the user profile page.

### Nawaratt Tonrungroj (d1d2b)
Nawa developed the entire payment transaction workflow which includes integrating Stripe’s platform, building UI components for receiving card input and displaying order confirmation, creating APIs for making HTTP requests to post and delete the transaction. She also implemented the feature that allows users to create a personal wish list. Her contribution also includes creating responsive layouts for the home page and adding finishing touches to ensure visual consistency.

## Project description

**Who is it for?**

Our target users include but are not limited to animal lovers, pet shops, animal owners, and animal rescue organizations around the globe. For people who are looking for new pets for their families or friends, we provide a convenient and secure way to look up all available animals in their areas.


**What will it do? (What "human activity" will it support?)**

Our application acts as a platform that allows people to adopt, sell and buy animals. It could also help stray animals to find their new home and missing animals to return to their owners. 


**What type of data will it store?**

1. User information
2. Administrator information
3. User-generated transactions, animal information, comments, and ratings


**What will users be able to do with this data?**

1. Users could check their past transaction records including the corresponding comments and ratings.
2. Users could view information of animals available in their areas
3. Users could filter animal information by conditions
4. The administrator could alter user and user-generated information


**What is some additional functionality you can add/remove based on time constraints?**

* Things we want to add if time permits:
	1. We would love to provide a chatroom for buyers and sellers to talk with each other during the transaction.
	2. We can also support uploading videos when a user posts information about their animals
	3. Users can have a favorite list. If they are interested in an animal but have not made a final decision, they can just click the “favorite button” and add the animal to their favorite collection, so that they can come back anytime and check on it.
* Things we want to remove if time is limited:
	1. We would like to remove comments because if an animal is adopted or purchased, it will disappear on our map and no one can ever see it. In that case, comments seem a little less significant.
	2. We can cancel the rating functionality.


## Task Breakdown for minimal requirement:
* **User registration, login and logout**

	1. Retrieve and sanitize the input including usernames and passwords from the frontend
	2. Run some backend APIs to:

		a. Verify the user
		
		b. Get user information from the database
		
		c. Get animal information from the database
		
	3. Display the information in frontend

* **User is allowed to post animal information**
	1. Design the elements in post animal form
	2. Retrieve and sanitize the input from the frontend
	3. Store the animal information into the database

* **User can make a payment for adopting or purchasing an animal**
	1. There is a button for purchase on every marker on the map. When a user clicks on it, it will be redirected to the page for user purchase
	2. On the purchase page, display detailed information about the selected animal retrieved by the back end
	3. After the buyer confirms the payment information, he/she can click the confirm button to officially place the order


## Prototype Sketches
![alt text](https://github.com/Zephyr0402/PetPal/blob/main/PetPal_homepage.png?raw=true)

![alt text](https://github.com/Zephyr0402/PetPal/blob/main/PetPal_post-animal-page.png?raw=true)

## Wireframe
![alt text](https://github.com/Zephyr0402/PetPal/blob/nawa/PetPal_Wireframe.png)
