export interface IQuestionConfigBase {
    id: string;
    type: string;
    required: boolean;
}

export interface IQuestionConfigSelect extends IQuestionConfigBase {
    type: 'select';
    options: string[];
}

export interface IQuestionConfigEmail extends IQuestionConfigBase {
    type: 'email';
}

export interface IQuestionConfigNumber extends IQuestionConfigBase {
    type: 'number';
}

export type IQuestionConfig = (IQuestionConfigSelect | IQuestionConfigEmail | IQuestionConfigNumber)[];
    