const cheerio = require("cheerio");
const request = require("request-promise");
const fs = require("fs");
var ObjectId = require('mongodb').ObjectId; 

var mongoObjectId = function () {
  var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};

const clear = (text) => {
  const price = text.replace(",", "").trim();
  const priceString = price.replace("₫", "").trim();
  const priceSlice = priceString.slice(0, 3).trim();
  const priceNumber = Number(priceSlice);
  return priceNumber;
};
async function crawldata() {
  await request("https://highclub.vn/collections/tops/", (err, res, html) => {
    const normalizeText = (text) => {
      return text.replace(/\\n/g, "").trim();
    };
    if (!err && res.statusCode) {
      const $ = cheerio.load(html);
      const dataJson = [];

      $(".product-block").each((index, el) => {
        const nameProduct = normalizeText(
          $(el).find(" .box-pro-detail a").text()
        );
        const price = clear(
          normalizeText($(el).find(".box-pro-detail span").text())
        );
        const image0 = $(el)
          .find(".product-img  > a > picture > img")
          .attr("data-src");
        const image1 = $(el)
          .find(".product-img  > a > picture > .img-hover")
          .attr("data-src");
        const size = [
          {
            sizeName: "XL",
            qty: 10,
          },
          {
            sizeName: "L",
            qty: 5,
          },
          {
            sizeName: "M",
            qty: 5,
          },
        ];
        const imageList = [image0, image1];
        const productDes =
          "Vải cotton hút ẩm tốt ,mịn mát,co giãn, dày vừa ko bí, mang đến cảm giác dễ chịu cho người sử dụng.";
        const type = ObjectId("621c5639bae8653bcb4564dd");

        const id  = "621c506fbae8653bcb4564ac"
        const collection = ObjectId(id);
        
        console.log(collection);
        const discount = "ObjectId";

        const description = {
          imageList,
          productDes,
          price,
          type,
          collection : ObjectId (collection),
        };
        console.log(description);

        dataJson.push({
          nameProduct,
          price,
          size,
          description,
          discount,
        });
      });

      // console.log(dataJson);

    //  fs.writeFileSync("tops.json", JSON.stringify(dataJson)); // lưu dữ liệu vào file data.json
    } else {
      console.log(err);
    }
  });
  
  await request('https://highclub.vn/collections/bottoms', (err,res,html)=>{
    const normalizeText = (text) => {
        return text.replace(/\\n/g, '').trim();
    };
    if(!err && res.statusCode)
    {
        const $  = cheerio.load(html);
        const dataJson = [];
        
        $('.product-block').each((index,el)=>{
           const nameProduct = normalizeText($(el).find(' .box-pro-detail a').text());
           const price = clear(normalizeText($(el).find('.box-pro-detail span').text()));
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
            const type = new ObjectId("621df18f81c5aa40061ef709");
            const collection = new ObjectId("621c50a7bae8653bcb4564b1");
          
            const discount = "ObjectId";
            
            
            const description = {
                imageList,
                productDes,
                price ,
                type ,
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

        fs.writeFileSync('bottoms.json', JSON.stringify(dataJson)); // lưu dữ liệu vào file data.json
    }
    else{
        console.log(err);
    }
  });
 await request("https://highclub.vn/collections/outerwears", (err, res, html) => {
    const normalizeText = (text) => {
      return text.replace(/\\n/g, "").trim();
    };
    if (!err && res.statusCode) {
      const $ = cheerio.load(html);
      const dataJson = [];

      $(".product-block").each((index, el) => {
        const nameProduct = normalizeText(
          $(el).find(" .box-pro-detail a").text()
        );
        const price = clear(
          normalizeText($(el).find(".box-pro-detail span").text())
        );
        const image0 = $(el)
          .find(".product-img  > a > picture > img")
          .attr("data-src");
        const image1 = $(el)
          .find(".product-img  > a > picture > .img-hover")
          .attr("data-src");
        const size = [
          {
            sizeName: "XL",
            qty: 10,
          },
          {
            sizeName: "L",
            qty: 5,
          },
          {
            sizeName: "M",
            qty: 5,
          },
        ];
        const imageList = [image0, image1];
        const productDes =
          "Vải cotton hút ẩm tốt ,mịn mát,co giãn, dày vừa ko bí, mang đến cảm giác dễ chịu cho người sử dụng.";
        const type = new ObjectId("621df15d81c5aa40061ef705");
        const collection = new ObjectId("621c50c7bae8653bcb4564b3");
        const discount = "ObjectId";

        const description = {
          imageList,
          productDes,
          price,
          type,
          collection,
        };
        dataJson.push({
          nameProduct,
          price,
          size,
          description,
          discount,
        });
      });

      // console.log(dataJson);

      fs.writeFileSync("outerwears.json", JSON.stringify(dataJson)); // lưu dữ liệu vào file data.json
    } else {
      console.log(err);
    }
  });
  await request("https://highclub.vn/collections/accessories", (err, res, html) => {
    const normalizeText = (text) => {
      return text.replace(/\\n/g, "").trim();
    };
    if (!err && res.statusCode) {
      const $ = cheerio.load(html);
      const dataJson = [];

      $(".product-block").each((index, el) => {
        const nameProduct = normalizeText(
          $(el).find(" .box-pro-detail a").text()
        );
        const price = clear(
          normalizeText($(el).find(".box-pro-detail span").text())
        );
        const image0 = $(el)
          .find(".product-img  > a > picture > img")
          .attr("data-src");
        const image1 = $(el)
          .find(".product-img  > a > picture > .img-hover")
          .attr("data-src");
        const size = [
          {
            sizeName: "XL",
            qty: 10,
          },
          {
            sizeName: "L",
            qty: 5,
          },
          {
            sizeName: "M",
            qty: 5,
          },
        ];
        const imageList = [image0, image1];
        const productDes =
          "Vải cotton hút ẩm tốt ,mịn mát,co giãn, dày vừa ko bí, mang đến cảm giác dễ chịu cho người sử dụng.";
        const type = new ObjectId("621df15d81c5aa40061ef705");
        const collection = new ObjectId("621c50e0bae8653bcb4564b4");
        const discount = "ObjectId";

        const description = {
          imageList,
          productDes,
          price,
          type,
          collection,
        };
        dataJson.push({
          nameProduct,
          price,
          size,
          description,
          discount,
        });
      });

      // console.log(dataJson);

      fs.writeFileSync("accesories.json", JSON.stringify(dataJson)); // lưu dữ liệu vào file data.json
    } else {
      console.log(err);
    }
  });
}

crawldata();
