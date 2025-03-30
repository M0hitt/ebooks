export interface IBook {
    Id:number;
    Name: string;
    Publisher: string;
    Title: string;
    Cover: string;
    Data: IBookContent[];
    Price: number;
    PurchasedBy: string[];
    LastReadPosition: Record<string, IBookProgress>;
}

export interface IBookContent {
    Chapter: string;
    Content: string;
}

export interface IBookProgress {
    ChapterIndex: number;
    ContentOffset: number;
}

