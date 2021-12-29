// export const GlobalRouteState = {
//     organization: "cad",
//     projectId: undefined,
// }

class Cookie {
  constructor() {
    this.cookieData = {};
  }

  set(name, value, { expires }) {
    const data = this.cookieData;
    data[name] = { value, expires };
    // console.log(`Cookie ${JSON.stringify(data)}`)
  }

  get(name) {
    const data = this.cookieData;
    // console.log(`Cookie ${JSON.stringify(data)}`)
    if (!data[name]) {
      return undefined;
    }
    const { value, expires } = data[name];
    if (expires < Date.now()) {
      return undefined;
    }
    return value;
  }

  remove(name) {
    const data = this.cookieData;
    // console.log(`Cookie ${JSON.stringify(data)}`)
    data[name] = undefined;
  }
}

export const cookie = new Cookie();
