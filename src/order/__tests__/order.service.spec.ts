import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { OrderService } from '../order.service';
import { PaymentService } from '../../payment/payment.service';
import { OrderProductService } from '../../order-product/order-product.service';
import { ProductService } from '../../product/product.service';
import { CartService } from '../../cart/cart.service';
import { paymentMock } from '../../payment/__mocks__/payment.mock';
import { cartMock } from '../../cart/__mocks__/cart.mocks';
import { cartProductMock } from '../../cart-product/__mocks__/cart-product.mocks';
import { orderProductMock } from '../../order-product/__mocks__/order-product.mock';
import { productMock } from '../../product/mocks/product.mock';
import { orderMock } from '../__mocks__/order.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { NotFoundException } from '@nestjs/common';
import { createOrderPixMock } from '../__mocks__/create-order.mock';

describe('OrderService', () => {
  let service: OrderService;
  let orderRepositoty: Repository<OrderEntity>;
  let paymentService: PaymentService;
  let cartService: CartService;
  let orderProductService: OrderProductService;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: PaymentService,
          useValue: {
            createPaymentService: jest.fn().mockResolvedValue(paymentMock),
          },
        },
        {
          provide: CartService,
          useValue: {
            findCartByUserId: jest.fn().mockResolvedValue({
              ...cartMock,
              cartProduct: [cartProductMock],
            }),
            clearCartService: jest.fn(),
          },
        },
        {
          provide: OrderProductService,
          useValue: {
            createOrderProductService: jest.fn().mockResolvedValue(orderProductMock),
          },
        },
        {
          provide: ProductService,
          useValue: {
            findAllProductService: jest.fn().mockResolvedValue([productMock]),
          },
        },
        {
          provide: getRepositoryToken(OrderEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([orderMock]),
            save: jest.fn().mockResolvedValue(orderMock),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    paymentService = module.get<PaymentService>(PaymentService);
    cartService = module.get<CartService>(CartService);
    orderProductService = module.get<OrderProductService>(OrderProductService);
    productService = module.get<ProductService>(ProductService);
    orderRepositoty = module.get<Repository<OrderEntity>>(
      getRepositoryToken(OrderEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(orderRepositoty).toBeDefined();
    expect(cartService).toBeDefined();
    expect(paymentService).toBeDefined();
    expect(orderProductService).toBeDefined();
    expect(productService).toBeDefined();
  });

  it('should return orders in findOrdersByUserId', async () => {
    const spy = jest.spyOn(orderRepositoty, 'find');
    const orders = await service.findOrdersByUserId(userEntityMock.id);

    expect(orders).toEqual([orderMock]);
    expect(spy.mock.calls[0][0]).toEqual({
      where: {
        userId: userEntityMock.id,
      },
      relations: {
        address: true,
        ordersProduct: {
          product: true,
        },
        payment: {
          paymentStatus: true,
        },
      },
    });
  });

  it('should return NotFoundException in find return empty', async () => {
    jest.spyOn(orderRepositoty, 'find').mockResolvedValue([]);

    expect(service.findOrdersByUserId(userEntityMock.id)).rejects.toThrowError(
      NotFoundException,
    );
  });

  it('should call createOrderProduct amount cartProduct in cart', async () => {
    const spyOrderProduct = jest.spyOn(
      orderProductService,
      'createOrderProductService',
    );

    const createOrderProductUsingCart =
      await service.createOrderProductUsingCart(
        {
          ...cartMock,
          cartProduct: [cartProductMock, cartProductMock],
        },
        orderMock.id,
        [productMock],
      );

    expect(createOrderProductUsingCart).toEqual([
      orderProductMock,
      orderProductMock,
    ]);
    expect(spyOrderProduct.mock.calls.length).toEqual(2);
  });

  it('should return order in saveOrder', async () => {
    const spy = jest.spyOn(orderRepositoty, 'save');

    const order = await service.saveOrder(
      createOrderPixMock,
      paymentMock,
      userEntityMock.id,
    );

    expect(order).toEqual(orderMock);
    expect(spy.mock.calls[0][0]).toEqual({
      addressId: createOrderPixMock.addressId,
      date: new Date(),
      paymentId: paymentMock.id,
      userId: userEntityMock.id,
    });
  });

  it('should expection in error save', async () => {
    jest.spyOn(orderRepositoty, 'save').mockRejectedValue(new Error());

    expect(
      service.saveOrder(createOrderPixMock, paymentMock,userEntityMock.id),
    ).rejects.toThrowError();
  });

  it('should return order in create order success', async () => {
    const spyCartService = jest.spyOn(cartService, 'findCartByUserId');
    const spyProductService = jest.spyOn(productService, 'findAllProductService');
    const spyCartServiceClear = jest.spyOn(cartService, 'clearCartService');
    const spyOrderProductService = jest.spyOn(
      orderProductService,
      'createOrderProductService',
    );
    const spyPaymentService = jest.spyOn(paymentService, 'createPaymentService');
    const spySave = jest.spyOn(orderRepositoty, 'save');

    const order = await service.createOrderService(
      createOrderPixMock,
      userEntityMock.id,
    );

    expect(order).toEqual(orderMock);
    expect(spyCartService.mock.calls.length).toEqual(1);
    expect(spyProductService.mock.calls.length).toEqual(1);
    expect(spyPaymentService.mock.calls.length).toEqual(1);
    expect(spySave.mock.calls.length).toEqual(1);
    expect(spyOrderProductService.mock.calls.length).toEqual(1);
    expect(spyCartServiceClear.mock.calls.length).toEqual(1);
  });
});
