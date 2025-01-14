import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getClients() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c7a12e78',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phoneNr: 123456789,
    },
    {
      id: '37c73f6d-d5f4-4cfb-9a44-dc6f6b594834',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phoneNr: 987654321,
    },
  ];
}

function getCategories() {
  return [
    { id: 'cd85d3cb-7a82-44bb-a91e-c7d6887e8b7f', name: 'Chair' },
    { id: 'bb102afe-678b-4f6f-a5e7-42ef4a9bde91', name: 'Table' },
    { id: 'eac9d8cc-fb63-4c55-8677-43a87b6abf44', name: 'Bowl' },
    { id: '37e0b2c4-f688-4327-b37f-12c84ae12f5d', name: 'Mug' },
  ];
}

function getProducts() {
  return [
    {
      id: 'c17297ae-914d-4fb5-981e-35c951be56fc',
      name: 'Artistic Chair',
      categoryId: 'cd85d3cb-7a82-44bb-a91e-c7d6887e8b7f',
      price: 250,
      shortDescription: 'A beautifully designed chair.',
      description:
        'This artistic chair combines style with comfort. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis venenatis elit ac ligula pharetra consectetur. Mauris vulputate aliquam maximus.',
      imgMain: 'testChair.jpg',
      options: [],
    },
    {
      id: 'a9bd438e-7093-4a68-8f6b-120d3d8605eb',
      name: 'Modern Chair',
      categoryId: 'cd85d3cb-7a82-44bb-a91e-c7d6887e8b7f',
      price: 200,
      shortDescription: 'A modern sleek chair.',
      description:
        'Perfect for modern interiors. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis venenatis elit ac ligula pharetra consectetur. Mauris vulputate aliquam maximus.',
      imgMain: 'testChair.jpg',
      options: ['red', 'blue', 'green'],
    },
    // Table
    {
      id: 'f5423241-7e43-46e3-b1d3-1dbad88971f7',
      name: 'Dining Table',
      categoryId: 'bb102afe-678b-4f6f-a5e7-42ef4a9bde91',
      price: 500,
      shortDescription: 'A spacious dining table.',
      description:
        'Perfect for family dinners. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis venenatis elit ac ligula pharetra consectetur. Mauris vulputate aliquam maximus.',
      imgMain: 'testTable.jpg',
      options: ['oak', 'walnut'],
    },
    {
      id: '3a47c222-8bb5-44f8-9e5c-00d7a116c0b7',
      name: 'Coffee Table',
      categoryId: 'bb102afe-678b-4f6f-a5e7-42ef4a9bde91',
      price: 300,
      shortDescription: 'A compact coffee table.',
      description:
        'Ideal for living rooms. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis venenatis elit ac ligula pharetra consectetur. Mauris vulputate aliquam maximus.',
      imgMain: 'testTable.jpg',
      options: ['black', 'white'],
    },
    // Bowl
    {
      id: '8e14dcb5-9366-4741-995e-926d370d7e67',
      name: 'Ceramic Bowl',
      categoryId: 'eac9d8cc-fb63-4c55-8677-43a87b6abf44',
      price: 50,
      shortDescription: 'A hand-painted ceramic bowl.',
      description:
        'Adds color to any table. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis venenatis elit ac ligula pharetra consectetur. Mauris vulputate aliquam maximus.',
      imgMain: 'testBowl.jpg',
      options: ['small', 'medium'],
    },
    {
      id: '21c88db5-5f96-4c5f-b2f9-1d1f8f4516d7',
      name: 'Wooden Bowl',
      categoryId: 'eac9d8cc-fb63-4c55-8677-43a87b6abf44',
      price: 70,
      shortDescription: 'A rustic wooden bowl.',
      description:
        'Perfect for salads. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis venenatis elit ac ligula pharetra consectetur. Mauris vulputate aliquam maximus.',
      imgMain: 'testBowl.jpg',
      options: ['oak', 'walnut', 'pine'],
    },
    // Mug
    {
      id: '7114abf6-48e6-4f2b-b497-26a97fb457a2',
      name: 'Abstract Mug',
      categoryId: '37e0b2c4-f688-4327-b37f-12c84ae12f5d',
      price: 20,
      shortDescription: 'A mug with abstract design.',
      description:
        'Enjoy your coffee in style. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis venenatis elit ac ligula pharetra consectetur. Mauris vulputate aliquam maximus.',
      imgMain: 'testMug.jpg',
      options: ['dark', 'light'],
    },
    {
      id: '3ccf79d5-44e7-44e5-ae99-0f1a4c9f4fc2',
      name: 'Vintage Mug',
      categoryId: '37e0b2c4-f688-4327-b37f-12c84ae12f5d',
      price: 25,
      shortDescription: 'A vintage enamel mug.',
      description:
        'Perfect for camping. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis venenatis elit ac ligula pharetra consectetur. Mauris vulputate aliquam maximus.',
      imgMain: 'testMug.jpg',
      options: [],
    },
  ];
}

