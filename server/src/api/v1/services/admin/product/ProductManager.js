const { API_HOST } = require('../../../../../config/env');
const { Product } = require('../../../models/index');
var ObjectId = require('mongodb').ObjectId;
const { findKeyCache } = require('../../..//utils/helper');
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
                    imageList: [`${API_HOST}static/${file1}`, `${API_HOST}static/${file2}`],
                    productDes: dataRequest.productDes,
                    price: dataRequest.price,
                    type: null,
                    collection: dataRequest.idCollection,
                },
                discount: null,
            };
            const product = new Product(customData);
            await product.save();
            return product;
        } catch (err) {
            throw new Error(err.message);
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

            const product = await Product.updateOne(
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
            return product;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async detailProduct(id) {
        try {
            const product = await Product.findOne({ _id: ObjectId(id) })
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
            throw new Error(err.message);
        }
    }

    async delete(idProduct) {
        try {
            await Product.deleteOne({ _id: ObjectId(idProduct) });
            return true;
        } catch (err) {
            return false;
        }
    }

    async editImage(filename, index, paramsId) {
        try {
            if (index === '1') {
                const product = await Product.findOne({ _id: paramsId });
                let customArray = [
                    `${process.env.API_HOST}static/${filename}`,
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
                const product = await Product.findOne({ _id: paramsId });
                let customArray = [
                    product.description.imageList[0],
                    `${process.env.API_HOST}static/${filename}`,
                ];
                const productUpdate = await Product.updateOne(
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

    async getList() {
        try {
            const listProduct = await Product.find().populate('description.collection').exec();
            let listDataCustom = [];
            Promise.all(
                listProduct.map(async (el) => {
                    const typeName = el.description.collection.typeName;
                    let customData = {
                        id: el['_id'],
                        nameProduct: el['nameProduct'],
                        price: el['price'] + ',000 VND',
                        image: el.description.imageList[0],
                        collections: typeName,
                        sizeXL: el.size[0].qty,
                        sizeL: el.size[1].qty,
                        sizeM: el.size[2].qty,
                    };
                    await listDataCustom.push(customData);
                })
            );
            return listDataCustom;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = ProductManager;
