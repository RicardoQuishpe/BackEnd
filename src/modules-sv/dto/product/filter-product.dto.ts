import { IsNumber, IsOptional, IsString } from 'class-validator'
import { isStringValidationOptions,isNumberValidationOptions } from '@shared/validation';
import { PaginationDto } from '../pagination/pagination.dto';

export class FilterProductDto extends PaginationDto{
@IsOptional()
@IsString(isStringValidationOptions())
readonly title: string;

@IsOptional()
@IsNumber(isNumberValidationOptions())
readonly categoryId: number;

/*
limit: number;
page: number;
search: string;

@IsOptional()
@IsString({message: 'el campo Producto debe ser string'})
*/
}