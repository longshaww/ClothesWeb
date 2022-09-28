const  Accessories = require('./list/accessories');
const  Bottoms = require('./list/bottoms');
const NewArrivals = require('./list/new-arrivals');
const  Outerwears = require('./list/outerwears');
const Tops = require('./list/tops');

class CollectionsService {
    constructor(type)
    {
        this.type = type ;
    }

    async createCollection()
    {   
        switch (this.type) {
            case 'new-arrivals':
              return new NewArrivals();
      
            case 'tops':
              return new Tops();
      
            case 'bottoms':
              return  new Bottoms();
            
            case 'accessories':
              return new Accessories();
            
            case 'outerwears':
              return new Outerwears();
      
            default:
              return null;
        
       } 
  }

}
module.exports = CollectionsService