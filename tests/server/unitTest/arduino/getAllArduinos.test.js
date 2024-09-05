const arduinoModel = require("../../../../modules/arduino");

// ביצוע Mocking
jest.mock("../../../../modules/arduino", () => ({
  getAllArduinos: jest.fn(),
}));

// משתנים גלובליים למצב המוקינג
let mockError = null;
let mockResults = [];

// הגדרת המימוש המדומה של הפונקציה
arduinoModel.getAllArduinos.mockImplementation((callback) => {
  if (mockError) {
    callback(mockError, null); // במקרה של שגיאה
  } else {
    callback(null, mockResults); // במקרה של הצלחה
  }
});

//------------------------------טסטים------------------------------------------

// בדיקת החזרת רשימת Arduino
it("should return a list of Arduino devices", () => {
  mockError = null;
  mockResults = [
    { id: 1, name: "Arduino Uno" },
    { id: 2, name: "Arduino Mega" },
  ];

  arduinoModel.getAllArduinos((err, result) => {
    expect(err).toBeNull(); 
    expect(result).toEqual([
      { id: 1, name: "Arduino Uno" },
      { id: 2, name: "Arduino Mega" },
    ]);
  });
});

// בדיקת שגיאת חיבור
it("should return an error when there is a problem retrieving Arduino devices", () => {
  mockError = new Error("Database connection error");
  mockResults = null;

  arduinoModel.getAllArduinos((err, result) => {
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe("Database connection error"); 
    expect(result).toBeNull();
  });
});
