import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  let app: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    const fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;
  });

  it('should create', () => {
    expect(app).toBeTruthy();
  });

  it('should add a task', () => {
    app.newTitle = 'Buy milk';
    app.addTask();

    expect(app.tasks().length).toBe(1);
    expect(app.tasks()[0].title).toBe('Buy milk');
    expect(app.tasks()[0].done).toBe(false);
  });

  it('should not add a blank task', () => {
    app.newTitle = '   ';
    app.addTask();

    expect(app.tasks().length).toBe(0);
  });

  it('should toggle a task done then undone', () => {
    app.newTitle = 'Write tests';
    app.addTask();
    const id = app.tasks()[0].id;

    app.toggleTask(id);
    expect(app.tasks()[0].done).toBe(true);

    app.toggleTask(id);
    expect(app.tasks()[0].done).toBe(false);
  });

  it('should delete a task', () => {
    app.newTitle = 'Task to delete';
    app.addTask();
    const id = app.tasks()[0].id;

    app.deleteTask(id);

    expect(app.tasks().length).toBe(0);
  });

  it('should compute pending and done counts correctly', () => {
    app.newTitle = 'Task A';
    app.addTask();
    app.newTitle = 'Task B';
    app.addTask();
    app.newTitle = 'Task C';
    app.addTask();

    app.toggleTask(app.tasks()[0].id);
    app.toggleTask(app.tasks()[1].id);

    expect(app.doneCount()).toBe(2);
    expect(app.pendingCount()).toBe(1);
  });
});
