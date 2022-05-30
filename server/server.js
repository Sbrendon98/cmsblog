const express = require('express')
const { graphqlHTTP } = require("express-graphql")
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')
const app = express()

const authors = [
    { id: 1, name: 'J. K. Rowling' },
    { id: 2, name: "J. K. Tolkien" },
    { id: 3, name: "Brent Weeks" }
]

const books = [
    { id: 1, name: "Harry Booter", authorId: 1 },
    { id: 2, name: "Jerry Potter", authorId: 1 },
    { id: 3, name: "Berry Porper", authorId: 1 },
    { id: 4, name: "FellowShip of Rings", authorId: 2 },
    { id: 5, name: "Return of King", authorId: 2 },
    { id: 6, name: "Way of Shadows", authorId: 3 },
    { id: 7, name: "Beyond Shadows", authorId: 3 }
]

const BookType = new GraphQLObjectType({
    //This is how you create the schema for a book. 
    name: 'book',
    description: "This represents a book",
    fields: () => ({
    //The field in this case holds the keys required for the schema to form.
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
        author: {
    //Here you can also make relational connection with the id and the foreignKey id, in this case the author's id and the book's authorId
            type: AuthorType,
            //You can specify a type that is a variable holding the data you want to use along with your query
            resolve: (book) => {
                //Here you are finding all the authors with the associated book.authorId. When using Graphiql, you can grab both all together.
                return authors.find(author => book.authorId == author.id)
            }
        }
    })
})


const AuthorType = new GraphQLObjectType({
    name: 'author',
    description: "This represents an author",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        books: {
            type: new GraphQLList(BookType),
            resolve: (author) => {
                return books.filter(book => author.id == book.authorId)
            }
        }
    })
})

const RootQueryType = new GraphQLObjectType({
    /*An object type for GRaphQl that allows building each query table when using Graphiql. 
    A name is given to describe the query and a description*/
    name: "Query",
    description: "Root Query",

    fields: () => ({
        /*field is an object with a callback function that returns an object with different queries. You can specify either all or one query type */
        books: {
            type: new GraphQLList(BookType),
            description: 'List of All Books',
            /*Each query object has a resolve function that returns an array of objects that can be seen on Graphiql. 
            Usually it has a SQL query from your database as apposed to a raw input */
            resolve: () => books
        },
        book: {
            type: BookType,
            description: "Single Book",
            args: {
                id: { type: GraphQLInt }
            },
            /*The resolve key also has offers two parameters within the callback function, a parent and arguments. 
            The parent is what object you are resolving with, it will allow you to manipulate and compare
             data depending on how you are querying the data */
            resolve: (_, args) => {
                //Here you are finding one book in a list of all books depending on what id you pass in the arguments. 
                books.find(book => book.id === args.id)
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: "List of All Authors",
            resolve: () => authors
        },
        author: {
            type: AuthorType,
            description: "A Single Author",
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (_, args) => {
                authors.find(author => author.id === args.id)
            }
        }
    })
})
const RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: () => ({
        addBook: {
            type: BookType,
            description: "Adding a book",
            args: {
                name: { type: GraphQLNonNull(GraphQLString)},
                authorId: { type: GraphQLNonNull(GraphQLInt)}

            },
            resolve: (parent, args) => {
                const book = {id: books.length + 1, name: args.name, authorId: args.authorId}
                books.push(book)
                return book
            }
        },
        addAuthor: {
            type: AuthorType,
            description: "Adding an Author",
            args: {
                name: { type: GraphQLNonNull(GraphQLString)}
            },
            resolve: (parent, args) => { 
                const author = {id: authors.length + 1, name: args.name}
                authors.push(author)
                return author
            }
        }
    })
})
const schema = new GraphQLSchema({
    //This is how you will connect the schema to graphqlHTTP
    query: RootQueryType,
    mutation: RootMutationType
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(8080., () => console.log("The server is running")) 