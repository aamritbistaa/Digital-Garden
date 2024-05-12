1. **_Normalization_**

- process of organizing a relational database to reduce redundancy and improve data integrity.
- objective of normalization is to structure data in a way that minimizes data duplication and ensures that relationships between tables are well-defined.
- This is typically achieved by breaking down large tables into smaller, related tables and using foreign keys to establish relationships between them.

2. **_Wildcard_**

- it is written like

```sql
    select * from table_name where column_name like 'a%';
```

- Here `%` represents zero or more character, so it means, it will return record starting with a, including a only

```sql
    select * from table_name where column_name like 'a_';
```

- Here `_` represents one character, so it means, it will return record starting with a, and a single any character

```sql
    select * from table_name where City LIKE 'L___on';
```

- Here is 3 \_, it means it will return all the record from column name of a table where first leter is L 3 random letter and on as last 2 character

Similarly,

```
[] Represents single character enclosed by the brackets
^ Represents any character not in the brackets
- Represents any single character within the specified range
```

Regular expression

Crowfeet notaion
