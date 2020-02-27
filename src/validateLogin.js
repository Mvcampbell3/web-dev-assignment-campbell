// Validates inputs client side before sending to firebase db
export default {
  // returns true if item tested has at least 5 chars
  validLength(testString) {
    if (testString.length > 5) {
      return true;
    }
    return false
  },

  validEmail(email) {
    // returns true is email passes regex test
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}