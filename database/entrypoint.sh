#start the script to create the DB, start SQL Server
# скрипты до запуска сервера !
# https://docs.microsoft.com/ru-ru/sql/linux/sql-server-linux-docker-container-configure?view=sql-server-ver15&pivots=cs1-bash
/database/setup-database.sh & /opt/mssql/bin/sqlservr

