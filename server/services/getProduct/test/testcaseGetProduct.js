module.exports = {
  getProduct: [
    {
      it: 'As a admin I should get product list',
      options: {},
      status: 1,
    },
    {
      it: 'As a admin I should be able to get product list with pagination',
      options: {
        pageNumber: 1,
        limit: 1,
      },
      status: 1,
    },
    {
      it: 'As a admin I should be able to get product list with pagination and sort filter',
      options: {
        pageNumber: 1,
        limit: 10,
        sort: -1,
        sortBy: 'foodType',
      },
      status: 1,
    },
    {
      it: 'As a admin I should be able to get product list with search filter',
      options: {
        pageNumber: 1,
        limit: 10,
        search: 'Burger',
      },
      status: 1,
    },
  ],
  getProductDetails: [
    {
      it: 'As a admin I should get product details',
      options: {
        id: '63f317ccdb98b28f9aa6baf7',
      },
      status: 1,
    },
    {
      it: 'As a admin I should not get product details if id is invalid',
      options: {
        id: '63f',
      },
      status: 0,
    },
    {
      it: 'As a admin I should not get product details if product not found',
      options: {
        id: '5f083c352a7908662c334535',
      },
      status: 0,
    },
  ],
};
