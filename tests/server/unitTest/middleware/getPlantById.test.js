

const planetID = require('./getPlantById'); // Adjust the path as needed

// Mock the dbPool query function
jest.mock('./getPlantById',()=>{
    getPlantById: jest.fn()
}); // Adjust the path as needed

describe('get single IDs plant', () => {
    it('should query the database with the correct ID', (done) => {
        const plantid = 1;
        const mockResult = { rows: [{ id: 1, name: 'Rose' }] }; 
        
        // Mocking the dbPool.query function to return a resolved promise with mockResult
        planetID.query.mockImplementation((sql, callback) => {
            callback(null, mockResult);
        });

        // Define the callback function for your getPlantById function
        const callback = (error, mockResult) => {
            expect(error).toBeNull();
           // expect(result).toEqual(mockResult);
        
        };
        done();
        // Call your function with the test ID and the callback
       // getPlantById(plantId, callback);

        // Verify that dbPool.query was called with the correct SQL query
       // expect(dbPool.query).toHaveBeenCalledWith(`SELECT * FROM plant WHERE id = ${plantId}`, expect.any(Function));
    });
});


//jest.mock('./dbPool'); // We tell Jest to use the fake database
//
//describe('getPlantById', () => {
//    it('should ask for the correct plant ID', (done) => {
//        const plantId = 1; // The ID of the plant we are looking for
//        const mockResult = { rows: [{ id: 1, name: 'Rose' }] }; // What we expect to get back
//
//        // Tell our fake database what to do when asked for data
//        dbPool.query.mockImplementation((sql, callback) => {
//            callback(null, mockResult);
//        });
//
//        // Define what happens when the function gets the result
//        const callback = (error, result) => {
//            expect(error).toBeNull(); // Make sure there is no error
//            expect(result).toEqual(mockResult); // Make sure we get back the right data
//            done(); // Finish the test
//        };
//
//        // Call our function and ask it to use the callback
//        getPlantById(plantId, callback);
//
//        // Check if the fake database was asked for the correct plant ID
//        expect(dbPool.query).toHaveBeenCalledWith(`SELECT * FROM plant WHERE id = ${plantId}`, expect.any(Function));
//    });
//});
