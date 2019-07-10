//importing vanilla create method
const create = require("../../functions/create");
//these tests test that specific method
describe("tests the create function", () => {
  //declares a mock class that mimics their client class in index.js
  //this 'fakeClient' doesn't take in 3x arguments like the real Client does
  class FakeClient {
    //constructor is passed a boolean value to assume valid arguments when constructor is invoked
    constructor(isError) {
      //instantiated an empty users list
      this.users = {};
      //instantiated an isError property assigned to inputted value
      this.isError = isError;
      //make a dummy client
      //
      this.client = {
        verify: {
          services: {
            create: () => {
              //this is where tests checks if there is an error in the create method being invoked
              const isError = this.isError;
              //returns a Promise
              return new Promise((resolve, reject) => {
                //if isError is 'true', reject function is invoked
                if (isError) {
                  reject(new Error("fake error message"));
                }
                //if isError is 'false', resolve funtion is invoked with an object that has 1x property of 'sid' and a value of 'fakeSid'
                resolve({
                  sid: "fakeSid"
                });
              });
            }
          }
        }
      };
      this.create = create;
    }
  }

  //this test checks if a user is generated with the appropriate SID
  it("generates a user with the right sid", () => {
    //instantiated new instance of client
    const fakeClient = new FakeClient(false);
    //pull users property off of the fakeClient
    let users = fakeClient.users;
    //returning invoked create method on fakeClient
    return fakeClient.create("ian", "+17604307620")
      //if successful, returns a specific user object that was just created
      .then(user => {
      //checks is users object includes a property named 'ian'
      expect(users.hasOwnProperty("ian")).toBeTruthy();
      //checks if newly created user obejct has a property named sid assigned to a value of 'fakeSid'
      expect(user.sid).toEqual("fakeSid");
    });
  });

  //we could add tests that ensure errors are thrown with improper arguments to the create method

  //this tests check is their is an error in the creation method's process
  it("passes error message on rejection", () => {
    //instantiated new instance of client
    const fakeClient = new FakeClient(true);
    //pull users property off of the fakeClient
    let users = fakeClient.users;
    //invokes create method on fakeClient
    //if error occurs in create method process of client.verify.services.create, reject is invoked
    return fakeClient.create("ian", "+17604307620")
      .catch(err => {
      expect(err instanceof Error).toBeTruthy();
    });
  });
});
