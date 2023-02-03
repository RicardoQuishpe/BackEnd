import { Exclude, Expose } from 'class-transformer';
//import { BaseProjectDto } from '@uic/dto';
import { BaseProductDto } from './base-product.dto';

@Exclude()
export class readProductDto extends BaseProductDto  {
  
  @Expose()
  readonly title;

  @Expose()
  readonly price;

 @Expose()
  readonly description;

 @Expose()
  readonly categoryId;

@Expose()
  readonly images;

}




   