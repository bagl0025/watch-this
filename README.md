# E-Commerce Back End

![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

E-Commerce Back End is and example of a basic back end for an e-commerce site. This application uses Express.js APIs and Sequelize to interact with a MySQL database.

# Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contribute](#contribute)
- [Questions](#questions)
- [Github Profile](#github)

## Installation

- Install node.js
- download the repo: https://github.com/bagl0025/E-commerce-Back-End.git
- The dependencies can be installed by running `npm install`
- You will need to create a .env file in the root folder and update the MySQL user and password. An example of the .env file is provided in the code block below.
```
DB_NAME='ecommerce_db'
DB_USER='root'
DB_PASSWORD='<insert password>'
```
- Create database schema using `source db/schema.sql` after starting MySQL using `mysql -u root -p`
- Populate database with data using `npm run seed`
- Run the application using `npm start` or `node server`

## Usage

There is no front end for this application so you should use Insomnia, Postman, or an API client of your choice to test the routes and functionality. The databse contains the following tables:
```    
+------------------------+   
| Tables_in_ecommerce_db |   
+------------------------+   
| category               |   
| product                |   
| product_tag            |   
| tag                    |   
+------------------------+   
```
Using an API client you can view, create, edit, and delete items from the tables. A video link (below) shows the full functionality using Insomnia. A snapshot of the Insomnia window (below) shows all of the API routes that will be demonstrated in the video.

### E-Commerce API routes in Insomnia

<img src="./assets/ecommerce-screen.png" alt="ecommerce screenshot" width="600"/>

### Link to demo video
This video loads from Google Drive. It can be downloaded from the Github repo's assets folder.

[Demo Video](https://drive.google.com/file/d/168EKwEu2aXdTZIB1WwmV_YXEZqGmeXIF/view?usp=sharing)

## License

This software is under the [MIT](./LICENSE) license.

## Contribute

Refer to [Contributor Covenant](https://www.contributor-covenant.org/) for contribution guidelines.

## Questions

Contact author at bagley@umn.edu for questions or to report issues.

## GitHub

https://github.com/bagl0025/E-Commerce-Back-End

```

```
