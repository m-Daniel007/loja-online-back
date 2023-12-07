import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderProductService } from '../order-product.service';
import { OrderProductEntity } from '../entities/orderProduct.entity';
import { orderProductMock } from '../__mocks__/order-product.mock';
import { productMock } from '../../product/mocks/product.mock';
import { orderMock } from '../../order/__mocks__/order.mock';

describe('OrderProductService', () => {
  let service: OrderProductService;
  let orderProductRepository: Repository<OrderProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(OrderProductEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(orderProductMock),
          },
        },
        OrderProductService,
      ],
    }).compile();

    service = module.get<OrderProductService>(OrderProductService);
    orderProductRepository = module.get<Repository<OrderProductEntity>>(
      getRepositoryToken(OrderProductEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(orderProductRepository).toBeDefined();
  });

  it('should return orderProduct in save', async () => {
    const spy = jest.spyOn(orderProductRepository, 'save');
    const orderProduct = await service.createOrderProductService(
      productMock.id,
      orderMock.id,
      orderProductMock.price,
      orderProductMock.amount,
    );

    expect(orderProduct).toEqual(orderProductMock);
    expect(spy.mock.calls[0][0].price).toEqual(orderProductMock.price);
    expect(spy.mock.calls[0][0].amount).toEqual(orderProductMock.amount);
    expect(spy.mock.calls[0][0].orderId).toEqual(orderMock.id);
    expect(spy.mock.calls[0][0].productId).toEqual(productMock.id);
  });

  it('should return exception in error DB', async () => {
    jest.spyOn(orderProductRepository, 'save').mockRejectedValue(new Error());

    expect(
      service.createOrderProductService(
        productMock.id,
        orderMock.id,
        orderProductMock.price,
        orderProductMock.amount,
      ),
    ).rejects.toThrowError();
  });
});