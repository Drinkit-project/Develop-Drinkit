import { PartialType } from '@nestjs/swagger';
import { Store } from 'src/entities/store.entity';

export class UpdateStoreDTO extends PartialType(Store) {}