function getOrders() {
  return [
    {
      id: 'bd8320f1-b2e9-4b6c-892c-c0b2f8a3d2f4',
      clientId: 'fd105551-0f0d-4a9f-bc41-c559c7a12e78',
      totalPrice: 450,
      comment: 'example comment by client',
    },
  ];
}

function getOrderItems() {
  return [
    {
      id: 'bd8320f1-b2e9-4b6c-321a-c0b2f2c4e2f4',
      orderId: 'bd8320f1-b2e9-4b6c-892c-c0b2f8a3d2f4',
      productId: 'c17297ae-914d-4fb5-981e-35c951be56fc',
      quantity: 1,
      basePrice: 250,
      totalPrice: 250,
      productOption: '',
      comment: null,
    },
    {
      id: 'bd8320f1-b2e9-4b6c-321a-e2b2f2c4e2g3',
      orderId: 'bd8320f1-b2e9-4b6c-892c-c0b2f8a3d2f4',
      productId: 'a9bd438e-7093-4a68-8f6b-120d3d8605eb',
      quantity: 1,
      basePrice: 200,
      totalPrice: 200,
      productOption: '',
      comment: null,
    },
  ];
}

function getProductImages() {
  return [
    {
      id: '16081adc-7c5d-424c-b189-c7245e3d31ad',
      productId: 'c17297ae-914d-4fb5-981e-35c951be56fc',
      imageUrl: 'testChair.jpg',
    },
    {
      id: '1da7ba3e-d25a-41be-903a-bbf8737bca5d',
      productId: 'a9bd438e-7093-4a68-8f6b-120d3d8605eb',
      imageUrl: 'testChair.jpg',
    },
    {
      id: '206a4ed4-3e78-48f9-a9e0-efeb552f67bd',
      productId: 'c17297ae-914d-4fb5-981e-35c951be56fc',
      imageUrl: 'testChair.jpg',
    },
    {
      id: '26defbe5-3e07-40d3-a913-1ee0dcd0eeb3',
      productId: '7114abf6-48e6-4f2b-b497-26a97fb457a2',
      imageUrl: 'testBowl.jpg',
    },
    {
      id: '3835c9fc-8d1f-4b08-bdab-ee4617fc4a50',
      productId: 'a9bd438e-7093-4a68-8f6b-120d3d8605eb',
      imageUrl: 'testChair.jpg',
    },
    {
      id: '54fd8978-fd0f-41c4-897e-ae57ea4c8c79',
      productId: '21c88db5-5f96-4c5f-b2f9-1d1f8f4516d7',
      imageUrl: 'testBowl.jpg',
    },
    {
      id: '59955a84-c4fb-45a7-8e11-44a9c98d4943',
      productId: '3ccf79d5-44e7-44e5-ae99-0f1a4c9f4fc2',
      imageUrl: 'testBowl.jpg',
    },
    {
      id: '5a5fcbd9-80d9-4cc3-88b4-758544a80551',
      productId: 'a9bd438e-7093-4a68-8f6b-120d3d8605eb',
      imageUrl: 'testChair.jpg',
    },
    {
      id: '5dc0eda6-94cb-4bf6-8cee-ab824608e8c1',
      productId: '8e14dcb5-9366-4741-995e-926d370d7e67',
      imageUrl: 'testBowl.jpg',
    },
    {
      id: '66207453-e0bf-4336-9b9e-e0bd5d6c2862',
      productId: '3a47c222-8bb5-44f8-9e5c-00d7a116c0b7',
      imageUrl: 'testTable.jpg',
    },
    {
      id: '73fd87fa-01bc-4506-a9cc-1afe9705cd20',
      productId: 'f5423241-7e43-46e3-b1d3-1dbad88971f7',
      imageUrl: 'testTable.jpg',
    },
    {
      id: '79fcf3de-a62d-48a5-b38d-227bd93d3a89',
      productId: 'f5423241-7e43-46e3-b1d3-1dbad88971f7',
      imageUrl: 'testTable.jpg',
    },
    {
      id: '7eb91330-e359-48f7-9aa8-f9bd7dca4f4d',
      productId: '7114abf6-48e6-4f2b-b497-26a97fb457a2',
      imageUrl: 'testBowl.jpg',
    },
    {
      id: '874ba01d-64ad-4c61-b64e-2ed00fb80b76',
      productId: '3ccf79d5-44e7-44e5-ae99-0f1a4c9f4fc2',
      imageUrl: 'testMug.jpg',
    },
    {
      id: '9d3c4c0d-556a-4d05-817e-0f753adf63c3',
      productId: '3a47c222-8bb5-44f8-9e5c-00d7a116c0b7',
      imageUrl: 'testTable.jpg',
    },
    {
      id: '9f13ea85-a90c-4bbd-a1d4-dd8caa0e17ac',
      productId: 'a9bd438e-7093-4a68-8f6b-120d3d8605eb',
      imageUrl: 'testChair.jpg',
    },
    {
      id: '9f47b648-0922-4885-b148-e9528908c450',
      productId: '21c88db5-5f96-4c5f-b2f9-1d1f8f4516d7',
      imageUrl: 'testBowl.jpg',
    },
    {
      id: 'a06e55aa-2f05-4011-96bb-ccf1d3935985',
      productId: '7114abf6-48e6-4f2b-b497-26a97fb457a2',
      imageUrl: 'testBowl.jpg',
    },
    {
      id: 'adcf52aa-9f5d-4c99-890a-92752e7f159f',
      productId: '21c88db5-5f96-4c5f-b2f9-1d1f8f4516d7',
      imageUrl: 'testBowl.jpg',
    },
    {
      id: 'aeafd583-1912-4061-97b5-ae11959b140e',
      productId: '8e14dcb5-9366-4741-995e-926d370d7e67',
      imageUrl: 'testBowl.jpg',
    },
    {
      id: 'c1cf6086-fedf-4d7a-9eb5-e78dcaad7aa5',
      productId: 'c17297ae-914d-4fb5-981e-35c951be56fc',
      imageUrl: 'testChair.jpg',
    },
    {
      id: 'ca6cbc7a-1538-42e2-bb16-b4dd64181773',
      productId: '3a47c222-8bb5-44f8-9e5c-00d7a116c0b7',
      imageUrl: 'testTable.jpg',
    },
    {
      id: 'e70bcfa3-56d3-4c58-ae37-ef989e9cf460',
      productId: '21c88db5-5f96-4c5f-b2f9-1d1f8f4516d7',
      imageUrl: 'testBowl.jpg',
    },
    {
      id: 'e71b6422-a170-4a7e-b0c8-5688ac1bc59f',
      productId: '7114abf6-48e6-4f2b-b497-26a97fb457a2',
      imageUrl: 'testBowl.jpg',
    },
    {
      id: 'e8ce7ee1-953b-402a-9289-d6bbed6c368c',
      productId: '3ccf79d5-44e7-44e5-ae99-0f1a4c9f4fc2',
      imageUrl: 'testMug.jpg',
    },
    {
      id: 'f2e55cf1-45c9-4cc9-95c9-7a4c3d587775',
      productId: '3ccf79d5-44e7-44e5-ae99-0f1a4c9f4fc2',
      imageUrl: 'testMug.jpg',
    },
  ];
}

