const path=require('path')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const express= require('express')
const hbs=require('hbs')
const app=express()

app.set('view engine','hbs')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
app.use(express.static(path.join(__dirname,'../public')))
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Yashpreet'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Yashpreet'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text',
        title:'Help',
        name:'Yashpreet'
    })
})
app.get('/weather',(req,res)=>{
if(!req.query.address){
    return res.send({
        error:'Must provide an address'
    })
}
geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
    if(error){
      return console.log({error})
    }
    forecast(latitude,longitude, (error, foredata) => {
  if(error){
    return console.log({error})
  }
    //   console.log(location)
    //   console.log(foredata)
    res.send({
        forecast:foredata,
  location:location,
  address:req.query.address

    })
    })

})

})

app.get('/products',(req,res)=>{
    if(!req.query.search){

return res.send({
    error:'You must provide a search term'
})
    }
    console.log(req.query.search);
   res.send({
       products:[]
   })
    })


app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404',
        name:'Yashpreet',
        err:'Help article not found'
    })
    })
app.get('*',(req,res)=>{
res.render('error',{
    title:'404',
        name:'Yashpreet',
    err:'Page not found'
})

})


app.listen(3000,()=>{
    console.log('3000 is up!')
})
