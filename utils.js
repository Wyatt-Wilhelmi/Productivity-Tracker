export class Person{
    constructor(userid = {}){
        this.userid = userid;
    }

    /**
     * @param {any} userid
     */
    set setPersonUserID(userid){
        this.userid = userid;
    }

    get getPersonUserID(){
        return this.userid;
    }
}

export class ToDoListItems{
    
}
