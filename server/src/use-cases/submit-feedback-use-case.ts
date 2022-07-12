import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
	type: string;
	screenshot?: string;
	comment: string;
}

export class SubmitFeedbackUseCase {
	constructor(
		private feedbacksRepository: FeedbacksRepository,
		private mailAdapter: MailAdapter,
	) {}

	async execute({ type, comment, screenshot } : SubmitFeedbackUseCaseRequest) {
		if (!type) {
			throw new Error('Type is required.')
		}

		if (!comment) {
			throw new Error('Comment is required.')
		}

		await this.feedbacksRepository.create({
			type,
			screenshot,
			comment,
		})

		await this.mailAdapter.sendMail({
			subject: `[${type}] Novo feedback`,
			body: [
				`<p>Tipo de feedback: <strong>${type}</strong></p>`,
				`<p>Comentário: ${comment}</p>`,
				screenshot ? `<img src="${screenshot}" />` : false,
			  ].filter(Boolean).join('')
			});
	}
}