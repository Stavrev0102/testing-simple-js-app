const { test, expect } = require('@playwright/test');

test('check if app can add record' , async({page}) => {
    await page.goto('http://127.0.0.1:5500');
    await page.fill('#task-input' , 'Test Task');
    await page.click('#add-task');
    const result = await page.textContent('.task')
    expect(result).toContain('Test Task')
})

test('check if the user can delete a task' , async({ page }) => {
    await page.goto('http://127.0.0.1:5500');
    await page.fill('#task-input' , 'Test Task');
    await page.click('#add-task');
    await page.click('.task .delete-task');

    const tasks = await page.$$eval('.task' , 
        tasks => tasks.map(x => x.textContent))

    expect(tasks).not.toContain('Test Task')      
});

test('check if user can mark a task as complete' , async({ page }) => {
    await page.goto('http://127.0.0.1:5500');
    await page.fill('#task-input' , 'Test Task');
    await page.click('#add-task');
    await page.click('.task .task-complete');
    const completedTask = await page.$('.task.completed');

    expect(completedTask).not.toBeNull()
});
test('check if user can filter results' , async({ page }) => {
    await page.goto('http://127.0.0.1:5500');
    await page.fill('#task-input' , 'Test Task');
    await page.click('#add-task');
    await page.click('.task .task-complete');
    await page.selectOption('#filter','Completed');

    const incompleteTask = await page.$('.task:not(.completed)');
    expect(incompleteTask).toBeNull();
});