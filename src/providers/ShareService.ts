export class ShareService {  
    
      urlobj: string;
   
   
      constructor() {
          this.urlobj = 'Blank';
         
      }
    
      setUserName(firstName) {
          this.urlobj = firstName;
              
      }
    
      getUserName() {
          return this.urlobj;
      }   
  }