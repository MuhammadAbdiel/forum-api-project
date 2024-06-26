const CommentRepository = require("../../../../Domains/comments/CommentRepository");
const ThreadRepository = require("../../../../Domains/threads/ThreadRepository");
const UserRepository = require("../../../../Domains/users/UserRepository");
const NewComment = require("../../../../Domains/comments/entities/NewComment");
const AddedComment = require("../../../../Domains/comments/entities/AddedComment");
const AddCommentUseCase = require("../AddCommentUseCase");

describe("AddCommentUseCase", () => {
  /**
   * Testing the comment use case
   * can orchestra step by step
   * for adding the new comment correctly
   */

  it("should orchestrating the add comment ", async () => {
    // Arrange
    const useCasePayload = {
      content: "This is comment",
    };

    const useCaseCredential = {
      id: "user-123",
    };

    const useCaseThreadId = {
      id: "thread-123",
    };

    const mockAddedComment = new AddedComment({
      id: "comment-123",
      content: useCasePayload.content,
      owner: useCaseCredential.id,
    });

    /** creting dependency of use case */
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();
    const mockUserRepository = new UserRepository();

    /** mocking needed function */
    mockThreadRepository.verifyThreadAvailability = jest
      .fn()
      .mockImplementation(() => Promise.resolve(1));
    mockUserRepository.verifyUserAvailability = jest
      .fn()
      .mockImplementation(() => Promise.resolve(1));
    mockCommentRepository.addComment = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockAddedComment));

    /** create use case instance */
    const addCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
      userRepository: mockUserRepository,
    });

    // Action
    const addedComment = await addCommentUseCase.execute(
      useCasePayload,
      useCaseThreadId.id,
      useCaseCredential.id
    );

    // Assert
    expect(addedComment).toStrictEqual(
      new AddedComment({
        id: "comment-123",
        content: useCasePayload.content,
        owner: useCaseCredential.id,
      })
    );
    expect(mockThreadRepository.verifyThreadAvailability).toHaveBeenCalledWith(
      useCaseThreadId.id
    );
    expect(mockUserRepository.verifyUserAvailability).toHaveBeenCalledWith(
      useCaseCredential.id
    );
    expect(mockCommentRepository.addComment).toHaveBeenCalledWith(
      new NewComment({
        content: useCasePayload.content,
      }).content,
      useCaseThreadId.id,
      useCaseCredential.id
    );
  });
});
