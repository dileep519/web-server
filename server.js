const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
var app=express();
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('CYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('capital',(text)=>{
    return text.toUpperCase();
});
app.set('view engine','hbs'); 
// app.use(express.static(__dirname+'/public'));
//commented because it is placed below the last use
// so that the middlewear is rendered at last
app.use((request,response,next)=>{
    var time=new Date();
    fs.appendFileSync('server.txt' ,`${time.toString()} ${request.method} ${request.url} \n`)
    console.log(time.toString(),request.method,request.url);
    next();
});
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname+'/public'));
app.get('/',(request,response)=>{
    /*response.send({
    name:'dileep',
    age:20
    });*/
    //using render
    response.render('home.hbs',{
        pagetitle:'Home Page',
        doc:'Home',
        // date:new Date().getFullYear(),
        // replacing above statement by hbs.registerHelper() 
        welcome:'Welcome buddy'
    });
});
app.get('/about',(request,response)=>{
    //response.send('<h2>About page</h2>');
    response.render('about.hbs',{
        pagetitle:'About page',
        // date:new Date().getFullYear()
        // replacing above statement by hbs.registerHelper()
    }); 
});
app.get('/bad',(request,response)=>{
    response.send({
        errno:404,
        title:'data not found'
    });
});
app.listen(3000,()=>{
    console.log('port 3000 is started')
});  