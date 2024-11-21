import mysql.connector
from getpass import getpass

def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password=getpass("Enter database password 'pass=ansh': "),
        database='bms'
    )

def list_tables():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SHOW TABLES")
    tables = cursor.fetchall()
    cursor.close()
    conn.close()
    return [table[0] for table in tables]

def view_table(table_name):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(f"SELECT * FROM {table_name}")
    records = cursor.fetchall()
    cursor.close()
    conn.close()
    return records

def add_record(table_name, data):
    conn = get_db_connection()
    cursor = conn.cursor()
    columns = ', '.join(data.keys())
    placeholders = ', '.join(['%s'] * len(data))
    query = f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})"
    cursor.execute(query, tuple(data.values()))
    conn.commit()
    cursor.close()
    conn.close()

def edit_record(table_name, record_id, data):
    conn = get_db_connection()
    cursor = conn.cursor()
    set_clause = ', '.join([f"{k} = %s" for k in data.keys()])
    query = f"UPDATE {table_name} SET {set_clause} WHERE id = %s"
    values = list(data.values()) + [record_id]
    cursor.execute(query, values)
    conn.commit()
    cursor.close()
    conn.close()

def delete_record(table_name, record_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(f"DELETE FROM {table_name} WHERE id = %s", (record_id,))
    conn.commit()
    cursor.close()
    conn.close()

def main():
    while True:
        print("\nMenu:")
        print("1. List Tables")
        print("2. View Table")
        print("3. Add Record")
        print("4. Edit Record")
        print("5. Delete Record")
        print("6. Exit")

        choice = input("Choose an option: ")

        if choice == '1':
            tables = list_tables()
            print("\nTables:")
            for table in tables:
                print(table)
        
        elif choice == '2':
            table_name = input("Enter table name: ")
            records = view_table(table_name)
            print("\nRecords:")
            for record in records:
                print(record)
        
        elif choice == '3':
            table_name = input("Enter table name: ")
            data = {}
            columns = input("Enter column names (comma-separated): ").split(',')
            for column in columns:
                data[column.strip()] = input(f"Enter value for {column.strip()}: ")
            add_record(table_name, data)
            print("Record added.")
        
        elif choice == '4':
            table_name = input("Enter table name: ")
            record_id = input("Enter record ID to edit: ")
            data = {}
            columns = input("Enter column names to edit (comma-separated): ").split(',')
            for column in columns:
                data[column.strip()] = input(f"Enter new value for {column.strip()}: ")
            edit_record(table_name, record_id, data)
            print("Record updated.")
        
        elif choice == '5':
            table_name = input("Enter table name: ")
            record_id = input("Enter record ID to delete: ")
            delete_record(table_name, record_id)
            print("Record deleted.")
        
        elif choice == '6':
            break
        
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()