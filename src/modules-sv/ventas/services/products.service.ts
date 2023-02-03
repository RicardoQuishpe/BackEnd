import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, FilterProductDto, readProductDto, UpdateProductDto } from 'src/modules-sv/dto';
import { ProductEntity } from 'src/modules-sv/entities/products.model';
import { RepositoryEnum } from 'src/shared/enums/repository.enum';
import { ServiceResponseHttpModel } from '@shared/models';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { response } from 'express';
import { PaginationDto } from 'src/modules-sv/dto/pagination/pagination.dto';
import { plainToInstance } from 'class-transformer'

@Injectable()
export class ProductService {
    response: any;
    constructor(@Inject(RepositoryEnum.PRODUCT_REPOSITORY )
        private repository:Repository<ProductEntity>   
    ){}
    async create(payload:CreateProductDto):Promise<ServiceResponseHttpModel>{
        const newProduct = this.repository.create(payload);
        const productCreated = this.repository.save(newProduct);
        return {data: plainToInstance (readProductDto,productCreated)}
    }

async catalogue():Promise<ServiceResponseHttpModel>{
    const newEvent = this.repository.findAndCount({take:1000});
    return{
        date:this.response[0],
        pagination:{totalItems: response[1], limit: 10 }
    }
}

    async findAll(params?:FilterProductDto):Promise<ServiceResponseHttpModel>{
        if(params?.limit>0 && params?.page >=0 )
        return await this.paginateAndFilter(params);
    
    const response = await this.repository.findAndCount({
        order:{
            updateAt: 'DESC'
        },
    });
    return{
        data:plainToInstance(readProductDto, response[0]),
        pagination: { totalItems: response[1], limit:10}
    };
    }

async findOne(id: string): Promise<ServiceResponseHttpModel> {
        const product = await this.repository.findOneBy({ id });

        if (!product) {
            throw new NotFoundException("Product not found");

        }
        return { data: plainToInstance(readProductDto, product) };
    }

    async update(id: string,payload: UpdateProductDto,): Promise<ServiceResponseHttpModel> {
        const product = await this.repository.preload({ id, ...payload });

        if (!product) {
            throw new NotFoundException("Product not found");
        }
        const productUpdated = await this.repository.save(product);

        return { data: plainToInstance(readProductDto, productUpdated) };
    }

    async remove(id: string): Promise<ServiceResponseHttpModel> {
        const product = await this.repository.findOneBy({ id });

        if (!product) {
            throw new NotFoundException("Product not found");
        }
        const productDelete = await this.repository.softRemove(product);

        return { data: plainToInstance(readProductDto, productDelete) };
    }

    async removeAll(payload: ProductEntity[]): Promise<ServiceResponseHttpModel> {
        const productsDeleted = await this.repository.softRemove(payload);
        return { data: productsDeleted };
    }

    private async paginateAndFilter(params: FilterProductDto): Promise<ServiceResponseHttpModel> {
        let where: FindOptionsWhere<ProductEntity> | FindOptionsWhere<ProductEntity>[];
        where = {};
        let { page, search } = params;
        const { limit } = params;

        if (search) {
            search = search.trim();
            page = 0;
            where = [];
            where.push({ title: ILike(%${search}%) });
        }

        const response = await this.repository.findAndCount({
            where,
            take: limit,
            skip: PaginationDto.getOffset(limit, page),
            order: {
                updatedAt: 'DESC'
            },

        });
        return {
            data: plainToInstance(readProductDto, response[0]),
            pagination: { limit, totalItems: response[1] },
        }

    }

    async activateProduct(payload: CreateProductDto): Promise<ServiceResponseHttpModel> {
        const newProduct = this.repository.create(payload);
        const productCreated = await this.repository.save(newProduct);
    
        return { data: plainToInstance (readProductDto, productCreated) };
      }
      
      async closeProduct(id: string): Promise<ServiceResponseHttpModel> {
        const product = await this.repository.findOneBy({ id });
    
        if (!product) {
            throw new NotFoundException("Product not found");
        }
        const productDelete = await this.repository.softRemove(product);
    
        return { data: plainToInstance(readProductDto, productDelete) };
    }
}

