![[Pasted image 20230129203310.png]]

# Import Database
`connction->bottom left -> administrator -> Data import/Restore`
# Export Database
`connction->bottom left -> administrator -> Data Export`

# Basic
- Create a new sql query tab.
- Double click on database name to select it.
- Strings are wrapped inside of singlequote`(' ')`.
- And Or operator are used to combine multiple condition.
- Not equal is represented by `(<>)`.

## List all the tables 

```sql
%%Example / Syntax%%
	show tables;
```

![[Pasted image 20230128233702.png]]

## To describe what are available inside the table

```sql
%%Syntax%%
	desc table_name;
```

```sql
%%Example%%
	desc sales;
```

![[Pasted image 20230128234349.png]]

## Fetching data
`SELECT` statement is used to retrieve data stored in our tables.

```sql
%%Syntax%%
	select * from table_name;
```

```sql
%%Example%% 
	select * from sales;
```
![[Pasted image 20230128234552.png]]

```sql
%%Syntax%% 
	select col_1_name, col_2_name from table_name;
```

```sql
%%Example%%
	select SPID, Amount from sales;
```

![[Pasted image 20230128234756.png]] 

# Arithmetic operation

```sql
%%Syntax%%
	select colname,colname1(operator)colname2 from tablename;
```

```sql
%%Example%%
	select Customers,Boxes,Customers/Boxes from sales;
```

![[Pasted image 20230128235439.png]]

- adding names to operation 

```sql
	select Customers,Boxes,Customers/Boxes as custumerperboxes from sales;
	select Customers,Boxes,Customers/Boxes `custumer per boxes` from sales;
```

![[Pasted image 20230128235839.png]]

![[Pasted image 20230128235906.png]]

# Condition
The `WHERE` clause is used to filter records.

```sql
%%Syntax%%
	select colname from table_name where condition;
```

```sql
%%Example%%
	select * from sales where Amount >1000;
```

![[Pasted image 20230129001028.png]]

```sql
%%in SQL date format is yyyy-mm-dd%%
	select * from sales where (amount>10000 and SaleDate >=
'2021-02-01');
	select saleDate,Amount from sales where (amount>10000 and month(saleDate)=02);
	select saleDate,Amount from sales where (amount>10000 and year(saleDate)=2021);
```

# Order By
The `ORDER BY` keyword is used to sort the result-set in ascending or descending order. By default ascending order

```sql
%%Syntax%%
	%% for ascending order %%
		select colname from tablename order by colname;
	%% for descending order %%
		select colname from tablename order by colname desc;
```

```sql
%%Example%%
	%%for ascending order%%
		select * from sales order by PID;
```

![[Pasted image 20230129001632.png]]

```sql
	%%for descending order%%
		select * from sales where Amount >1000 order by PID desc;
```

![[Pasted image 20230129001754.png]]

```sql
		select * from sales where GeoID = 'G2' order by PID desc;
```

![[Pasted image 20230129002543.png]]

# Between condition

```sql
%%Syntax%%
	select col_name from table_name where (condition and condition);
	select col_name from table_name where colname between value1 and value2;
```

```sql
%%Example%%
	select * from sales where Boxes<100 and boxes>50;
	select * from sales where Boxes between 50 and 100;
```

![[Pasted image 20230129185251.png]]

# Date
- In sql `Weekday()` returns index for date monday=0 tuesday=1 sunday=6
- In sql `Year()` returns year part of the date
```sql
%%Example%%
	select SPID, GeoID,PID, weekday(saleDate) as 'Day of week' from sales;
```

# Pattern matching
- The `LIKE` operator is used in a WHERE clause to search for a specified pattern in a column.
- The percent sign `(%)` represents zero, one, or multiple characters.
- The underscore sign `(_)`represents one, single character.

```sql
%%Starting with B%%
	select * from people where Salesperson like 'B%';
%%Having B%%
	select * from people where Salesperson like '%B%';
```

![[Pasted image 20230129191107.png]]

# Case Operator and branching logic
- The `CASE` expression goes through conditions and returns a value when the first condition is met (like an if-then-else statement).

```sql
	select 	SaleDate, Amount, SPID,Boxes,
			case 	when amount < 1000 then 'Under 1k'
					when amount < 5000 then 'Under 5k'
	                when amount < 10000 then 'Under 10k'
				else '10k or more'
			end as 'Amount category'
	from sales;
```

![[Pasted image 20230129192302.png]]

# Join
- A JOIN clause is used to combine rows from two or more tables, based on a related column between them.

```sql
%%Syntax%%
	SELECT columnsname
	FROM table1 
	JOIN table2
	ON table1.column = table2.column;
```

```sql
%%Example%%
	select s.Boxes,s.Amount,s.spid,p.Salesperson,p.location
	from sales as s 
	join people as p on p.SPID = s.SPID;
```

![[Pasted image 20230129193004.png]]

## Types of the JOIN
-   `(INNER) JOIN`: Returns records that have matching values in both tables
-   `LEFT (OUTER) JOIN`: Returns all records from the left table, and the matched records from the right table
-   `RIGHT (OUTER) JOIN`: Returns all records from the right table, and the matched records from the left table
-   `FULL (OUTER) JOIN`: Returns all records when there is a match in either left or right table

![[Pasted image 20230129193206.png]]

# Group by
- The `GROUP BY` statement groups rows that have the same values into summary rows.
 
```sql
select geoId, sum(amount) from sales group by geoID
```

![[Pasted image 20230129194933.png]]

# Misc

```sql
select s.saleDate, s.amount, p.SalesPerson, pr.product,g.Geo
from sales as s
join people as p on p.SPID = s.SPID
join products as pr on pr.pid = s.pid
join geo as g on g.GeoID = s.GeoID
where s.amount <1000 
and pr.Product like 'White%'
and g.Geo in ('UK','Canada')
order by amount;
```
