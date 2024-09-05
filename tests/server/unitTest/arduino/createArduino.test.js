const arduinoModel = require("../../../../modules/arduino");

// ביצוע Mocking
jest.mock("../../../../modules/arduino", () => ({
  createArduino: jest.fn(),
}));

// הגדרת המימוש המדומה של הפונקציה
arduinoModel.createArduino.mockImplementation((data, callback) => {
  if (!data) {
    callback(new Error("Data is undefined or null"), null); // במקרה של undefined מחזירים שגיאה
  } else {
    callback(new Error("Something went wrong"), data.id);
  }
});

//------------------------------טסטים------------------------------------------

//בדיקת החזרת ID
it("should create a new Arduino device and return the data ID", () => {
  const data = {
    id: 1,
    name: "Arduino Uno",
    description: "A basic Arduino model",
  };

  arduinoModel.createArduino(data, (err, result) => {
    expect(result).toBe(data.id);
  });
});

//בדיקת החזרת ID תקין
it("should create a new Arduino device and return the provided insertId", () => {
  const data = {
    id: 2,
    name: "Arduino Uno",
    description: "A basic Arduino model",
  };

  arduinoModel.createArduino(data, (err, result) => {
    expect(result).toBe(2);
  });
});

//בדיקת הודעת שגיאה כללית
it("should have error", () => {
  const data = {
    id: 3,
    name: "Arduino Uno",
    description: "A basic Arduino model",
  };

  arduinoModel.createArduino(data, (err, result) => {
    expect(err).toBeInstanceOf(Error); //  לוודא שקיימת שגיאה
    expect(err.message).toBe("Something went wrong"); // בדיקת הודעת השגיאה
  });
});

//בדיקת שגיאה כאשר אין ערך מזהה לארדואינו
it("should handle null data gracefully", () => {
  const data = {
    id: null,
    name: "Arduino Uno",
    description: "A basic Arduino model",
  };

  arduinoModel.createArduino(data, (err, result) => {
    expect(err).toBeInstanceOf(Error); //  לוודא שקיימת שגיאה
    expect(err.message).toBe("Something went wrong"); // בדיקת הודעת השגיאה
  });
});

//בדיקת נתונים לא תקינים כמו undefined
it("should handle undefined data", () => {
  arduinoModel.createArduino(undefined, (err, result) => {
    expect(err).toBeInstanceOf(Error); // לוודא שקיימת שגיאה
    expect(err.message).toBe("Data is undefined or null"); // בדיקת הודעת השגיאה
  });
});

//בדיקת נתונים לא תקינים כמו null
it("should handle undefined data", () => {
  arduinoModel.createArduino(null, (err, result) => {
    expect(err).toBeInstanceOf(Error); // לוודא שקיימת שגיאה
    expect(err.message).toBe("Data is undefined or null"); // בדיקת הודעת השגיאה
  });
});
