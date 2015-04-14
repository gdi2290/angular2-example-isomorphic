import {Component, Template} from 'angular2/angular2';
import {If, For} from 'angular2/directives';
import {bootstrap} from 'angular2/angular2';
import {ListWrapper} from 'angular2/src/facade/collection';
import {ABSTRACT, CONST, Type} from 'angular2/src/facade/lang';

// import {TestingComponent} from 'components/testingComponent.es6.js';

export class Environment {
  @CONST()
  constructor({
    server,
    web,
    v8,
    webworker,
    webgl,
    canvas
  })
  {

    this.server = server;
    this.web = web;
    this.v8 = v8;
    this.webworker = webworker;
    this.webgl = webgl;
    this.canvas = canvas;
  }
}

// base model for RecordStore
class KeyModel {
  // _key: number;
  constructor(key: number) {
    this._key = key;
  }
}

class Todo extends KeyModel {
  // title: string;
  // completed: boolean;

  constructor(key: number, theTitle: string, isCompleted: boolean) {
    super(key);
    this.title = theTitle;
    this.completed = isCompleted;
  }
}

export class TodoFactory {
  // _uid: number;

  constructor() {
    this._uid = 0;
  }

  nextUid() {
    this._uid = this._uid + 1;
    return this._uid;
  }

  create(title: string, isCompleted: boolean) {
    return new Todo(this.nextUid(), title, isCompleted);
  }
}

// Store manages any generic item that inherits from KeyModel
export class TodoStore {
  // list: List<KeyModel>;

  constructor() {
    this.list = [
      {
        title: 'isomorphic',
        _key: 0
      },
      {
        title: 'server-rendered',
        completed: true,
        _key: 1
      }
    ];
    this._uid = 1;
  }

  nextUid() {
    this._uid = this._uid + 1;
    return this._uid;
  }

  getItem(recOrIndex) {
    var item = recOrIndex;
    if(typeof(recOrIndex) === "number") {
      item = this.getRecord(recOrIndex);
    }
    return item;
  }

  add(rec) {
    var addedItem = this.keyify(rec);
    this.list.push(addedItem);
  }

  remove(recOrIndex) {
    var removeItem = this.getItem(recOrIndex);
    this.spliceOut(removeItem._key);
  }

  save(rec) {
    var item = this.getItem(rec);
    var indexToUpdate = this.indexFor(item._key);
    rec._key = item._key;
    this.list[indexToUpdate] = rec;
  }

  keyify(item) {
    item._key = this.nextUid();
    return item;
  }

  bulkUpdate(items) {
    this.list.forEach((item) => {
      this.save(item);
    });
  }

  spliceOut(key) {
    var i = this.indexFor(key);
    if( i > -1 ) {
      return this.list.splice(i, 1)[0];
    }
    return null;
  }

  indexFor(key) {
    var record = this.getRecord(key);
    return this.list.indexOf(record);
  }

  getRecord(key) {
    return this.list.find((item) => key === item._key);
  }
}


@Component({
  selector: 'compose-test-client',
  services: [
    TodoStore
  ]
})
@Template({
  inline: '<div><content></content></div>',
  directives: []
})
@Environment({
  server: false,
  web: true
})
export class ComposeTestClient {
  constructor() {
  }
}

@Component({
  selector: 'compose-test-server',
  services: []
})
@Template({
  inline: '<div><content></content></div>',
  directives: []
})
@Environment({
  server: true,
  web: true
})
export class ComposeTestServer {
  constructor() {
  }
}

