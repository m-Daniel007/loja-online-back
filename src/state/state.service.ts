import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StateEntity } from './entities/state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(StateEntity)
    private readonly stateRepository: Repository<StateEntity>,
  ) {}

  async getAllStateService(): Promise<StateEntity[]> {
    return this.stateRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} state`;
  }
}
