# Farm Clicker Tycoon

Manage your crop resources so you can feed your animals so you can produce products so you can make money so you can get rich all so you can have fun! 

* [Play Live](https://farmclickertycoon.netlify.com/)

### Demo accounts:

__**username - password**__

farmDummy - password

farmSmartie - password

* [Server Repo](https://github.com/darrenrjones/farm-clicker-server)

## Contents

1. [Getting Started](#getting-started)
2. [Installing](#installing)
3. [Screenshots](#screenshots)
4. [Adding to the game](#adding-to-the-game)
5. [Built With](#built-with)
6. [License](#license)
7. [Acknowledgments](#acknowledgments)
8. [Author](#author)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Installing

First get your server up and running by following "Installing" instructions at [Server](https://github.com/darrenrjones/farm-clicker-server)

after the server is up, and you run 'npm start' on the server side code, you should be able to log in with the default account after these client side installation instructions are followed:

clone this repo

```
git@github.com:darrenrjones/farm-clicker.git
```

```
cd farm-clicker
```

```
npm install
```

```
npm start
```

this should open default browser at localhost:3000

You can now log in or register to play. 

## Screenshots

![landing playscreen](https://i.ibb.co/gmjZF4r/Landing-Fresh.png)

![playscreen crops](https://i.ibb.co/p4Py2xb/2048x1536.png)

![manager feed chain broken](https://i.ibb.co/H4wRvVj/1334x750.png)

![store fix feed](https://i.ibb.co/HHYHZhJ/fixFeed.png)


## Adding to the game

### Adding a CardContainer animal or crop

You can easily add more animals or crops if you want to swap stuff out to make this game your own.

To add a different animal or crop you can simply create a new <CardContainer /> component in one of the render files at 

/src/components/playscreen

Add an animal in AnimalRender9.js or AnimalRender4.js

```
<CardContainer
  type='newAnimal'
  field='newAnimal1'
  screen='animals'
  feed='wheat corn'
  screenDisplay={props.screenDisplay}
  managerDisplay={props.managerDisplay}
/>
```

Add a crop in CropRender9.js or CropRender4.js or swap one out so you don't have to restyle the grid

```
<CardContainer
  type='newCrop'
  field='newCrop1'
  screen='crops'
  feed='null'
  screenDisplay={props.screenDisplay}
  managerDisplay={props.managerDisplay}
/>
```

Be sure to follow naming conventions as these values are used throughout the CardContainer logic and elsewhere. CardContainer.js will use the type name as the image source to generate the icons in game so find your image png file and put it in the respective images folder:

/src/images/animals

or

/src/images/crops

### Getting your new card to persist to the database

This is done in the [Server Side code](https://github.com/darrenrjones/farm-clicker-server) but I'll put the instructions here:

When a new user registers it uses the /seed/animals1.json and /seed/crops1.json files to create the crops and animals and tie them to the new user account so we need to add your new crop or animal item to the relative /seed/animals1.json or /seed/crops1.json file.

You can place your animal/crop in the json in the order you want just like you would place the CardContainer item from above in the AnimalRender9.js file in whatever order you want it to appear to the user. For this example we will add to the end of the list.

```
...
  {
    "type": "goat1",
    "count": 0,
    "price": 75,
    "feed": "wheat, corn, soy, clover",
    "user": "5b4d0890a6b4fb75280719a9",
    "manager": false
  },
  {
    "type": "fish1",
    "count": 0,
    "price": 100,
    "feed": "fishfood",
    "user": "5b4d0890a6b4fb75280719a9",
    "manager": false
  },
  //your new item below
  {
    "type": "newItem1",
    "count": 0,
    "price": 100,
    "feed": "wheat",
    "user": "5b4d0890a6b4fb75280719a9", 
    "manager": false
  },
]
```

note: the "user" id is an example and is overwritten in the seed process so the "5b4d0890a6b4fb75280719a9" doesn't matter that it's fake.

A new crop does not need the feed property at all so an example of a new crop object would look like: 

```
{
    "type": "newCrop1",
    "count": 0,
    "price": 15,
    "user" : "5b4d0890a6b4fb75280719a9",
    "manager": false
  },
```

note: remember to put a 1 at the end of the type as other logic in the code base counts on this naming convention as you could add a 'newCrop2' and 3 etc.

Now when a new user registers that crop/animal item will be put onto the crop/animal collection will be added to the databse referring to the userID that was just created.

note: the default accounts use these .json files for testing purposes so if you add a new crop/animal in the animals1 or crops1 file the user 'farmDummy' will be the only one to receive these items (and only after reseeding the database as described in the server readme) as the other defualt accounts use the number 2 and 3 (ex. seed/animals2.json and seed/crops2.json files). To add your new item to all default account you would also add your new item object to the animals2.json, crops2.json, animals3.json, crops3.json files respecitvely, and then reseed to reset the database. 

## Built With

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Redux Thunk](https://www.npmjs.com/package/redux-thunk)
- [React Router](https://www.npmjs.com/package/react-router)
- [Redux Form](https://www.npmjs.com/package/redux-form)
- [Jest](https://facebook.github.io/jest/)
- [Enzyme](http://airbnb.io/enzyme/)
- [jwt-decode](https://www.npmjs.com/package/jwt-decode)

## License

This project is licensed under the MIT License

## Acknowledgments

* Header logo made at : [Logomakr](https://logomakr.com/)
* All crop, animal and product icons found at: [iconarchive](http://www.iconarchive.com/) 
* Card background : [pngtree](https://pngtree.com/free-grass-png?)


## Author: 

* **Darren Jones**(https://github.com/darrenrjones) - [Portfolio](https://DarrenRaymondJones.com)
