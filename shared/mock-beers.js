module.exports = {
  mockBeers: [
    {
      ontap: true,
      name: 'beer 1',
      data: () => ({
        ontap: true,
        name: 'beer 1',
      }),
    },
    {
      ontap: false,
      name: 'beer 2',
      data: () => ({
        ontap: false,
        name: 'beer 2',
      }),
    },
  ]
};
