const GetThreads = require("../GetThreads");

describe("a GetThreads", () => {
  it("should throw error when payload did not contain right property", () => {
    // Arrange
    const payload = [
      {
        title: "This is title",
        body: "This is body",
        date: "something",
        username: "dicoding",
      },
    ];

    // Action and Assert
    expect(() => new GetThreads(payload)).toThrow(
      "GET_THREADS.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload contain wrong data type", () => {
    // Arrange
    const payload = [
      {
        id: "thread-123",
        title: "This is title",
        body: "This is body",
        date: "something",
        username: 123,
      },
    ];

    // Action and Assert
    expect(() => new GetThreads(payload)).toThrow(
      "GET_THREADS.PROPERTY_HAVE_WRONG_DATA_TYPE"
    );
  });

  it("should throw error when payload contain wrong data type", () => {
    // Arrange
    const payload = {};

    // Action and Assert
    expect(() => new GetThreads(payload)).toThrow(
      "GET_THREADS.PROPERTY_HAVE_WRONG_DATA_TYPE"
    );
  });

  it("should get all threads correctly", () => {
    // Arrange
    const payload = [
      {
        id: "thread-123",
        title: "This is title",
        body: "This is body",
        date: "something",
        username: "dicoding",
      },
    ];

    // Action
    const getThreads = new GetThreads(payload);

    // Assert
    expect(getThreads.threads).toStrictEqual(payload);
    expect(getThreads.threads[0].id).toStrictEqual("thread-123");
    expect(getThreads.threads[0].title).toStrictEqual("This is title");
    expect(getThreads.threads[0].body).toStrictEqual("This is body");
    expect(getThreads.threads[0].date).toStrictEqual("something");
    expect(getThreads.threads[0].username).toStrictEqual("dicoding");
    expect(getThreads).toBeDefined();
  });
});
