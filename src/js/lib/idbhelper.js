let dbPromise = idb.open('restaurants-review-db', 1, upgradeDb => {
  let store = upgradeDb.createObjectStore('restaurants', { keyPath: 'id' });
});

class IDBHelper {
  static refreshRestaurants(restaurants = []) {
    dbPromise.then(function(db) {
      const tx = db.transaction('restaurants', 'readwrite');
      const store = tx.objectStore('restaurants');
      restaurants.map(restaurant => {
        tx.objectStore('restaurants').put(restaurant);
      });
      return tx.complete;
    });
  }

  static getRestaurants() {
    return dbPromise.then(function(db) {
      const tx = db.transaction('restaurants');
      const store = tx.objectStore('restaurants');
      return store.getAll();
    });
  }

  // static getNeighborhoods() {
  //   IDBHelper.getRestaurants().then(res => {
  //     const neighborhoods = res.map((v, i) => res[i].neighborhood);
  //     return neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i);
  //   });
  // }
  // static getCousine() {
  //   IDBHelper.getResaturants().then(res => {
  //     const cuisines = res.map((v, i) => res[i].cuisine_type);
  //     return cuisines.filter((v, i) => cuisines.indexOf(v) == i);
  //   });
  // }
}
