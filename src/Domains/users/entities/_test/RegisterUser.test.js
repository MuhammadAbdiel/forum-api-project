const RegisterUser = require("../RegisterUser");

describe("a RegisterUser entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      username: "abc",
      password: "abc",
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrow(
      "REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      username: 123,
      fullname: true,
      password: "abc",
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrow(
      "REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should throw error when username contains more than 50 character", () => {
    // Arrange
    const payload = {
      username: "dicodingindonesiadicodingindonesiadicodingindonesiadicoding",
      fullname: "Dicoding Indonesia",
      password: "abc",
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrow(
      "REGISTER_USER.USERNAME_LIMIT_CHAR"
    );
  });

  it("should throw error when username contains restricted character", () => {
    // Arrange
    const payload = {
      username: "dico ding",
      fullname: "dicoding",
      password: "abc",
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrow(
      "REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER"
    );
  });

  it("should create registerUser object correctly", () => {
    // Arrange
    const payload = {
      username: "dicoding",
      fullname: "Dicoding Indonesia",
      password: "abc",
    };

    // Action
    const { username, fullname, password } = new RegisterUser(payload);

    // Assert
    expect(username).toStrictEqual(payload.username);
    expect(fullname).toStrictEqual(payload.fullname);
    expect(password).toStrictEqual(payload.password);
  });
});
