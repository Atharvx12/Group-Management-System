PS C:\Users\athar\OneDrive\Desktop\MIS-Invoice\Group-Management-System> git status
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   group-management-system/.gitattributes
        new file:   group-management-system/.gitignore
        new file:   group-management-system/.mvn/wrapper/maven-wrapper.properties
        new file:   group-management-system/mvnw
        new file:   group-management-system/mvnw.cmd
        new file:   group-management-system/pom.xml
        new file:   group-management-system/src/main/java/com/itvedant/groupmanagement/GroupManagementSystemApplication.java
        new file:   group-management-system/src/main/java/com/itvedant/groupmanagement/config/SecurityConfig.java
        new file:   group-management-system/src/main/java/com/itvedant/groupmanagement/controller/ChainController.java
        new file:   group-management-system/src/main/java/com/itvedant/groupmanagement/controller/GroupController.java
        new file:   group-management-system/src/main/java/com/itvedant/groupmanagement/entity/Chain.java
        new file:   group-management-system/src/main/java/com/itvedant/groupmanagement/entity/Group.java
        new file:   group-management-system/src/main/java/com/itvedant/groupmanagement/repository/ChainRepository.java
        new file:   group-management-system/src/main/java/com/itvedant/groupmanagement/repository/GroupRepository.java
        new file:   group-management-system/src/main/java/com/itvedant/groupmanagement/service/ChainService.java
        new file:   group-management-system/src/main/java/com/itvedant/groupmanagement/service/GroupService.java
        new file:   group-management-system/src/main/resources/application.properties
        new file:   group-management-system/src/test/java/com/itvedant/groupmanagement/GroupManagementSystemApplicationTests.java
        new file:   group-management-ui/.gitignore
        new file:   group-management-ui/README.md
        new file:   group-management-ui/package-lock.json
        new file:   group-management-ui/package.json
        new file:   group-management-ui/public/favicon.ico
        new file:   group-management-ui/public/index.html
        new file:   group-management-ui/public/logo192.png
        new file:   group-management-ui/public/logo512.png
        new file:   group-management-ui/public/manifest.json
        new file:   group-management-ui/public/robots.txt
        new file:   group-management-ui/src/App.css
        new file:   group-management-ui/src/App.js
        new file:   group-management-ui/src/components/ChainTable.js
        new file:   group-management-ui/src/components/GroupTable.js
        new file:   group-management-ui/src/components/Header.js
        new file:   group-management-ui/src/components/Sidebar.js
        new file:   group-management-ui/src/index.css
        new file:   group-management-ui/src/index.js
        new file:   group-management-ui/src/pages/AddChain.js
        new file:   group-management-ui/src/pages/AddGroup.js
        new file:   group-management-ui/src/pages/Dashboard.js
        new file:   group-management-ui/src/pages/EditChain.js
        new file:   group-management-ui/src/pages/EditGroup.js
        new file:   group-management-ui/src/pages/ManageChain.js
        new file:   group-management-ui/src/services/chainService.js
        new file:   group-management-ui/src/services/groupService.js
        new file:   group-management-ui/src/styles/dashboard.css

PS C:\Users\athar\OneDrive\Desktop\MIS-Invoice\Group-Management-System> git commit -m "Initial commit - Group Management System"
[master (root-commit) 2d9166a] Initial commit - Group Management System
 45 files changed, 19738 insertions(+)
 create mode 100644 group-management-system/.gitattributes
 create mode 100644 group-management-system/.gitignore
 create mode 100644 group-management-system/.mvn/wrapper/maven-wrapper.properties
 create mode 100644 group-management-system/mvnw
 create mode 100644 group-management-system/mvnw.cmd
 create mode 100644 group-management-system/pom.xml
 create mode 100644 group-management-system/src/main/java/com/itvedant/groupmanagement/GroupManagementSystemApplication.java
 create mode 100644 group-management-system/src/main/java/com/itvedant/groupmanagement/config/SecurityConfig.java
 create mode 100644 group-management-system/src/main/java/com/itvedant/groupmanagement/controller/ChainController.java
 create mode 100644 group-management-system/src/main/java/com/itvedant/groupmanagement/controller/GroupController.java
 create mode 100644 group-management-system/src/main/java/com/itvedant/groupmanagement/entity/Chain.java
 create mode 100644 group-management-system/src/main/java/com/itvedant/groupmanagement/entity/Group.java
 create mode 100644 group-management-system/src/main/java/com/itvedant/groupmanagement/repository/ChainRepository.java
 create mode 100644 group-management-system/src/main/java/com/itvedant/groupmanagement/repository/GroupRepository.java
 create mode 100644 group-management-system/src/main/java/com/itvedant/groupmanagement/service/ChainService.java
 create mode 100644 group-management-system/src/main/java/com/itvedant/groupmanagement/service/GroupService.java
 create mode 100644 group-management-system/src/main/resources/application.properties
 create mode 100644 group-management-system/src/test/java/com/itvedant/groupmanagement/GroupManagementSystemApplicationTests.java
 create mode 100644 group-management-ui/.gitignore
 create mode 100644 group-management-ui/README.md
 create mode 100644 group-management-ui/package-lock.json
 create mode 100644 group-management-ui/package.json
 create mode 100644 group-management-ui/public/favicon.ico
 create mode 100644 group-management-ui/public/index.html
 create mode 100644 group-management-ui/public/logo192.png
 create mode 100644 group-management-ui/public/logo512.png
 create mode 100644 group-management-ui/public/manifest.json
 create mode 100644 group-management-ui/public/robots.txt
 create mode 100644 group-management-ui/src/App.css
 create mode 100644 group-management-ui/src/App.js
 create mode 100644 group-management-ui/src/components/ChainTable.js
 create mode 100644 group-management-ui/src/components/GroupTable.js
 create mode 100644 group-management-ui/src/components/Header.js
 create mode 100644 group-management-ui/src/components/Sidebar.js
 create mode 100644 group-management-ui/src/index.css
 create mode 100644 group-management-ui/src/index.js
 create mode 100644 group-management-ui/src/pages/AddChain.js
 create mode 100644 group-management-ui/src/pages/AddGroup.js
 create mode 100644 group-management-ui/src/pages/Dashboard.js
 create mode 100644 group-management-ui/src/pages/EditChain.js
 create mode 100644 group-management-ui/src/pages/EditGroup.js
 create mode 100644 group-management-ui/src/pages/ManageChain.js
 create mode 100644 group-management-ui/src/services/chainService.js
 create mode 100644 group-management-ui/src/services/groupService.js
 create mode 100644 group-management-ui/src/styles/dashboard.css
PS C:\Users\athar\OneDrive\Desktop\MIS-Invoice\Group-Management-System> git remote add origin https://github.com/Atharvx12/Group-Management-System.git
PS C:\Users\athar\OneDrive\Desktop\MIS-Invoice\Group-Management-System> git branch -M main
PS C:\Users\athar\OneDrive\Desktop\MIS-Invoice\Group-Management-System> git push -u origin main
Enumerating objects: 74, done.
Counting objects: 100% (74/74), done.
Delta compression using up to 12 threads
Compressing objects: 100% (62/62), done.
Writing objects: 100% (74/74), 189.77 KiB | 1.33 MiB/s, done.
Total 74 (delta 9), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (9/9), done.
To https://github.com/Atharvx12/Group-Management-System.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
PS C:\Users\athar\OneDrive\Desktop\MIS-Invoice\Group-Management-System> 
