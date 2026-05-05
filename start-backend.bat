@echo off
echo Starting Contact Manager Backend...
set JAVA_HOME=C:\Users\ASUS\.vscode\extensions\redhat.java-1.54.0-win32-x64\jre\21.0.10-win32-x86_64
set PATH=%JAVA_HOME%\bin;%PATH%
cd /d "%~dp0backend"
apache-maven-3.9.6\bin\mvn.cmd spring-boot:run
