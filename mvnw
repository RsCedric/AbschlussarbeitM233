#!/bin/sh

#
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#  http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
#

# -----------------------------------------------------------------------------
# Maven Start Up Script
#
# Required ENV vars:
# ------------------
#   JAVA_HOME - location of a JRE/JDK
#
# Optional ENV vars
# -----------------
#   MAVEN_OPTS - parameters passed to the Java VM when running Maven
#     e.g. to debug Maven itself, use
#       set MAVEN_OPTS=-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=8000
#   MAVEN_SKIP_RC - flag to disable loading of /etc/mavenrc and ~/.mavenrc
# -----------------------------------------------------------------------------

MAVEN_PROJECT_HOME_FALLBACK_FAIL_MSG="Could not find the project home directory."
MAVEN_PROJECT_HOME_FALLBACK_SCRIPT="$0"
if [ -z "$MAVEN_PROJECT_HOME" ] ; then
  ## resolve links - $0 may be a link to maven's script
  PRG="$MAVEN_PROJECT_HOME_FALLBACK_SCRIPT"

  # need this for relative symlinks
  while [ -h "$PRG" ] ; do
    ls=`ls -ld "$PRG"`
    link=`expr "$ls" : '.*-> \(.*\)$'`
    if expr "$link" : '/.*' > /dev/null; then
      PRG="$link"
    else
      PRG="`dirname "$PRG"`/$link"
    fi
  done

  saveddir=`pwd`

  MAVEN_PROJECT_HOME=`dirname "$PRG"`/..

  # make it fully qualified
  MAVEN_PROJECT_HOME=`cd "$MAVEN_PROJECT_HOME" && pwd`

  cd "$saveddir"
  # MAVEN_PROJECT_HOME has been computed
fi

# We need to be in the project home to have a purely relative path to the wrapper jar makes the script robust
cd "$MAVEN_PROJECT_HOME"
MAVEN_WRAPPER_JAR=".mvn/wrapper/maven-wrapper.jar"
MAVEN_WRAPPER_PROPERTIES=".mvn/wrapper/maven-wrapper.properties"

#If the maven-wrapper.jar is not present, download it
if [ ! -f "$MAVEN_WRAPPER_JAR" ]; then
    MAVEN_WRAPPER_URL=$(grep -e "wrapperUrl" "$MAVEN_WRAPPER_PROPERTIES" | cut -d'=' -f2)
    MAVEN_WRAPPER_DESTINATION=$(dirname "$MAVEN_WRAPPER_JAR")
    echo "Downloading Maven wrapper from $MAVEN_WRAPPER_URL"
    if [ -x "$(command -v wget)" ]; then
        wget -O "$MAVEN_WRAPPER_JAR" "$MAVEN_WRAPPER_URL"
    elif [ -x "$(command -v curl)" ]; then
        curl -L -o "$MAVEN_WRAPPER_JAR" "$MAVEN_WRAPPER_URL"
    else
        echo "Could not find wget or curl. Please install one of these and try again."
        exit 1
    fi
fi

exec "$JAVA_HOME"/bin/java $MAVEN_OPTS -jar "$MAVEN_WRAPPER_JAR" "$@" 