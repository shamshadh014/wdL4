const todoList = require('../todo');

const {all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("TodoList Test Suite", () => {
    beforeAll(() => {
        add(
            {
                title: "Test todo",
                completed: false,
                dueDate: new Date().toLocaleDateString("en-CA")
            }
        );
        add(
            {
                title: "dueDate",
                completed: false,
                dueDate:new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString("en-CA")
            }
        );
        add(
            {
                title: "pay bill",
                completed: false,
                dueDate:new Date(new Date().setDate(new Date().getDate() + 2)).toLocaleDateString("en-CA")
            }
        );
    })
    test("Should add new todo", () => {
        const todoItemsCount = all.length;
        add(
          {
            title: "Test todo",
            completed: false,
            dueDate: new Date().toLocaleDateString("en-CA")
          }
        );
        expect(all.length).toBe(todoItemsCount + 1);
    });

    test("Should mark a todo as complete", () => {
       expect(all[0].completed).toBe(false);
       markAsComplete(0);
       expect(all[0].completed).toBe(true);
    })
    test("Should check retrieval of overdue items",() => {
       const lng=overdue().length
       let todaysDate=new Date().toLocaleDateString("en-CA")
        for(let i=0;i<lng;i++){
            expect(overdue()[i].dueDate<todaysDate)
        }

    })
    test("Should checks retrieval of due today items",() => {
        const lng=dueToday().length
        let todaysDate=new Date().toLocaleDateString("en-CA")
         for(let i=0;i<lng;i++){
             expect(dueToday()[i].dueDate===todaysDate)
         }
 
     })
     test("Should checks retrieval of due later items",() => {
        const lng=dueLater().length
        let todaysDate=new Date().toLocaleDateString("en-CA")
         for(let i=0;i<lng;i++){
             expect(dueLater()[i].dueDate>todaysDate)
         }
 
     })
})