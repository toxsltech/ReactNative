# React Native Coding Style Guidelines

# Formatting

- Indentation : 
   * Use four spaces.

- Newlines :
   * Use UNIX - style newlines(\n), and a newline character as the last character of a file.Windows - style newlines(\r\ n) are forbidden inside any repository.

- No trailing white space :
   * Clean up any trailing white space in your JS files.

- Use semicolons :  
   * Usage of semicolons is a core value.

- 80 characters per line :
   * Limit your lines to 80 characters.

- single quotes :
   * Use single quotes, unless you are writing JSON.This helps you separate your objects’ strings from normal strings. Example: var fruit = ‘mango’
      
- Opening braces :
   * Opening braces should be on the same line

# Varibale Declaration :
   * Declare one variable per var statement 
   * make use of let var and const as required

# Naming Conventions
   - Use lowerCamelCase for variables, properties and function names : Variables, properties and function names should use lowerCamelCase.They should also be descriptive.Single character variables and uncommon abbreviations should generally be avoided.
   - Use UpperCamelCase for class names : Class names should be capitalized using UpperCamelCase. example:  BankAccount

   - Use UPPERCASE for Constants : Constants should be declared as regular variables or static class properties, using all uppercase letters
	   
# Variables
   - Object / Array creation : Always quote only keys  in arrays and objects

# Conditionals 
   - Use the === operator 
   - Use descriptive conditions : Any non - trivial conditions should be assigned to a descriptively named variable or function

# Functions
   * Write small functions : Keep your functions short.
   *  Return early from functions : To avoid deep nesting of if - statements, always return a function’ s value as early as possible.
    	
   - Method chaining : One method per line should be used. Example: 

# Comments
   * Use slashes for comments
     Use slashes
	   for both single line and multi line comments.

# Error handling
   * Operational errors
   * Programmer errors  

#other style guidelines
- File structure conventions
    * Some code examples display a file that has one or more similarly named companion files. For example, hero.component.ts   and hero.component.html.

- Single responsibility
    * Apply the single responsibility principle (SRP) to all components, services, and other symbols. This helps make the      app cleaner, easier to read and maintain, and more testable.

- Rule of One
    * Do define one thing, such as a service or component, per file.
   
- Separate file names with dots and dashes
    * Do use dashes to separate words in the descriptive name.
    * Do use dots to separate the descriptive name from the type.
    * Do use consistent type names for all components following a pattern that describes the component's feature then its     type. A recommended pattern is feature.type.ts.
    * Do use conventional type names including .service, .component, .pipe, .module, and .directive. Invent additional        type names if you must but take care not to create too many.

- Service names
    * Do use consistent names for all services named after their feature.
    * Do suffix a service class name with Service. For example, something that gets data or heroes should be called a         DataService or a HeroService.

- Bootstrapping
    * Do put bootstrapping and platform logic for the app in a file named main.ts.
    * Do include error handling in the bootstrapping logic.
    * Avoid putting app logic in main.ts. Instead, consider placing it in a component or service.

- Component selectors
    * Do use dashed-case or kebab-case for naming the element selectors of components.

- Pipe names
    * Do use consistent names for all pipes, named after their feature.

- Angular NgModule names
    * Do append the symbol name with the suffix Module.
    * Do give the file name the .module.ts extension.
    * Do name the module after the feature and folder it resides in.

- App root module
    * Do create an NgModule in the app's root folder, for example, in /src/app.

- Components as elements
    * giving components an element selector, as opposed to attribute or class selectors.

- Miscellaneous
    * Requires at top : Always put requires at top of file to clearly illustrate a file’ s dependencies.

