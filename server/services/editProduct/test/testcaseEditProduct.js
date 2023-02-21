module.exports = {
  editProduct: [
    {
      it: 'As a admin I should not be able to edit if id is not passed',
      options: {
        foodName: 'Burger 1',
      },
      status: 0,
    },
    {
      it: 'As a admin I should check if food type is passed incorrectly',
      options: {
        id: '63f317ccdb98b28f9aa6baf6',
        foodName: 'My Burger',
        foodType: '',
      },
      status: 0,
    },
    {
      it: 'As a admin I should check if quantity passed incorectly',
      options: {
        id: '63f317ccdb98b28f9aa6baf6',
        foodName: 'My Burger',
        foodType: 'Lunch',
        quantity: 'test',
      },
      status: 0,
    },
    {
      it: 'As a admin I should check if quantity is not passed',
      options: {
        id: '63f317ccdb98b28f9aa6baf6',
        foodName: 'My Burger',
        foodType: 'Lunch',
      },
      status: 0,
    },
    {
      it: 'As a admin I should check if quantity is not minimum quantity',
      options: {
        id: '63f317ccdb98b28f9aa6baf6',
        foodName: 'My Burger',
        foodType: 'Lunch',
        quantity: 0,
      },
      status: 0,
    },
    {
      it: 'As a admin I should check if quantity is not maxmum quantity',
      options: {
        id: '63f317ccdb98b28f9aa6baf6',
        foodName: 'My Burger',
        foodType: 'Lunch',
        quantity: 1234,
      },
      status: 0,
    },
    {
      it: 'As a admin I should check if price passed incorectly',
      options: {
        id: '63f317ccdb98b28f9aa6baf6',
        foodName: 'My Burger',
        foodType: 'Lunch',
        quantity: 2,
      },
      status: 0,
    },
    {
      it: 'As a admin I should check if price is not valid',
      options: {
        id: '63f317ccdb98b28f9aa6baf6',
        foodName: 'My Burger',
        foodType: 'Lunch',
        quantity: 2,
        price: 'o',
      },
      status: 0,
    },
    {
      it: 'As a admin I should be able to edit product',
      options: {
        id: '63f317ccdb98b28f9aa6baf8',
        extras: ['Ice-cream', 'Garlic Bread', 'Coke'],
        foodName: 'My Burger',
        foodType: 'Lunch',
        quantity: 2,
        price: 2,
      },
      status: 1,
    },
    {
      it: 'As a admin I should not be able to edit product with minimum price',
      options: {
        extras: ['Ice-cream', 'Garlic Bread', 'Coke'],
        foodName: 'Burger2',
        id: '63f317ccdb98b28f9aa6baf6',
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
    {
      it: 'As a admin I should give error if product not found',
      options: {
        extras: ['Ice-cream', 'Garlic Bread', 'Coke'],
        foodName: 'Burger2',
        foodType: 'Lunch',
        id: '63f378500af6f243ce44bd0f',
        quantity: 2,
        price: 2,
      },
      status: 0,
    },
  ],
};
