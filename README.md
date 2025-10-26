ДЗ 2. Контексти і замикання
Вам потрібно реалізувати клас ContextMaze, який:
Зберігає ім’я контексту (this.name);
Має методи:
log() — виводить поточне ім’я контексту (this.name);
delayedLog() — виводить ім’я контексту через 1 секунду трьома різними способами:
Через анонімну функцію (function).
Через стрілкову функцію.
Через bind.
nested(fn) — приймає зовнішню функцію fn, викликає її і повертає результат, але всередині fn має бути доступ до this.name класу.
Має статичний метод createChained(), який:
створює два об’єкти ContextMaze("A") і ContextMaze("B");
виконує ланцюжок викликів, де this змінюється динамічно:
Copy code
a.nested(b.log);        // має вивести "B"
b.nested(a.delayedLog); Н// має вивести "A" трьома способами
Має працювати навіть якщо методи втратили свій контекст, тобто:
Copy code
const lost = a.log;
lost.call(b); а// має вивести "B"
⚡ Очікуваний результат виконання
Copy code
const a = new ContextMaze("A");
пconst b = new ContextMaze("B");

a.log();               // A
b.log();               // B
a.nested(b.log);       // B
b.nested(a.delayedLog); // A (3 варіанти через 1 сек)
const lost = a.log;
lost.call(b);          // B