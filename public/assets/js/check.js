var UIController = function(){

    var DOMString = {
        day: '.date--day',
        month: '.date--month',
        year: '.date--year',
        addInput: '.add__input',
        addBtn: '.add__circle',
        taskListContainer: '.result__list',
        listTask: '.list__task',
        checkedBtn: '.list__task--check',
        taskText: '.list__task--text',
        editBtn: '.list__task--edit',
        delBtn: '.list__task--del'
    }

    return{
        testUI: function(){
            console.log('Call from UI');
        },
        
        getDOMString: function(){
            return DOMString;
        },

        getInput: function(){
            return document.querySelector(DOMString.addInput).value;
        },

        clearInput: function(){
            return document.querySelector(DOMString.addInput).value = "";
        },
        addTaskList: function(tasks){

            var html, markup, element;
        
                element = DOMString.taskListContainer;
                
                html = '<li class="list__task" id="task-%id%"><button class="list__task--check" id="check"><i class="ion-ios-checkmark"></i></button><div class="list__task--text">%description%</div><button class="list__task--del" id="del"><i class="ion-android-delete"></i></button></li>';
                
            
                markup = html.replace('%id%', tasks.id);
                markup = markup.replace('%description%', tasks.description);

           
                document.querySelector(element).insertAdjacentHTML("afterbegin", markup);    
        },

        checkedTaskList: function(id){
    
            var taskID = "task-"+id;

            var el = document.querySelectorAll(DOMString.listTask);

            for(var i = 0; i < el.length; i++){

                var listID = el[i].id;

                if(taskID === listID){
                    
                    el[i].childNodes[0].classList.toggle('list__task--checked');
                    el[i].childNodes[1].classList.toggle('list__task--text--checked');
                }
            }   
        },

        deleteTaskList: function(id){
            var el = document.getElementById("task-"+id);
            el.parentNode.removeChild(el);  
        },
        
        displayMonth: function(){
            var now ,month ,year ,months ;

            now = new Date;

            months = ["January", "February", "March","April",
                        "May","June","July","August",
                        "September","October","November","December"];

            day = now.getDate();
            month = now.getMonth();
            year = now.getFullYear();

            document.querySelector(DOMString.day).textContent = day;
            document.querySelector(DOMString.month).textContent = months[month];
            document.querySelector(DOMString.year).textContent =  year;
        }
    }
}();

var TodolistController = function(){
  
    var data = [];

    var Task = function(id, description){
        this.id = id,
        this.description = description
    }
    
    return{
        testModel: function(){
            console.log('Call from Model');
        },

        createNewTask:function(desc){
            var addItem, ID;

            if(data.length > 0){
                for(var i = 0; i < data.length; i++){
                    ID = i + 1;
                    addItem = new Task(ID, desc);
                }
            }else{
                ID = 0;
                addItem = new Task(ID, desc);
            }

            data.push(addItem);

            return addItem;
        },

        deleteTask: function(id){
            var ids, index;
    
            ids = data.map(function(current){
                return current.id;
            });

            index = ids.indexOf(parseInt(id));
            if(index !== -1){
                data.splice(index, 1);
            }
        }

    }
}();

var MainController = function(TodoCtrl,UICtrl){
    
    var setupEventListener = function(){
        var DOM = UICtrl.getDOMString();

        
        document.querySelector(DOM.addBtn).addEventListener('click', ctrlAdd);
    
        document.querySelector(DOM.addInput).addEventListener('keypress', function(e){
            if(e.keyCode == 13 || e.which === 13){
                ctrlAdd();
            }
        });

        document.querySelector(DOM.taskListContainer).addEventListener('click', ctrlEventCheck);
    }

    var ctrlAdd = function(){
        var item;
        
        item = UICtrl.getInput();
        
        if(item !== "" && item !== " "){
            
            var tasks = TodoCtrl.createNewTask(item);
            
            UICtrl.addTaskList(tasks);
            UICtrl.clearInput();
        }
    }

    var ctrlEventCheck = function(event){
        var itemID, itemClass, IdSplit, ID;

        itemID = event.target.parentNode.parentNode.id;
        itemClass = event.target.parentNode.id;

        IdSplit = itemID.split("-");

        ID = IdSplit[1];
        
        if(itemClass === 'check'){
            UICtrl.checkedTaskList(ID);
        }else if(itemClass === 'del'){
            TodoCtrl.deleteTask(ID);
            UICtrl.deleteTaskList(ID);
        };
    }
    
    return{
        init: function(){
            console.log('script.js : connecting..');
            setupEventListener();
            UICtrl.displayMonth();
        }
    }
}(TodolistController,UIController);

MainController.init();
