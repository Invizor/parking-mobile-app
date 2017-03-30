class Repository {

  constructor() {
    this.rep = localStorage;
  }

  static add_obj(key, obj) {
    let str = JSON.stringify(obj);
    localStorage.setItem(key, str);
  }

  static get_obj(key) {
    let obj = JSON.parse(localStorage.getItem(key));
    return obj;
  }

  static get_all() {
    let arr = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let obj = JSON.parse(localStorage.getItem(key));
      arr.push(obj);
    }
    return arr;
  }

  static remove_obj(key) {
    localStorage.removeItem(key);
  }

  static change_obj(key, obj) {
    localStorage[key] = JSON.stringify(obj);
  }

  static clearRep() {
    localStorage.clear();
  }
}

export default Repository;