const cheerio = require('cheerio');
const request = require('request-promise');
const fs = require('fs');
request('https://highclub.vn/collections/tops/',(err,res,html)=>{
    if(!err && res.statusCode)
    {
        const $  = cheerio.load(html);
        const dataJson = [];
   
        $('.box-pro-detail').each((index,el)=>{
           const name = $(el).find('.box-pro-detail a').text();
           const price = $(el).find('.box-pro-detail span').text().trim();
            $('.product-img').each((index,el)=>{
               const PicHreff = $(el).find('.product-img  > a');
               const hreff = PicHreff.attr("href");

               dataJson.push({name ,price,hreff});
            })  
            
      
        })
             
  

        fs.writeFileSync('data.json', JSON.stringify(dataJson)); // lưu dữ liệu vào file data.json
    }
    else{
        console.log(err);
    }
});
