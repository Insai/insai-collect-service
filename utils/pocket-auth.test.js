const { requestToken, redirectAuth } = require("./pocket-auth");

const SAMPLE_TOKEN = "4dcf347e-f4fb-d3ce-fd37-bec195"
describe("UNIT TEST - pocket-auth", () => {
  let _requestToken = null;
  test("requestToken()", done => {
    requestToken().then(res => {
      _requestToken = res;
      expect(res).toHaveLength(SAMPLE_TOKEN.length)
      done();
    });
  });
  // TODO: find a way to use headless chrome to complete form
  test("redirectAuth(requestToken)", done => {
    redirectAuth(_requestToken).then(htmlPage => {
      expect(htmlPage).toBeDefined()
      done()
    })
  })
});
