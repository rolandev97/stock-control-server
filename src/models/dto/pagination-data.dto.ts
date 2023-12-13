export class PaginationDataDto<T> {
    data: T[];
    currentPage: number;
    totalPages: number;
}