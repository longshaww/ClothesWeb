const cheerio = require('cheerio');
const request = require('request-promise');
const fs = require('fs');
request('https://highclub.vn/collections/tops/',(err,res,html)=>{
    const normalizeText = (text) => {
        return text.replace(/\\n/g, '').trim();
    };
    if(!err && res.statusCode)
    {
        const $  = cheerio.load(html);
        const dataJson = [];
        
        $('.product-block').each((index,el)=>{
           const nameProduct = normalizeText($(el).find(' .box-pro-detail a').text());
           const price = normalizeText($(el).find('.box-pro-detail span').text());
           const image0 = $(el).find('.product-img  > a > picture > img').attr('data-src');
           const image1 = $(el).find('.product-img  > a > picture > .img-hover').attr('data-src');
           const size = [
                        {
                          "sizeName" : "XL",
                          "qty" : 10
                        },
                        {
                           "sizeName": "L",
                           "qty" : 5 
                        },
                        {
                            "sizeName" : "M",
                            "qty" : 5
                        }]; 
            const imageList = [image0, image1];
            const productDes = "Vải cotton hút ẩm tốt ,mịn mát,co giãn, dày vừa ko bí, mang đến cảm giác dễ chịu cho người sử dụng.";
            const type = "Object ID";
            const collection  = "Object ID";
            const discount = "ObjectId";
            const description = {
                imageList,
                productDes,
                price,
                type,
                collection
             };
           dataJson.push({
                nameProduct,
                price ,
                size ,
                description,
                discount
                });
        })
             
        // console.log(dataJson);

        fs.writeFileSync('data.json', JSON.stringify(dataJson)); // lưu dữ liệu vào file data.json
    }
    else{
        console.log(err);
    }
});


