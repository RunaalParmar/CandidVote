const functions = require('./user')

/* Life cycle methods *************************** 
Name:
    beforeEach()
    afterEach()
   This are methods that run before each test case 
   and after each test case
   
   Example
*/
    // beforeEach(() => initDatabase())
    // afterEach(() => closeDatabase())
    
/* Life cycle methods ************************
 Name: 
    beforeAll()
    afterAll()
   This are methods that run before all test case 
   and after all test case
   
   Example
*/
    // beforeAll(() => initDatabase())
    // afterAll(() => closeDatabase())
  //  const initDatabase = () => console.log("Database Initialized...")
  //  const closeDatabase  = () =>console.log("Database Closed...")

/* Life cycle methods ************************
  Name:
       Describe:
          This creates a scope the number of test cases the lifecycle method should run before and 
          after 
   
   Example
*/
// const checkName = () => console.log("checking name...")

// describe('checking name' , () =>{
//   beforeEach(() => checkName())
  
//   test("check if the it is 'John' ", () => {
//     const name = "john"
//     expect(name).toEqual('john')
    
//   });
  
//   test("check if the it is 'Victor'", () => {
//     const name = "Victor"
//     expect(name).toEqual('Victor')
    
//   });
  
  
// })



// toBe
// test('Adds 2 + 2 to equal 4' , () => {
//   expect(functions.add(2, 2)).toBe(4);
// });


// //not
// test('Adds 2 + 2 to NOT equal 5' , () => {
//   expect(functions.add(2, 2)).not.toBe(5);
// });

//CHECK FOR TRUTHY & FALSY VALUES 
//toBeNull matches only null 
// toBeUndefined matches only undefined
// toBeDefined is the opposite of toBeUndefined 
// toBeTruthy matches anything that an if statement treats as true 
// toBeFalsy matches anything that an if statement treats as false 

//toBeNull
// test('Should equals null' , () => {
//   expect(functions.isNull()).toBeNull(); 
// });

// //toBeFalsy 
// test('Should be falsy' , () => {
//   expect(functions.checkValue(null)).toBeFalsy(); 
// });

//toEqual
//

// //Less than and greater than 
// test('Should be under 1600', ()=>{
//   const load1 = 800;
//   const load2 = 700;
//   expect(load1 +load2).toBeLessThan(1600);
// })
// //LessthanOREqual and greater than 
// test('Should be under 1600', ()=>{
//   const load1 = 800;
//   const load2 = 800;
//   expect(load1 +load2).toBeLessThanOrEqual(1600);
// })

// // Regex
// test('There is no I in team', ()=>{
//   expect("teami").not.toMatch(/I/);
// });

// // Arrays  - //toContain
// test('username should contain Admin', ()=>{
//   const username = ["Mike" , "John", "admin" ]
  
//   expect(username).toContain('admin');
// });

// Axios is a HTTP Client just like the fetch API
// Testing async fetched data **** Promise



// test('Fetch name Matched Patricia Lebsack', ()=>{
//   expect.assertions(1);
//   return functions.fetchUsers().
//    then(data => {
//      expect(data.name).toEqual('Patricia Lebsacki')
//    })
// });

// Axios is a HTTP Client just like the fetch API
// Testing async fetched data **** Async Await

test('Fetch name Matched Patricia Lebsack', async ()=>{
  expect.assertions(1);
  data = await functions.fetchUsers()
  expect(data.name).toEqual('Patricia Lebsack')

});