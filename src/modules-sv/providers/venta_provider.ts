import { CategoryEntity } from 'src/modules-sv/entities/category.model';
import { ProductEntity } from 'src/modules-sv/entities/products.model';
import { DataSource } from 'typeorm';

export ventaProviders = [
    {
        provide: RepositoryEnum.PRODUCT_REPOSITORY,
        useFactory: (dataSource:DataSource) =>
        dataSource.getRepository(ProductEntity),
        inject:[DataSourceEnum.PG_DATA_SOURCE]
    },
    { //se reemplaza CATEGORY_REPOSITORY y CategoryEntity
        provide: RepositoryEnum.CATEGORY_REPOSITORY,
        useFactory: (dataSource:DataSource) =>
        dataSource.getRepository(CategoryEntity),
        inject:[DataSourceEnum.PG_DATA_SOURCE]
    }
]
