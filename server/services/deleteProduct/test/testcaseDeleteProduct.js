module.exports = {
  deleteProduct: [
    {
      it: 'As a admin I should not be able to delete product if id is not passed',
      options: {},
      status: 0,
    },
    {
      it: 'As a admin I should be able to delete product if id is passed',
      options: {
        id: '63f317ccdb98b28f9aa6baf6',
      },
      status: 1,
    },
    {
      it: 'As a admin I should not be able to delete product if id is invalid',
      options: {
        id: '63f317ccdb98b28f9aa6baf0',
      },
      status: 0,
    },
  ],
};
