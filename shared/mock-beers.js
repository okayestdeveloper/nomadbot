const mockBeers = [
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
];

class MockSnapshot {
  constructor(data) {
    this.docs = data;
  }

  get length() {
    return this.docs.length;
  }

  get size() {
    return this.docs.length;
  }

  filter(cb) {
    this.docs = this.docs.filter(cb);
    return this;
  }

  forEach(cb) {
    this.docs = this.docs.filter(cb);
    return this;
  }

  map(cb) {
    this.docs = this.docs.filter(cb);
    return this;
  }
}

module.exports = {
  mockBeers: new MockSnapshot(mockBeers),
};
