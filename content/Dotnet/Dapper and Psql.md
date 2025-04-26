# Dapper
Dapper is an object relational mapper (ORM), often called a micro ORM. It provides a framework for mapping an object-oriented domain model to a traditional relational database.

# Entity Framework Core
EF Core is a feature-rich ORM, providing more capabilities than Dapper, like change tracking, migrations, and easier management of complex data models and relationships.

---

# Example

## Creating a `Users` Type Model

```csharp
public class EUsers
{
    public int Id { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public Status Status { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
    public bool IsDeleted { get; set; }
}

public enum Status
{
    Active = 1,
    Inactive = 0,
    Deactive = 2
}
```

---

## Creating Database Connection Factory

```csharp
using System.Data;
using Npgsql;

namespace DapperTestProject.Data;

public class SqlConnectionFactory : ISqlConnectionFactory
{
    private readonly string _connectionString;

    public SqlConnectionFactory(string connectionString)
    {
        _connectionString = connectionString;
    }

    public IDbConnection CreateConnection()
    {
        var connection = new NpgsqlConnection(_connectionString);
        connection.Open();
        return connection;
    }
}
```
> The `IDbConnection` interface represents an open connection to a data source implemented by the .NET framework.

---

## Injecting Connection Factory into Pipeline

```csharp
builder.Services.AddSingleton<ISqlConnectionFactory>(sp =>
    new SqlConnectionFactory(connectionString));
```

---

## Setting Up Entity Framework Core's `DbContext`

```csharp
namespace DapperTestProject;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions options) : base(options) { }

    public DbSet<EUsers> Users { get; set; }
}
```

---

## Injecting into Pipeline

```csharp
builder.Services.AddDbContext<ApplicationDbContext>(opt =>
{
    opt.UseNpgsql(connectionString);
});
```

---

## Controller Setup

```csharp
using Dapper;

namespace DapperTestProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ISqlConnectionFactory _sqlConnectionFactory;

        public TestController(ApplicationDbContext context, ISqlConnectionFactory sqlConnectionFactory)
        {
            _context = context;
            _sqlConnectionFactory = sqlConnectionFactory;
        }
    }
}
```

---

## Using `QueryAsync` to Retrieve All Users

```csharp
[HttpGet]
public async Task<IActionResult> GetUsers()
{
    using var connection = _sqlConnectionFactory.CreateConnection();
    const string query = """SELECT * FROM "Users" """;
    var users = await connection.QueryAsync<EUsers>(query);
    return Ok(users);
}
```

---

## Using `QueryFirstAsync` to Retrieve Data by ID

```csharp
[HttpGet("{id}")]
public async Task<IActionResult> GetById(int id)
{
    using var connection = _sqlConnectionFactory.CreateConnection();
    const string query = """SELECT "Id", "UserName", "Email", "Status" FROM "Users" WHERE "Id" = @Id""";
    var user = await connection.QueryFirstOrDefaultAsync<EUsers>(query, new { Id = id });
    
    if (user == null)
    {
        return NoContent();
    }

    var response = new UserResponseDto
    {
        Email = user.Email,
        Status = user.Status.ToString(),
        UserName = user.UserName
    };
    return Ok(response);
}
```

---

## Using EF Core to Insert Data

```csharp
[HttpPost]
public async Task<IActionResult> Post([FromBody] UserRequestDto model)
{
    _context.Users.Add(new EUsers
    {
        CreatedDate = DateTime.UtcNow,
        Email = model.Email,
        Status = model.Status,
        UserName = model.UserName
    });

    await _context.SaveChangesAsync();
    return Ok("Added successfully");
}
```

---

## Executing a Stored Procedure Using Dapper

### SQL Function

```sql
CREATE OR REPLACE FUNCTION "GetUsersById"(id INT)
RETURNS TABLE("Id" INT, "Username" TEXT, "Email" TEXT)
AS $$
BEGIN
    RETURN QUERY
    SELECT u."Id", u."UserName", u."Email"
    FROM "Users" u
    WHERE u."Id" = id;
END;
$$ LANGUAGE plpgsql;

-- Example call
SELECT * FROM "GetUsersById"(5);
```

### Controller Method

```csharp
[HttpGet("sp/{id}")]
public async Task<IActionResult> GetByIdFromSp(int id)
{
    using var connection = _sqlConnectionFactory.CreateConnection();
    const string query = """SELECT * FROM "GetUsersById"(@Id)""";

    var user = await connection.QueryFirstOrDefaultAsync<EUsers>(query, new { Id = id });

    if (user == null)
    {
        return NoContent();
    }

    var response = new UserResponseDto
    {
        Email = user.Email,
        Status = user.Status.ToString(),
        UserName = user.UserName
    };
    return Ok(response);
}
```

---

## Executing a View Using Dapper

### SQL View

```sql
CREATE OR REPLACE VIEW "UserView" AS
SELECT 
    "Id",
    "UserName",
    "Email",
    CASE 
        WHEN "UpdatedDate" IS NULL OR "UpdatedDate" = '-infinity' THEN "CreatedDate"
        ELSE "UpdatedDate"
    END AS "Date",
    "Status"
FROM "Users"
WHERE "IsDeleted" = false;

-- To drop view
DROP VIEW IF EXISTS "UserSummaryView";
```

### UserView Class

```csharp
public class UserView
{
    public int Id { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public Status Status { get; set; }
    public DateTime Date { get; set; }
}
```

### Controller Method

```csharp
[HttpGet("view/active")]
public async Task<IActionResult> GetActiveUsers()
{
    using var connection = _sqlConnectionFactory.CreateConnection();
    const string query = """SELECT * FROM "UserView" """;
    var users = await connection.QueryAsync<UserView>(query);
    return Ok(users);
}
```

---

## Creating a Trigger to Prevent Duplicate Usernames

```sql
CREATE OR REPLACE FUNCTION check_unique_username()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM "Users" WHERE "UserName" = NEW."UserName") THEN
        RAISE EXCEPTION 'Username exist.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_duplicate_username
BEFORE INSERT OR UPDATE ON "Users"
FOR EACH ROW
EXECUTE FUNCTION check_unique_username();
```

---
