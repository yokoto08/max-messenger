export type LearningStatus = 'new' | 'learning' | 'review' | 'known';

export interface WordDB {
    id: string;
    term: string;
    transcription: string;
    translation: string;
    level: string;          // 'A1', 'IELTS'
    example_en: string;     // Пример на английском
    example_ru: string;     // Перевод примера

    // Поля SRS (их может не быть в исходном файле, мы их добавим)
    status: LearningStatus;
    next_review: number;    // Timestamp (мс), когда слово нужно повторить
    difficulty: number;     // Коэффициент сложности (для алгоритма)
}