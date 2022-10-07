const fs = require('fs');
const rawdata = fs.readFileSync('./Products.json');
const data = JSON.parse(rawdata);

data.forEach((el)=>{
    el.buyed = 0 
    delete el.discount;
    delete el.description.type;
})

fs.writeFileSync("data.json", JSON.stringify(data)); 