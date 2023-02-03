import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { CategoryEntity } from './category.model';
  
  @Entity('products', { schema: 'ventasbdd' })
  export class ProductEntity {
    @PrimaryGeneratedColumn('identity')
    id: string;
    @CreateDateColumn({
      name: 'created_at',
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
    })
    createdat: Date;
    @UpdateDateColumn({
      name: 'created_at',
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
    })
    updateat: Date;
  
    @DeleteDateColumn({
      name: 'created_at',
      type: 'timestamptz',
      nullable: true,
    })
    deleteteat: Date;
  
  
    //?Relaciones muchos a uno
    @ManyToOne(() => CategoryEntity, (category) => category.products)
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;
  
    //@OneToMany(() => CategoryEntity, (review) => product.category)
    //@JoinColumn({ name: 'product_id' })
    //product: CategoruEntity;
  
  
    @Column('varchar', {
      name: 'title',
      unique: true,
      commnets: 'nombre del producto',
    })
    title:string;
  
    @Column('number',{
      name:'price',
      commnets: 'precio del producto'
    })
    price:number;
    
    @Column('varchar',{
      name:'description',
      commnets: 'descripcion del producto'
    })
    description:string;


/*@BeforeInsert()
@BeforeUpdate()
setEmail(){
  if(this.code){
    return;
  }
this.code = this.code.tolowerCase().trim();
}

async hashPasword(){
  if(!this.pasword){
    return;  
}
this.pasword = await Bcrypt.has(this.pasword, 10);
}*/

}