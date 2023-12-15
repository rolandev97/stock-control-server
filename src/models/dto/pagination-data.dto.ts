import {ApiProperty} from "@nestjs/swagger";

export class PaginationDataDto<T> {
    @ApiProperty()
    data: T[];
    @ApiProperty()
    currentPage: number;
    @ApiProperty()
    totalPages: number;
}