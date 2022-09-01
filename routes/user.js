const { response } = require('express');
var express = require('express');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers');
const userHelpers = require('../helpers/user-helpers')

/* GET home page. */
router.get('/', function(req, res, next) {
  let user=req.session.user
  productHelpers.getAllProducts().then((products)=>{
   
    res.render('user/view-products',{admin:false,products,user})
  })
  
});
router.get('/login',(req,res)=>{
  res.render('user/login')
})
router.get('/signup',(req,res)=>{
  res.render('user/signup')
})
router.post('/signup',(req,res)=>{
  res.redirect('/login')
//  userHelpers.doSignup(req.body).then((response)=>{
//    console.log(response); 
   //req.session.loggedIn=true
   //req.session.user=response
   //res.redirect('/) 
  })
  
//})
router.post('/login',(req,res)=>{
  //userHelpers.doLogin(req.body).then((response)=>{
  //  if(response.status){
      //req.session.loggedIn=true
    //  req.session.user=response.user
      res.redirect('/')
   // }else{
     // res.redirect('/login')
   // }
 // })
  //router.get('/logout',(req,res)=>{
   // req.session.destroy()
  //  res.redirect('/')
 // })
}) 

router.get('/orders',(req,res)=>{
  res.render('user/orders')
})





router.get('/cart',async(req,res)=>{
  let products=userHelpers.getCartProducts(req.params.id)
  console.log(products);
  res.render('user/cart')
})
router.get('/add-to-cart/:id',(req,res)=>{
  userHelpers.addToCart(req.params.id).then(()=>{
    res.redirect('/')
  })
})

module.exports = router;
