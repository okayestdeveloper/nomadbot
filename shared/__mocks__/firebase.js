const { mockBeers } = require('../mock-beers');

class MockQuery {
  constructor(data) {
    this.data = data;

    this.get = jest.fn(() => Promise.resolve(this.data));
  }

  where(field, operator, value) {
    // a hacky implementation, but hopefully effective
    this.data = this.data.filter((item) => {
      switch (operator) {
        case '==':
          return item[field] == value;
      }
      return true;
    });

    return this;
  }

  orderBy() {
    return this;
  }
}

module.exports = {
  collection: (name) => {
    switch(name) {
      case 'beers':
        return new MockQuery(mockBeers);
    }

    return new MockQuery([]);
  }
}
