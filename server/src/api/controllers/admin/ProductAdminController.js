const Product = require('../../models/Product');
const Bill = require('../../models/Bills');
const moment = require('moment');
var ObjectId = require('mongodb').ObjectId;
const { detailProduct, getListProduct } = require('../../utils/service');
const ProductMangerService = require('../../services/admin/product/index');
const CommandCreate = require('../../services/admin/product/action/CommandCreate');
const CommandEditProduct = require('../../services/admin/product/action/CommandEditProduct');
const CommandView = require('../../services/admin/product/action/CommandView');
const CommandDelete = require('../../services/admin/product/action/CommandDelete');
class ProductAdminController {
    async getAllProduct(req, res, next) {
        const listDataCustom = await getListProduct();
        res.status(200).json({
            success: true,
            listDataCustom,
        });
    }

    async createProduct(req, res, next) {
        try {
            let dataBody = req.body,
                file1 = req.files[0].filename,
                file2 = req.files[1].filename;
            let create = new CommandCreate(dataBody, file1, file2);
            let productMnager = new ProductMangerService(create);
            const data = await productMnager.run();
            data
                ? res.status(202).json({
                      success: true,
                      msg: 'SUCCESS',
                      product: data,
                  })
                : res.status(404).json({
                      success: false,
                      msg: 'CREATE FAILED',
                  });
        } catch (err) {
            console.log(err);
            res.status(404).json({
                success: false,
                msg: err.message,
            });
        }
    }
    async editProduct(req, res, next) {
        try {
            let dataBody = req.body,
                idProduct = req.params.id;
            let edit = new CommandEditProduct(dataBody, idProduct);
            let productMnagerEdit = new ProductMangerService(edit);
            const status = await productMnagerEdit.run();
            if (!status) {
                res.status(404).json({
                    success: false,
                    msg: 'FAILED',
                });
            }
            const detail = new CommandView(idProduct);
            const productMnagerDetail = new ProductMangerService(detail);
            let product = await productMnagerDetail.run();
            product
                ? res.status(200).json({
                      success: true,
                      customData: product,
                  })
                : res.status(404).json({
                      success: false,
                      msg: 'Not found',
                  });
        } catch (err) {
            console.log(err);
            res.status(404).json({
                success: false,
                msg: err.message,
            });
        }
    }

    async ProductDetail(req, res, next) {
        try {
            const idProduct = req.params.id;
            if (idProduct !== '' || idProduct !== undefined || idProduct !== null) {
                const detail = new CommandView(idProduct);
                const productMnagerDetail = new ProductMangerService(detail);
                let product = await productMnagerDetail.run();
                product
                    ? res.status(200).json({
                          success: true,
                          customData: product,
                      })
                    : res.status(404).json({
                          success: false,
                          msg: 'Not found',
                      });
            } else {
                res.status(404).json({
                    success: false,
                    msg: 'Param error',
                });
            }
        } catch (err) {
            res.status(404).json({
                success: false,
                msg: err.message,
            });
        }
    }
    async deleteProduct(req, res, next) {
        try {
            const idProduct = req.params.id;
            if (idProduct === '' || idProduct === undefined || idProduct === null) {
                res.status(404).json({
                    success: false,
                    msg: 'Failed delete',
                });
            }
            let deleteProduct = new CommandDelete(idProduct);
            let productMnagerDeleted = new ProductMangerService(deleteProduct);
            let status = await productMnagerDeleted.run();
            if (!status) {
                res.status(404).json({
                    success: false,
                    msg: 'Failed delete',
                });
            }

            const listDataCustom = await getListProduct();
            res.status(200).json({
                success: true,
                listDataCustom: listDataCustom,
            });
        } catch (err) {
            res.status(404).json({
                success: false,
                msg: err.message,
            });
        }
    }
    async editImage(req, res, next) {
        try {
            const filename = req.file.filename;
            const index = req.body.index;
            if (req.params.id !== '' || req.params.id !== undefined || req.params.id !== null) {
                if (index === '1') {
                    const product = await Product.findOne({ _id: req.params.id });
                    let customArray = [
                        `${process.env.API_HOST}${filename}`,
                        product.description.imageList[1],
                    ];
                    const productUpdate = await Product.updateOne(
                        { _id: req.params.id },
                        {
                            $set: {
                                'description.imageList': customArray,
                            },
                        }
                    );
                    (await productUpdate)
                        ? detailProduct(req.params.id, res, next)
                        : res.status(404).json({
                              success: false,
                              msg: 'FAILED',
                          });
                } else {
                    const product = await Product.findOne({ _id: req.params.id });
                    let customArray = [
                        product.description.imageList[0],
                        `${process.env.API_HOST}${filename}`,
                    ];
                    const productUpdate = await Product.updateOne(
                        { _id: req.params.id },
                        {
                            $set: {
                                'description.imageList': customArray,
                            },
                        }
                    );

                    (await productUpdate)
                        ? detailProduct(req.params.id, res, next)
                        : res.status(404).json({
                              success: false,
                              msg: 'FAILED',
                          });
                }
            } else {
                res.status(404).json({
                    success: false,
                    msg: 'Param bị lỗi',
                });
            }
        } catch (err) {
            res.status(404).json({
                success: false,
                msg: err.message,
            });
        }
    }
}
module.exports = new ProductAdminController();
