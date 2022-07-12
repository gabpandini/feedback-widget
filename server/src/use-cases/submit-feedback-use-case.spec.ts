import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackMock  = jest.fn();
const sendMailMock  = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
	{ create: createFeedbackMock },
	{ sendMail: sendMailMock  }
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
		await expect(submitFeedback.execute({
			type: 'BUG',
			comment: 'exemple comment',
			screenshot: 'data:image/png:base64adgfadsbl',
		})).resolves.not.toThrow();

		expect(sendMailMock).toBeCalled()
		expect(createFeedbackMock).toBeCalledWith(expect.objectContaining({
		  type: 'bug', 
		  comment: 'example comment' 
		}))
	})

	it('should not be able to submit a feedback without type', async () => {
		await expect(submitFeedback.execute({
			type: '',
			comment: 'exemple comment'
		})).rejects.toThrow();
	})

	it('should not be able to submit a feedback without comment', async () => {
		await expect(submitFeedback.execute({
			type: 'BUG',
			comment: ''
		})).rejects.toThrow();
	})

	it('should not be able to submit a feedback with an invalid screenshot', async () => {
		await expect(submitFeedback.execute({
			type: 'BUG',
			comment: 'tá tudo bugado',
			screenshot: 'test.jpg',
		})).rejects.toThrow();
	})
})