import { OrderEntity } from '../../order/entities/order.entity';
import { ReturnUserDto } from '../../user/dto/returnUser.dto';

export class ReturnOrderDto {
    id: number;
    date: string;
    user?: ReturnUserDto;

    constructor(order: OrderEntity) {
        this.id = order.id;
        this.date = order.date.toString();
        this.user = order.user ? new ReturnUserDto(order.user) : undefined;
    }
}
