import { PickType } from '@nestjs/swagger';
import { Store } from 'src/entities/store.entity';

export class CreateStoreDTO extends PickType(Store, [
  'address',
  'name',
  'businessLicense',
  'imgUrls',
  'userId',
]) {}
