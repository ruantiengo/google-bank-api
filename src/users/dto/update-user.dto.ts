import { PartialType } from '@nestjs/mapped-types';
import { Key } from 'src/key/entities/key.entity';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    keys: Key[]
}
