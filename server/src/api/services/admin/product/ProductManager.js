const { API_HOST } = require('../../../../config/env');
const ProductModel = require('../../../models/Product');
var ObjectId = require('mongodb').ObjectId;
class ProductManager {
    constructor() {}

    async create(dataRequest, file1, file2) {
        try {
            const customData = {
                nameProduct: dataRequest.nameProduct,
                price: dataRequest.price,
                size: [
                    {
                        sizeName: 'XL',
                        qty: dataRequest.sizeXL,
                    },
                    {
                        sizeName: 'L',
                        qty: dataRequest.sizeL,
                    },
                    {
                        sizeName: 'M',
                        qty: dataRequest.sizeM,
                    },
                ],
                description: {
                    imageList: [`${API_HOST}${file1}`, `${API_HOST}${file2}`],
                    productDes: dataRequest.productDes,
                    price: dataRequest.price,
                    type: null,
                    collection: dataRequest.idCollection,
                },
                discount: null,
            };
            const product = new ProductModel(customData);
            await product.save();
            return product;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async edit(dataRequest, idProduct) {
        try {
            let customArraySize = [
                {
                    sizeName: 'XL',
                    qty: dataRequest.sizeXL,
                },
                {
                    sizeName: 'L',
                    qty: dataRequest.sizeL,
                },
                {
                    sizeName: 'M',
                    qty: dataRequest.sizeM,
                },
            ];

            const product = await ProductModel.updateOne(
                { _id: idProduct },
                {
                    $set: {
                        nameProduct: dataRequest.nameProduct,
                        price: dataRequest.price,
                        size: customArraySize,
                        'description.productDes': dataRequest.description,
                        'description.collection': dataRequest.idCollection,
                    },
                }
            );
            return product ? true : false;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async detailProduct(id) {
        try {
            const product = await ProductModel.findOne({ _id: ObjectId(id) })
                .populate('description.collection')
                .exec();

            let customData = {
                nameProduct: product.nameProduct,
                price: product.price,
                sizeM: product.size[2].qty,
                sizeL: product.size[1].qty,
                sizeXL: product.size[0].qty,
                image1: product.description.imageList[0],
                image2: product.description.imageList[1],
                description: product.description.productDes,
                collection: product.description.collection.typeName,
            };
            return customData;
        } catch (err) {
            return null;
        }
    }

    async delete(idProduct) {
        try {
            await ProductModel.deleteOne({ _id: ObjectId(idProduct) });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async editImage(filename, index, paramsId) {
        try {
            if (index === '1') {
                const product = await ProductModel.findOne({ _id: paramsId });
                let customArray = [
                    `${process.env.API_HOST}${filename}`,
                    product.description.imageList[1],
                ];
                const productUpdate = await ProductModel.updateOne(
                    { _id: paramsId },
                    {
                        $set: {
                            'description.imageList': customArray,
                        },
                    }
                );
                return (await productUpdate) ? true : false;
            } else {
                const product = await ProductModel.findOne({ _id: paramsId });
                let customArray = [
                    product.description.imageList[0],
                    `${process.env.API_HOST}${filename}`,
                ];
                const productUpdate = await ProductModel.updateOne(
                    { _id: paramsId },
                    {
                        $set: {
                            'description.imageList': customArray,
                        },
                    }
                );

                return (await productUpdate) ? true : false;
            }
        } catch (err) {
            return false;
        }
    }
}

module.exports = ProductManager;
