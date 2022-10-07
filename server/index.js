const arr = [
    {
        description: {
            imageList: [
                '//product.hstatic.net/200000280689/product/z2426817305518_88ad0c9997e175b88e3e47275b1c7642_d67209f4520b4fc198d774d552b557ec_grande.jpg',
                '//product.hstatic.net/200000280689/product/46_44a1c9a624c242c590a2ba666c6efb4b_grande.jpg',
            ],
            productDes:
                'Vải cotton hút ẩm tốt ,mịn mát,co giãn, dày vừa ko bí, mang đến cảm giác dễ chịu cho người sử dụng.',
            price: 330,
            collection: '621c50a7bae8653bcb4564b1',
        },
        _id: '6232fbf001830a245b8d7508',
        nameProduct: 'Basic Short - Brown',
        price: 330,
        size: [
            {
                sizeName: 'XL',
                qty: 0,
            },
            {
                sizeName: 'L',
                qty: 0,
            },
            {
                sizeName: 'M',
                qty: 0,
            },
        ],
        buyed: 0,
    },
    {
        description: {
            imageList: [
                '//product.hstatic.net/200000280689/product/z2426817286475_d611b143c563bb69d28a5ef4149c7b1b_fd82338e02a74588a9ce5f36b477d309_grande.jpg',
                '//product.hstatic.net/200000280689/product/z2426817299180_f727f3819d79ff56002979aad9e42def_3b33507436d441218c9ae6b73813b68a_grande.jpg',
            ],
            productDes:
                'Vải cotton hút ẩm tốt ,mịn mát,co giãn, dày vừa ko bí, mang đến cảm giác dễ chịu cho người sử dụng.',
            price: 330,
            collection: '621c50a7bae8653bcb4564b1',
        },
        _id: '6232fbf001830a245b8d7509',
        nameProduct: 'Basic Short - Cream',
        price: 330,
        size: [
            {
                sizeName: 'XL',
                qty: 10,
            },
            {
                sizeName: 'L',
                qty: 5,
            },
            {
                sizeName: 'M',
                qty: 5,
            },
        ],
        buyed: 0,
    },
    {
        description: {
            imageList: [
                '//product.hstatic.net/200000280689/product/4-te9206-1-none_b5777398d66e4fb2bf1f51f981bbc85a_grande.jpg',
                '//product.hstatic.net/200000280689/product/4-te9206-2-none_056c35dacc304fe9ad2505c115873ec3_grande.jpg',
            ],
            productDes:
                'Vải cotton hút ẩm tốt ,mịn mát,co giãn, dày vừa ko bí, mang đến cảm giác dễ chịu cho người sử dụng.',
            price: 450,
            collection: '621c50a7bae8653bcb4564b1',
        },
        _id: '6232fbf001830a245b8d750a',
        nameProduct: 'Cargo Pant - Black',
        price: 450,
        size: [
            {
                sizeName: 'XL',
                qty: 10,
            },
            {
                sizeName: 'L',
                qty: 5,
            },
            {
                sizeName: 'M',
                qty: 5,
            },
        ],
        buyed: 0,
    },
];

function handleArr(listProduct = arr) {
    listProduct = listProduct.filter((el) => {
        return el.size[0].qty !== 0 && el.size[1].qty !== 0 && el.size[2].qty !== 0;
    });
    console.log(listProduct);
}

handleArr();
