@echo off
rem
rem Licensed to the Apache Software Foundation (ASF) under one
rem or more contributor license agreements.  See the NOTICE file
rem distributed with this work for additional information
rem regarding copyright ownership.  The ASF licenses this file
rem to you under the Apache License, Version 2.0 (the
rem "License"); you may not use this file except in compliance
rem with the License.  You may obtain a copy of the License at
rem
rem  http://www.apache.org/licenses/LICENSE-2.0
rem
rem Unless required by applicable law or agreed to in writing,
rem software distributed under the License is distributed on an
rem "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
rem KIND, either express or implied.  See the License for the
rem specific language governing permissions and limitations
rem under the License.
rem

rem -----------------------------------------------------------------------------
rem Maven Start Up Script
rem
rem Required ENV vars:
rem ------------------
rem   JAVA_HOME - location of a JRE/JDK
rem
rem Optional ENV vars
rem -----------------
rem   MAVEN_OPTS - parameters passed to the Java VM when running Maven
rem     e.g. to debug Maven itself, use
rem       set MAVEN_OPTS=-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=8000
rem   MAVEN_SKIP_RC - flag to disable loading of /etc/mavenrc and %HOME%/.mavenrc
rem -----------------------------------------------------------------------------

set MAVEN_PROJECT_HOME_FALLBACK_FAIL_MSG=Could not find the project home directory.

if "%MAVEN_PROJECT_HOME%"=="" (
  set "MAVEN_PROJECT_HOME_FALLBACK_SCRIPT=%~f0"
  set "MAVEN_PROJECT_HOME_FALLBACK_SCRIPT_DIR=%~dp0"
  if exist "%MAVEN_PROJECT_HOME_FALLBACK_SCRIPT_DIR%..\.mvn" (
    pushd "%MAVEN_PROJECT_HOME_FALLBACK_SCRIPT_DIR%.."
    set "MAVEN_PROJECT_HOME=%CD%"
    popd
  ) else (
    echo %MAVEN_PROJECT_HOME_FALLBACK_FAIL_MSG%
    exit /B 1
  )
)

rem We need to be in the project home to have a purely relative path to the wrapper jar makes the script robust
cd /D "%MAVEN_PROJECT_HOME%"
set "MAVEN_WRAPPER_JAR=.mvn\wrapper\maven-wrapper.jar"
set "MAVEN_WRAPPER_PROPERTIES=.mvn\wrapper\maven-wrapper.properties"

rem If the maven-wrapper.jar is not present, download it
if not exist "%MAVEN_WRAPPER_JAR%" (
  for /F "usebackq delims=" %%i in ("%MAVEN_WRAPPER_PROPERTIES%") do set WRAPPER_URL=%%i
  for /F "tokens=2 delims==" %%i in ("%WRAPPER_URL%") do set WRAPPER_URL=%%i
  echo Downloading Maven wrapper from %WRAPPER_URL%
  powershell -Command "(New-Object Net.WebClient).DownloadFile('%WRAPPER_URL%', '%MAVEN_WRAPPER_JAR%')"
)

"%JAVA_HOME%\bin\java.exe" %MAVEN_OPTS% -jar "%MAVEN_WRAPPER_JAR%" %* 