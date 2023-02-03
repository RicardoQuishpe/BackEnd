import {
    IsString,
    IsInt,
    Allow,
    IsBoolean,
    IsNumber,
    IsNotEmpty,
    ArrayNotEmpty,
    IsArray,
    IsPositive,
  } from 'class-validator';
  import {
    ArrayNotEmptyValidationOptions,
    IsArrayValidationOptions,
    isBooleanValidationOptions,
    isNotEmptyValidationOptions,
    isNumberValidationOptions,
    isStringValidationOptions,
    IsPositiveValidationOptions,
    IsInitValidationOptions,
  } from '@shared/validation';
  
  export class BaseProductDto {

    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsString(isStringValidationOptions())
    readonly title: string;

    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsNumber(isNumberValidationOptions())
    @IsPositive(IsPositiveValidationOptions())
    readonly price: number;

    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsString(isStringValidationOptions())
    readonly description: string;
   
    @ArrayNotEmpty(ArrayNotEmptyValidationOptions())
    @IsArray(IsArrayValidationOptions())
    readonly images:string[];
    
    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsInt(IsInitValidationOptions())
    @IsPositive(IsPositiveValidationOptions())
    readonly categoryId: number;

  }
