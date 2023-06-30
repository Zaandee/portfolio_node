const mysql = require('mysql');
const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();
const connection = require('./lib/db')







app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(express.static(`${__dirname}/diary`));


// connection.connect();


//   connection.query('create table diet (date date NOT NULL PRIMARY KEY, condition1 VARCHAR(5) NOT NULL, weight Float NOT NULL, breakfast VARCHAR(30) NULL, lunch VARCHAR(30) NULL, supper VARCHAR(30) NULL, exercise VARCHAR(10) NULL, water VARCHAR(10) NULL, memo VARCHAR(100) NULL);', (error, results, fields) => {
//        if (error) throw error;
//        console.log("table 생성완료!");
// });







app.get('/', (request, response) => {
  fs.readFile('diary/diary.html', 'utf-8', (error, data) => {
      connection.query('SELECT * from diet', (error, results, fields) => {
          if (error) throw error;
          response.send(ejs.render(data, {
              data: results,
          }));    
      });
  });
})

app.get('/create',(request, response) => {
  fs.readFile('diary/diarycreate.html','utf-8',(error, data) => {
    if(error) throw error;
    response.send(data);
  })
})


app.post('/create', (request, response) => {
  const body = request.body;
  connection.query('INSERT INTO diet (date, condition1, weight, breakfast, lunch, supper, exercise, water, memo ) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?)',
  [body.date, body.condition1, body.weight, body.breakfast, body.lunch, body.supper, body.exercise, body.water, body.memo ], () => {
      response.redirect('/');
  });
});


app.get('/modify/:id', (request, response) => {
  fs.readFile('diary/diaryupdate.html', 'utf-8', (error, data) => {
    connection.query('SELECT * from diet WHERE date =?', [request.params.id], (error, results) => {
      if (error) throw error;
      console.log(request.params.id);
      response.send(ejs.render(data, {
        data: results[0],
      }));
    });
  });
});


app.post('/modify/:id', (request, response) => {
  const body = request.body;
  connection.query('UPDATE diet SET date = ?, condition1 = ?, weight = ?, breakfast = ?, lunch = ?, supper = ?, exercise = ?, water = ?, memo = ?  WHERE date = ?',
  [body.date, body.condition1, body.weight, body.breakfast, body.lunch, body.supper, body.exercise, body.water, body.memo, request.params.id], (error, results) => {
      if (error) throw error;
      
      response.redirect('/');
  });
});

app.get('/delete/:id', (request, response) => {
  connection.query('DELETE FROM diet where date=?', [request.params.id], () => {
   
    response.redirect('/');
  });
});

app.listen(3000, () => {
  console.log('Server is running port 3000!');
  
  
  
});
 