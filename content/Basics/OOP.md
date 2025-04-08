Object Oriented Programming

1. **_Inheritance_**

- Passing properties from parent class to child
- Creating new class from existing class
- Single inheritance, Multiple, Hierarchical, Multilevel, Hybrid
- **Visibility** Mode specifies how property or features are accessible
  - **Public** : accessible from any part of the program, including outside the class and in derived classes.
  - **Protected** : accessible within the class and its derived(sub) classes
  - **Private** : accessible only within the class
- `virtual` allows a method to be overridden by derived classes.
- `override` is used in a derived class to indicate that it is intentionally providing a new implementation for a virtual method in the base class.
- `sealed` prevents further derivation of a class or further overriding of a method, depending on where it's applied.

---

2. **_Polymerphism_**

- Different forms or behaviors based on the context used.
- Compile Time - Operator, Method overloading
- Runtime - Method overriding

```cpp
//Method Overloading
public int add(int a, int b)
{
	return a + b;
}
public double add(double a, double b)
{
	return a + b;
}
```

```csharp
//method overriding
using System;

// Base class with a virtual method
class Shape
{
    public virtual void Draw()
    {
        Console.WriteLine("Drawing a shape");
    }
}

// Derived class overriding the virtual method
class Circle : Shape
{
    public override void Draw()
    {
        Console.WriteLine("Drawing a circle");
    }
}

// Another derived class overriding the virtual method
class Square : Shape
{
    public override void Draw()
    {
        Console.WriteLine("Drawing a square");
    }
}

class Program
{
    static void Main()
    {
        // Creating objects of derived classes
        Circle circle = new Circle();
        Square square = new Square();

        // Using the base class reference (polymorphism)
        Shape shape1 = circle;
        Shape shape2 = square;

        // Calling the Draw method based on the actual object type
        shape1.Draw();  // Output: Drawing a circle
        shape2.Draw();  // Output: Drawing a square
    }
}
```

---

3. Encapsulation

- The bundling of data (attributes) and the methods (functions) that operate on that data into a single unit known as a class.

```cpp
public class BankAccount {
    // Private attributes
    private String accountHolder;
    private double balance;

    // Public methods for accessing and modifying the attributes
    public String getAccountHolder() {
        return accountHolder;
    }

    public void setAccountHolder(String accountHolder) {
        this.accountHolder = accountHolder;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        // Additional logic can be added, e.g., validation
        balance += amount;
    }

    public void withdraw(double amount) {
        // Additional logic can be added, e.g., checking for sufficient balance
        balance -= amount;
    }
}

```

- The `BankAccount` class encapsulates the internal state (accountHolder and balance) and provides controlled access to it through public methods

---

4. Abstraction

- simplifying complex system by modelling classes based on essential property and behaviour (the concept of abstracting the essential features of an object while hiding the implementation details.)
- Interface -
  - interface is a collection of abstract methods.
  - interface cannot contain concrete method with implementation
  - Classes can implement multiple interface to achieve **multiple inheritance**.
- Abstract Class-
  - cannot be instantiated at its own.
  - serves as a base class for other classes.
  - can contain **abstract methods** (which are methods without a body that must be implemented by any concrete (non-abstract) derived class)
  - Abstract classes can also have concrete methods with an implementation.
  - Abstract classes provide a way to define a common interface for a group of related classes, ensuring that certain methods are implemented in each concrete subclass.

---

5. **_SOLID_**

   1. S - Single Responsibility
      - Each class should do one thing and do it well. It should have a single responsibility or job.
   1. O - Open Closed
      - Should be able to add new features or functionality without changing existing code.
   1. L - Liskov Substitution Principle
      - If a class is a subclass of another class, it should be able to replace the parent class without affecting the program's functionality.
   1. I - Interface Segregation Principle
      - Keep interfaces small and focused.
   1. D - Dependency Inversion Principle
      - Depend on abstractions (interfaces or abstract classes).

1. **_Virtual Function_** - functions that are present in the parent class and are overridden by the subclass.
1. **Abstract / Pure virtual functions** - functions that are only declared in the base class.
1. **Constructor** - type of method that has the same name as the class and is used to initialize objects of that class . Executed at the creation of object. Default, Parameterized, Copy, Static, Private constructor
1. **Exception handling** - allows us to handle runtime errors, making your code more robust. The key components of exception handling in C++ include `try`, `throw`, `catch`, and optional blocks like `finally` (though C++ doesn't have a direct equivalent for `finally`).
