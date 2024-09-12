

const getPlantById = require('./getPlantById'); // Adjust the path as needed

// Mock the dbPool query function
const db = {
    query: jest.fn()
};
describe('get single ID plant', () => {
    it('should query the database with the correct ID', (done) => {
        const plantid = 1;
        const mockResult = { rows: [{ id: 1 }] };

        db.query.mockImplementation((sql, callback) => {
            callback(null, mockResult);
        });

        const callback = (error, result) => {
            expect(error).toBeNull(); // No error expected
            expect(result).toEqual(mockResult); // Expect result to match mockResult
            done(); // Indicate test is complete
        };
        // Call the function with the mocked db object and the callback
        getPlantById(db, plantid, callback);
    });
});

