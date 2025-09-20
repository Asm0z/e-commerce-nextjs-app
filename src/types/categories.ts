export interface ProductCategory {
    results:  number;
    metadata: Metadata;
    data:     CategoryData[];
}

export interface CategoryData {
    _id:       string;
    name:      string;
    slug:      string;
    image:     string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Metadata {
    currentPage:   number;
    numberOfPages: number;
    limit:         number;
}