async function deleteAllData() {
  await db.orderItem.deleteMany({});
  await db.order.deleteMany({});
  await db.productImage.deleteMany({});
  await db.product.deleteMany({});
  await db.productCategory.deleteMany({});
  await db.client.deleteMany({});
}

async function seed() {
  await deleteAllData();

  await Promise.all(
    getClients().map((client) => db.client.create({ data: client })),
  );

  await Promise.all(
    getCategories().map((category) =>
      db.productCategory.create({ data: category }),
    ),
  );

  await Promise.all(
    getProducts().map((product) => {
      const { categoryId, ...rest } = product;
      return db.product.create({
        data: {
          ...rest,
          category: { connect: { id: categoryId } },
        },
      });
    }),
  );

  await Promise.all(
    getOrders().map((order) => {
      const { clientId, ...rest } = order;
      return db.order.create({
        data: {
          ...rest,
          client: { connect: { id: clientId } },
        },
      });
    }),
  );

  await Promise.all(
    getOrderItems().map((orderItem) => {
      const { orderId, productId, ...rest } = orderItem;
      return db.orderItem.create({
        data: {
          ...rest,
          order: { connect: { id: orderId } },
          product: { connect: { id: productId } },
        },
      });
    }),
  );

  await Promise.all(
    getProductImages().map((productImage) => {
      const { productId, ...rest } = productImage;
      return db.productImage.create({
        data: {
          ...rest,
          product: { connect: { id: productId } },
        },
      });
    }),
  );
}

seed();
