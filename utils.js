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
    constructor({text, day, checked} = {}){
        this.text = text;
        this.day = day;
        this.checked = checked;
    }

    set setToDoText(text){
        this.text = text;
    }

    get getToDoText(){
       return this.text;
    }

    set setToDoDay(day){
        this.day = day;
    }

    get getToDoDay(){
        return this.day;
    }

    set setToDoChecked(checked){
        this.checked = checked;
    }

    get getToDoChecked(){
        return this.checked;
    }
}
