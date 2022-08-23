const UserQueries = {
  GetAll: "SELECT * FROM Employees",
  GetById: "SELECT * FROM Employees WHERE EmployeeId =",
  CreateUser:
    "INSERT INTO Employees(EmployeeId, FirstName, IsOnsite, Mood) VALUES(",
  UpdateUser: "",
};

export { UserQueries };
