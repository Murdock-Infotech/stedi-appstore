#© 2021 Sean Murdock
java -Xdebug -Xrunjdwp:transport=dt_socket,address=8000,server=y,suspend=n -Dconfig=/etc/stedi/application.conf -jar target/StepTimerWebsocket-1.0-SNAPSHOT.jar