 /* Test for /WORLD
  * it checks if the server answers with 200 code header
  */
describe("Test /WORLD", function() {
    it("returns status code 200", function(done) {
        request.get(
            base_url + "world/", 
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 
});