export interface ITimestampQuestionService {
	startQuestions(): Promise<void>;
	saveTimestampQuestion(question: string, answer: string): Promise<void>;
	saveQuestions(
		data: {
			id: string;
			value: string
		}[]
	): Promise<void>;
}

export interface TimestampQuestionEntryObject {
	timestamp: number;
	type: 'answer';
	question: string;
	answer: string;
	userId: string;
	sessionId: string;
}

export interface StartQuestionEntryObject {
	timestamp: number;
	type: 'start';
	userId: string;
	sessionId: string;
}

export interface IQuestionConfigBase {
	id: string;
	type: string;
	headingText: string;
	required: boolean;
	preliminaryEndAnswer?: string;
}

export interface IQuestionConfigSelect extends IQuestionConfigBase {
	type: 'select';
	options: readonly {
		id: string;
		label: string;
	}[];
	paragraphs?: readonly string[];
}

export interface IQuestionConfigLikert extends IQuestionConfigBase {
	type: 'likert';
	options: readonly string[];
	label: {
		min: string;
		max: string;
		avg: string;
	}
}

export interface IQuestionConfigText extends IQuestionConfigBase {
	type: 'text' | 'email' | 'number';
	confirmText: string;
}

export interface IQuestionConfigInstruction extends IQuestionConfigBase {
	type: 'instruction';
	paragraphs: readonly string[];
	confirmText: string;
}

export type IQuestion = IQuestionConfigSelect | IQuestionConfigLikert | IQuestionConfigText | IQuestionConfigInstruction;

export type IQuestionBattery = readonly IQuestion[];

export type IQuestionResponse = {
	id: string;
	value: string;
	required: boolean;
};