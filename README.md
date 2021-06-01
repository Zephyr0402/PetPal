# PetPal
*CPSC 455 Group Project: 2021 Summer* 


## Group members

* Li Ju (o0l6t)
* Nawaratt Tonrungroj (d1d2b)
* Runze Wang (q2w3n)
* Shijun Shen (k6j0n)

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


## Project task requirements


|              | Tasks                                                                                                 | Completed |
|--------------|-------------------------------------------------------------------------------------------------------|-----------|
| **Minimum**  | User is allowed to post animal information                                                            |           |
|              | All available animals are displayed in a list/on a map with their information                         |           |
|              | User can view individual animal by clicking the option in the list/map                                |           |
| **Standard** | User registration, login and logout                                                                   |           |
|              | User can filter the animal information by various conditions (eg. city, age, category, etc)           |           |
|              | User can search for the animal                                                                        |           |
|              | User can make a payment for adopting or purchasing an animal                                          |           |
|              | User can cancel the payment within 2 hours after submitting the order                                 |           |
|              | Administrator actions (add/delete users, manage transactions, verify user identity)                   |           |
|              | User can submit documentation to confirm his/her identity                                             |           |
|              | User can see sellers’ profiles (including basic information, recent transactions, rating and comments)|           |
|              | Buyers can give ratings and leave comments after the payment is completed                             |           |
| **Stretch**  | Chatroom(between buyer and seller)                                                                    |           |
|              | User can make a payment for renting an animal                                                         |           |
|              | A favorite list that store all the animal that you clicked “Like” button                              |           |
|              | Buyers can confirm the payment after receiving the animal                                             |           |
|              | Seller will get a notification when a buyer submits an order                                          |           |

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
