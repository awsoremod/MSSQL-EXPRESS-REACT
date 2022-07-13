FROM mcr.microsoft.com/mssql/server:2022-latest
WORKDIR /database
COPY . .
# USER root
# RUN chmod +x /database/setup-database.sh
# USER mssql
ENTRYPOINT /bin/bash entrypoint.sh