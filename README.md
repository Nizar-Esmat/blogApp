# Blog App MySQL Database

## Setup Instructions

### Using Docker Compose (Recommended)

1. Start the MySQL container:
```bash
docker-compose up -d
```

2. Check if the container is running:
```bash
docker-compose ps
```

3. View logs:
```bash
docker-compose logs -f mysql
```

4. Stop the container:
```bash
docker-compose down
```

### Using Dockerfile Only

1. Build the Docker image:
```bash
docker build -t blogapp-mysql .
```

2. Run the container:
```bash
docker run -d \
  --name blogapp_mysql \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=blogapp \
  -v mysql_data:/var/lib/mysql \
  blogapp-mysql
```

3. Stop and remove the container:
```bash
docker stop blogapp_mysql
docker rm blogapp_mysql
```

## Database Connection

- **Host**: localhost
- **Port**: 3306
- **Database**: blogapp
- **Username**: root
- **Password**: root

## Database Schema

The database includes two tables:

### User Table
- id (Primary Key)
- fname (First Name)
- lname (Last Name)
- email (Unique)
- dob (Date of Birth)
- passWord
- createAt (Auto-generated)
- updateAt (Auto-updated)

### Blog Table
- id (Primary Key)
- title
- content
- createAt (Auto-generated)
- updateAt (Auto-updated)
- userid (Foreign Key to User)
- is_deleted (Boolean flag)

## Accessing MySQL

Connect to the MySQL container:
```bash
docker exec -it blogapp_mysql mysql -uroot -proot blogapp
```
