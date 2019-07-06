const verify = require('../functions/verify')
//On client check verify 

describe('#verify', () => {
class FakeClient {
    constructor(isError) {
      this.client = {
          verify: {
              services: () => ({
                vericationChecks: {
                    create: ({to, code}) => {
                        new Promise((resolve,reject) => {
                            if(!isError) resolve({status: 'approved'})
                            else reject({status: false })
                        })
                    }
                }
            })
        }
    }
    this.verify = verify
    this.users = {'Zep': {'sid':'Zep3246', 'phone':'3479087000'}}
  }
}


    it('throws an error if this.users is empty', () => {
        const fakeClient = new FakeClient(false)
        // FakeClient.users = {}
        return expect((fakeClient.verify('ian'))).rejects.toBeInstanceOf(Error)
    })
})


