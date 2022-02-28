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
           const size = ["M","L","XL"];     
           dataJson.push({
                    nameProduct , 
                    price,
                   
                });
        })
             
        console.log(dataJson);

        fs.writeFileSync('./datacrawl/data/data.json', JSON.stringify(dataJson)); // lưu dữ liệu vào file data.json
    }
    else{
        console.log(err);
    }
});


