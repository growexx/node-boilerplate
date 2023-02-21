module.exports = {
  addProduct: [
    {
      it: 'As a admin I should check if food name is not passed',
      options: {},
      status: 0,
    },
    {
      it: 'As a admin I should not be able to add product with same food name',
      options: {
        foodName: 'Burger 1',
      },
      status: 0,
    },
    {
      it: 'As a admin I should check if food type is passed incorrectly',
      options: {
        foodName: 'Burger',
        foodType: '',
      },
      status: 0,
    },
    {
      it: 'As a admin I should check if quantity passed incorectly',
      options: {
        foodName: 'Burger',
        foodType: 'Lunch',
      },
      status: 0,
    },
    {
      it: 'As a admin I should check if quantity is not minimum quantity',
      options: {
        foodName: 'Burger',
        foodType: 'Lunch',
        quantity: 0,
      },
      status: 0,
    },
    {
      it: 'As a admin I should check if quantity is not maxmum quantity',
      options: {
        foodName: 'Burger',
        foodType: 'Lunch',
        quantity: 1234,
      },
      status: 0,
    },
    {
      it: 'As a admin I should check if price passed incorectly',
      options: {
        foodName: 'Burger',
        foodType: 'Lunch',
        quantity: 2,
      },
      status: 0,
    },
    {
      it: 'As a admin I should check if price is not valid',
      options: {
        foodName: 'Burger',
        foodType: 'Lunch',
        quantity: 2,
        price: 'o',
      },
      status: 0,
    },
    {
      it: 'As a admin I should be able to add product',
      options: {
        extras: ['Ice-cream', 'Garlic Bread', 'Coke'],
        foodName: 'Burger',
        foodType: 'Lunch',
        quantity: 2,
        price: 2,
      },
      status: 1,
    },
    {
      it: 'As a admin I should not be able to add product with same food name',
      options: {
        extras: ['Ice-cream', 'Garlic Bread', 'Coke'],
        foodName: 'Burger',
        foodType: 'Lunch',
        quantity: 3,
        price: 2,
      },
      status: 0,
    },
    {
      it: 'As a admin I should not be able to add product with minimum price',
      options: {
        extras: ['Ice-cream', 'Garlic Bread', 'Coke'],
        foodName: 'Burger2',
        foodType: 'Lunch',
        quantity: 3,
        price: 0,
      },
      status: 0,
    },
    {
      it: 'As a admin I should not be able to add product if quantity is not a number',
      options: {
        extras: ['Ice-cream', 'Garlic Bread', 'Coke'],
        foodName: 'Burger2',
        foodType: 'Lunch',
        quantity: 'xt',
        price: 2,
      },
      status: 0,
    },
  ],
};
