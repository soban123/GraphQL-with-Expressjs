var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Course {
    id: Int
    title : String  
  }

  type Query {
      course( id : Int! ) : Course
      courses( topic : String! ) : [Course]
  }
`);

const data  = [
    {
        id : 1 ,
        title : 'Node'
    } , 
    {
        id : 2 ,
        title : 'JS'
    } , 
    {
        id : 3 ,
        title : 'Php'
    }
]

const getCourse = function (args ) {
      let id = args.id ; 
      return data.filter( course => course.id == id )[0] ;   

}

const getCourses = function(args){
    console.log(args)
    return data ; 
}

var root = { 
    course : getCourse ,
    courses : getCourses
 };

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));