var template = `
<style>@import "css/base.css";</style>

<section id="todoapp">

  <header id="header">
    <h1>todos</h1>
    <input
      id="new-todo"
      placeholder="What needs to be done?"
      autofocus
      #newtodo
      (keyup)="enterTodo($event, newtodo)"
      >
  </header>

  <section id="main">
    <input id="toggle-all" type="checkbox" (click)="toggleAll($event)">
    <label for="toggle-all">Mark all as complete</label>

    <ul id="todo-list">

      <li
        *for="#todo of todoStore.list">

        <div
          class="view"
          [hidden]="todoEdit == todo">

          <input class="toggle" type="checkbox"
                 (click)="completeMe(todo)"
                 [checked]="todo.completed">

          <label (dblclick)="editTodo(todo)">{{ todo.title }}</label>
          <button class="destroy" (click)="deleteMe(todo)"></button>

        </div>

        <div>

          <input class="edit"
            [class.visible]="todoEdit == todo"
            [value]="todo.title"
            (keyup)="doneEditing($event, todo)"
            >

        </div>

      </li>
    </ul>

  </section>

  <footer id="footer" [hidden]="todoStore.list.length == 0">
    <span id="todo-count">
      <strong>{{ todoStore.list.length }}</strong>
      {{ (todoStore.list.length == 1) ? 'item' : 'items' }} left
    </span>
    <ul id="filters">
      <li>
        <a href="#/" class="selected">All</a>
      </li>
      <li>
        <a href="#/active">Active</a>
      </li>
      <li>
        <a href="#/completed">Completed</a>
      </li>
    </ul>
    <button id="clear-completed" (click)="clearCompleted()">Clear completed</button>
  </footer>

</section>

<footer id="info">
  <p>Double-click to edit a todo</p>
  <p>Created by <a href="http://twitter.com/angularjs">The Angular Team</a></p>
</footer>


level1
<compose-test-server>
  level2
  <compose-test-client>
    level3
    <compose-test-client>
      level4
    </compose-test-client>
  </compose-test-client>
</compose-test-server>
`;


@Component({
  selector: 'todo-app',
  services: [
    TodoStore,
    TodoFactory
  ]
})
@Template({
  inline: template,
  directives: [
    For,
    ComposeTestClient,
    ComposeTestServer
  ]
})
@Environment({
  server: true,
  web: true
})
export class TodoApp {
  // todoStore: TodoStore;
  // todoEdit: Todo;
  // factory: TodoFactory;

  constructor(store: TodoStore, factory: TodoFactory) {
    this.todoStore = store;
    this.todoEdit = null;
    this.factory = factory;
  }

  enterTodo($event, inputElement) {
    if($event.which === 13) { // ENTER_KEY
      this.addTodo(inputElement.value);
      inputElement.value = '';
    }
  }

  editTodo(todo: Todo) {
    this.todoEdit = todo;
  }

  doneEditing($event, todo: Todo) {
    var which = $event.which;
    var target = $event.target;
    if(which === 13) {
      todo.title = target.value;
      this.todoStore.save(todo);
      this.todoEdit = null;
    } else if (which === 27) {
      this.todoEdit = null;
      target.value = todo.title;
    }
  }

  addTodo(newTitle: string) {
    this.todoStore.add(this.factory.create(newTitle, false));
  }

  completeMe(todo: Todo) {
    todo.completed = !todo.completed;
  }

  deleteMe(todo: Todo) {
    this.todoStore.remove(todo);
  }

  toggleAll($event) {
    var isComplete = $event.target.checked;
    this.todoStore.list.forEach((todo) => {
      todo.completed = isComplete;
      this.todoStore.save(todo);
    });
  }

  clearCompleted() {
    [].concat(this.todoStore.list).forEach((todo) => {
      if (todo.completed) {
        this.deleteMe(todo);
      }
    });
  }
}
/*

@Component({
  selector: 'app'
})
@Template({
  inline: `
<div>
  <span>
    Hello, {{ username }}!
  </span>
  <span *if="username">
    Nice to meet you
  </span>
  <ul>
    <li *foreach="var item in items; var i = index">
      {{ i }} {{ item.content }}
    </li>
  </ul>
</div>
`,
  directives: [
    If,
    Foreach
  ]
})
export class App {
  constructor() {
    this.username = 'World';
    this.items = [
      {
        content: 'testing1'
      },
      {
        content: 'testing2'
      }
    ];
    setTimeout(() => {
      this.username = 'NEW World'
    }, 2000);
  }
  swag() {
    console.log('swag')
  }
}
*/
